import React, {Component} from 'react';
import filesize from '../../../filesize';

import './fileitem.scss';

export default class FileItem extends Component {
  static defaultProps = {
    size: 0,
    name: null
  }
  
  render() {    
    var size = { __html: filesize(this.props.size) };

    return (
      <div className='file-item'>
        <span className='file-item_name'>{this.props.name}</span>
        <span className='file-item_size' dangerouslySetInnerHTML={size} />
      </div>
    );
  }
}