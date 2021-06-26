import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSector from "./components/sectors/add-sector.component";
import Sector from "./components/sectors/sector.component";
import SectorsList from "./components/sectors/sectors-list.component";
import SectorCompany from "./components/sectors/sector-company.component";

import AddStockExchange from "./components/stockexchange/add-stockExchange.component";
import StockExchange from "./components/stockexchange/stockExchange.component";
import StockExchangesList from "./components/stockexchange/stockExchanges-list.component";
import StockExchangeCompany from "./components/stockexchange/stockExchange-company.component";

import AddIpo from "./components/ipos/add-ipo.component";
import Ipo from "./components/ipos/ipo.component";
import IposList from "./components/ipos/ipos-list.component";

import AddCompany from "./components/company/add-company.component";
import CompaniesList from "./components/company/companies-list.component";
import Company from "./components/company/company.component";
import CompanyIpos from "./components/company/company-ipos.component";
import CompanyStockPrice from "./components/company/company-stockprice.component";

import StockPrice from "./components/stockprice/stockprice.component";
import StockPriceImport from "./components/stockprice/importExcel.component";

import SectorChart from "./components/comparisoncharts/sector-chart.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Stock Market Charting
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/sectors"} className="nav-link">
                Sectors
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/stockExchanges"} className="nav-link">
                StockExchange
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/ipos"} className="nav-link">
                IPO
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/companies"} className="nav-link">
                Company
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/importstockprice"} className="nav-link">
                Import Excel
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/compsector"} className="nav-link">
                Compare Sector
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path= "/sectors" component={SectorsList} />
            <Route exact path="/sectors/add" component={AddSector} />
            <Route path="/sectors/:id" component={Sector} />
            <Route path="/sectorscomp/:id" component={SectorCompany} />
            <Route path="/stockExchanges" component={StockExchangesList}/>
            <Route path="/stockExchangesadd" component={AddStockExchange} />
            <Route exact path="/stockExchangesedit/:id" component={StockExchange} />
            <Route path="/stockExchangescomp/:id" component={StockExchangeCompany} />
            <Route path="/ipos" component={IposList}/>
            <Route path="/iposadd" component={AddIpo} />
            <Route exact path="/ipoedit/:id" component={Ipo} />
            <Route path="/companies" component={CompaniesList}/>
            <Route path="/companyadd" component={AddCompany} />
            <Route exact path="/companyedit/:id" component={Company} />
            <Route path="/companyipo/:id" component={CompanyIpos} />
            <Route path="/companystockprice/:id" component={CompanyStockPrice} />
            <Route exact path="/stockpricedit/:id" component={StockPrice} />
            <Route path="/importstockprice" component={StockPriceImport} />
            <Route path="/compsector" component={SectorChart}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
