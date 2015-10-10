import React, {Component} from 'react';
import './announce.scss';

export default class AnnounceItem extends Component {
  static defaultProps = {
    tracker: null
  }
  
  render() {
    return (
      <div className='announce-item'>
        <span className='announce-item_tracker'>{this.props.tracker}</span>
      </div>
    );
  }
}