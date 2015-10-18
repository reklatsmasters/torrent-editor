import React, {Component} from 'react';
import icon_spinner from '../../../../images/repeat.svg';

import './announce.scss';

function Spinner(props) {
  return <span className='announce-spinner' dangerouslySetInnerHTML={{__html: icon_spinner}} />;
}

export default class AnnounceItem extends Component {
  state = {
    seeders: null,
    leechers: null
  }
  
  static defaultProps = {
    tracker: null,
  }
  
  hasData() {
    return this.state.seeders !== null && this.state.leechers !== null;
  }
  
  render() {
    return (
      <div className='announce-item'>
        <span className='announce-item_tracker'>{this.props.tracker}</span>
        
        <span className='announce-item_stat'>
          {this.hasData() ? `${this.state.seeders} / ${this.state.leechers}` : <Spinner />}
        </span>
      </div>
    );
  }
}