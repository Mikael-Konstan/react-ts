type AnyFn = (...args: any[]) => void;
export function copyCanvasToClipboard(
  canvas: HTMLCanvasElement,
  onDone: AnyFn,
  onError: AnyFn,
) {
  canvas.toBlob(function (blob) {
    if (!blob) return;
    const data = [new ClipboardItem({ [blob.type]: blob })];
    // 复制 写入剪切板
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
    // 粘贴 读取剪切板内容
    const clipboardContents = await navigator.clipboard.read();
    console.log(clipboardContents);
    for (const item of clipboardContents) {
      if (!item.types.includes('image/png')) {
        console.log('Clipboard contains non-image data.');
      } else {
        console.log('image data.');
        const blob = await item.getType('image/png');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
