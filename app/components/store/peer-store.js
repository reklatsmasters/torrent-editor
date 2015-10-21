/**
 * FLUX component
 * Хранит пиров для каждого трекера и общее количество
 */

/** TODO: Editor должен отсылать событие, когда вьюха загрузится полностью */
/* global fetch */

import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import * as ActionTypes from '../action/types';
import assign from 'xtend';
import {EventEmitter} from 'events';
import TorrentStore from './torrent-store';
import TorcacheStore from './torcache-store';

const CHANGE = 'change';
const peers = {};	// {infohash: {tracker: {seeders:X, leechers: Y}}}

const PeerStore = assign({}, EventEmitter.prototype, {
	/** private */

	_infohash: null,	
	
	_change() {
		this.emit(CHANGE);
	},
	
	_fetch(announce) {
		if (!Array.isArray(announce) || !announce.length) {
			return;
		}

		var handle = this.getPeers() || {};		
		peers[this._infohash] = handle;
		
		announce.forEach((tracker) => {
			if (tracker in handle) {
				return;
			}
			
			fetch(`/api/torrent/${this._infohash}/${encodeURIComponent(tracker) }`)
				.then(this._handleSuccessFetch)
				.then((data) => {
					handle[data.announce] = {
						seeders: data.complete,
						leechers: data.incomplete
					}
					
					this._change();
				})
		})
	},
	
	_handleSuccessFetch(response) {
		if (~~(response.status / 100) == 2) {
			return response.json();
		}
		
		var error = new Error(response.statusText)
    error.response = response
    throw error;
	},
	
	/** public */
	
	getPeers() {
		return this._infohash && (this._infohash in peers) ?
			peers[this._infohash] :
			{}
			;
	},
	
	sub(cb) {
    this.on(CHANGE, cb);
  },
  
  off(cb) {
    return cb ? this.removeListener(CHANGE, cb) : this.removeAllListeners(CHANGE);
  }
});

PeerStore.dispatchToken = TorrentDispatcher.register((action) => {
	switch (action.type) {
		case ActionTypes.FILE_SELECT:
			// wait `TorrentStore` handler
			TorrentDispatcher.waitFor([TorrentStore.dispatchToken]);
			
			// wait read file
			TorrentStore.waitForReadFile((data) => {
				PeerStore._infohash = data.infoHash.toUpperCase();
				PeerStore._fetch( data.announce );
			});
			break;
		case ActionTypes.FILE_DOWNLOAD:
			TorrentDispatcher.waitFor([TorcacheStore.dispatchToken]);
			
			TorcacheStore.waitForFetchTorrent((data) => {
				PeerStore._infohash = data.infoHash.toUpperCase();
				PeerStore._fetch( data.announce );
			})
			break;
		default:
      break;
	}
});

export default PeerStore;