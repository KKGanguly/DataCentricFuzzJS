global = 0;
function foo() {
    function bar() {
        let context_allocated = 0;
        with ({}) {
            function f7() {
                ++global;
            }
            f = f7;
        }
        function baz() {
            return foo(context_allocated);
        }
        f();
    }
    bar();
}
foo();
