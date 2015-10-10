/**
 * Интерфейс, реализующий зону перетаскивания файлов
 */

import React,{Component} from 'react';
import torrent from '../../images/torrent.svg';

import './dragzone.scss';

class Dragzone extends Component {  
  render() {
    return (
      <div className='dragzone overlay'>
        <div className='dragzone_drop'>
          <div className='dragzone_icon' dangerouslySetInnerHTML={{__html: torrent}} /> 
          <h2 className='dragzone_title'>Drop torrents here</h2>
        </div>
      </div>
    );
  }
}

export default Dragzone;