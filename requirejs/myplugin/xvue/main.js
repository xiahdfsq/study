requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: './',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		text: './text',
		xvue: './xvue',
		tt: './tt',
	}
});

// Start the main app logic.
requirejs(['xvue!test.xvue'], function (test) {
	console.log(test);
});