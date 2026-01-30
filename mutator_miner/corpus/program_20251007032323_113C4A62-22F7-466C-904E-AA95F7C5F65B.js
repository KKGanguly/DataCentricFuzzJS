const v4 = new ArrayBuffer(16, { maxByteLength: 16 });
const arrBuffer = v4;
const v7 = new Float16Array(arrBuffer);
const f16Arr = v7;
const v13 = {
    valueOf() {
        arrBuffer.resize(0);
        return 7;
    },
};
const fromIdx = v13;
const ele = 0;
f16Arr.lastIndexOf(ele, fromIdx);
