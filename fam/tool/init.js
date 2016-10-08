const com = require('../common/common'),
	events = require("events");

var moduleEvent = new events.EventEmitter(),
	dir = './',
	famObj = {};

/**
 * [1] 创建工程目录
 * [2] 创建 .fam 文件
 */
function init() {
	moduleEvent.emit('name');
}

/* ------------------------------------------------------------------------------------------------------------------- */
// 事件

// [name] ==> [type]
moduleEvent.on('name', function () {
	com.prompt("Please input the project name", "www").then(result => {
		dir += result;
		famObj.name = result;

		moduleEvent.emit('type');
	}, res => {
		console.log(res);
	});
});

// [type] ==> [create]
moduleEvent.on('type', function () {
	com.prompt("Please input the type of your project", "vue").then(result => {
		famObj.type = result;
		process.stdin.end();
		
		moduleEvent.emit('create');
	}, res => {
		console.log(res);
	});
});

// [create]
moduleEvent.on('create', function () {
	var famCont = JSON.stringify(famObj, null, 2),
		famFile = dir + '/.fam';

	com.createForlder(dir);
	com.write(famFile, famCont);
	console.log("\nA new fam project had created!!");
});

exports.init = init;
