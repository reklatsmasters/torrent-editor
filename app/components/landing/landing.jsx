/**
 * Интерфейс страницы выбора торрента
 */

import React,{Component} from 'react';
import Overlay from '../dragzone/dragzone';
import TorrentActionCreator from '../action/torrent-action-creator';
//import assign from 'xtend';
import Header from '../header/header';

import './landing.scss';

export default class Page extends Component {
    
  handleSelectFile(ev) {
    TorrentActionCreator.selectFile(ev.target.files);
    // TODO: reset input
  }
  
  render() {
    return (
      <section className='pstart'>
        <Header />        
        <label className='choose'>
          <input type='file' onChange={this.handleSelectFile} />
          <span>choose torrent</span>
        </label>
      </section>
    );
  }
}