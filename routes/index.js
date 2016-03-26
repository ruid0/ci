var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var path = '/home/pi/Sites/sg-home';


/* GET home page. */
router.get('/', function (req, res, next) {
	res.send('Hi there :)');
});

router.post('/', function (req, res, next) {
	exec('rm -r ' + path, function (err, stdout, stderr) {
		req.send({
			err: err,
			stdout: stdout,
			stderr: stderr
		})
	});
});

module.exports = router;
