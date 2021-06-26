import React, { Component } from "react";
import SectorService from "../../services/sector.service";
import { Link } from "react-router-dom";

export default class SectorsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveSectors = this.retrieveSectors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSector = this.setActiveSector.bind(this);

    this.state = {
      sectors: [],
      currentSector: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveSectors();
  }

  retrieveSectors() {
    SectorService.findAll()
      .then(response => {
        this.setState({
          sectors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  refreshList() {
    this.retrieveSectors();
    this.setState({
      currentSector: null,
      currentIndex: -1
    });
  }

  setActiveSector(sector, index) {
    this.setState({
      currentSector: sector,
      currentIndex: index
    });
  }

  render() {
    const { sectors, currentSector, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Sectors List</h4>

          <ul className="list-group">
            {sectors &&
              sectors.map((sector, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSector(sector, index)}
                  key={index}
                >
                  {sector.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentSector ? (
            <div>
              <h4>Sector</h4>
              <div>
                <label>
                  <strong>ID:</strong>
                </label>{" "}
                {currentSector.id}
              </div>
              <div>
                <label>
                  <strong>Sector:</strong>
                </label>{" "}
                {currentSector.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentSector.description}
              </div>

              <Link
                to={"/sectors/" + currentSector.id}
                className="badge badge-warning"
              >
                  Edit
              </Link>

              <Link
                to={"/sectorscomp/" + currentSector.id}
                className="badge badge-warning"
              >
                  Companies
              </Link>
          
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Sector...</p>
            </div>
          )}
        </div>
        <Link to={"/sectors/add/"}>Add Sector</Link>
      </div>
    );
  }
}