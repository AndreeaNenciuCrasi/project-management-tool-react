import React, { Component } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
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
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = nextProps.project;

    this.setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    });
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(updateProject, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
          <div className="div-image-wrapper-update-project">
          <div className="div-content">
	          
            <form onSubmit={this.handleSubmit} className="project-forms-margin form-project">
            <div className="user existing">
	          		    <p className="sign">Edit Project</p>
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
                    <div className="invalid-feedback text-white">{errors.projectName}</div>
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
                    <div className="invalid-feedback text-white">
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
                    <div className="invalid-feedback text-white">{errors.description}</div>
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

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
