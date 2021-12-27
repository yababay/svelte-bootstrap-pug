var copy = require('recursive-copy')

const nm = 'node_modules'
const bsDistr = `${nm}/bootstrap/dist`

copy(bsDistr, 'public/vendors', function(error, results) {
	if (error) {
		console.error('Copy failed: ' + error);
	} else {
		console.info('Copied ' + results.length + ' files');
	}
});
