export function plugins() {
    return {
        simple: {
            function: (name) => { console.log("hello,", name); return "hello, " + name; }
        }
    };
}
