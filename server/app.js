'use strict';

const restify = require('restify');
const app = restify.createServer();
const got = require('got');
const parseTorrent = require('parse-torrent-file');
const path = require('path');

app.get(/\/s\/?.*/i, restify.serveStatic({
	directory: path.join(__dirname, '../dist')
}))

/**
 * Download torrent from torcache and write to out
 */
app.get('/api/torrent/:hash', (req, res, next) => {
	var infohash = req.params.hash;
	
	var opts = {
		timeout: 7e3,
		encoding: null,
		headers: { 'Referer': 'http://torcache.net/' }
	}
	
	got(`http://torcache.net/torrent/${infohash}.torrent`, opts, function (err, data) {
		next.ifError(err);
						
		try {
			let torrent = parseTorrent(data);
			res.send(torrent);
			
			next();
		} catch (err) {
			return next(err);
		}
	})
})

/**
 * For all other requests we send `index.html`
 */
app.get(/\/*/, restify.serveStatic({
	directory: path.join(__dirname, '../dist'),
	file: 'index.html'
}))

app.listen(process.env.PORT || 8082, () => {
	console.log('%s listening at %s', app.name, app.url);
})