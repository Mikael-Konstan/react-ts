import { IconFont, IF } from '@/components';
import { FileInfoContext } from '@/pages/drawing/markPicture/context';
import { savelinkApi } from '@/services/drawing';
import { DrawingTypeEnum, LinkTYpeEnum } from '@/utils/enum';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, message } from 'century';
import { FC, useContext, useEffect, useState } from 'react';
import { SearchSvg } from './../icon';
import { CiteListItem } from './CiteListItem';
import './index.less';
import { LinkForm } from './LinkFormTitle';
import { LinkPicture } from './LinkPicture';
import { LinkSchedule } from './LinkSchedule';
import { LinkWord } from './LinkWord';
import { MarkListItem } from './MarkListItem';

export interface RightListProps {
  rightListType: string;
  markList: any[];
  setRightListType: (type: string) => void;
  editMark: (markData: any) => void;
  deleteMarks: (markData: any) => void;
}

export const RightList: FC<RightListProps> = (props: RightListProps) => {
  const fileInfo = useContext(FileInfoContext);
  const [keyWord, setKeyWord] = useState<string>('');
  const [isLinkWordVisible, setLinkWordVisible] = useState(false);
  const [isLinkPictureVisible, setLinkPictureVisible] = useState(false);
  const [isLinkFormVisible, setLinkFormVisible] = useState(false);
  const [isLinkPlanVisible, setLinkPlanVisible] = useState(false);
  const [refreshCiteList, setRefreshCiteList] = useState<number>(0);
  const [markList, setMarkList] = useState<any[]>([]);
  useEffect(() => {
    setMarkList(props.markList);
  }, [props.markList, props.markList.length]);
  useEffect(() => {
    setKeyWord('');
  }, [props.rightListType]);

  const inputChangeSearch = function (e: any) {
    setKeyWord(e.target.value);
  };

  const parseQuery = (): { [key: string]: any } => {
    const search: string = decodeURIComponent(location.search);
    if (!search) return {};
    const obj: any = {};
    const params = search.split('?')[1].split('&');
    params.forEach((item) => (obj[item.split('=')[0]] = item.split('=')[1]));

    return obj;
  };

  // 新增引用
  const savelink = (
    linkName: string,
    type: string,
    relativeCodeList: string[],
  ) => {
    if (!linkName || relativeCodeList.length === 0) return;
    const { typeEnum } = parseQuery();
    savelinkApi({
      sourceCode: fileInfo.fileCode,
      sourceType:
        typeEnum === DrawingTypeEnum.ARCHITECTURAL_DRAWING
          ? typeEnum
          : 'BLUEPRINT',
      referenceType: 'MUTUAL',
      name: linkName,
      relativeCodeList: Array.from(new Set(relativeCodeList)),
      type,
      versionId: fileInfo.fileVisionList[fileInfo.currentVision].code,
      bluePrintType: fileInfo.typeEnum,
    })
      .then(
        (res) => {
          const { code, success } = res;
          if (code === 200 && success) {
            setRefreshCiteList(new Date().getTime());
          } else {
            res.message && message.error(res.message);
          }
        },
        (err) => {
          console.log(err);
        },
      )
      .catch((err) => {
        console.log(err);
      });
  };
  const showLinkWord = (flag: boolean) => {
    setLinkWordVisible(flag);
  };
  const showLinkPicture = (flag: boolean) => {
    setLinkPictureVisible(flag);
  };
  const showLinkForm = (flag: boolean) => {
    setLinkFormVisible(flag);
  };
  const showLinkPlan = (flag: boolean) => {
    setLinkPlanVisible(flag);
  };
  const handleMenuClick = (e: any) => {
    const { key } = e;
    switch (key) {
      case LinkTYpeEnum.FORM:
        setLinkFormVisible(true);
        break;
      case LinkTYpeEnum.WORD:
        setLinkWordVisible(true);
        break;
      case LinkTYpeEnum.PICTURE:
        setLinkPictureVisible(true);
        break;
      case LinkTYpeEnum.SCHEDULE:
        setLinkPlanVisible(true);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: '表单',
          key: LinkTYpeEnum.FORM,
        },
        {
          label: '文档',
          key: LinkTYpeEnum.WORD,
        },
        {
          label: '图片',
          key: LinkTYpeEnum.PICTURE,
        },
        {
          label: '进度计划',
          key: LinkTYpeEnum.SCHEDULE,
        },
      ]}
    />
  );
  return (
    <div
      className={`rightList ${
        props.rightListType === '' ? 'rightHide' : 'rightShow'
      }`}
    >
      <div className="rightListHeader">
        <span>{props.rightListType === 'citeList' ? '引用' : '标注'}</span>
        <IconFont
          type="icon-guanbi2"
          className="closeBtn"
          onClick={() => {
            props.setRightListType('');
          }}
        />
      </div>
      <div className="rightListBody">
        <IF condition={props.rightListType === 'citeList'}>
          <Dropdown
            overlay={menu}
            trigger={['click', 'hover']}
            className="createCite"
          >
            <Button type="primary" style={{ backgroundColor: '#0176F6' }}>
              新增 <DownOutlined />
            </Button>
          </Dropdown>
        </IF>

        <Input
          placeholder="请输入关键词搜索"
          allowClear
          className="rightListSearchIpt"
          value={keyWord}
          onChange={(e) => inputChangeSearch(e)}
          prefix={<SearchSvg style={{ marginRight: '8px' }} />}
        />
        <div className="rightListItem">
          <IF condition={props.rightListType === 'markList'}>
            <MarkListItem
              keyWord={keyWord}
              markList={markList}
              editMark={props.editMark}
              deleteMarks={props.deleteMarks}
            ></MarkListItem>
          </IF>
          <IF condition={props.rightListType === 'citeList'}>
            <CiteListItem
              keyWord={keyWord}
              refreshCiteList={refreshCiteList}
            ></CiteListItem>
          </IF>
        </div>
      </div>
      <LinkWord
        isModalVisible={isLinkWordVisible}
        setIsModalVisible={showLinkWord}
        savelink={savelink}
      ></LinkWord>
      <LinkPicture
        isModalVisible={isLinkPictureVisible}
        setIsModalVisible={showLinkPicture}
        savelink={savelink}
      ></LinkPicture>
      <LinkForm
        isModalVisible={isLinkFormVisible}
        setIsModalVisible={showLinkForm}
        savelink={savelink}
      ></LinkForm>
      <LinkSchedule
        isModalVisible={isLinkPlanVisible}
        setIsModalVisible={showLinkPlan}
        savelink={savelink}
      ></LinkSchedule>
    </div>
  );
};
