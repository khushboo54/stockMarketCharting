import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";

export default class Company extends Component {
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
    this.getCompany = this.getCompany.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);

    this.state = {
      currentCompany: {
        id: null,
        companyName: "",
        ceo: "",
        boardOfDirectors: "",
        description: "",
        turnover: 0.0,
        companyCode: "",
        stockExchangeName: "",
        sectorName: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCompany(this.props.match.params.id);
    
  }

  onChangeStockExchangeName(e) {
    const stockExchangeName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          stockExchangeName: stockExchangeName
        }
      };
    });
  }

  onChangeCompanyName(e) {
    const companyName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          companyName: companyName
        }
      };
    });
  }

  onChangeSectorName(e) {
    const sectorName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          sectorName: sectorName
        }
      };
    });
  }

  onChangeCeo(e) {
    const ceo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          ceo : ceo
        }
      };
    });
  }

  onChangeCode(e) {
    const companyCode = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          companyCode: companyCode
        }
      };
    });
  }

  onChangeTurnover(e) {
    const turnover = e.target.value;
    
    this.setState(prevState => ({
      currentCompany: {
        ...prevState.currentCompany,
        turnover: turnover
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCompany: {
        ...prevState.currentCompany,
        description : description
      }
    }));
  }

  onChangeDirectors(e) {
    const boardOfDirectors = e.target.value;
    
    this.setState(prevState => ({
      currentCompany: {
        ...prevState.currentCompany,
        boardOfDirectors : boardOfDirectors
      }
    }));
  }

  getCompany(id) {
    CompanyService.findById(id)
      .then(response => {
        this.setState({
          currentCompany: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  updateCompany() {
    CompanyService.update(
      this.state.currentCompany
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The sector was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCompany() {    
    CompanyService.delete(this.state.currentCompany.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/companies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCompany } = this.state;

    return (
      <div>
        {currentCompany ? (
          <div className="edit-form">
            <h4>Company</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCompany.companyName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
              <label htmlFor="ceo">CEO</label>
              <input
                type="text"
                className="form-control"
                id="ceo"
                required
                value={currentCompany.ceo}
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
                value={currentCompany.boardOfDirectors}
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
                value={currentCompany.description}
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
                value={currentCompany.turnover}
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
                value={currentCompany.companyCode}
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
                value={currentCompany.stockExchangeName}
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
                value={currentCompany.sectorName}
                onChange={this.onChangeSectorName}
                name="sectorName"
              />
            </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCompany}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCompany}
            >
              Update
            </button>
            <p>{this.state.message}</p>
            <Link to={"/companies/"}>Go Back</Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a ...</p>
          </div>
        )}
      </div>
    );
  }
}