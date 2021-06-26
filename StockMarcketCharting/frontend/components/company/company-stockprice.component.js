import React, { Component } from "react";
import CompanyService from "../../services/company.service";
import { Link } from "react-router-dom";

export default class CompanyStockPrice extends Component {
  constructor(props) {
    super(props);
    this.getStockPrices = this.getStockPrices.bind(this);
    this.refreshList = this.refreshList.bind(this); 

    this.state = {
      stockprices: []
    };
  }

  componentDidMount() {
    this.getStockPrices(this.props.match.params.id);
    
  }

  getStockPrices(id) {
    CompanyService.findStockPrices(id)
    .then(response => {
      this.setState({
        stockprices: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    
  }


  refreshList() {
    this.getStockPrices();
  }

  render() 
  {
    const { stockprices } = this.state;

    return (
        <div className="list row" >
        <div className="col-md-12">
          <h4>Stock Prices Table</h4>
          <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Code</th>
              <th scope="col">Current Price</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Stock Exchange</th>
              <th scope="col">Edit Stock Price</th>
            </tr>
          </thead>
          <tbody>
          {stockprices &&
              stockprices.map((stockprice,index) => (
                <tr>
                <td>{index +1}</td>
                <td>{stockprice.companyCode}</td>
                <td>{stockprice.currentPrice}</td>
                <td>{stockprice.date}</td>
                <td>{stockprice.time}</td>
                <td>{stockprice.stockExchangeName}</td>
                <td><Link to={"/stockpricedit/" + stockprice.id}>Edit</Link></td>
              </tr>
              ))}
          </tbody>
        </table>
        </div>
        <Link to={"/companies/"}>Go Back</Link>
        </div>
    );
  }
}
