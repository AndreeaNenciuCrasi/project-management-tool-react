import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TeammateProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {projects: [], teammates: []};
        this.handleClick= this.handleClick.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/project/team/teamProjects`).then(
            (response)=>{
              console.log(response.data);
              this.setState({
                projects: response.data
              }); 
            } 
        )  
    }
    handleClick(projectIdentifier) { 
      axios.get(`/api/project/team/${projectIdentifier}`).then(
        (response)=>{
          console.log(response.data);
          this.setState({
            teammates: response.data
          }); 
          
        } 
    )  
     }

    render(){
        const {projects} = this.state;
        return(
            <div className="container">
            <div className="container bg-info text-info rounded-top project-teal-line">Project</div>
            <div className="card card-body mb-3 opacity floating-card-project no-border">

            {projects && (
                projects.map(project=>(

              <div className="row">
                <div className="col-2">
                  <span className="mx-auto font-weight-bold">{project.projectIdentifier}</span>
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                  <h3>{project.projectName}</h3>
                  <p>Project Owner: {project.projectLeader}</p>
                  
                      {/* <button onClick={this.handleClick(project.projectIdentifier)} >
                        Teammates
                      </button> */}
    
                  {this.state.teammates && 
                          (this.state.teammates.map(item =>( 
                            <p  key={item.id} href="#">{item.username}</p>
                          )))
                      }
                    
                  <p>Description: {project.description}</p>
    
                  {project.start_date &&
                  <p>Start date: {project.start_date}</p>}
                  
                  {project.end_date &&
                  <p>End date: <span className="text-danger font-weight-bold">{project.end_date}</span></p>
                  }
                  
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
    
                    {/* <li
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
                          
                            <a className="dropdown-item"  key={item.id} href="#">{item.username} <button onClick={(e)=>{this.handleDeleteTeammate(e, item.id)}} className="btn text-light bg-info btn-sml">x</button></a>
                          )))
                      }
                      </div>
                    </div>
                    </li> */}
                  </ul>
                </div>
                </div>
                
                )))}
                
            </div>
          </div>
        )
    }
}

export default TeammateProjectItem;