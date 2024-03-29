interface Option {
  bufferArray: ArrayBuffer; // pcm格式的ArrayBuffer数据
  sampleRateTmp?: number; // 采样率
  sampleBits?: number; // 采样位数
  channelCount?: number; // 声道数
}

/**
 * pcm的ArrayBuffer数据添加wav头
 * @param {Option} option pcm文件的数据及信息
 * @return {ArrayBuffer}  wav格式的ArrayBuffer
 */
function addWavHeader(option: Option) {
  const {
    bufferArray,
    sampleRateTmp = 12000,
    sampleBits = 16,
    channelCount = 1,
  } = option;
  const dataLength = bufferArray.byteLength;
  /* 新的buffer类，预留 44 bytes 的heaer 空间 */
  const buffer = new ArrayBuffer(44 + dataLength);
  /* 转为 Dataview, 利用 API 来填充字节 */
  const view = new DataView(buffer);
  /* 定义一个内部函数，以 big end 数据格式填充字符串至 DataView */
  function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  let offset = 0;
  /* ChunkID, 4 bytes,  资源交换文件标识符 */
  writeString(view, offset, 'RIFF');
  offset += 4;
  /* ChunkSize, 4 bytes, 下个地址开始到文件尾总字节数,即文件大小-8 */
  view.setUint32(offset, /* 32 */ 36 + dataLength, true);
  offset += 4;
  /* Format, 4 bytes, WAV文件标志 */
  writeString(view, offset, 'WAVE');
  offset += 4;
  /* Subchunk1 ID, 4 bytes, 波形格式标志 */
  writeString(view, offset, 'fmt ');
  offset += 4;
  /* Subchunk1 Size, 4 bytes, 过滤字节,一般为 0x10 = 16 */
  view.setUint32(offset, 16, true);
  offset += 4;
  /* Audio Format, 2 bytes, 格式类别 (PCM形式采样数据) */
  view.setUint16(offset, 1, true);
  offset += 2;
  /* Num Channels, 2 bytes,  通道数 */
  view.setUint16(offset, channelCount, true);
  offset += 2;
  /* SampleRate, 4 bytes, 采样率,每秒样本数,表示每个通道的播放速度 */
  view.setUint32(offset, sampleRateTmp, true);
  offset += 4;
  /* ByteRate, 4 bytes, 波形数据传输率 (每秒平均字节数) 通道数×每秒数据位数×每样本数据位/8 */
  view.setUint32(offset, sampleRateTmp * channelCount * (sampleBits / 8), true);
  offset += 4;
  /* BlockAlign, 2 bytes, 快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8 */
  view.setUint16(offset, channelCount * (sampleBits / 8), true);
  offset += 2;
  /* BitsPerSample, 2 bytes, 每样本数据位数 */
  view.setUint16(offset, sampleBits, true);
  offset += 2;
  /* Subchunk2 ID, 4 bytes, 数据标识符 */
  writeString(view, offset, 'data');
  offset += 4;
  /* Subchunk2 Size, 4 bytes, 采样数据总数,即数据总大小-44 */
  view.setUint32(offset, dataLength, true);
  offset += 4;

  /* 数据流需要以大端的方式存储，定义不同采样比特的 API */
  function floatTo32BitPCM(
    output: DataView,
    offset: number,
    input: ArrayBuffer,
  ) {
    const intArr = new Int32Array(input);
    for (let i = 0; i < intArr.length; i++, offset += 4) {
      output.setInt32(offset, intArr[i], true);
    }
  }
  function floatTo16BitPCM(
    output: DataView,
    offset: number,
    input: ArrayBuffer,
  ) {
    const intArr = new Int16Array(input);
    for (let i = 0; i < intArr.length; i++, offset += 2) {
      output.setInt16(offset, intArr[i], true);
    }
  }
  function floatTo8BitPCM(
    output: DataView,
    offset: number,
    input: ArrayBuffer,
  ) {
    const intArr = new Int8Array(input);
    for (let i = 0; i < intArr.length; i++, offset++) {
      output.setInt8(offset, intArr[i]);
    }
  }
  if (sampleBits === 16) {
    floatTo16BitPCM(view, 44, bufferArray);
  } else if (sampleBits === 8) {
    floatTo8BitPCM(view, 44, bufferArray);
  } else {
    floatTo32BitPCM(view, 44, bufferArray);
  }
  return view.buffer;
}

/**
 * pcm的ArrayBuffer数据 => wav的base64数据
 * @param {Option} option pcm文件的数据及信息
 * @return {string} base64字符串
 */
function pcmBufferArrayToWavBase64(option: Option) {
  const bytes = addWavHeader(option);
  const base64Str = window.btoa(
    new Uint8Array(bytes).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, ''),
  );
  return `data:audio/wav;base64,${base64Str}`;
}

export { pcmBufferArrayToWavBase64 };

export default pcmBufferArrayToWavBase64;
