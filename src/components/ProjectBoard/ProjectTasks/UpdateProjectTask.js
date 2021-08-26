import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { PropTypes } from 'prop-types'
import {getProjectTask, updateProjectTask} from '../../../actions/backlogActions'

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
            create_At: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
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

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const updateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            create_At: this.state.create_At
        }
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updateProjectTask, this.props.history);
    }

     render() {
         const { errors } = this.state;
        return (
            <div>
                <div className="bg-img-update-task">
                <div classNameName="container">
                <Link to={`/projectBoard/${this.state.projectIdentifier}`} className="btn text-light bg-dark btn-margin">
                        Back to Project Board
                    </Link>
        </div>
        <br></br>

        <div className="div-image-wrapper-update-task">
          <div className="div-content">
	          
            <form onSubmit={this.handleSubmit} className="project-forms-margin form-project">
            <div className="user existing">
	          		    <p className="sign">Edit Task | {this.state.projectSequence}</p>
                          <input type="text"
                                        className={classnames("form-control form-control-lg inner-card", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.handleChange} />
                                    {errors.summary && (
                                    <div className="invalid-feedback">{errors.summary}</div>
                                )}

                            <textarea className="form-control form-control-lg no-border inner-card form-input"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.handleChange}></textarea>
		          		
		  
                          <h6>Due Date</h6>
                        
                            <input type="date"
                                        className="form-control form-control-lg no-border inner-card"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.handleChange}/>
	          	
	          </div>

	          <hr/>

	          <div class="user new">
	          	
              <select className="form-control form-control-lg no-border inner-card form-input"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.handleChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>

                            <select className="form-control form-control-lg no-border inner-card form-input"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.handleChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>

                  <input
                  type="submit"
                  className="sign-submit"
                />
                  </div> 
	          	</form>
        </div>
        </div>
        </div>















        {/* <div classNameName="container border">
        <div class="row">
            <div class="col formBackground4"></div>
            <div class="col update-form">
            <h4 className="display-4 text-right no-border">Update Project Task</h4>
            <p className="lead text-right">Project Name: {this.state.projectIdentifier} |
            Project Task ID: {this.state.projectSequence}</p>

                    <form onSubmit={this.handleSubmit} className="add-task-form-margin">
                    <div className="form-group">
                    <input type="text"
                    className={classnames("form-control form-control-lg inner-card", {
                    "is-invalid":errors.summary
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.handleChange}
                    />
                    {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                    )}
                    </div>
                    <div className="form-group">
                    <textarea className="form-control form-control-lg no-border inner-card"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.handleChange}
                    ></textarea>
                    </div>
                    <h6>Due Date</h6>
                    <div className="form-group">
                    <input type="date"
                    className="form-control form-control-lg no-border inner-card"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleChange}
                    />
                    </div>
                    <div className="form-group">
                    <select className="form-control form-control-lg no-border inner-card"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.handleChange}
                    >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <select className="form-control form-control-lg no-border inner-card"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                    >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                    </select>
                    </div>

                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
</div>
            </div>
            </div> */}
        </div>
    
        )
    }
 }
UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
 }

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
 })
export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);