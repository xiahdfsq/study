requirejs.config({
    baseUrl: './',
    paths: {}
});

// Start the main app logic.
requirejs(['extend.min'], function ($$hh) {
    var a = {
        a: 100,
        b: 200
    };
    var b = {
        f: 200,
        b: undefined
    };
    $$hh.extend(true, a, b);

    console.log(a);
});