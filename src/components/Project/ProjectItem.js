import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import axios from "axios";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {teammates: [], value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick= this.handleClick.bind(this)
  }

  handleClick(event) { 
    axios.get(`/api/project/team/${this.props.project.projectIdentifier}`).then(
      (response)=>{
        console.log(response.data);
        this.setState({
          teammates: response.data
        }); 
        event.target.nextElementSibling.classList.toggle('show');
      } 
  )  
   }

  handleChange(event) {    this.setState({value: event.target.value});  }

  handleSubmit(event) {
    event.preventDefault();
    const newTeammate ={};
    axios.post(`/api/project/team/${this.props.project.projectIdentifier}/${this.state.value}`, newTeammate).then(
      (response)=>{
          console.log(response.data);
      }
  )   
  this.setState({value:''});
  }


  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  
  render() {
    const { project } = this.props;
    // const {teammates} =this.state;

    return (
      <div className="container">
        <div className="container bg-info text-info rounded-top project-teal-line">Project</div>
        <div className="card card-body mb-3 opacity floating-card-project no-border">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto font-weight-bold">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>

              {project.start_date &&
              <p>Start date: {project.start_date}</p>}
              
              {project.end_date &&
              <p>End date: <span className="text-danger font-weight-bold">{project.end_date}</span></p>
              }
              <form onSubmit={this.handleSubmit}>
                <label>
                Add TeamMate:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
                    <input type="submit" value="Submit" />
              </form>
              
              
            </div>

            <div className="col-md-4 d-none d-lg-block px-md-5">
              <ul className="list-group project-buttons-set">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item text-dark bg-transparent border border-dark rounded">
                    <i className="fa fa-flag-checkered pr-1"> </i> Project Board
                  </li>
                </Link>
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item bg-transparent border border-dark rounded">
                    <i className="fa fa-edit pr-1"> </i> Update Project Info
                  </li>
                </Link>

                <li
                  className="list-group-item text-dark bg-transparent border border-dark rounded"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> </i> Delete Project
                </li>

                <li className="list-group-item text-dark bg-transparent border border-dark rounded">
                <div className="dropdown">
                  <button onClick={this.handleClick} 
                    className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Teammates
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {this.state.teammates && 
                      (this.state.teammates.map(item =>(  
                        <a className="dropdown-item"  key={item.id} href="#">{item.username}</a>
                      )))
                  }
                  </div>
                </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
