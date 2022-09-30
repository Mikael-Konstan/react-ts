import { FC, useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry.js');
import * as pdfjsViewer from 'pdfjs-dist/legacy/web/pdf_viewer.js';
import { OptionalContentConfig } from 'pdfjs-dist/types/src/display/optional_content_config';
import {
  PDFPageProxy,
  PDFDocumentProxy,
} from 'pdfjs-dist/types/src/display/api';
import {
  EventBus,
  PDFPageView,
  DefaultAnnotationLayerFactory,
  DefaultTextLayerFactory,
  DefaultXfaLayerFactory,
  DefaultStructTreeLayerFactory,
} from 'pdfjs-dist/types/web/pdf_viewer.component';
import 'pdfjs-dist/web/pdf_viewer.css';
import './index.less';
import CanvasEdit from '../canvasEdit';
import { getScale } from './../util/index';
import { Loading } from '@/components';

interface PdfJsProps {
  pdfUrl?: string; // PDF链接
  pageIndex?: number; // PDF页码
}

const PdfJs: FC<PdfJsProps> = (props: PdfJsProps) => {
  const pdfJsRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageNums, setPageNums] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [sourceSize, setSourceSize] = useState<number[]>([0, 0]);
  const [offsetSize, setOffsetSize] = useState<number[]>([0, 0]);
  const [curSize, setCurSize] = useState<number[]>([0, 0]);
  const [optionalContentConfig, setOptionalContentConfig] =
    useState<OptionalContentConfig>();
  const pdfDocument = useRef<PDFDocumentProxy>();
  const eventBus = useRef<EventBus>();
  const defaultAnnotationLayerFactory = useRef<DefaultAnnotationLayerFactory>();
  const defaultTextLayerFactory = useRef<DefaultTextLayerFactory>();
  const defaultXfaLayerFactory = useRef<DefaultXfaLayerFactory>();
  const defaultStructTreeLayerFactory = useRef<DefaultStructTreeLayerFactory>();
  const pdfPageView = useRef<PDFPageView>();
  const layerCacheData = useRef<any[]>([]);
  const pageRef = useRef<PDFPageProxy>();

  useEffect(() => {
    if (!!props.pdfUrl) {
      setPdfUrl(props.pdfUrl);
      setSourceSize([0, 0]);
    }
  }, [props.pdfUrl]);

  useEffect(() => {
    if (props.pageIndex !== undefined && props.pageIndex !== 0) {
      let idx = props.pageIndex > pageNums ? pageNums : props.pageIndex;
      setPageIndex(idx);
    }
  }, [props.pageIndex]);

  useEffect(() => {
    if (container.current && pdfUrl !== '') {
      init();
    }
  }, [container.current, pdfUrl]);
  useEffect(() => {
    if (!!pdfDocument.current) {
      renderCanvas(pdfDocument.current, pageIndex);
    }
  }, [pageIndex, pdfDocument.current]);

  useEffect(() => {
    if (!!pageRef.current) {
      pdfCanavsInit(pageRef.current, scale);
    }
  }, [scale, sourceSize]);
  // 插件初始化
  const init = () => {
    setPageIndex(0); // 切换文件时 触发更新
    setLoading(true);
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    loadingTask.promise
      .then(
        function (PDFDocument: PDFDocumentProxy) {
          console.log('PDF loading successful', PDFDocument);
          pdfDocument.current = PDFDocument;
          setPageIndex(1);
          setPageNums(PDFDocument.numPages);
        },
        function (err) {
          console.log('PDF loading failed', err);
        },
      )
      .catch((err) => {
        console.log('PDF loading failed', err);
      });
  };
  // 绘制canvas
  const renderCanvas = (PDFDocument: PDFDocumentProxy, pageIndex: number) => {
    if (pageIndex === 0) return;
    PDFDocument.getPage(pageIndex)
      .then(
        (page: PDFPageProxy) => {
          pageRef.current = page;
          // 新PDF或者新一页执行 所以scale可以设为一
          pdfCanavsInit(page, 1);
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };
  // pdfjs插件渲染canvas
  const pdfCanavsInit = (page: PDFPageProxy, scale: number) => {
    if (container.current) {
      eventBus.current = new pdfjsViewer.EventBus();
      defaultTextLayerFactory.current =
        new pdfjsViewer.DefaultTextLayerFactory();
      defaultAnnotationLayerFactory.current =
        new pdfjsViewer.DefaultAnnotationLayerFactory();
      defaultXfaLayerFactory.current = new pdfjsViewer.DefaultXfaLayerFactory();
      defaultStructTreeLayerFactory.current =
        new pdfjsViewer.DefaultStructTreeLayerFactory();
      const viewport = page.getViewport({ scale });
      pdfPageView.current = new pdfjsViewer.PDFPageView({
        container: container.current,
        eventBus: eventBus.current,
        id: 1,
        scale,
        defaultViewport: viewport,
        // We can enable text/annotation/xfa/struct-layers, as needed.
        textLayerFactory: defaultTextLayerFactory.current,
        annotationLayerFactory: defaultAnnotationLayerFactory.current,
        xfaLayerFactory: defaultXfaLayerFactory.current,
        structTreeLayerFactory: defaultStructTreeLayerFactory.current,
        renderer: 'canvas',
        l10n: pdfjsViewer.NullL10n,
      });

      pdfPageView.current.setPdfPage(page); // 此操作之后 才能拿到实际高宽
      if (scale === 1 && sourceSize[0] === 0) {
        const sWidth = pdfPageView.current.viewport.width;
        const sHeight = pdfPageView.current.viewport.height;
        setSourceSize([sWidth, sHeight]);
        const { scale, maxW, maxH } = getScale(
          pdfJsRef.current,
          sWidth,
          sHeight,
        );
        setScale(scale);
        const width = sWidth * scale;
        const height = sHeight * scale;
        setCurSize([width, height]);
        const left = (maxW - width) / 2;
        const top = (maxH - height) / 2;
        setOffsetSize([left, top]);
        setLoading(false);
      } else {
        pdfPageView.current.draw();
        const width = sourceSize[0] * scale;
        const height = sourceSize[1] * scale;
        setCurSize([width, height]);
      }

      pdfDocument.current
        ?.getOptionalContentConfig()
        .then((optionalContentConfig: OptionalContentConfig) => {
          console.log('optionalContentConfig', optionalContentConfig);
          setOptionalContentConfig(optionalContentConfig);
        });
    }
  };
  function saveLayerData() {}
  // 更新图层
  const updateLayer = (groupId: string, visible: boolean) => {
    optionalContentConfig?.setVisibility(groupId, visible);
    pdfPageView.current?.update({
      optionalContentConfigPromise: Promise.resolve(optionalContentConfig),
    });
    pdfPageView.current?.draw();
  };
  const onScaleChange = (scale: number) => {
    setScale(scale);
  };
  return (
    <div ref={pdfJsRef} className="pdfJS">
      <div
        id="pageContainer"
        className="pdfViewer singlePageView"
        ref={container}
      ></div>
      {pdfPageView.current?.canvas && (
        <CanvasEdit
          backGroundCanvas={pdfPageView.current?.canvas}
          curSize={curSize}
          offsetSize={offsetSize}
          scale={scale}
          onScaleChange={onScaleChange}
          optionalContentConfig={optionalContentConfig}
          updateLayer={updateLayer}
          pdfUrl={pdfUrl}
        ></CanvasEdit>
      )}
      <Loading loading={loading} />
    </div>
  );
};

export default PdfJs;
