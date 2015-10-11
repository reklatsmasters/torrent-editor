import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {EventEmitter} from 'events';
import * as ActionTypes from '../action/types';
import TorrentStore from './torrent-store';
import assign from 'xtend';
import history from '../history/torrent-history';
import HistoryActionCreator from '../history/torrent-history-creator';

const CHANGE = 'change';

const HistoryStore = assign({}, EventEmitter.prototype, {
	_change() {
		this.emit(CHANGE);
	},
	
	/**
   * Поскольку `params.hash` обновляется до текущего состояния
   * только обновления компонента, необходим отдельный
   * метод для получения запрашиваемого из url хэша 
   */
	currentInfohash() {
		var found = location.pathname.match(/^\/torrent\/([a-fA-F\d]+)+$/i);
		return found && found.length == 2 ? found[1] : null;
	},
	
	sub(cb) {
    this.on(CHANGE, cb);
  },
  
  off(cb) {
    return cb ? this.removeListener(CHANGE, cb) : this.removeAllListeners(CHANGE);
  },
	
	history,
});

HistoryStore.history.listen(() => {
	HistoryStore._change();
});

HistoryStore.dispatchToken = TorrentDispatcher.register(function (action) {
	switch (action.type) {
    case ActionTypes.FILE_SELECT:
			// wait `TorrentStore` handler
			TorrentDispatcher.waitFor([TorrentStore.dispatchToken]);
			
			// wait read file
			TorrentStore.waitForReadFile((data) => {
				var infohash = data.infoHash.toUpperCase();
				HistoryActionCreator.navigateTorrent(infohash);
			});
      break;
		case ActionTypes.FILE_NOT_FOUND:
			HistoryActionCreator.notFoundTorrent();
			break;
    default:
      break;
  }
})

export default HistoryStore;