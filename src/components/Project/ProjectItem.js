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
    this.handleClick= this.handleClick.bind(this);
    this.handleDeleteTeammate = this.handleDeleteTeammate.bind(this);
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

   handleDeleteTeammate(event, userId, projectId){
     console.log(userId);
    axios.delete(`/api/project/team/${userId}/${projectId}`).then(
      (response)=>{
          console.log('item deleted' + userId);
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
        <div className="card">
          <div id="triangle"></div>
          <h2>{project.projectName}</h2>
          <div className="row">
          <div className="col-6">
            <div className="project-description">
          <p><b>Description: </b>{project.description}</p>
          {project.start_date &&
              <p><b>Start date: </b>{project.start_date}</p>}
              
              {project.end_date &&
              <p><b>End date: </b><span className="text-danger font-weight-bold">{project.end_date}</span></p>
              }
              <form onSubmit={this.handleSubmit} className="">
                <label>
                <b>Add: </b>
                    <input type="text" value={this.state.value} onChange={this.handleChange} 
                    placeholder="TeamMate"/>        </label>
                    <input type="submit" value="Submit" className="btn text-light bg-info btn-sm ml-2" />
              </form>
              </div>
          </div>
          
          <div class="col-6">
          <div className="d-lg-block margin-card-buttons">
              <ul className="list-group project-buttons-set">
                
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item text-dark bg-transparent no-border">
                  <button className="btn text-light bg-dark">
                    <i className="fa fa-flag-checkered pr-1 card-buttons"> </i> Project Board</button>
                  </li>
                </Link>
                
                
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item bg-transparent no-border">
                  <button className="btn text-light bg-dark">
                    <i className="fa fa-edit pr-1 card-buttons"> </i> Update Project</button>
                  </li>
                </Link>
                

                <li
                  className="list-group-item text-dark bg-transparent no-border"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <button className="btn text-light bg-dark">
                    <i className="fa fa-minus-circle pr-1"> </i> Delete Project</button>
                </li>

                <li className="list-group-item text-dark bg-transparent no-border ">
                <div className="dropup">
                  <button onClick={this.handleClick} 
                    className="btn text-light bg-dark dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Teammates
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      {this.state.teammates && 
                          (this.state.teammates.map(item =>( 
                            <a className="dropdown-item"  key={item.id} href="#">{item.username} <button onClick={(e)=>{this.handleDeleteTeammate(e, item.id, project.id)}} className="btn text-light bg-info btn-sml">x</button></a>
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
        
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
