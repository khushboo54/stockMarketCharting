import React, { Component } from "react";
import StockExchangeService from "../../services/stockexchange.service";
import { Link } from "react-router-dom";

export default class StockExchange extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBrief = this.onChangeBrief.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
    this.getStockExchange = this.getStockExchange.bind(this);
    this.updateStockExchange = this.updateStockExchange.bind(this);
    this.deleteStockExchange = this.deleteStockExchange.bind(this);

    this.state = {
      currentStockExchange: {
        id: null,
        stockExchangeName: "",
        brief: "",
        remarks: "",
        contactAddress: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStockExchange(this.props.match.params.id);
    
  }

  onChangeName(e) {
    const stockExchangeName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStockExchange: {
          ...prevState.currentStockExchange,
          stockExchangeName: stockExchangeName
        }
      };
    });
  }

  onChangeBrief(e) {
    const brief = e.target.value;
    
    this.setState(prevState => ({
      currentStockExchange: {
        ...prevState.currentStockExchange,
        brief: brief
      }
    }));
  }

  onChangeRemarks(e) {
    const remarks = e.target.value;
    
    this.setState(prevState => ({
      currentStockExchange: {
        ...prevState.currentStockExchange,
        remarks: remarks
      }
    }));
  }

  onChangeContactAddress(e) {
    const contactAddress = e.target.value;
    
    this.setState(prevState => ({
      currentStockExchange: {
        ...prevState.currentStockExchange,
        contactAddress: contactAddress
      }
    }));
  }

  getStockExchange(id) {
    StockExchangeService.findById(id)
      .then(response => {
        this.setState({
          currentStockExchange: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  updateStockExchange() {
    StockExchangeService.update(
      this.state.currentStockExchange
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

  deleteStockExchange() {    
    StockExchangeService.delete(this.state.currentStockExchange.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/stockExchanges')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentStockExchange } = this.state;

    return (
      <div>
        {currentStockExchange ? (
          <div className="edit-form">
            <h4>StockExchange</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">StockExchange</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStockExchange.stockExchangeName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Brief</label>
                <input
                  type="text"
                  className="form-control"
                  id="brief"
                  value={currentStockExchange.brief}
                  onChange={this.onChangeBrief}
                />
              </div>
              <div className="form-group">
                <label htmlFor="remarks">Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  id="remarks"
                  value={currentStockExchange.remarks}
                  onChange={this.onChangeRemarks}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactAddress">ContactAddress</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactAddress"
                  value={currentStockExchange.contactAddress}
                  onChange={this.onChangeContactAddress}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStockExchange}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStockExchange}
            >
              Update
            </button>
            <p>{this.state.message}</p>
            <Link to={"/stockExchanges/"}>Go Back</Link>
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