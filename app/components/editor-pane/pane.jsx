import React, {Component, PropTypes} from 'react';
import classSet from 'classnames';

import './pane.scss';

export default class Pane extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired
  }
  
  static defaultProps = {
    active: false
  }
  
  render() {
    var classes = classSet({
      'editor-pane': true,
      'editor-pane--hidden': !this.props.active
    });
    
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}