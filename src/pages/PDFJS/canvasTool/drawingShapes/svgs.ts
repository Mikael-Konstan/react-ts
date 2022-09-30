import { fileSize } from './../config';
import { SvgMaps } from './types';

// 获取img
export const getSvg = function (htmlStr: string): HTMLImageElement {
  const SVG64 = window?.btoa(htmlStr);
  const image64 = 'data:image/svg+xml;base64,' + SVG64;
  const img = new Image();
  img.src = image64;
  return img;
};

export const anchorSvg = function (
  baseSize: number = 20,
  color: string = '#FA6400',
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-887.000000, -332.000000)" fill="${color}" fill-rule="nonzero">
              <path d="M887.627616,350.521051 L894.762791,344.860236 L897.609188,347.889816 C897.609188,347.889816 898.797385,348.213771 898.870523,347.313896 L898.797385,344.247121 L903.014224,339.379395 L904.851073,339.27261 C904.851073,339.27261 906.292256,338.98225 905.247938,337.721225 L900.094689,332.529544 C900.094689,332.529544 898.690675,332.349569 898.797385,333.64659 L898.797385,335.052795 L894.00623,339.12983 L891.051925,339.308605 C891.051925,339.308605 889.970438,339.668555 890.366104,340.606825 L893.14176,343.347245 L887.627616,350.521051 L887.627616,350.521051 Z"></path>
          </g>
      </g>
  </svg>`;
};

export const detailSvg = function (
  baseSize: number = 20,
  color: string = '#333333',
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-263.000000, -17.000000)">
              <g transform="translate(263.084647, 16.999089)">
                  <circle id="Oval-6" cx="10" cy="10" r="10"></circle>
                  <g transform="translate(5.000000, 5.000000)" fill="${color}">
                      <path d="M5,-0.5 C3.52190431,-0.5 2.13539742,0.0864427801 1.11091454,1.11090868 C0.0864427801,2.13539742 -0.5,3.52190431 -0.5,5 C-0.5,6.47809766 0.0864444318,7.86460555 1.11091063,8.88907741 C2.1353972,9.91355266 3.5219046,10.5 5,10.5 C6.47809737,10.5 7.86460578,9.913551 8.88907839,8.88907839 C9.913551,7.86460578 10.5,6.47809737 10.5,5 C10.5,3.5219046 9.91355266,2.1353972 8.88908034,1.11091356 C7.86460555,0.0864444318 6.47809766,-0.5 5,-0.5 Z M5,0.5 C6.21015531,0.5 7.34317735,0.979228767 8.18197259,1.81801937 C9.02076836,2.65682441 9.5,3.78984722 9.5,5 C9.5,6.21015358 9.02076775,7.34317547 8.18197161,8.18197161 C7.34317547,9.02076775 6.21015358,9.5 5,9.5 C3.78984722,9.5 2.65682441,9.02076836 1.81801644,8.18196966 C0.979228767,7.34317735 0.5,6.21015531 0.5,5 C0.5,3.78984549 0.979228152,2.65682253 1.81802132,1.81801546 C2.65682253,0.979228152 3.78984549,0.5 5,0.5 Z" fill-rule="nonzero"></path>
                      <path d="M5,1.75 C5.345175,1.75 5.625,2.029825 5.625,2.375 C5.625,2.720175 5.345175,3 5,3 C4.654825,3 4.375,2.720175 4.375,2.375 C4.375,2.029825 4.654825,1.75 5,1.75 Z"></path>
                      <path d="M5.125,3.5 C5.37045989,3.5 5.57460837,3.67687516 5.61694433,3.91012437 L5.625,4 L5.625,7.5 C5.625,7.77614237 5.40114237,8 5.125,8 C4.87954011,8 4.67539163,7.82312484 4.63305567,7.58987563 L4.625,7.5 L4.625,4.5 C4.34885763,4.5 4.125,4.27614237 4.125,4 C4.125,3.75454011 4.30187516,3.55039163 4.53512437,3.50805567 L4.625,3.5 L5.125,3.5 Z" fill-rule="nonzero"></path>
                      <path d="M6,7 C6.27614237,7 6.5,7.22385763 6.5,7.5 C6.5,7.74545989 6.32312484,7.94960837 6.08987563,7.99194433 L6,8 L4.25,8 C3.97385763,8 3.75,7.77614237 3.75,7.5 C3.75,7.25454011 3.92687516,7.05039163 4.16012437,7.00805567 L4.25,7 L6,7 Z" fill-rule="nonzero"></path>
                  </g>
              </g>
          </g>
      </g>
  </svg>`;
};

