define([], function () {
    'use strict';
    var analyzer = {};

    // ------------------------------------------------- 获取金额 开始--------------------------------
    /**
     * 查找金额字符串
     * @Param anyStr String 任意字符串 eg: "早餐三十块零五毛"
     * return Array 金额字符串数组 eg：["三十块", "零五毛"]
     */
    function searchMoney(anyStr) {
        return anyStr.match(/[点零一二三四五六七八九0123456789.十百千万]+([元块]|[毛角])?/g);
    }

    /**
     * 将数字字符串转成阿拉伯数字字符串数组
     * @Param str String 汉语数字 eg: 三千零二 3002
     * return Array 阿拉伯数字字符串数组 eg: ["3", "1000", "0", "2"] ["3002"]
     */
    function _convert(str) {
        var arr_be = ["点", "零", "一", "二", "两", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万"];
        var arr_af = [".,", "0,", "1,", "2,", "2", "3,", "4,", "5,", "6,", "7,", "8,", "9,", "10,", "100,", "1000,", "10000,"];
        var result = str;

        for (var i = 0; i < arr_be.length; i++) {
            result = result.replace(new RegExp(arr_be[i], "g"), arr_af[i]);
        }
        result != str && (result = result.slice(0, -1));
        result = result.split(',');
        return result;
    }

    /**
     * 与函数 _convert 配合使用，将阿拉伯数字字符串数组转成数字
     * @Param arr 阿拉伯数字字符串数组 eg: ["3", "1000", "0", "2"] ["3002"]
     * return Number 数字 eg: 3002
     */
    function calc(arr) {
        var len = arr.length,
            i,
            result = 0,
            cheng = 0,
            he = 0,
            menu = 10;

        // 整数部分
        for (i = 0; i < len; i++) {
            if (arr[i] == '.') {
                break;
            }

            if (arr[i] > 9) {
                !!he && (cheng = he, he = 0);
                cheng == '0' && (cheng = 1);
                menu = arr[i - 1] < 9 || !arr[i - 1] ? arr[i] : menu * arr[i];
            } else {
                he = arr[i];
            }

            arr[i] == '0' && (menu = 10);

            if (arr[i + 1] < 9 || arr[i + 1] == undefined) {
                result += cheng * menu;
                cheng = 0;
            }
        }
        result += he * menu / 10;

        // 小数部分
        for (; i < len; i++) {
            result += arr[i];
        }

        return Number(result);
    }

    /**
     * 找出任意字符串中的金额
     * @Param anyStr String 任意字符串
     * return Number 关于金额的数字
     */
    analyzer.getMoney = function (anyStr) {
        var searchArr = searchMoney(anyStr),
            i = 0,
            len = searchArr.length,
            sum = 0,
            k_flag = false,
            moneyStr, cvArr;

        for (; i < len; i++) {
            moneyStr = searchArr[i];

            if (/[元块]/.test(moneyStr)) {
                moneyStr = moneyStr.slice(0, -1);

                cvArr = _convert(moneyStr);
                sum += calc(cvArr);

                k_flag = true;
                cvArr = null;
            } else if (/[角毛]/.test(moneyStr)) {
                // 去掉 毛、角
                moneyStr = moneyStr.slice(0, -1);

                cvArr = _convert(moneyStr);
                cvArr = ["0", "."].concat(cvArr);

                sum += calc(cvArr);

                cvArr = null;
            } else if (!k_flag) {
                cvArr = _convert(moneyStr);
                sum += calc(cvArr);

                cvArr = null;
            } else if (k_flag) {
                cvArr = _convert(moneyStr);
                cvArr = ["0", "."].concat(cvArr);

                sum += calc(cvArr);

                cvArr = null;
            }
        }

        return sum;
    };
    // ------------------------------------------------- 获取金额 结束--------------------------------

    // ------------------------------------------------- 获取账单类型 开始-----------------------------
    var keyWords = [{
        keyWord: /(早餐)|(午餐)|(晚餐)/g,
        type: "餐饮食品",
        img: ""
    }, {
        keyWord: /(地铁卡)/g,
        type: "行车交通",
        img: ""
    }];

    /**
     * 获取账单类型
     * @Param billStr String 账单内容字符串
     * return Object/Bool[false] 账单类型
     */
    analyzer.getBillKey = function (billStr) {
        var i = 0,
            len = keyWords.length,
            result = {},
            flag;

        for (; i < len; i++) {
            flag = billStr.match(keyWords[i].keyWord) || [false];
            if (!!flag[0]) {
                result.keyWord = flag[0];
                result.type = keyWords[i].type;
                result.img = keyWords[i].img;

                return result;
            }
        }

        return false;
    };
    // ------------------------------------------------- 获取账单类型 结束-----------------------------

    return analyzer;
});