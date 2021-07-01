import React, { Component } from 'react'
import NewStatusColumn from './ProjectTasks/NewStatusColumn';
import ProjectTask from './ProjectTasks/ProjectTask'
// import {getProject} from '../../actions/projectActions'
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

 class Backlog extends Component {
    constructor(props){
        super(props);
        this.state = { 
            clickedButton:false,
            newColumnName:""
        };
        this.handleClick = this.handleClick.bind(this);
     }

    handleClick() {
        this.setState({clickedButton : true});
        this.forceUpdate();
      }

    //   componentDidMount() {
    //       let firstTaskSequence= this.props[0].projectSequence;
    //       const projectIdentifier = firstTaskSequence.substring(0, firstTaskSequence.indexOf('-'));
    //     this.props.getProjects(projectIdentifier);
    //   }

     render() {
         const { project_tasks_prop } = this.props;
        //  s = s.substring(0, s.indexOf('-'));
         const tasks = project_tasks_prop.map(project_task => (
             <ProjectTask key={project_task.id} project_task={project_task} />
             
         ));

         let todoItems = [];
         let inProgressItems = [];
         let doneItems = [];

         for (let i = 0; i < tasks.length; i++){
            //  console.log(tasks[i]);
             if (tasks[i].props.project_task.status === "TO_DO") {
                 todoItems.push(tasks[i]);
                 console.log(this.props);
             }
             if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                inProgressItems.push(tasks[i]);
             }
             if (tasks[i].props.project_task.status === "DONE") {
                doneItems.push(tasks[i]);
            }
         }

        return (
            < div className="container">  
                <form class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" class="form-control-plaintext bg-white rounded"/>
                </div>
                <button type="submit" onClick={this.handleClick} className="btn text-light bg-dark mb-2">
                    <i className="fas fa-plus-circle pr-1"></i> Create New Status
                </button>
                </form>

                <div className="row">
                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>       
                        {todoItems}       
                        </div>

                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-info text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {inProgressItems} 
                        </div>

                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {doneItems}   
                        </div>
                    {this.state.clickedButton && <NewStatusColumn></NewStatusColumn>}
                        </div>
                    </div>
        )
    }
}

// Backlog.propTypes = {
//     project: PropTypes.object.isRequired,
//   };
  
//   const mapStateToProps = (state) => ({
//     project: state.project,
//   });

// export default connect(mapStateToProps, { getProject }) (Backlog);

export default Backlog;