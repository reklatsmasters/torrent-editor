import React, {Component} from 'react';
import AnnounceItem from '../announce-item/announce';

export default class AnnounceWidget extends Component {
  render() {
    var nodes = this.props.announce.map((tracker) => {
      return <AnnounceItem tracker={tracker} key={tracker} />
    });
    
    return (
      <ul className='torrent-announces torrent-files'>
        <span>announce</span>
        
        {nodes}
      </ul>
    );
  }
}