import { IF } from '@/components';
import { MessageBusContext } from '@/utils/context/message-bus-context';
import { DeleteSvg, DetailSvg, EditSvg } from '@/pages/PDFJS/components/icon';
import {
  ShowDetailModal,
  useShowDetailModal,
} from '@/pages/PDFJS/components/showDetail';
import { FileInfoContext } from '@/pages/PDFJS/context';
// import { deleteMarkApi, getMarksApi, saveMarkApi } from '@/services/drawing';
import { CanvasTool, getElementClient } from '@/pages/PDFJS/canvasTool';
import { ShapesDataItem, ShapeStyle } from '@/pages/PDFJS/canvasTool/type';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { OptionalContentConfig } from 'pdfjs-dist/types/src/display/optional_content_config';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { AddAndEditMark } from './../AddAndEditMark';
import { CanvasDataContext } from './../context';
import { LeftBar } from './../LeftBar';
import { RightBar } from './../RightBar';
import { TopBar } from './../TopBar';
import './index.less';
import { ShapeTip } from './ShapeTip';

const { confirm } = Modal;

interface CanvasEditProps {
  backGroundCanvas: HTMLCanvasElement | null;
  curSize?: number[];
  offsetSize?: number[];
  scale?: number;
  onScaleChange?: (scale: number) => void;
  optionalContentConfig?: OptionalContentConfig;
  updateLayer?: (groupId: string, visible: boolean) => void;
  pdfUrl?: string;
}

