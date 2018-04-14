import React, { Component } from 'react';
import styles from './collapse.css';


class Collapse extends Component {
  constructor(props) {
    super(props)
  }
  collapse = (e) => {
    console.log(e.target)
    e.target.class = "";
  }
  render() {
  let imgSource = "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/smiling-face-with-smiling-eyes.png";
    return (
      <div>
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button onClick={this.collapse}className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  <h3>Saved Article #{this.props.index}</h3>
                </button>
              </h5>
            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="article-title">
              <h3>
                {this.props.title}
              </h3>
              </div>

              <div className = "article-img">
              <img src = {this.props.img}/>
              </div>

              <div className="card-body">
                <p>{this.props.body || `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Collapse;