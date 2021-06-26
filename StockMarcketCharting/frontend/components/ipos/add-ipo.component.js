import React, { Component } from "react";
import IpoService from "../../services/ipo.service";
import { Link } from "react-router-dom";

export default class AddIpo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeShares = this.onChangeShares.bind(this);
    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.saveIpo = this.saveIpo.bind(this);
    this.newIpo = this.newIpo.bind(this);

    this.state = {
      id: null,
      price: 0.0,
      shares: 0,
      openDateTime: "",
      remarks: "",
      companyName: "",
      stockExchangeName: "",
    };
  }

  onChangeName(e) {
    this.setState({
      stockExchangeName: e.target.value
    });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangeDateTime(e) {
    this.setState({
      openDateTime: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeRemarks(e) {
    this.setState({
      remarks: e.target.value
    });
  }

  onChangeShares(e) {
    this.setState({
      shares: e.target.value
    });
  }
  saveIpo() {
    var data = {
      stockExchangeName: this.state.stockExchangeName,
      companyName: this.state.companyName,
      remarks: this.state.remarks,
      price: this.state.price,
      shares: this.state.shares,
      openDateTime: this.state.openDateTime
    };

    IpoService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          stockExchangeName: this.state.stockExchangeName,
          companyName: this.state.companyName,
          remarks: this.state.remarks,
          price: this.state.price,
          shares: this.state.shares,
          openDateTime: this.state.openDateTime
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newIpo() {
    this.setState({
      id: null,
      price: 0.0,
      shares: 0,
      openDateTime: "",
      remarks: "",
      companyName: "",
      stockExchangeName: "",
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newIpo}>
              Add
            </button>
            <Link to={"/ipos/"}>Go Back</Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
                <label htmlFor="companyName">Ipo</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={this.state.companyName}
                  onChange={this.onChangeCompanyName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Stock Exchange</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.stockExchangeName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  value={this.state.remarks}
                  onChange={this.onChangeRemarks}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shares">Shares</label>
                <input
                  type="number"
                  className="form-control"
                  id="shares"
                  value={this.state.shares}
                  onChange={this.onChangeShares}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="float"
                  className="form-control"
                  id="price"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="openDateTime">Open Date Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="openDateTime"
                  value={this.state.openDateTime}
                  onChange={this.onChangeDateTime}
                />
              </div>

            <button onClick={this.saveIpo} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