export const editSvg = function (
  baseSize: number = 20,
  color: string = '#333333',
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-293.000000, -17.000000)">
              <g transform="translate(293.233251, 16.999089)">
                  <circle id="Oval-6" cx="10" cy="10" r="10"></circle>
                  <g transform="translate(6.000000, 5.944444)" fill="${color}" fill-rule="nonzero">
                      <path d="M8,7.5 C8.27614237,7.5 8.5,7.72385763 8.5,8 C8.5,8.24545989 8.32312484,8.44960837 8.08987563,8.49194433 L8,8.5 L0,8.5 C-0.276142375,8.5 -0.5,8.27614237 -0.5,8 C-0.5,7.75454011 -0.323124839,7.55039163 -0.0898756324,7.50805567 L0,7.5 L8,7.5 Z"></path>
                      <path d="M5.13403496,-0.353341614 L0.535123848,4.25108061 C0.441485143,4.34483153 0.388888889,4.47191773 0.388888889,4.60442222 L0.388888889,6.22222222 C0.388888889,6.4983646 0.612746514,6.72222222 0.888888889,6.72222222 L2.51493333,6.72222222 C2.64757969,6.72222222 2.77478997,6.66951361 2.86856448,6.57569784 L7.46474225,1.97749784 C7.65990086,1.78225337 7.65990071,1.46579055 7.46474192,1.27054626 L5.8414308,-0.35347596 C5.64609852,-0.548893809 5.329293,-0.548833642 5.13403496,-0.353341614 Z M5.488,0.707 L6.404,1.623 L2.307,5.722 L1.388,5.722 L1.388,4.811 L5.488,0.707 Z"></path>
                  </g>
              </g>
          </g>
      </g>
  </svg>`;
};

export const deleteSvg = function (
  baseSize: number,
  color: string = '#333333',
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${baseSize}" height="${baseSize}" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-323.000000, -17.000000)">
              <g transform="translate(323.233251, 16.999089)">
                  <circle id="Oval-6-Copy-2" cx="10" cy="10" r="10"></circle>
                  <g transform="translate(6.000000, 6.000000)" fill="${color}" fill-rule="nonzero">
                      <path d="M7,0.7 L1,0.7 C0.723857625,0.7 0.5,0.923857625 0.5,1.2 L0.5,8 C0.5,8.27614237 0.723857625,8.5 1,8.5 L7,8.5 C7.27614237,8.5 7.5,8.27614237 7.5,8 L7.5,1.2 C7.5,0.923857625 7.27614237,0.7 7,0.7 Z M6.5,1.7 L6.5,7.5 L1.5,7.5 L1.5,1.7 L6.5,1.7 Z"></path>
                      <path d="M3.2,2.7 C3.44545989,2.7 3.64960837,2.87687516 3.69194433,3.11012437 L3.7,3.2 L3.7,5.8 C3.7,6.07614237 3.47614237,6.3 3.2,6.3 C2.95454011,6.3 2.75039163,6.12312484 2.70805567,5.88987563 L2.7,5.8 L2.7,3.2 C2.7,2.92385763 2.92385763,2.7 3.2,2.7 Z"></path>
                      <path d="M4.8,2.7 C5.04545989,2.7 5.24960837,2.87687516 5.29194433,3.11012437 L5.3,3.2 L5.3,5.8 C5.3,6.07614237 5.07614237,6.3 4.8,6.3 C4.55454011,6.3 4.35039163,6.12312484 4.30805567,5.88987563 L4.3,5.8 L4.3,3.2 C4.3,2.92385763 4.52385763,2.7 4.8,2.7 Z"></path>
                      <path d="M8,0.7 C8.27614237,0.7 8.5,0.923857625 8.5,1.2 C8.5,1.44545989 8.32312484,1.64960837 8.08987563,1.69194433 L8,1.7 L0,1.7 C-0.276142375,1.7 -0.5,1.47614237 -0.5,1.2 C-0.5,0.954540111 -0.323124839,0.75039163 -0.0898756324,0.708055669 L0,0.7 L8,0.7 Z"></path>
                      <path d="M4.95542,-0.5 L3.0578,-0.5 C2.87520202,-0.5 2.70712498,-0.40046105 2.61935306,-0.240342 L1.96155306,0.959658 C1.77889772,1.29286931 2.02000954,1.7 2.4,1.7 L5.6,1.7 C5.97811349,1.7 6.21940124,1.29649826 6.04047647,0.963398063 L5.39589647,-0.236601937 C5.30876843,-0.398806248 5.13954369,-0.5 4.95542,-0.5 Z M4.656,0.5 L4.763,0.7 L3.244,0.7 L3.353,0.5 L4.656,0.5 Z"></path>
                  </g>
              </g>
          </g>
      </g>
  </svg>`;
};

interface svgItem {
  id: string;
  color: string;
  svgFn: (baseSize: number, color: string) => string;
}

const svgsList: svgItem[] = [
  {
    id: 'anchorSvg',
    color: '#FA6400',
    svgFn: anchorSvg,
  },
  {
    id: 'detailSvg',
    color: '#fff',
    svgFn: detailSvg,
  },
  {
    id: 'editSvg',
    color: '#fff',
    svgFn: editSvg,
  },
  {
    id: 'deleteSvg',
    color: '#fff',
    svgFn: deleteSvg,
  },
];

// 获取所有 img
export const getAllSvgs = function (): SvgMaps {
  const svgsObj: SvgMaps = {};
  svgsList.forEach((item) => {
    svgsObj[item.id] = getSvg(item.svgFn(fileSize, item.color));
  });
  return svgsObj;
};
