import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { deleteProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ProjectTask extends Component {
    onDeleteClick(backlog_id, pt_id) {
         this.props.deleteProjectTask(backlog_id, pt_id)
     }
     render() {
         const { project_task } = this.props;
         let priorityString;
         let priorityClass;

         if (project_task.priority === 1) {
             priorityClass = "bg-danger text-dark"
             priorityString= "HIGH"
         }

         if (project_task.priority === 2) {
            priorityClass = "bg-warning text-dark"
            priorityString= "MEDIUM"
         }

         if (project_task.priority === 3) {
            priorityClass = "bg-info text-dark"
            priorityString= "LOW"
         }
         
        return (
            <div>
                <div className="card-task">
                    <div id="circle" className={`${priorityClass}`}></div>
                    <h2>ID: {project_task.projectSequence} {priorityString} Priority</h2>
                    <div className="row padding-text-card-task">
                    <div className="col-7 pl-4">
                    <h5 className="card-title"><b>Summary: </b>{project_task.summary}</h5>
                        <p className="card-text text-truncate ">
                        <b>Acceptance Criteria: </b>{project_task.acceptanceCriteria}
                        </p>
                        {project_task.dueDate && 
                        <p className="card-text text-truncate "><b>Due Date: </b><span className="text-danger">{project_task.dueDate}</span>
                        </p>}
                    </div>
                    <div className="col-5 pl-0">
                        <ul>
                            <li className="list-group-item text-dark bg-transparent no-border ">
                            <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-dark">
                                            Edit
                        </Link>
                            </li>
                            <li className="list-group-item text-dark bg-transparent no-border ">
                            <button className="btn btn-danger"
                            onClick={this.onDeleteClick.bind(this, project_task.projectIdentifier,project_task.projectSequence)}>
                                            Delete
                        </button>
                            </li>
                        </ul>
                    

                    
                    </div>  
                </div>
                </div>
            </div>
        )
    }
 }

ProjectTask.propTypes = {
     deleteProjectTask: PropTypes.func.isRequired
 }
export default connect(null, {deleteProjectTask})(ProjectTask);