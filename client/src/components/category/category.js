import React, {Component} from 'react';
import styles from './category.css';

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        onClick={this.props.changeLevel}
        id={`bubble-${this.props.index}`}
        data-angle={this.props.angle}
        data-duration="100ms"
        className={`category-col`}>
        <div
          className="bubble"
          >
          <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}
export default Category;
