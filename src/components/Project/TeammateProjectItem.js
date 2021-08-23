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