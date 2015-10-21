import React, {Component} from 'react';
import icon_spinner from '../../../../images/repeat.svg';

import './announce.scss';

function Spinner(props) {
  return <span className='announce-spinner' dangerouslySetInnerHTML={{__html: icon_spinner}} />;
}

export default class AnnounceItem extends Component { 
  static defaultProps = {
    tracker: null,
    seeders: undefined,
    leechers: undefined
  }
  
  hasData() {
    return this.props.seeders !== undefined &&
      this.props.leechers !== undefined;
  }
  
  render() {
    return (
      <div className='announce-item'>
        <span className='announce-item_tracker'>{this.props.tracker}</span>
        
        <span className='announce-item_stat'>
          {this.hasData() ? `${this.props.seeders} / ${this.props.leechers }` : <Spinner />}
        </span>
      </div>
    );
  }
}