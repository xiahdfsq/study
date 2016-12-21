requirejs.config({
    baseUrl: './',
    paths: {
        analyzer: "js/analyzer",
        check: "js/check"
    }
});

// Start the main app logic.
requirejs(['analyzer', 'check'], function (analyzer, check) {
    var str = "喀喀喀",
        result = analyzer.analyze(str);

    console.log(result);
});