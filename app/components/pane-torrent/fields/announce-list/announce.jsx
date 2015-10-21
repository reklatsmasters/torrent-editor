import React, {Component} from 'react';
import AnnounceItem from '../announce-item/announce';
import PeerStore from '../../../store/peer-store';

export default class AnnounceWidget extends Component {
  state = {}

  componentDidMount() {
    this.handleStoreChanged();

    PeerStore.sub(this.handleStoreChanged);
  }
  
  componentWillUnmount() {
    PeerStore.off(this.handleStoreChanged);
  }
  
  handleStoreChanged = () => {
    this.setState(PeerStore.getPeers());
  }
  
  render() {
    var nodes = this.props.announce.map((tracker) => {
      var stat = this.state[tracker];
      var seeders = !stat ? undefined : stat.seeders === null ? '-' : stat.seeders;
      var leechers = !stat ? undefined : stat.leechers === null ? '-' : stat.leechers;
      
      return <AnnounceItem tracker={tracker} key={tracker} seeders={seeders} leechers={leechers} />
    });
    
    return (
      <ul className='torrent-announces torrent-files'>
        <span>announce</span>
        
        {nodes}
      </ul>
    );
  }
}