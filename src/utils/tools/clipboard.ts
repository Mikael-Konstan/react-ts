type AnyFn = (...args: any[]) => void;
export function copyCanvasToClipboard(
  canvas: HTMLCanvasElement,
  onDone: AnyFn,
  onError: AnyFn,
) {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    let data = [new ClipboardItem({ [blob.type]: blob })];
    navigator.clipboard.write(data).then(
      function () {
        onDone();
      },
      function (err) {
        onError(err);
      },
    );
  });
}

export async function readImgFromClipboard(onDone: AnyFn, onError: AnyFn) {
  try {
    const permission = await navigator.permissions.query({
      name: 'xr-spatial-tracking', // 'clipboard-read',
    });
    if (permission.state === 'denied') {
      throw new Error('Not allowed to read clipboard.');
    }
    const clipboardContents = await navigator.clipboard.read();
    console.log(clipboardContents);
    for (const item of clipboardContents) {
      if (!item.types.includes('image/png')) {
        console.log('Clipboard contains non-image data.');
      } else {
        console.log('image data.');
        const blob = await item.getType('image/png');
        let img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export function getContextFromClipboard() {
  document.addEventListener('paste', function (event) {
    var items = event.clipboardData && event.clipboardData.items;
    console.log(items);
    var file = null;
    if (items && items.length) {
      // 检索剪切板items
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    // 此时file就是剪切板中的图片文件
  });
}
