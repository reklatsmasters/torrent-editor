import React, {Component} from 'react';

import './input.scss';

export default class Input extends Component {
  static defaultProps = {
    name: null,
    value: null
  }
  
  handleChange = (ev) => {}
  
  render() {
    return (
      <label className='torrent-input'>
        <span>{this.props.name}</span>
        <input type='text' onChange={this.handleChange} value={this.props.value} />
      </label>
    );
  }
}