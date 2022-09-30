import { FC } from 'react';
import { Select } from 'century';

const { Option } = Select;

interface DrawingTypeProps {
  drawingTypeChange?: (value: any) => void;
  drawingLineWidthChange?: (value: any) => void;
  drawingColorChange?: (value: any) => void;
  drawingSizeChange?: (value: any) => void;
  drawingSelectTypeChange?: (value: any) => void;
}

const DrawingType: FC<DrawingTypeProps> = (props: DrawingTypeProps) => {
  const typeOption = [
    {
      key: 'select',
      title: 'Select',
    },
    // {
    //   key: 'pen',
    //   title: 'Pen',
    // },
    {
      key: 'text',
      title: 'Text',
    },
    {
      key: 'rect',
      title: 'Rect',
    },
    {
      key: 'arc',
      title: 'Arc',
    },
    {
      key: 'line',
      title: 'Line',
    },
    {
      key: 'arrowRadius',
      title: 'ArrowRadius',
    },
    {
      key: 'arrowDouble',
      title: 'ArrowDouble',
    },
    {
      key: 'cloud',
      title: 'Cloud',
    },
    {
      key: 'anchor',
      title: 'Anchor',
    },
  ];
  const colorOption = [
    {
      key: 'black',
      title: 'Black',
    },
    {
      key: 'maroon',
      title: 'Maroon',
    },
    {
      key: 'red',
      title: 'Red',
    },
    {
      key: 'orange',
      title: 'Orange',
    },
    {
      key: 'yellow',
      title: 'Yellow',
    },
    {
      key: 'lime',
      title: 'Lime',
    },
    {
      key: 'green',
      title: 'Green',
    },
    {
      key: 'sky',
      title: 'Sky',
    },
    {
      key: 'blue',
      title: 'Blue',
    },
    {
      key: 'navy',
      title: 'Navy',
    },
    {
      key: 'purple',
      title: 'Purple',
    },
    {
      key: 'magenta',
      title: 'Magenta',
    },
  ];
  const lineWidthOption = [
    {
      key: 2,
      title: '2px',
    },
    {
      key: 4,
      title: '4px',
    },
    {
      key: 8,
      title: '8px',
    },
    {
      key: 16,
      title: '16px',
    },
    {
      key: 24,
      title: '24px',
    },
  ];
  const fontSizeOption = [
    {
      key: 8,
      title: 8,
    },
    {
      key: 10,
      title: 10,
    },
    {
      key: 12,
      title: 12,
    },
    {
      key: 14,
      title: 14,
    },
    {
      key: 18,
      title: 18,
    },
    {
      key: 24,
      title: 24,
    },
    {
      key: 38,
      title: 38,
    },
    {
      key: 48,
      title: 48,
    },
    {
      key: 64,
      title: 64,
    },
    {
      key: 80,
      title: 80,
    },
    {
      key: 96,
      title: 96,
    },
    {
      key: 118,
      title: 118,
    },
  ];
  const selectTypeOption = [
    {
      key: 'select',
      title: 'Select',
    },
    {
      key: 'multi',
      title: 'Multi',
    },
    {
      key: 'lasso',
      title: 'Lasso',
    },
  ];
  const typeHandleChange = function (value: string) {
    props.drawingTypeChange && props.drawingTypeChange(value);
  };
  const lineWidthHandleChange = function (value: string) {
    props.drawingLineWidthChange && props.drawingLineWidthChange(value);
  };
  const colorHandleChange = function (value: string) {
    props.drawingColorChange && props.drawingColorChange(value);
  };
  const sizeHandleChange = function (value: string) {
    props.drawingSizeChange && props.drawingSizeChange(value);
  };
  const selectTypeHandleChange = function (value: string) {
    props.drawingSelectTypeChange && props.drawingSelectTypeChange(value);
  };
  return (
    <div>
      <p>Tool Select</p>
      <Select
        defaultValue="select"
        style={{ width: 120 }}
        onChange={typeHandleChange}
      >
        {typeOption.map((item) => {
          return (
            <Option value={item.key} key={item.key}>
              {item.title}
            </Option>
          );
        })}
      </Select>
      <p>Color Select</p>
      <Select
        defaultValue="red"
        style={{ width: 120 }}
        onChange={colorHandleChange}
      >
        {colorOption.map((item) => {
          return (
            <Option value={item.key} key={item.key}>
              {item.title}
            </Option>
          );
        })}
      </Select>
      <p>Line Width Select</p>
      <Select
        defaultValue="2"
        style={{ width: 120 }}
        onChange={lineWidthHandleChange}
      >
        {lineWidthOption.map((item) => {
          return (
            <Option value={item.key} key={item.key}>
              {item.title}
            </Option>
          );
        })}
      </Select>
      <p>Font Size Select</p>
      <Select
        defaultValue="8"
        style={{ width: 120 }}
        onChange={sizeHandleChange}
      >
        {fontSizeOption.map((item) => {
          return (
            <Option value={item.key} key={item.key}>
              {item.title}
            </Option>
          );
        })}
      </Select>
      <p>Select Type Select</p>
      <Select
        defaultValue="select"
        style={{ width: 120 }}
        onChange={selectTypeHandleChange}
      >
        {selectTypeOption.map((item) => {
          return (
            <Option value={item.key} key={item.key}>
              {item.title}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default DrawingType;
