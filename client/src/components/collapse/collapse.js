import React, { Component } from 'react';
import styles from './collapse.css';


class Collapse extends Component {
  constructor(props) {
    super(props)
  }
  collapse = (e) => {
    e.target.class = "";
  }
  render() {
    return (
      <div>
          <div className="card">
          <div className="card-header btn btn-link" id={`heading${this.props.index}`} onClick={this.collapse} data-toggle="collapse" data-target={`#collapse${this.props.index}`} aria-expanded="false" aria-controls={`collapse${this.props.index}`}>
              <h5 className="mb-0">
                <h3>Saved Article #{this.props.index + 1}</h3>
              </h5>
            </div>
            <div id={`collapse${this.props.index}`} className="collapse" aria-labelledby={`heading${this.props.index}`} data-parent="#accordion">
              <div className="article-title">
              <h3>
                {this.props.articles.title || `Article Title`}
              </h3>
              </div>

              <div className = "article-img">
              <img src={this.props.articles.img || `Article Image`}/>
              </div>

              <div className="card-body">
                <p>{this.props.articles.description || `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Collapse;