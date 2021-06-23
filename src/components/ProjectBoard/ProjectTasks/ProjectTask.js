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
            <div className="card mb-1 no-border floating-card-task opacity">

                <div className={`card-header text-primary ${priorityClass}`}>
                ID: {project_task.projectSequence} -- Priority:{priorityString}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{project_task.summary}</h5>
                        <p className="card-text text-truncate ">
                        {project_task.acceptanceCriteria}
                        </p>
                        {project_task.dueDate && 
                        <p className="card-text text-truncate "> Due Date <span className="text-danger">{project_task.dueDate}</span>
                        </p>}
                        
                        <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-dark">
                                            View / Update
                        </Link>

                    <button className="btn btn-danger ml-4"
                    onClick={this.onDeleteClick.bind(this, project_task.projectIdentifier,project_task.projectSequence)}>
                                            Delete
                        </button>
                </div>
            </div>
        )
    }
 }

ProjectTask.propTypes = {
     deleteProjectTask: PropTypes.func.isRequired
 }
export default connect(null, {deleteProjectTask})(ProjectTask);