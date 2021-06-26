import React, { Component } from "react";
import SectorService from "../../services/sector.service";

export default class Sector extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSector = this.getSector.bind(this);
    this.updateSector = this.updateSector.bind(this);
    this.deleteSector = this.deleteSector.bind(this);

    this.state = {
      currentSector: {
        id: null,
        name: "",
        description: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getSector(this.props.match.params.id);
    
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentSector: {
          ...prevState.currentSector,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentSector: {
        ...prevState.currentSector,
        description: description
      }
    }));
  }

  getSector(id) {
    SectorService.findById(id)
      .then(response => {
        this.setState({
          currentSector: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  updateSector() {
    SectorService.update(
      this.state.currentSector
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

  deleteSector() {    
    SectorService.delete(this.state.currentSector.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/sectors')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentSector } = this.state;

    return (
      <div>
        {currentSector ? (
          <div className="edit-form">
            <h4>Sector</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Sector</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSector.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSector.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSector}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSector}
            >
              Update
            </button>
            <p>{this.state.message}</p>
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