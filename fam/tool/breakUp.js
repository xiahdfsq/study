const com = require('../common/common'),
	path = require("path"),
	message = require("./messages");

// 控制器
//var dir = __dirname + './../test/',
//	ctrlCnt = com.read(dir + 'controller.js'),
//	ctrlReg = /\.controller((?!\.controller)[\w\W])*/g,
//	ctrlModel = 'define(["app"], function (app) {\n   app[content];\n  });',
//	ctrlNReg = /\.controller\([\'\"]([a-zA-Z]+)[\'\"]\,/;

// 服务
var dir = __dirname + './../test/',
	ctrlCnt = com.read(dir + 'controller.js'),
	ctrlReg = /\.factory((?!\.factory)[\w\W])*/g,
	ctrlModel = 'define(["app"], function (app) {\n   app[content];\n  });',
	ctrlNReg = /\.factory\([\'\"]([a-zA-Z]+)[\'\"]\,/;

function breakUp() {

	// 搜索控制器
	var ctrlLists = ctrlCnt.match(ctrlReg),
		i = 0,
		len = ctrlLists.length,
		ctrlContent, ctrlName, famFile;

	for (; i < len; i++) {
		// 拼接控制器
		ctrlContent = ctrlModel.replace("[content]", ctrlLists[i]);

		// 获取控制器名字
		ctrlName = ctrlLists[i].match(ctrlNReg);
		ctrlName = !!ctrlName ? ctrlName[1] : ("dontcatchname" + i);
		// famFile = dir + 'controllers/' + ctrlName + '.js';
		famFile = dir + 'services/' + ctrlName + '.js';

		com.write(famFile, ctrlContent);
	}

	console.log("OK");
}
// ------------------------------------------------------------------------------------------
var html_dir = dir + "html",
	bindReg = /{{\s*(\w+)\s*}}/g;

// 取消 messages 中文简繁体转换
function htmlchange() {
	com.traverse(html_dir, function (path) {
		var fileCnt = com.read(path),
			arr, item, name, replace;

		while ((arr = bindReg.exec(fileCnt)) != null) {
			item = arr[0];
			name = arr[1];

			if (replace = message.Messages[name]) {
				fileCnt = fileCnt.replace(item, replace);
			}
		}

		com.write(path, fileCnt);
	});
}

exports.breakUp = htmlchange;