/**
 * Корневой интерфейс приложения
 * В зависимости от состояния
 * Отрисовывает landing или editor
 */

import React,{Component} from 'react';
import Landing from '../landing/landing';
import Editor from '../editor/editor';
import TorrentStore from '../store/torrent-store';
import Draggable from '../dnd/dnd';

const PAGE_LANDING = 1;
const PAGE_EDITOR = 2;

export default class Router extends Component {
  state = {
    page: PAGE_LANDING
  }
  
  componentDidMount() {
    TorrentStore.sub(this.handleStoreChanged);
  }
  
  componentWillUnmount() {
    TorrentStore.off(this.handleStoreChanged);
  }
  
  handleStoreChanged = () => {
    let {file} = TorrentStore.getFiles();
    
    this.setState({page: file ? PAGE_EDITOR : PAGE_LANDING});
  }
  
  render() {
    return (
      <div className="page">
        <Draggable>
          {this.state.page == PAGE_LANDING ? <Landing /> : null}
          {this.state.page == PAGE_EDITOR  ? <Editor /> : null}
        </Draggable>
      </div>
    );
  }
}
