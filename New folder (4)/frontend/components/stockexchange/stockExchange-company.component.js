import React, { Component } from "react";
import StockExchangeService from "../../services/stockexchange.service";
import { Link } from "react-router-dom";

export default class StockExchangeCompany extends Component {
  constructor(props) {
    super(props);
    this.getCompanies = this.getCompanies.bind(this);
    this.setActiveCompany = this.setActiveCompany.bind(this);
    this.refreshList = this.refreshList.bind(this); 

    this.state = {
      companies: [],
      currentCompany: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.getCompanies(this.props.match.params.id);
    
  }

  getCompanies(id) {
    StockExchangeService.findCompanies(id)
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

  setActiveCompany(company, index) {
    this.setState({
      currentCompany: company,
      currentIndex: index
    });
  }

  refreshList() {
    this.getCompanies();
    this.setState({
      currentCompany: null,
      currentIndex: -1
    });
  }

  render() 
  {
    const { companies, currentCompany, currentIndex } = this.state;

    return (
        <div className="list row" >
        <div className="col-md-6">
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
            </div>
          ):(
            <div>
              <br />
              <p>Please click on a Company...</p>
            </div>
          ) }
        <Link to={"/stockExchanges/"}>Go Back</Link>
        </div>
      </div>
    );
  }
}
