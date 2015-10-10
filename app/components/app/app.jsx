/**
 * Корневой интерфейс приложения
 * В зависимости от состояния
 * Отрисовывает landing или editor
 */

import React,{Component} from 'react';
import Draggable from '../dnd/dnd';

export default class Router extends Component {
  render() {
    return (
      <div className="page">
        <Draggable>
          { this.props.children }
        </Draggable>
      </div>
    );
  }
}
