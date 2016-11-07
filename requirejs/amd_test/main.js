requirejs.config({
    baseUrl: './',
    paths: {}
});

// Start the main app logic.
requirejs(['extend.min'], function ($$hh) {
    var a = [];
    var b = [111];
    $$hh.extend(true, a, b);

    console.log(a);
});