var express = require('express');
var router = express.Router();
var exec = require('exec');
var pathToSites = '/home/pi/Sites';
var pathToSite = pathToSites + '/sg-home';
var archiveName = 'node_modules.tar.gz';

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send('Hi there :)');
});


router.post('/', function (req, res, next) {
	res.send('Build start');
	try {
		process.chdir(pathToSites);
		console.log('New directory: ' + process.cwd());
	}
	catch (err) {
		console.log('chdir: ' + err);
	}
	try {
		process.chdir(pathToSites);
		exec('chmod -R 777 sg-home && rm -r sg-home && git clone https://github.com/ruid0/sg-home.git', function (err, out, code) {
			console.log('Clone success');
			process.chdir(pathToSite);
			console.log('New directory: ' + process.cwd());
			exec('tar xf ../nm_cache.tar && npm prune && npm install && tar cf ../nm_cache.tar node_modules && npm run build', function () {
				console.log('npm install - done, start build');
			});
		});
	}
	catch (err) {
		console.log('chdir: ' + err);
	}
});
module.exports = router;
