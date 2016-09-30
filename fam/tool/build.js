const com = require('../common/common');

function build() {
	var famCont = com.read('./.fam'),
		famObj = JSON.parse(famCont);

	console.log(famObj.name);
}

exports.build = build;