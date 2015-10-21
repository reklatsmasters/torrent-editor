/**
 * FLUX component
 * Хранит загруженные из torcache файлы
 */

/* global fetch */

import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {EventEmitter} from 'events';
import * as ActionTypes from '../action/types';
import {Buffer} from 'buffer';
import assign from 'xtend';
import {Promise} from 'es6-promise';

const CHANGE = 'change';

const TorcacheStore = assign({}, EventEmitter.prototype, {
	/** private */
	_store: {},
	_fetchState: null,

	_handlePullTorrent(infohash) {
		this._fetchState = fetch(`/api/torrent/${infohash}`)
			.then(this._handleSuccessFetch)
			.then(this._parseTorrent)
			.then((data) => {
				this._store[data.infoHash.toUpperCase()] = data;
				this._change();
				
				return data;
			}).catch(() => {
				/**
				 * При ошибке всё равно сохраняем состояние
				 * Оно предотвращает повторные неудачные загрузки
				 */
				this._store[infohash.toUpperCase()] = null;
				this._change();
			})
	},
	
	_handleSuccessFetch(response) {
		if (~~(response.status / 100) == 2) {
			return response.text();
		}
		
		var error = new Error(response.statusText)
    error.response = response
    throw error;
	},
	
	_parseTorrent(json) {
		return JSON.parse(json, function(key, value) {
			return value && value.type === 'Buffer'
				? new Buffer(value.data)
				: value;
		});
	},
	
	_change() {
		this.emit(CHANGE);
	},
	
	/** public */
	
	waitForFetchTorrent(success, fail) {
		return this._fetchState.then(success, fail);
	},
	
	getTorrent(infohash) {
		return this._store[infohash.toUpperCase()];
	},
	
	isLoaded(infohash) {
		var torrent = this._store[infohash.toUpperCase()];
		return torrent || Object.is(torrent, null);
	},
	
	sub(cb) {
    this.on(CHANGE, cb);
  },
  
  off(cb) {
    return cb ? this.removeListener(CHANGE, cb) : this.removeAllListeners(CHANGE);
  }
});

TorcacheStore.dispatchToken = TorrentDispatcher.register((action) => {
	switch (action.type) {
		case ActionTypes.FILE_DOWNLOAD:
			TorcacheStore._handlePullTorrent(action.infohash);
			break;
    default:
      break;
  }
})

export default TorcacheStore;