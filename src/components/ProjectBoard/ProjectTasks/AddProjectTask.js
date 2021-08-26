import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addProjectTask } from '../../../actions/backlogActions';
import PropTypes from 'prop-types';

class AddProjectTask extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            "summary": "",
            "acceptanceCriteria": "",
            "status": "",
            "priority": 0,
            "dueDate": "",
            "projectIdentifier": id,
            "errors": {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const newTask = {
            "summary": this.state.summary,
            "acceptanceCriteria": this.state.acceptanceCriteria,
            "status": this.state.status,
            "priority": this.state.priority,
            "dueDate": this.state.dueDate,
        }
        this.props.addProjectTask(this.state.projectIdentifier, newTask, this.props.history)
    }
        
     render() {
         const { id } = this.props.match.params;
         const { errors } = this.state;
        return (
            <div>
                <div className="bg-img-add-task">
                <div className="container">
                <Link to={`/projectBoard/${id}`} className="btn text-light bg-dark">
                        Back to Project Board
                    </Link>    
                </div>
                <br></br>

            <div className="div-image-wrapper-add-task">
          <div className="div-content">
	          
            <form onSubmit={this.handleSubmit} className="project-forms-margin form-project">
            <div className="user existing">
	          		    <p className="sign">Create Task | {this.state.projectIdentifier}</p>
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



                
            {/* <div className="container formBackground3">
            <div className="row">
                <div className="col-md-8 m-auto">

                        <form onSubmit={this.handleSubmit} className="add-task-form-margin ">
                            
                        <div className="form-group">
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
                                </div>
                                        
                        <div className="form-group">
                                    <textarea className="form-control form-control-lg no-border inner-card"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.handleChange}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                                    <input type="date"
                                        className="form-control form-control-lg no-border inner-card"
                                        name="dueDate"
                                        value={this.state.dueDate}
                                        onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                                    <select className="form-control form-control-lg no-border inner-card"
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.handleChange}>
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
                                        onChange={this.handleChange}>
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

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
 
const mapStateToProps = state => ({
    errors : state.errors
})
export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);