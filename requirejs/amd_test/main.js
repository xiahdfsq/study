requirejs.config({
    baseUrl: './',
    paths: {
        analyzer: "js/analyzer",
        check: "js/check"
    }
});

// Start the main app logic.
requirejs(['analyzer', 'check'], function (analyzer, check) {
    var str = "充地铁卡五十",
        result = analyzer.analyze(str);

    console.log(check);
});