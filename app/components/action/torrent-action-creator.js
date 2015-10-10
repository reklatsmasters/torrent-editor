import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {FileAction} from './values';

export default {
  selectFile(fileList) {
    if (fileList && fileList.length > 0) {
      TorrentDispatcher.dispatch(new FileAction(fileList[0]));
    }
  }
}