'use strict';

const restify = require('restify');
const app = restify.createServer();
const got = require('got');
const parseTorrent = require('parse-torrent-file');
const path = require('path');
const Announce = require('bittorrent-tracker');
const hat = require('hat');

const peerID = hat(160);

app.use(restify.conditionalRequest());

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

app.get('/api/torrent/:hash/:tracker', (req, res, next) => {
	var infoHash = req.params.hash;
	var tracker = decodeURIComponent(req.params.tracker);

	console.log(infoHash, tracker);
		
	// запрос
	var client = new Announce(peerID, 6881, { infoHash, announce: [tracker] });

	client.once('error', () => {
		client.destroy();
		res.send({ announce: tracker, complete: null, incomplete: null });
	});
	client.once('warning', () => {
		client.destroy();
		res.send({ announce: tracker, complete: null, incomplete: null });
	});
	client.once('scrape', (data) => {
		client.destroy();
		res.send(data);
	});
	
	client.scrape();
})

/**
 * For all other requests we send `index.html`
 */
app.get(/\/*/, restify.serveStatic({
	directory: path.join(__dirname, '../dist'),
	file: 'index.html'
}))

app.listen(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8082, process.env.OPENSHIFT_NODEJS_IP || "::", () => {
	console.log('%s listening at %s', app.name, app.url);
})