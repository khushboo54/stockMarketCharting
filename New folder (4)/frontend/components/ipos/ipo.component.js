import React, { Component } from "react";
import IpoService from "../../services/ipo.service";
import { Link } from "react-router-dom";

export default class Ipo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeShares = this.onChangeShares.bind(this);
    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.getIpo = this.getIpo.bind(this);
    this.updateIpo = this.updateIpo.bind(this);
    this.deleteIpo = this.deleteIpo.bind(this);

    this.state = {
      currentIpo: {
        id: null,
        price: 0.0,
        shares: 0,
        openDateTime: "",
        remarks: "",
        companyName: "",
        stockExchangeName: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getIpo(this.props.match.params.id);
    
  }

  onChangeName(e) {
    const stockExchangeName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentIpo: {
          ...prevState.currentIpo,
          stockExchangeName: stockExchangeName
        }
      };
    });
  }

  onChangeCompanyName(e) {
    const companyName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentIpo: {
          ...prevState.currentIpo,
          companyName: companyName
        }
      };
    });
  }

  onChangeDateTime(e) {
    const openDateTime = e.target.value;
    
    this.setState(prevState => ({
      currentIpo: {
        ...prevState.currentIpo,
        openDateTime: openDateTime
      }
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentIpo: {
        ...prevState.currentIpo,
        price: price
      }
    }));
  }

  onChangeRemarks(e) {
    const remarks = e.target.value;
    
    this.setState(prevState => ({
      currentIpo: {
        ...prevState.currentIpo,
        remarks: remarks
      }
    }));
  }

  onChangeShares(e) {
    const shares = e.target.value;
    
    this.setState(prevState => ({
      currentIpo: {
        ...prevState.currentIpo,
        shares: shares
      }
    }));
  }

  getIpo(id) {
    IpoService.findById(id)
      .then(response => {
        this.setState({
          currentIpo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  updateIpo() {
    IpoService.update(
      this.state.currentIpo
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The IPO was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteIpo() {    
    IpoService.delete(this.state.currentIpo.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/ipos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentIpo } = this.state;

    return (
      <div>
        {currentIpo ? (
          <div className="edit-form">
            <h4>Ipo</h4>
            <form>
            <div className="form-group">
                <label htmlFor="companyName">Ipo</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={currentIpo.companyName}
                  onChange={this.onChangeCompanyName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Stock Exchange</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentIpo.stockExchangeName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  value={currentIpo.remarks}
                  onChange={this.onChangeRemarks}
                />
              </div>
              <div className="form-group">
                <label htmlFor="shares">Shares</label>
                <input
                  type="number"
                  className="form-control"
                  id="shares"
                  value={currentIpo.shares}
                  onChange={this.onChangeShares}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="float"
                  className="form-control"
                  id="price"
                  value={currentIpo.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label htmlFor="openDateTime">Open Date Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="openDateTime"
                  value={currentIpo.openDateTime}
                  onChange={this.onChangeDateTime}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteIpo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateIpo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
            <Link to={"/ipos/"}>Go Back</Link>
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