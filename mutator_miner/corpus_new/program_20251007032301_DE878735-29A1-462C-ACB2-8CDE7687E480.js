function boom() {
    function getargs() {
        return arguments;
    }
    let arr = getargs(1, 2, 3, 45);
    arr.a1 = 6.6;
    let arrc = arr;
    a = "a1";
    for (let i14 = 0; i14 < 816; i14++) {
        arr[a] = 5.5;
        if (i14 == 805) {
            arr = [5,6,7];
            a = 5;
        }
        if (i14 == 810) {
            arr = arrc;
            a = 4;
        }
    }
    const v33 = %DebugPrint(arr[5]);
    return arr[5];
}
boom();
