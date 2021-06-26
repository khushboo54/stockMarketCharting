import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";

export default class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCompanies = this.retrieveCompanies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCompany = this.setActiveCompany.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

    this.state = {
      companies: [],
      searchTitle: "",
      currentCompany: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveCompanies();
  }

  onChangeSearchTitle(e) {
    this.setState({
      searchTitle: e.target.value
    });
  }

  retrieveCompanies() {
    CompanyService.findAll()
      .then(response => {
        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  refreshList() {
    this.retrieveCompanies();
    this.setState({
      currentCompany: null,
      currentIndex: -1
    });
  }

  setActiveCompany(company, index) {
    this.setState({
      currentCompany: company,
      currentIndex: index
    });
  }

  searchTitle() {
    CompanyService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          companies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}

  render() {
    const { searchTitle,companies, currentCompany, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h4>Companies List</h4>

          <ul className="list-group">
            {companies &&
              companies.map((company, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCompany(company, index)}
                  key={index}
                >
                  {company.companyName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCompany ? (
            <div>
              <h4>Company</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentCompany.id}
              </div>
              <div>
                <label>
                  <strong>Company:</strong>
                </label>{" "}
                {currentCompany.companyName}
              </div>
              <div>
                <label>
                  <strong>CEO:</strong>
                </label>{" "}
                {currentCompany.ceo}
              </div>
              <div>
                <label>
                  <strong>Board of Directors:</strong>
                </label>{" "}
                {currentCompany.boardOfDirectors}
              </div>
              <div>
                <label>
                  <strong>Turnover:</strong>
                </label>{" "}
                {currentCompany.turnover}
              </div>
              <div>
                <label>
                  <strong>Stock Exchange:</strong>
                </label>{" "}
                {currentCompany.stockExchangeName}
              </div>
              <div>
                <label>
                  <strong>Sector:</strong>
                </label>{" "}
                {currentCompany.sectorName}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCompany.description}
              </div>

              <Link
                to={"/companyedit/" + currentCompany.id}
                className="badge badge-warning"
              >
                  Edit
              </Link>
              <Link
                to={"/companyipo/" + currentCompany.id}
                className="badge badge-warning"
              >
                  IPOs
              </Link>
              <Link
                to={"/companystockprice/" + currentCompany.id}
                className="badge badge-warning"
              >
                  StockPrice
              </Link>
          
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Company...</p>
            </div>
          )}
        </div>
        <Link to={"/companyadd/"}>Add Company</Link>
      </div>
    );
  }
}