import React, {Component} from 'react';
import moment from 'moment';
import filesize from '../../../filesize';

import './widget.scss';

export default class CreatedPrivateWidget extends Component {
  static defaultProps = {
    created: null,
    private: false
  }
  
  render() {
    var created = !this.props.created ?
      '00.00.00 00:00:00' :
      moment(this.props.created).format('DD.MM.YYYY HH:mm:ss')
    ;
    
    var pieceLength = { __html: filesize(this.props.length) };
    
    return (
      <div className='torrent-common-field'>
        <div className='torrent-common-field_header'>
          <span>created</span>
          <span>private</span>
          <span>pieces</span>
          <span>piece length</span>
        </div>
        
        <div className='torrent-common-field_content'>
          <span>{created}</span>
          <span>{this.props.private ? 'yes' : 'no'}</span>
          <span>{this.props.pieces}</span>
          <span dangerouslySetInnerHTML={pieceLength} />
        </div>
      </div>
    );
  }
}