#!/usr/bin/env node

var
    util = require('./common/util'),
    version = require('./info/version'),
    help = require('./info/help'),
    init = require('./tool/init'),
    build = require('./tool/build'),
    table = require('./tool/table'),
    module = require('./tool/module');

var agrv = util.argv(),
    func = agrv.func;

switch (func) {
    // 帮助说明
case undefined:
case "-help":
    help.show();
    break;
    // 版本
case "-v":
case "-version":
    version.show();
    break;
    // 初始化工程
case "init":
    init.init();
    break;
    // 构建工程
case "build":
    build.build();
    break;
    // 新建表
case "table":
    table.add(agrv.args);
    break;
    // 新建模块
case "module":
    module.distribute(agrv.args);
    break;
}