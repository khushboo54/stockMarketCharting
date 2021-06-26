import React, { Component } from "react";
import IpoService from "../../services/ipo.service";
import { Link } from "react-router-dom";

export default class IposList extends Component {
  constructor(props) {
    super(props);
    this.retrieveIpos = this.retrieveIpos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveIpo = this.setActiveIpo.bind(this);

    this.state = {
      ipos: [],
      currentIpo: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveIpos();
  }

  retrieveIpos() {
    IpoService.findAll()
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


  refreshList() {
    this.retrieveIpos();
    this.setState({
      currentIpo: null,
      currentIndex: -1
    });
  }

  setActiveIpo(ipo, index) {
    this.setState({
      currentIpo: ipo,
      currentIndex: index
    });
  }

  render() {
    const { ipos, currentIpo, currentIndex } = this.state;

    return (
      <div className="list row">
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
                  onClick={() => this.setActiveIpo(ipo, index)}
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
              <h4>Ipo</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentIpo.id}
              </div>
              <div>
                <label>
                  <strong>Ipo:</strong>
                </label>{" "}
                {currentIpo.companyName}
              </div>
              <div>
                <label>
                  <strong>Stock Exchange:</strong>
                </label>{" "}
                {currentIpo.stockExchangeName}
              </div>
              <div>
                <label>
                  <strong>Remarks:</strong>
                </label>{" "}
                {currentIpo.remarks}
              </div>
              <div>
                <label>
                  <strong>Open Date Time:</strong>
                </label>{" "}
                {currentIpo.openDateTime}
              </div>
              <div>
                <label>
                  <strong>shares:</strong>
                </label>{" "}
                {currentIpo.shares}
              </div>
              <div>
                <label>
                  <strong>price:</strong>
                </label>{" "}
                {currentIpo.price}
              </div>

              <Link
                to={"/ipoedit/" + currentIpo.id}
                className="badge badge-warning"
              >
                  Edit
              </Link>
          
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Ipo...</p>
            </div>
          )}
        </div>
        <Link to={"/iposadd/"}>Add IPO</Link>
      </div>
    );
  }
}