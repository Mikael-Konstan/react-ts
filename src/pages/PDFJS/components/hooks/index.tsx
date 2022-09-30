import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface CompToPDFProps {}

const PDFFile = {
  A4: [592.28, 841.89],
};

//自定义的hooks函数
export const useCompToPDF = (props: CompToPDFProps) => {
  const exportPDF = (element: HTMLElement | null, fileName: string) => {
    if (element) {
      html2canvas(element).then((canvas) => {
        // 获取画布的宽高
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        // 一页PDF显示html生成的canvas高度
        let pdfPageHeight = (PDFFile.A4[1] / PDFFile.A4[0]) * canvasWidth;
        // 未生成pdf的html页面内高度
        let pdfAllHeight = canvasHeight;

        let position = 0; // 页面偏移

        // 转换图片为dataURL，参数：图片格式和清晰度(0-1)
        let pageData = canvas.toDataURL('image/jpeg', 1.0);

        // html页面生成的canvas在pdf中图片的宽高
        let imgWidth = PDFFile.A4[0] - 60; // 减去边距宽度
        let imgHeight = (canvasHeight / canvasWidth) * PDFFile.A4[0];
        // 方向p竖直 l横向，尺寸ponits，格式a4
        let pdf = new jsPDF('p', 'pt', PDFFile.A4);

        // 当内容未超过pdf一页显示的范围，无需分页
        if (pdfAllHeight < pdfPageHeight) {
          // 从图片顶部开始打印   30 左右边距, 0 上下边距
          pdf.addImage(pageData, 'jpeg', 30, 0, imgWidth, imgHeight);
        } else {
          while (pdfAllHeight > 0) {
            pdf.addImage(pageData, 'jpeg', 0, position, imgWidth, imgHeight);
            pdfAllHeight -= pdfPageHeight;
            position -= PDFFile.A4[1];
            // 避免添加空白页
            if (pdfAllHeight > 0) {
              pdf.addPage();
            }
          }
        }
        pdf.save(`${fileName}.pdf`);
      });
    }
  };
  return {
    exportPDF,
  };
};
