import { FC, useState, useEffect } from 'react';
import { Checkbox } from 'century';
import { OptionalContentConfig } from 'pdfjs-dist/types/src/display/optional_content_config';
import './index.less';

interface layerGroups {
  groupId: string;
  label: string;
  value: boolean;
}

interface layerListProps {
  optionalContentConfig: OptionalContentConfig;
  updateLayer: (groupId: string, visible: boolean) => void;
}

const LayerList: FC<layerListProps> = (props: layerListProps) => {
  const [layerArray, setLayerArray] = useState<Array<layerGroups>>([]);
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const optionalContentConfig = props.optionalContentConfig;
    const groups = optionalContentConfig._groups || new Map();
    const arr: Array<layerGroups> = [];
    groups.forEach((group: any, groupId: string) => {
      arr.push({
        groupId,
        label: `${group.name} - groupId(${groupId})`,
        value: true,
      });
    });
    setLayerArray(arr);
  };

  const onChange = (e: any, index: number) => {
    const visible = e.target.checked;
    props.updateLayer(layerArray[index].groupId, visible);
    setLayerArray((layerArray) => {
      const arr = JSON.parse(JSON.stringify(layerArray));
      arr[index].value = visible;
      return arr;
    });
  };
  return (
    <>
      {layerArray.map((item, index) => {
        return (
          <Checkbox
            onChange={(e) => onChange(e, index)}
            key={item.groupId}
            checked={item.value}
          >
            {item.label}
          </Checkbox>
        );
      })}
    </>
  );
};

export default LayerList;
