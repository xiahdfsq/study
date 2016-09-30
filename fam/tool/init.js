const com = require('../common/common');

/**
 * [1] 创建工程目录
 * [2] 创建 .fam 文件
 */
function init() {
	com.prompt("Please input the project name", "www").then(result => {
		var dir = './' + result,
			famObj = {
				name: result
			},
			famCont = JSON.stringify(famObj, null, 2),
			famFile = dir + '/.fam';

		com.createForlder(dir);
		com.write(famFile, famCont);
		console.log("\nA new fam project had created!!");
	}, res => {
		console.log(res);
	});
}


exports.init = init;