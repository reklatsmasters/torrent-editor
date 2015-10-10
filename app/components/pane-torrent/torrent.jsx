import React, {Component} from 'react';
import Input from './fields/input/input';
import Files from './fields/files/files';
import AnnounceList from './fields/announce-list/announce';
import CreatedPrivate from './fields/created-private/widget';
import TorrentStore from '../store/torrent-store';

import './torrent.scss';

export default class Torrent extends Component { 
  
  render() {
    var torrent = this.props.torrent;
     
    return (
      <div className='pane-torrent'>
        <Input name='infohash' value={torrent.infoHash} />
        <Input name='name' value={torrent.name} />
        {torrent.comment ? <Input name='comment' value={torrent.comment} /> : null}
        
        <Files files={torrent.files} />
        {torrent.announce.length ? <AnnounceList announce={torrent.announce} /> : null}
        <CreatedPrivate created={torrent.created} private={torrent.private} pieces={torrent.pieces.length} length={torrent.pieceLength} />
      </div>
    );
  }
}