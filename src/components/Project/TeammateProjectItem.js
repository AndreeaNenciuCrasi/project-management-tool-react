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
        <h1 className="display-4 text-center mt-5 mb-5">Collaboration</h1>
        <hr></hr>
        {projects && (
                projects.map(project=>(
          <div className="card">
          <div id="triangle"></div>
          <h2>{project.projectName}</h2>
          <div className="row">
          <div className="col-6">
            <div className="project-description">
            <p><b>Project Owner: </b>{project.projectLeader}</p>
            <p><b>Description: </b>{project.description}</p>
          {project.start_date &&
              <p><b>Start date: </b>{project.start_date}</p>}
              
              {project.end_date &&
              <p><b>End date: </b><span className="text-danger font-weight-bold">{project.end_date}</span></p>
              }
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
              </ul>
            </div>
          </div>
          </div>
          
              
        </div>
        )))}
      </div>
        )
    }
}

export default TeammateProjectItem;