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
          <div className="card-header btn btn-link" id="headingOne" onClick={this.collapse} data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              <h5 className="mb-0">
                <button onClick={this.collapse}className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  <h3>Saved Article #{this.props.index || "1"}</h3>
                </button>
              </h5>
            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="article-title">
              <h3>
                {this.props.title || `Galileo Galilei`}
              </h3>
              </div>

              <div className = "article-img">
              {/* <img src={this.props.img || `Article Image`}/> */}
              </div>

              <div className="card-body">
              <p>{this.props.body || `Galileo Galilei (Italian: [ɡaliˈlɛːo ɡaliˈlɛi]; 15 February 1564[3] – 8 January 1642) was an Italian polymath. Galileo is a central figure in the transition from natural philosophy to modern science and in the transformation of the scientific Renaissance into a scientific revolution.

Galileo's championing of heliocentrism and Copernicanism was controversial during his lifetime, when most subscribed to either geocentrism or the Tychonic system.[4] He met with opposition from astronomers, who doubted heliocentrism because of the absence of an observed stellar parallax.[4] The matter was investigated by the Roman Inquisition in 1615, which concluded that heliocentrism was "foolish and absurd in philosophy, and formally heretical since it explicitly contradicts in many places the sense of Holy Scripture."[4][5][6] Galileo later defended his views in Dialogue Concerning the Two Chief World Systems (1632), which appeared to attack Pope Urban VIII and thus alienated him and the Jesuits, who had both supported Galileo up until this point.[4] He was tried by the Inquisition, found "vehemently suspect of heresy", and forced to recant. He spent the rest of his life under house arrest.[7][8] While under house arrest, he wrote one of his best-known works, Two New Sciences, in which he summarized work he had done some forty years earlier on the two sciences now called kinematics and strength of materials.`}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
export default Collapse;