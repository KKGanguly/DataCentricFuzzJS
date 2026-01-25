try {
    const v1 = %MaxSmi();
    new BigInt64Array(v1);
} catch(e3) {
    assertInstanceof(e3, RangeError);
}
