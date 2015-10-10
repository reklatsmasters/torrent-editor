'use strict';

const restify = require('restify');
const server = restify.createServer();
const got = require('got');
const parseTorrent = require('parse-torrent-file');

/**
 * Download torrent from torcache and write to out
 */
server.get('/api/torrent/:hash', (req, res, next) => {
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

server.listen(process.env.PORT | 8082, () => {
	console.log('%s listening at %s', server.name, server.url);
})