/**
 * FLUX component
 * Хранит переданные файлы
 */

import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {EventEmitter} from 'events';
import * as ActionTypes from '../action/types';
import decode from 'parse-torrent-file';
import {Buffer} from 'buffer';

const CHANGE = 'change';
const file_type = 'application/x-bittorrent';

let file = null;
let correct = true;
let raw = null;
let parsed = null;

/**
 * Обрабатываем выбор файлов
 */
function handleFileSelect(filestore, action) {
  correct = action.file.type === file_type;
  filestore.add(correct ? action.file : null);
  
  action.file = action.type = null; // clear
}


function handleReadFile(store, cb) {
  if (!file) {
    return;
  }
  
  var reader = new FileReader();
  reader.onload = function (e) {
    parsed = decode(new Buffer(e.target.result));
    console.log(parsed);
    
    cb();
  };
  
  reader.readAsArrayBuffer(file);
}

class FileStore extends EventEmitter {
  add(f) {
    file = f;    
    
    handleReadFile(this, () => {
      this.emit(CHANGE);
    })
  }
  
  clear() {
    file = raw = parsed = null;
    this.emit(CHANGE);
  }
  
  getFiles() {
    return { file, correct };
  }
  
  getRaw() {
    return raw;
  }
  
  getParsed() {
    return parsed;
  }
  
  sub(cb) {
    this.on(CHANGE, cb);
  }
  
  off(cb) {
    return cb ? this.removeListener(CHANGE, cb) : this.removeAllListeners(CHANGE);
  }
}

const store = new FileStore();

TorrentDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.FILE_SELECT:
      handleFileSelect(store, action);
      break;
    default:
      break;
  }
});

export default store;