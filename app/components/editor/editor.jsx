import React, {Component} from 'react';
import Header from '../header/header';
import Tab from '../editor-tab/tab';
import Pane from '../editor-pane/pane';
import PaneTorrent from '../pane-torrent/torrent';
import TorrentStore from '../store/torrent-store';

import './editor.scss';

/* global Prism */

const PANE_EDITOR = 0x01;
const PANE_JSON   = 0x02;
//const PANE_RAW    = 0x03;

function parser(key, value) {
  if (key == 'info' || key == 'infoBuffer') { return; }
  else { return value;}
}

export default class Editor extends Component {

  state = {
    pane: PANE_EDITOR,
    torrent: {
      infoHash: null,
      name: null,
      comment: null,
      files: [],
      announce: [],
      pieces: []
    }
  }
  
  componentDidMount() {
    // init after load component  
    this.handleStoreChanged();
    TorrentStore.sub(this.handleStoreChanged);
  }
  
  componentDidUpdate() {
    Prism.highlightElement(React.findDOMNode(this.refs.code));
  }
  
  componentWillUnmount() {
    TorrentStore.off(this.handleStoreChanged);
  }
  
  handleTabChange(pane, ev) {
    ev.stopPropagation();
    ev.preventDefault();
    
    this.setState({pane});
  }
  
  handleStoreChanged = () => {    
    var torrent = TorrentStore.getParsed();
    this.setState({torrent});
  }

  render() {
    var torrent = this.state.torrent;
   
    return (
      <section className='editor'>
        <Header />        
        <div className='editor-wrap'>
          <div className='editor-tabs'>
            <Tab title='editor' active={this.state.pane == PANE_EDITOR} onClick={this.handleTabChange.bind(this, PANE_EDITOR)} />
            <Tab title='json'   active={this.state.pane == PANE_JSON} onClick={this.handleTabChange.bind(this, PANE_JSON)} />
          </div>
          <div className='editor-panes'>
            <Pane active={this.state.pane == PANE_EDITOR}>
              <PaneTorrent torrent={this.state.torrent} />
            </Pane>
            <Pane active={this.state.pane == PANE_JSON}>
              <pre style={{margin: 0}}>
                <code ref='code' className='language-clike line-numbers'>{JSON.stringify(torrent, parser, 2)}</code>
              </pre>
            </Pane>
          </div>
        </div>
      </section>
    );
  }
}