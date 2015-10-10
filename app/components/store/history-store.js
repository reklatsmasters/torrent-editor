import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {EventEmitter} from 'events';
import * as ActionTypes from '../action/types';
import TorrentStore from './torrent-store';
import assign from 'xtend';
import HistoryStore from '../history/torrent-history';
import HistoryActionCreator from '../history/torrent-history-creator';

HistoryStore.dispatchToken = TorrentDispatcher.register(function (action) {
	switch (action.type) {
    case ActionTypes.FILE_SELECT:
			// wait `TorrentStore` handler
			TorrentDispatcher.waitFor([TorrentStore.dispatchToken]);
			
			// wait read file
			TorrentStore.waitForReadFile((data) => {
				var infohash = data.infoHash.toUpperCase();
				
				if (location.pathname == '/') {
					HistoryActionCreator.navigateTorrent(infohash);
				} else {
					HistoryActionCreator.replaceTorrent(infohash);
				}
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