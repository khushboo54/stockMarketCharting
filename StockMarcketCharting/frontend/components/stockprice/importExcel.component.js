import React, { Component } from "react";
import StockPriceService from "../../services/stockprice.service";
import { Link } from "react-router-dom";
import XLSX from "xlsx";

export default class StockPriceImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          StockPrice : {
            companyCode: "",
            stockExchangeName:"",
            currentPrice: 0,
            date: "",
            time: ""
          },
          data1: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
          cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
          numberOfRecords: 0,
          companyCode: "",
          stockExchangeName: "",
          fromDate: "",
          toDate: "",
          message: ""
        };
        this.handleFile = this.handleFile.bind(this);
        this.exportFile = this.exportFile.bind(this);
        this.ExcelDateToJSDate = this.ExcelDateToJSDate(this);
      }
      handleFile(file /*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = e => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" ,cellDates: true,cellNF: false,cellText: false});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          console.log(rABS, wb);
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 ,raw:false,dateNF:'dd-mm-yyyy'});
          /* Update state */
          const records = XLSX.utils.sheet_to_json(ws,{raw:true});
          this.setState.numberOfRecords = records.length;
          console.log(this.state.numberOfRecords);
          records.filter(record => {
          this.state.StockPrice = {
              companyCode: record["Company Code"],
              stockExchangeName: record["Stock Exchange"],
              currentPrice: record["Price Per Share(in Rs)"],
              date: ExcelDateToJSDate(record["Date"]),
              time: record["Time"].toString().trim()
            }
            console.log(typeof this.state.StockPrice.date);
            this.state.data1.push(this.state.StockPrice);
            });
          console.log(this.state.data1);
          this.setState({ data: data, cols: make_cols(ws["!ref"]) });
          };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
      }
      ExcelDateToJSDate(serial) {
        var utc_days  = Math.floor(serial - 25569);
        var utc_value = utc_days * 86400;                                        
        var date_info = new Date(utc_value * 1000);
     
        var fractional_day = serial - Math.floor(serial) + 0.0000001;
     
        var total_seconds = Math.floor(86400 * fractional_day);
     
        var seconds = total_seconds % 60;
     
        total_seconds -= seconds;
     
        var hours = Math.floor(total_seconds / (60 * 60));
        var minutes = Math.floor(total_seconds / 60) % 60;
     
        return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
     }
      exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        StockPriceService.create(JSON.stringify(this.state.data1))
        console.log(JSON.stringify(this.state.data1));
        this.setState.message = "Data imported";
       // XLSX.writeFile(wb, "sheetjs.xlsx");

      }
      render() {
        return (
          <DragDropFile handleFile={this.handleFile}>
            <div className="row">
              <div className="col-xs-12">
                <DataInput handleFile={this.handleFile} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <button
                  disabled={!this.state.data.length}
                  className="btn btn-success"
                  onClick={this.exportFile}
                >
                  Add Data
                </button>
              </div>
            </div>
            <div>{this.state.message}</div>
            <div className="row">
              <div className="col-xs-12">
                <OutTable data={this.state.data} cols={this.state.cols} />
              </div>
            </div>
            <Link to={"/"}>Go Back</Link>
          </DragDropFile>
        );
    }
}

class DragDropFile extends React.Component {
    constructor(props) {
      super(props);
      this.onDrop = this.onDrop.bind(this);
    }
    suppress(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    onDrop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      const files = evt.dataTransfer.files;
      if (files && files[0]) this.props.handleFile(files[0]);
    }
    render() {
      return (
        <div
          onDrop={this.onDrop}
          onDragEnter={this.suppress}
          onDragOver={this.suppress}
        >
          {this.props.children}
        </div>
      );
    }
 }
  
  /*
    Simple HTML5 file input wrapper
    usage: <DataInput handleFile={callback} />
      handleFile(file:File):void;
  */
  class DataInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
      const files = e.target.files;
      if (files && files[0]) this.props.handleFile(files[0]);
    }
    render() {
      return (
        <form className="form-inline">
          <div className="form-group">
            <label htmlFor="file">Spreadsheet</label>
            <input
              type="file"
              className="form-control"
              id="file"
              accept={SheetJSFT}
              onChange={this.handleChange}
            />
          </div>
        </form>
      );
    }
  }
  
  class OutTable extends React.Component {
    render() {
      return (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {this.props.cols.map(c => (
                  <th key={c.key}>{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((r, i) => (
                <tr key={i}>
                  {this.props.cols.map(c => (
                    <td key={c.key}>{r[c.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  /* list of supported file types */
  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm"
  ]
    .map(function(x) {
      return "." + x;
    })
    .join(",");
  
  /* generate an array of column objects */
  const make_cols = refstr => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };
  