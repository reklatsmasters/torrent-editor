import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import { FileAction, NotFoundAction } from './values';

export function selectFile(fileList) {
  if (fileList && fileList.length > 0) {
    TorrentDispatcher.dispatch(new FileAction(fileList[0]));
  }
}

export function notFound() {
  TorrentDispatcher.dispatch(new NotFoundAction());
}

export default {
  selectFile,
  notFound
}