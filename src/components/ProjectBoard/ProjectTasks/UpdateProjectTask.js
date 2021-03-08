import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import {getProjectTask} from '../../../actions/backlogActions'

class UpdateProjectTask extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            create_At: ""
        }
    }
    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }
    
    componentWillReceiveProps(nextProps) {
        const {
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        } = nextProps.project_task;

        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            create_At
        })
    }
     render() {
        const { id } = this.props.match.params;
        return (
    <div classNameName="add-PBI">
        <div classNameName="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectIdentifier} |
                    Project Task ID: {this.state.projectSequence}</p>
                    <form onsubmit="{this.onSubmit}">
                        <div className="form-group">
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                    />
                        </div>
                        <div className="form-group">
                                    <textarea className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                    ></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                                    <input type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                    />
                        </div>
                        <div className="form-group">
                                    <select className="form-control form-control-lg"
                                        name="priority"
                                        value={this.state.priority}
                                    >
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                                    <select className="form-control form-control-lg"
                                        name="status"
                                        value={this.state.status}
                                    >
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }
 }
UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired
 }

const mapStateToProps = state => ({
     project_task:state.backlog.project_task
 })
export default connect(mapStateToProps, { getProjectTask })(UpdateProjectTask);