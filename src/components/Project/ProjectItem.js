import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };
  render() {
    const { project } = this.props;
    return (
      <div className="container">
        <div className="card card-body mb-3 opacity floating-card project-card no-border">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto font-weight-bold">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>

              {project.start_date &&
              <p>Start date: {project.start_date}</p>}
              
              {project.end_date &&
              <p>End date: <span className="text-danger font-weight-bold">{project.end_date}</span></p>
              }
              
            </div>

            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group project-buttons-set">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item text-dark bg-transparent border border-dark rounded">
                    <i class="fa fa-flag-checkered pr-1"> Project Board </i>
                  </li>
                </Link>
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item update bg-transparent border border-dark rounded">
                    <i class="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete text-secondary bg-transparent border border-dark rounded"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i class="fa fa-minus-circle pr-1"> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
