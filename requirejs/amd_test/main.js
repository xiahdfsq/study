requirejs.config({
    baseUrl: './',
    paths: {
        analyzer: "js/analyzer"
    }
});

// Start the main app logic.
requirejs(['analyzer'], function (analyzer) {
    var str = "充地铁卡五十",
        result = analyzer.analyze(str);

    console.log(result);
});