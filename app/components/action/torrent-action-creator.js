import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import { FileAction, NotFoundAction, PullTorrentAction } from './values';

export function selectFile(fileList) {
  if (fileList && fileList.length > 0) {
    TorrentDispatcher.dispatch(new FileAction(fileList[0]));
  }
}

export function notFound() {
  console.log('torrent not found');
  TorrentDispatcher.dispatch(new NotFoundAction());
}

export function pullTorrent(infohash) {
  console.log('pull torrent %s', infohash);
  TorrentDispatcher.dispatch(new PullTorrentAction(infohash));
}

export default {
  selectFile,
  notFound,
  pullTorrent
}