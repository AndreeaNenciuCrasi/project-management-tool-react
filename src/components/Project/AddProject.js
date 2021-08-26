import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
  constructor() {
    super();

    this.state = {
      projectName: "",
      projectIdentifier: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`,
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="div-image-wrapper-add-project">
          <div className="div-content">
	          
            <form onSubmit={this.handleSubmit} className="project-forms-margin form-project">
            <div className="user existing">
	          		    <p className="sign">Create Project</p>
                    <input
                    type="text"
                    className={classnames("form-control form-control-lg inner-card form-input", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}

<input
                    type="text"
                    className={classnames("form-control form-control-lg inner-card form-input", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.handleChange}
                    disabled
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
		          		
		  
                  <textarea
                    className={classnames("form-control form-control-lg inner-card form-input", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
	          	
	          </div>

	          <hr/>

	          <div class="user new">
	          	
            <h6>Start Date</h6>
            <input
                    type="date"
                    className="form-control form-control-lg no-border inner-card form-input"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.handleChange}
                  />

            <h6>Estimated End Date</h6>
            <input
                    type="date"
                    className="form-control form-control-lg no-border inner-card form-input"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.handleChange}
                  />

                  <input
                  type="submit"
                  className="btn text-light bg-dark btn-sm"
                />
                  </div> 
	          	</form>
        </div>
        </div>

      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createProject })(AddProject);
