import React, { Component } from "react";
import StockExchangeService from "../../services/stockexchange.service";
import { Link } from "react-router-dom";

export default class StockExchangesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStockExchanges = this.retrieveStockExchanges.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStockExchange = this.setActiveStockExchange.bind(this);

    this.state = {
      stockexchanges: [],
      currentStockExchange: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveStockExchanges();
  }

  retrieveStockExchanges() {
    StockExchangeService.findAll()
      .then(response => {
        this.setState({
          stockexchanges: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  refreshList() {
    this.retrieveStockExchanges();
    this.setState({
      currentStockExchange: null,
      currentIndex: -1
    });
  }

  setActiveStockExchange(stockexchange, index) {
    this.setState({
      currentStockExchange: stockexchange,
      currentIndex: index
    });
  }

  render() {
    const { stockexchanges, currentStockExchange, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>StockExchanges List</h4>

          <ul className="list-group">
            {stockexchanges &&
              stockexchanges.map((stockexchange, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStockExchange(stockexchange, index)}
                  key={index}
                >
                  {stockexchange.stockExchangeName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentStockExchange ? (
            <div>
              <h4>StockExchange</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentStockExchange.id}
              </div>
              <div>
                <label>
                  <strong>StockExchange:</strong>
                </label>{" "}
                {currentStockExchange.stockExchangeName}
              </div>
              <div>
                <label>
                  <strong>Brief:</strong>
                </label>{" "}
                {currentStockExchange.brief}
              </div>
              <div>
                <label>
                  <strong>Remarks:</strong>
                </label>{" "}
                {currentStockExchange.remarks}
              </div>
              <div>
                <label>
                  <strong>Contact Address:</strong>
                </label>{" "}
                {currentStockExchange.contactAddress}
              </div>

              <Link
                to={"/stockExchangesedit/" + currentStockExchange.id}
                className="badge badge-warning"
              >
                  Edit
              </Link>

              <Link
                to={"/stockExchangescomp/" + currentStockExchange.id}
                className="badge badge-warning"
              >
                  Companies
              </Link>
          
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a StockExchange...</p>
            </div>
          )}
        </div>
        <Link to={"/stockExchangesadd/"}>Add Stock Exchange</Link>
      </div>
    );
  }
}