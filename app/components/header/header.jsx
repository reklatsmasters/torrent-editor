import React, {Component} from 'react';

import './header.scss';

export default class Heading extends Component {
  render() {
    return (
      <header className='heading'>
        <h1 className='heading_title'>Torrent Editor</h1>
        <h2 className='heading_shortdesc'>Simple and Fast editor with HTML5 and Drag-n-Drop</h2>
      </header>
    );
  }
}