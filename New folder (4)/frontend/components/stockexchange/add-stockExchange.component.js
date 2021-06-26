import React, { Component } from "react";
import StockExchangeService from "../../services/stockexchange.service";
import { Link } from "react-router-dom";

export default class AddStockExchange extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBrief = this.onChangeBrief.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
    this.saveStockExchange = this.saveStockExchange.bind(this);
    this.newStockExchange = this.newStockExchange.bind(this);

    this.state = {
      id: null,
      stockExchangeName: "",
      brief: "",
      remarks: "",
      contactAddress: ""
    };
  }

  onChangeName(e) {
    this.setState({
      stockExchangeName: e.target.value
    });
  }

  onChangeBrief(e) {
    this.setState({
      brief: e.target.value
    });
  }

  onChangeRemarks(e) {
    this.setState({
      remarks: e.target.value
    });
  }

  onChangeContactAddress(e) {
    this.setState({
      contactAddress: e.target.value
    });
  }

  saveStockExchange() {
    var data = {
      stockExchangeName: this.state.stockExchangeName,
      brief: this.state.brief,
      remarks: this.state.remarks,
      contactAddress: this.state.contactAddress
    };

    StockExchangeService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          stockExchangeName: this.state.stockExchangeName,
          brief: this.state.brief,
          remarks: this.state.remarks,
          contactAddress: this.state.contactAddress
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newStockExchange() {
    this.setState({
      id: null,
      stockExchangeName: "",
      brief: "",
      remarks: "",
      contactAddress: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStockExchange}>
              Add
            </button>
            <Link to={"/stockExchanges/"}>Go Back</Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">StockExchange</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.stockExchangeName}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="brief">Brief</label>
              <input
                type="text"
                className="form-control"
                id="brief"
                required
                value={this.state.brief}
                onChange={this.onChangeBrief}
                name="brief"
              />
            </div>

            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <input
                type="text"
                className="form-control"
                id="remarks"
                required
                value={this.state.remarks}
                onChange={this.onChangeRemarks}
                name="remarks"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactAddress">Contact Address</label>
              <input
                type="text"
                className="form-control"
                id="contactAddress"
                required
                value={this.state.contactAddress}
                onChange={this.onChangeContactAddress}
                name="contactAddress"
              />
            </div>

            <button onClick={this.saveStockExchange} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
