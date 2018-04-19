import React, {Component} from 'react';
import styles from './endpoint.css';

// export default class Slider extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {}
//   }

//   render() {
//     return (
//       <div className="slider">
				
//       </div>
//     );
//   }
// }


export const Endpoint = ({children}) => {
  return (
    <div className="carousel" data-ride="carousel">
      <div className="carousel-inner">
          {children}
      </div>
    </div>
  );
}
