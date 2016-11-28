requirejs.config({
    baseUrl: './',
    paths: {
        analyzer: "js/analyzer",
        selecter: "js/selecter"
    }
});

// Start the main app logic.
requirejs(['selecter'], function ($) {



    setInterval(function () {
        $("#test").toggle();
    }, 1000);
    //    console.log($("#test"));

    //    var str = "充地铁卡五十",
    //        money = analyzer.getBillKey(str);
    //
    //    console.log(money);
});