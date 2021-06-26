import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeStockExchangeName = this.onChangeStockExchangeName.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeSectorName = this.onChangeSectorName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTurnover = this.onChangeTurnover.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeCeo = this.onChangeCeo.bind(this);
    this.onChangeDirectors = this.onChangeDirectors.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.newCompany = this.newCompany.bind(this);

    this.state = {
      id: null,
      companyName: "",
      ceo: "",
      boardOfDirectors: "",
      description: "",
      turnover: 0.0,
      companyCode: "",
      stockExchangeName: "",
      sectorName: ""
    };
  }

  onChangeStockExchangeName(e) {
    this.setState({
      stockExchangeName: e.target.value
    });
  }

  onChangeCompanyName(e) {
    this.setState({
      companyName: e.target.value
    });
  }

  onChangeSectorName(e) {
    this.setState({
      sectorName: e.target.value
    });
  }

  onChangeCode(e) {
    this.setState({
      companyCode: e.target.value
    });
  }

  onChangeCeo(e) {
    this.setState({
      ceo: e.target.value
    });
  }

  onChangeDirectors(e) {
    this.setState({
      boardOfDirectors: e.target.value
    });
  }


  onChangeTurnover(e) {
    this.setState({
      turnover: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveCompany() {
    var data = {
      companyName: this.state.companyName,
      ceo: this.state.ceo,
      boardOfDirectors: this.state.boardOfDirectors,
      description: this.state.description,
      turnover: this.state.turnover,
      companyCode: this.state.companyCode,
      stockExchangeName: this.state.stockExchangeName,
      sectorName: this.state.sectorName
    };

    CompanyService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          companyName: this.state.companyName,
          ceo: this.state.ceo,
          boardOfDirectors: this.state.boardOfDirectors,
          description: this.state.description,
          turnover: this.state.turnover,
          companyCode: this.state.companyCode,
          stockExchangeName: this.state.stockExchangeName,
          sectorName: this.state.sectorName
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCompany() {
    this.setState({
      id: null,
      companyName: "",
      ceo: "",
      boardOfDirectors: "",
      description: "",
      turnover: 0.0,
      companyCode: "",
      stockExchangeName: "",
      sectorName: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCompany}>
              Add
            </button>
            <Link to={"/companies/"}>Go Back</Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="companyname">Company</label>
              <input
                type="text"
                className="form-control"
                id="companyname"
                required
                value={this.state.companyName}
                onChange={this.onChangeCompanyName}
                name="companyname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ceo">CEO</label>
              <input
                type="text"
                className="form-control"
                id="ceo"
                required
                value={this.state.ceo}
                onChange={this.onChangeCeo}
                name="ceo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="directors">Board Of Directors</label>
              <input
                type="text"
                className="form-control"
                id="directors"
                required
                value={this.state.boardOfDirectors}
                onChange={this.onChangeDirectors}
                name="directors"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="turnover">Turnover</label>
              <input
                type="float"
                className="form-control"
                id="turnover"
                required
                value={this.state.turnover}
                onChange={this.onChangeTurnover}
                name="turnover"
              />
            </div>

            <div className="form-group">
              <label htmlFor="code">Company Code</label>
              <input
                type="text"
                className="form-control"
                id="code"
                required
                value={this.state.companyCode}
                onChange={this.onChangeCode}
                name="code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stockExchangeName">Stock Exchange Name</label>
              <input
                type="text"
                className="form-control"
                id="stockExchangeName"
                required
                value={this.state.stockExchangeName}
                onChange={this.onChangeStockExchangeName}
                name="stockExchangeName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sectorName">Sector Name</label>
              <input
                type="text"
                className="form-control"
                id="sectorName"
                required
                value={this.state.sectorName}
                onChange={this.onChangeSectorName}
                name="sectorName"
              />
            </div>
            <button onClick={this.saveCompany} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
