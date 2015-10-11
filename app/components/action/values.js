import * as ActionTypes from './types';

/** Abstract action */
export class Action {
  constructor(type) {
    this.type = type;
  }
}

/**
 * Base file action
 * Вызывается при выборе файла
 */
export class FileAction extends Action {
  constructor(file) {
    super(ActionTypes.FILE_SELECT);
    this.file = file;
  }
}

/**
 * Вызывается при отсутствии файла в store и torcache
 */
export class NotFoundAction extends Action {
  constructor() {
    super(ActionTypes.FILE_NOT_FOUND);
  }
}

/**
 * Вызывается, когда необходимо загрузить торрент
 * из внешнего источника
 */
export class PullTorrentAction extends Action {
  constructor(infohash) {
    super(ActionTypes.FILE_DOWNLOAD);
    
    this.infohash = infohash;
  }
}