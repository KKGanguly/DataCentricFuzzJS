function doStuff() {
    const v2 = new Array();
    var arr = v2;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var protoObj = ctx.getImageData(0, 0, 1000, 1000).data;
    protoObj.__proto__ = arr.__proto__;
    arr.__proto__ = protoObj;
    arr.length = 8000000;
    arr.concat(arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr, arr);
}
