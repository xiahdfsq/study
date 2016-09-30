#!/usr/bin/env node

const util = require('./common/util'),
	version = require('./info/version'),
	help = require('./info/help'),
	init = require('./tool/init'),
	build = require('./tool/build');

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
}