const CanvasEdit: FC<CanvasEditProps> = (props: CanvasEditProps) => {
  const fileInfo = useContext(FileInfoContext);
  const canvasContainer = useRef<HTMLCanvasElement>(null);
  const canvasTool = useRef<CanvasTool | null>(null);
  const [scale, setScale] = useState<number>(1);
  const updateTimer = useRef<NodeJS.Timer | null>(null);
  const [showLeftBar, setShowLeftBar] = useState<boolean>(true);
  const [rightListType, setRightListType] = useState<string>('');
  const [markList, setMarkList] = useState<any[]>([]);
  const [markData, setMarkData] = useState<any>({});
  const [editMarkVisible, setEditMarkVisible] = useState<boolean>(false);
  const [selectedIndexs, setSelectedIndexs] = useState<number>(0);
  const [shapeActiveCode, setShapeActiveCode] = useState<string>('');
  const [offset, setOffset] = useState<number[]>([-100, 0]);
  const [commentShow, setCommentShow] = useState<string>('');
  const { getDetailModalProps, showDetailModal } = useShowDetailModal();
  const mouseOverTimer = useRef<NodeJS.Timer | null>(null);
  const [mouseOverTitle, setMouseOverTitle] = useState<any>(null);
  const messageBus = useContext(MessageBusContext);

  useEffect(() => {
    if (canvasTool.current) {
      canvasTool.current.removeAll();
      canvasTool.current.clear();
    }
  }, [props.pdfUrl]);

  useEffect(() => {
    canvasToolInit();
    return () => {
      if (updateTimer.current !== null) {
        clearTimeout(updateTimer.current);
        updateTimer.current = null;
      }
      if (mouseOverTimer.current !== null) {
        clearTimeout(mouseOverTimer.current);
        mouseOverTimer.current = null;
      }
    };
  }, [canvasTool.current, updateTimer.current, mouseOverTimer.current]);

  useEffect(() => {
    if (canvasContainer.current && props.curSize) {
      canvasContainer.current.width = props.curSize[0];
      canvasContainer.current.height = props.curSize[1];
    }
  }, [props.curSize, canvasContainer.current]);

  useEffect(() => {
    if (canvasContainer.current && props.offsetSize) {
      canvasContainer.current.style.left = props.offsetSize[0] + 'px';
      canvasContainer.current.style.top = props.offsetSize[1] + 'px';
    }
  }, [props.offsetSize, canvasContainer.current]);

  useEffect(() => {
    setScale(props.scale || 1);
  }, [props.scale]);

  useEffect(() => {
    let selectMarkSub: () => void;
    if (!!canvasTool.current) {
      selectMarkSub = messageBus.on(
        'selectMark',
        (selectTarget: ShapesDataItem | null | string) => {
          canvasTool.current?.setSelected(selectTarget);
        },
      );
      if (!!props.backGroundCanvas) {
        canvasTool.current.setBackGround(props.backGroundCanvas);
      }
      if (!!scale) {
        canvasTool.current.zoom(scale);
        markListRefresh();
      }
    }
    return () => {
      selectMarkSub && selectMarkSub();
    };
  }, [props.backGroundCanvas, scale, canvasTool.current]);

  useEffect(() => {
    const fileVisionMap: any = {};
    fileInfo.fileVisionList.forEach((item) => {
      fileVisionMap[item.code] = item;
    });
    const shapesData = canvasTool.current?.getShapesData() || [];
    canvasTool.current?.removeAll();
    canvasTool.current?.add(
      shapesData.map((item) => {
        return {
          ...item,
          show: fileVisionMap[item.versionId || '']?.checked,
          curVersion:
            item.versionId ===
            fileInfo.fileVisionList[fileInfo.currentVision]?.code,
        };
      }),
    );
  }, [fileInfo.fileVisionList]);

  // canvasTool 初始化
  const canvasToolInit = () => {
    if (props.backGroundCanvas && !canvasTool.current) {
      // 单例
      canvasTool.current = new CanvasTool({
        canvas: canvasContainer.current as HTMLCanvasElement,
        backGround: props.backGroundCanvas,
        paintVersion: true,
        shapesChange: (type: string, value: any) => {
          let val = JSON.parse(JSON.stringify(value));
          delete val.config;
          delete val.comment;
          if (type === 'update') {
            if (updateTimer.current !== null) {
              clearTimeout(updateTimer.current);
              updateTimer.current = null;
            }
            updateTimer.current = setTimeout(() => {
              updateTimer.current = null;
              saveMarks({
                code: fileInfo.fileCode,
                markCode: val.markCode || val.code,
                type: val.type,
                config: JSON.stringify(val),
                comment: value.comment || '',
                index: 0,
              });
              markListRefresh();
            }, 600);
          }
          if (type === 'add') {
            canvasTool.current?.setDrawingType('');
            if (!Array.isArray(val)) {
              editMark({
                code: fileInfo.fileCode,
                markCode: val.code,
                type: val.type,
                config: JSON.stringify(val),
                comment: value.comment || '',
                index: -1,
              });
            }
            markListRefresh();
          }
          if (type === 'delete') {
            markListRefresh();
          }
        },
        keyUp: (selected, event) => {
          const { key } = event as KeyboardEvent;
          if (key === 'Delete') {
            !!selected && deleteMarks(selected);
          }
        },
        mouseOver: (params: any) => {
          if (mouseOverTimer.current !== null) {
            clearTimeout(mouseOverTimer.current);
            mouseOverTimer.current = null;
          }
          mouseOverTimer.current = setTimeout(() => {
            const commentHover = params?.commentHover;
            const versionHover = params?.versionHover;
            if (
              !!commentHover &&
              !!commentHover.comment &&
              commentHover.type === 'anchor'
            ) {
              let client = { left: 0, top: 0 };
              if (canvasContainer.current) {
                client = getElementClient(canvasContainer.current);
              }
              let scale = canvasTool.current?.zoom() || 1;
              setMouseOverTitle({
                ...commentHover,
                tip: commentHover.comment || '',
                x: commentHover.x * scale + (client.left || 0),
                y: commentHover.y * scale + (client.top || 0) - 20,
              });
            } else if (!!versionHover && !!versionHover.versionName) {
              let client = { left: 0, top: 0 };
              if (canvasContainer.current) {
                client = getElementClient(canvasContainer.current);
              }
              let tip = versionHover.versionName || '';
              if (tip !== '') {
                tip = '版本：' + tip;
                tip = tip + (versionHover.curVersion ? '（在用版本）' : '');
                setMouseOverTitle({
                  ...versionHover,
                  tip,
                  x: versionHover.mousePosiX,
                  y: versionHover.mousePosiY,
                  oldVersion: true,
                });
              }
            } else {
              setMouseOverTitle(null);
            }
            mouseOverTimer.current = null;
          }, 300);
        },
        mouseOut: (target: any) => {
          if (target && target.comment && target.type === 'anchor') {
            setMouseOverTitle(null);
          }
        },
        mouseUp: (selectItem?: any) => {
          const obj = canvasTool.current?.getBoundingBox();
          let client = { left: 0, top: 0 };
          if (canvasContainer.current) {
            client = getElementClient(canvasContainer.current);
          }
          if (obj) {
            if (obj.offsetXAll !== client.left) {
              markListRefresh();
            }
          }
          if (!!canvasTool.current?.btnSelectType && !!selectItem) {
            shapesSelectedOpts(canvasTool.current?.btnSelectType, selectItem);
          }
        },
        ready: (tool: CanvasTool) => {
          tool.refresh();
          setTimeout(() => {
            canvasTool.current?.refresh();
            getMarks();
            setTimeout(() => {
              canvasTool.current?.refresh();
            }, 600);
          }, 600);
        },
        selectedShapes: (selectedIndexs: string[]) => {
          if (selectedIndexs.length > 0) {
            setShapeActiveCode(selectedIndexs[0]);
          }
        },
      });
    }
  };
  // 获取现有标记
  const getMarks = () => {
    getMarksApi({
      bluePrintCode: fileInfo.fileCode,
      name: '',
      bluePrintType: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          if (res.code === 200 && res.success) {
            let markList = res.data || [];
            const fileVisionMap: any = {};
            fileInfo.fileVisionList.forEach((item) => {
              fileVisionMap[item.code] = item;
            });
            canvasTool.current?.removeAll();
            canvasTool.current?.add(
              markList.map((item) => {
                let markData = JSON.parse(item.config || '{}');
                return {
                  ...item,
                  ...markData,
                  versionName: fileVisionMap[item.versionId]?.name || '',
                  fileCode: item.code,
                  show: fileVisionMap[item.versionId]?.checked,
                  curVersion:
                    item.versionId ===
                    fileInfo.fileVisionList[fileInfo.currentVision]?.code,
                };
              }),
            );
          }
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((error) => {
        console.log(error);
      });
  };
  // 添加、修改标记
  const saveMarks = (selected: any) => {
    const addFlag = selected.index === -1;
    saveMarkApi({
      code: fileInfo.fileCode,
      markCode: selected.markCode || selected.code,
      type: selected.type,
      config: selected.config,
      comment: selected.comment,
      versionId: fileInfo.fileVisionList[fileInfo.currentVision].code,
      bluePrintType: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          if (res.code === 200 && res.success) {
            canvasTool.current?.updateShapeData(selected);
            getMarks();
          }
        },
        (error) => {
          console.log(error);
          if (addFlag) {
            canvasTool.current?.remove(selected);
          }
        },
      )
      .catch((error) => {
        console.log(error);
        if (addFlag) {
          canvasTool.current?.remove(selected);
        }
      });
  };
  // 删除标记
  const deleteMarks = (selected: any) => {
    confirm({
      title: '确定要删除此标注?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后只能手动重新创建恢复。',
      onOk() {
        deleteMarkApi({
          code: fileInfo.fileCode,
          markCode: selected.code,
        })
          .then(
            (res) => {
              if (res.code === 200 && res.success) {
                canvasTool.current?.remove(selected);
                canvasTool.current?.refresh();
              }
            },
            (error) => {
              console.log(error);
            },
          )
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };
  // 添加、编辑标记 弹窗
  const editMark = (markData: any) => {
    setMarkData(markData);
    setEditMarkVisible(true);
  };
  const showEditMarkToggle = (flag: boolean) => {
    setEditMarkVisible(flag);
  };
  // 设置canvasTool 样式
  const setStyle = (shapeStyle: ShapeStyle) => {
    if (!!canvasTool.current) {
      canvasTool.current.style(shapeStyle);
    }
  };
  // 设置绘制类型
  const drawingTypeChange = (value: string) => {
    if (!!canvasTool.current) {
      canvasTool.current.setSelectType('');
      canvasTool.current.setDrawingType(value);
    }
  };
  // 设置线条宽度
  const drawingLineWidthChange = (value: number) => {
    editSelectedStyle(value, 'width');
    setStyle({
      lineWidth: value,
    });
  };
  // 设置文字颜色、线条颜色
  const drawingColorChange = (value: string) => {
    editSelectedStyle(value, 'color');
    setStyle({
      fontColor: value,
      fillStyle: value,
    });
  };
  // 修改选中标记的样式
  const editSelectedStyle = (value: string | number, type = 'color') => {
    if (!canvasTool.current) return;
    const { shapesData, pointData } = canvasTool.current.getSelectedShape();
    const index = shapesData.findIndex((item) => {
      return item.code === pointData.pointTarget?.code;
    });
    const selected = shapesData[index];
    if (selected && (selected as any).config) {
      let config = JSON.parse((selected as any).config);
      if (type === 'color') {
        config.fontColor = value;
        config.fillStyle = value;
      } else {
        config.lineWidth = value;
      }
      saveMarks({
        ...selected,
        config: JSON.stringify(config),
        index,
      });
    }
  };
  // 设置文字大小
  const drawingSizeChange = (value: number) => {
    setStyle({
      fontSize: value,
    });
  };
  // 设置选择标注方式
  const drawingSelectTypeChange = (value: string) => {
    if (!!canvasTool.current) {
      canvasTool.current.setDrawingType('');
      canvasTool.current.setSelectType(value);
    }
  };
  // 鼠标滚轮改变缩放大小
  const onCanvasBGWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setCanvasScale(e.deltaY > 0, 0.1);
  };
  // 设置画布放缩比例
  const setCanvasScale = (flag: boolean | number, step = 0.01) => {
    const minScale = 0.01;
    if (typeof flag === 'number') {
      const scale = flag < minScale ? minScale : flag;
      setScale(scale);
      props.onScaleChange && props.onScaleChange(scale);
      return;
    }
    const increment = (flag ? -1 : 1) * step;
    setScale((state) => {
      state += increment;
      if (state < minScale) {
        state = minScale;
      }
      props.onScaleChange && props.onScaleChange(state);
      return state;
    });
  };
  // LeftBar显隐切换
  const showLeftBarToggle = () => {
    setShowLeftBar((flag) => {
      return !flag;
    });
  };
  // 版本标记显隐切换
  const visionMarkShowOnChange = (show: boolean) => {
    canvasTool.current?.enableShowVision(show);
  };
  // 标注引用列表显隐切换
  const rightListTypeChange = (type: string) => {
    setRightListType(type);
  };
  // 标注列表刷新
  const markListRefresh = () => {
    const shapesData = canvasTool.current?.getShapesData() || [];
    const item = shapesData[selectedIndexs];
    setCommentShow((item && item.comment) || '');
    setMarkList(JSON.parse(JSON.stringify(shapesData)));
  };
  // 标注选中操作
  const shapesSelectedOpts = (type: string, selectItem?: any) => {
    let item = selectItem;
    if (!item) {
      item = markList[selectedIndexs];
    }

    if (type === 'detail') {
      showDetailModal(item.comment);
    }
    if (type === 'edit') {
      editMark(item);
    }
    if (type === 'delete') {
      deleteMarks(item);
    }
  };
  return (
    <>
      <CanvasDataContext.Provider value={{ shapeActiveCode }}>
        <div>
          {/* 顶部工具栏 */}
          <TopBar
            showLeftBarToggle={showLeftBarToggle}
            visionMarkShowOnChange={visionMarkShowOnChange}
            rightListType={rightListType}
            setRightListType={rightListTypeChange}
          ></TopBar>
          {/* 左侧标注工具 */}
          <IF condition={showLeftBar}>
            <LeftBar
              drawingTypeChange={drawingTypeChange}
              drawingLineWidthChange={drawingLineWidthChange}
              drawingColorChange={drawingColorChange}
              drawingSizeChange={drawingSizeChange}
              drawingSelectTypeChange={drawingSelectTypeChange}
            ></LeftBar>
          </IF>
          {/* 右侧缩放 */}
          <RightBar scale={scale} setCanvasScale={setCanvasScale}></RightBar>
          {/* 标注及引用列表 */}
          <RightList
            rightListType={rightListType}
            setRightListType={rightListTypeChange}
            markList={markList}
            editMark={editMark}
            deleteMarks={deleteMarks}
          ></RightList>
        </div>
      </CanvasDataContext.Provider>
      {/* 画布 */}
      <div className="canvasBackGround" onWheel={(e) => onCanvasBGWheel(e)}>
        <canvas id="canvasContainer" ref={canvasContainer}></canvas>
      </div>
      {/* 添加编辑标记 */}
      <AddAndEditMark
        markData={markData}
        editMarkVisible={editMarkVisible}
        setEditMarkVisible={showEditMarkToggle}
        saveMarks={saveMarks}
        deleteMarks={deleteMarks}
        canvasTool={canvasTool.current}
      ></AddAndEditMark>
      {/* 选中标记title */}
      <IF condition={commentShow.length > 0}>
        <div
          id="canvasOptionsTitle"
          style={{ left: `${offset[0]}px`, top: `${offset[1]}px` }}
        >
          {commentShow}
        </div>
      </IF>
      {/* 选中标记操作栏 */}
      <div
        id="canvasOptions"
        style={{ left: `${offset[0]}px`, top: `${offset[1]}px` }}
      >
        <DetailSvg
          onClick={() => {
            shapesSelectedOpts('detail');
          }}
        ></DetailSvg>
        <EditSvg onClick={() => shapesSelectedOpts('edit')}></EditSvg>
        <DeleteSvg
          onClick={() => {
            shapesSelectedOpts('delete');
          }}
        ></DeleteSvg>
      </div>
      <IF condition={mouseOverTitle !== null}>
        <ShapeTip {...mouseOverTitle}></ShapeTip>
      </IF>
      {/* 标记title详情 */}
      <ShowDetailModal {...getDetailModalProps()}></ShowDetailModal>
    </>
  );
};

export default CanvasEdit;
