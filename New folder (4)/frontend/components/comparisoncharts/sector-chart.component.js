import React, { Component } from "react";
import { Chart } from 'chart.js';
import StockPriceService from "../../services/stockprice.service";
//import { Link } from "react-router-dom";

export default class SectorChart extends Component {
    constructor(props) {
        super(props);
        this.onChangeStockExchangeName = this.onChangeStockExchangeName.bind(this);
        this.onChangePeriodicity = this.onChangePeriodicity.bind(this);
        this.onChangeSectorName = this.onChangeSectorName.bind(this);
        this.onChangeFromPeriod = this.onChangeFromPeriod.bind(this);
        this.onChangeToPeriod = this.onChangeToPeriod.bind(this);
        this.CompareSector = this.CompareSector.bind(this);
        this.newCompareSector = this.newCompareSector.bind(this);
        this.chartRef = React.createRef();
    
        this.state = {
          stockExchangeName: "",
          sectorName: "",
          fromPeriod: "",
          toPeriod: "",
          periodicity: "",
          prices: [],
          dates: []
        };
      }
    
      onChangeStockExchangeName(e) {
        this.setState({
          stockExchangeName: e.target.value
        });
      }
    
      onChangeSectorName(e) {
        this.setState({
          sectorName: e.target.value
        });
      }
    
      onChangePeriodicity(e) {
        this.setState({
          periodicity: e.target.value
        });
      }
    
      onChangeToPeriod(e) {
        this.setState({
          toPeriod: e.target.value
        });
      }
    
      onChangeFromPeriod(e) {
        this.setState({
          fromPeriod: e.target.value
        });
      }
    
    
      CompareSector() {
        var data = {
          stockExchangeName: this.state.stockExchangeName,
          sectorName: this.state.sectorName,
          fromPeriod: this.state.fromPeriod,
          toPeriod: this.state.toPeriod,
          periodicity: this.state.periodicity
        };
        
        console.log(data);
    
        StockPriceService.sectorcomp(data)
          .then(response => {
            console.log(response);
            let prices = response.map(res => res.price);
            let dates = response.map(res => res.date);
            console.log(prices);
            console.log(dates);
            this.setState({
              prices: prices,
              dates: dates 
            });
            this.myChart = new Chart(this.chartRef.current, {
              type: 'line',
              data: {
                labels: this.state.dates,
                datasets: [
                  {
                    data: this.state.prices,
                    borderColor: "#3cba9f",
                    fill: false
                  },
                ]
              },
              options: {
                legend: {
                  display: false
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }],
                }
              }
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      newCompareSector() {
        this.setState({
            stockExchangeName: "",
            sectorName: "",
            fromPeriod: "",
            toPeriod: "",
            periodicity: ""
        });
      }

    render(){
        return(
            <div className="card">
            <div className="card-header">
              Comparison Charts
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="stockExchangeName">Select Stock Exchange</label>
                  <select
                    type="text"
                    className="form-control"
                    value={this.state.stockExchangeName}
                    onChange={this.onChangeStockExchangeName}
                    name="stockExchangeName" required>
                    <option value="BSE">BSE</option>
                    <option value="NSE">NSE</option>
                  </select>
                </div>
          
                <div className="form-group">
                  <label htmlFor="name">Sector Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.sectorName}
                    onChange={this.onChangeSectorName}
                    required></input>
                  <div className="invalid-feedback">
                    Company Name required
                </div>
          
                <div className="form-group">
                  <label htmlFor="fromPeriod">From Period (dd-MM-YYYY)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fromPeriod"
                    value={this.state.fromPeriod}
                    onChange={this.onChangeFromPeriod}
                    required></input>
                  <div className="invalid-feedback">
                    From Period required
                  </div>
                </div>
          
                <div className="form-group">
                  <label htmlFor="toPeriod">To Period (dd-MM-YYYY)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.toPeriod}
                    onChange={this.onChangeToPeriod}
                    name="toPeriod"></input>
                   <div className="invalid-feedback">
                    To Period required
                  </div>
                </div>
          
                <div className="form-group">
                  <label htmlFor="periodicity">Specify Periodicity</label>
                  <select
                    type="text"
                    className="form-control"
                    name="periodicity"
                    value={this.state.periodicity}
                    onChange={this.onChangePeriodicity}
                    required>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Year">Year</option>
                  </select>
                  <div className="invalid-feedback">
                    Periodicity required
                  </div>
                </div>
                <button onClick={this.CompareSector} className="btn btn-success">
                    Generate Map
                </button>
                    </div>
                    </form>
                    </div>
          <div>
          <canvas ref={this.chartRef} />
      </div>
            </div>
        );
    }
}