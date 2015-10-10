/**
 * FLUX component
 * Хранит переданные файлы
 */

import TorrentDispatcher from '../dispatcher/torrentdispatcher';
import {EventEmitter} from 'events';
import * as ActionTypes from '../action/types';
import decode from 'parse-torrent-file';
import {Buffer} from 'buffer';
import assign from 'xtend';
import {Promise} from 'es6-promise';

const CHANGE = 'change';
const file_type = 'application/x-bittorrent';

const TorrentStore = assign({}, EventEmitter.prototype, {
  /* private */
  
  _file: null,
  _correct: true,
  _parsed: null,
  _readState: null,
  
  _handleFileSelect(file) {
    this._correct = file.type === file_type;
    this._file = this._correct ? file : null;
    
    this._readState = new Promise((resolve, reject) => {
      if (!this._file) {
        return reject(new Error('Incorrect file'));  
      }
      
      this._handleReadFile(this._file, (e, data) => {
        if (e) {
          return reject(e);
        }
        
        this._parsed = data;
        
        this.emit(CHANGE);
        resolve(data);
      })
    });
  },
  
  _handleReadFile(file, cb) {
    var reader = new FileReader();
    
    // TODO: remove event handlers
    
    reader.onload = function(e) {
      let parsed = decode(new Buffer(e.target.result));

      console.log(parsed);
      cb(null, parsed);
    }
    
    reader.onerror = cb;
    
    reader.readAsArrayBuffer(file);
    return reader;
  },
  
  /* public */
  
  waitForReadFile(success, error) {
    return this._readState.then(success, error);
  },
  
  getFiles() {
    let {_file: file, _correct: correct} = this;
    
    return { file, correct };
  },
  
  getParsed() {
    return this._parsed;
  },
  
  sub(cb) {
    this.on(CHANGE, cb);
  },
  
  off(cb) {
    return cb ? this.removeListener(CHANGE, cb) : this.removeAllListeners(CHANGE);
  }
});

TorrentStore.dispatchToken = TorrentDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.FILE_SELECT:
      TorrentStore._handleFileSelect(action.file);
      break;
    default:
      break;
  }
});

export default TorrentStore;