import React, { Component } from "react";
import SectorService from "../../services/sector.service";

export default class AddSector extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveSector = this.saveSector.bind(this);
    this.newSector = this.newSector.bind(this);

    this.state = {
      id: null,
      name: "",
      description: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveSector() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    SectorService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newSector() {
    this.setState({
      id: null,
      name: "",
      description: ""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSector}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Sector</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveSector} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
