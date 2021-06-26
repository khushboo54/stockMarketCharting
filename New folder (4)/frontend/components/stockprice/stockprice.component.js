import React, { Component } from "react";
import StockPriceService from "../../services/stockprice.service";
import { Link } from "react-router-dom";

export default class StockPrice extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCurrentPrice = this.onChangeCurrentPrice.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeCompanyCode = this.onChangeCompanyCode.bind(this);
    this.getStockPrice = this.getStockPrice.bind(this);
    this.updateStockPrice = this.updateStockPrice.bind(this);
    this.deleteStockPrice = this.deleteStockPrice.bind(this);

    this.state = {
      currentStockPrice: {
        id: null,
        currentPrice: 0.0,
        time: "",
        date: "",
        companyCode: "",
        stockExchangeName: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStockPrice(this.props.match.params.id);
    
  }

  onChangeName(e) {
    const stockExchangeName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStockPrice: {
          ...prevState.currentStockPrice,
          stockExchangeName: stockExchangeName
        }
      };
    });
  }

  onChangeCompanyCode(e) {
    const companyCode = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStockPrice: {
          ...prevState.currentStockPrice,
          companyCode: companyCode
        }
      };
    });
  }

  onChangeDate(e) {
    const date = e.target.value;
    
    this.setState(prevState => ({
      currentStockPrice: {
        ...prevState.currentStockPrice,
        date: date
      }
    }));
  }

  onChangeTime(e) {
    const time = e.target.value;
    
    this.setState(prevState => ({
      currentStockPrice: {
        ...prevState.currentStockPrice,
        time : time
      }
    }));
  }

  onChangeCurrentPrice(e) {
    const currentPrice = e.target.value;
    
    this.setState(prevState => ({
      currentStockPrice: {
        ...prevState.currentStockPrice,
        currentPrice: currentPrice
      }
    }));
  }

  getStockPrice(id) {
    StockPriceService.findById(id)
      .then(response => {
        this.setState({
          currentStockPrice: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  updateStockPrice() {
    StockPriceService.update(
      this.state.currentStockPrice
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Stock Price was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStockPrice() {    
    StockPriceService.delete(this.state.currentStockPrice.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/companies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentStockPrice } = this.state;

    return (
      <div>
        {currentStockPrice ? (
          <div className="edit-form">
            <h4>StockPrice</h4>
            <form>
            <div className="form-group">
                <label htmlFor="companyName">Company Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={currentStockPrice.companyCode}
                  onChange={this.onChangeCompanyCode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Stock Exchange</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStockPrice.stockExchangeName}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentStockPrice.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  value={currentStockPrice.time}
                  onChange={this.onChangeTime}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Current Price</label>
                <input
                  type="float"
                  className="form-control"
                  id="price"
                  value={currentStockPrice.currentPrice}
                  onChange={this.onChangeCurrentPrice}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStockPrice}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStockPrice}
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