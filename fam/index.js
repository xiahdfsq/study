#!/usr/bin/env node

var util = require('./common/util'),
	version = require('./info/version'),
	help = require('./info/help');

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
}