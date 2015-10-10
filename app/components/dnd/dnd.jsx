/**
 * Интерфейс перетаскивания,
 * работает на всех страницах 
 */
 
import React,{Component} from 'react';
import Overlay from '../dragzone/dragzone';
import TorrentActionCreator from '../action/torrent-action-creator'

import './dnd.scss';

export default class DnD extends Component {
  
  state = {
    isDragOver: false
  }
  
  componentDidMount() {
    this.dragzone = React.findDOMNode(this.refs.dragzone);
  }
  
  // clear memory
  componentWillUnmount() {
    this.dragzone = null;
  }
  
  handleDragEnter = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    // render drag zone
    this.dragzone.classList.add('dragging');
    this.setState({isDragOver: true});
  }
  
  handleDragOver = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    ev.nativeEvent.dataTransfer.dropEffect = 'copy';
  }
  
  handleDragLeave = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    /**
      * избавляемся от коллизий, если
      * мы начали перетаскивание (dragenter)
      * на дочернем элементе
      */
    if (ev.target != this.dragzone) {
      return;
    }    
    
    // remove drag zone
    this.dragzone.classList.remove('dragging');
    this.setState({isDragOver: false});
  }
  
  handleDrop = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    
    this.dragzone.classList.remove('dragging');
    this.setState({isDragOver: false});
    
    TorrentActionCreator.selectFile(ev.dataTransfer.files);
  }
  
  render() {
    return (
      <div className='dnd' ref='dragzone' onDragOver={this.handleDragOver}
          onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}>
        <div className='dnd_content'>
          { this.props.children }
        </div>
        
        { this.state.isDragOver ? <Overlay /> : null }
      </div>
    );
  }
}