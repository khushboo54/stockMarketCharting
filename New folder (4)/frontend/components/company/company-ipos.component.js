import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";

export default class CompanyIpos extends Component {
  constructor(props) {
    super(props);
    this.getIpos = this.getIpos.bind(this);
    this.setActiveIpos = this.setActiveIpos.bind(this);
    this.refreshList = this.refreshList.bind(this); 

    this.state = {
      ipos: [],
      currentIpo: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.getIpos(this.props.match.params.id);
    
  }

  getIpos(id) {
    CompanyService.findIpos(id)
    .then(response => {
      this.setState({
        ipos: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    
  }

  setActiveIpos(ipo, index) {
    this.setState({
      currentIpo: ipo,
      currentIndex: index
    });
  }

  refreshList() {
    this.getIpos();
    this.setState({
      currentIpo: null,
      currentIndex: -1
    });
  }

  render() 
  {
    const { ipos, currentIpo, currentIndex } = this.state;

    return (
        <div className="list row" >
        <div className="col-md-6">
          <h4>Ipos List</h4>

          <ul className="list-group">
            {ipos &&
              ipos.map((ipo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveIpos(ipo, index)}
                  key={index}
                >
                  {ipo.companyName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentIpo ? (
            <div>
              <h4>Company</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentIpo.id}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentIpo.companyName}
              </div>
              <div>
                <label>
                  <strong>Stock Exchange:</strong>
                </label>{" "}
                {currentIpo.stockExchange}
              </div>
              <div>
                <label>
                  <strong>Prices:</strong>
                </label>{" "}
                {currentIpo.price}
              </div>
              <div>
                <label>
                  <strong>Shares:</strong>
                </label>{" "}
                {currentIpo.shares}
              </div>
              <div>
                <label>
                  <strong>Open Date Time:</strong>
                </label>{" "}
                {currentIpo.openDateTime}
              </div>
              <div>
                <label>
                  <strong>Remarks:</strong>
                </label>{" "}
                {currentIpo.remarks}
              </div>
            </div>
          ):(
            <div>
              <br />
              <p>Please click on a Company...</p>
            </div>
          ) }
        <Link to={"/companies/"}>Go Back</Link>
        </div>
      </div>
    );
  }
}
