import React, {Component, PropTypes} from 'react';
import classSet from 'classnames';

import './tab.scss';

export default class Tab extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  }
  
  static defaultProps = {
    active: false,
    title: ''
  }
  
  render() {
    var classes = classSet({
      'editor-tab': true,
      'editor-tab--active': this.props.active
    });
    
    return (
      <div className={classes} onClick={this.props.onClick}>
        {this.props.title}
      </div>
    );
  }
}