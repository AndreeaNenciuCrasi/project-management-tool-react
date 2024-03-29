import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from 'classnames';
import {getCurrentUser, updateCurrentUser} from "../../actions/securityActions";

class UserProfile extends Component {

    constructor(){
        super();
        this.state={
            "username": "",
            "fullName": "",
            "password": "",
            "notes": "",
            "errors":{}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUser(this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors:nextProps.errors})
        }
        const {
            username,
            fullName,
            password,
            notes,
        } = nextProps.current_user;

        this.setState({
            username,
            fullName,
            password,
            notes,
        })
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const updateCurrentUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            notes: this.state.notes
        }
        this.props.updateCurrentUser(updateCurrentUser, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
        <div className="container">
                <div class="page">
     <div class="profile-card">
       <div class="profile-image">
       <span class="image"></span>
       </div>
       <div class="profile-user-name">
       <h3>{this.state.fullName}</h3>
         <p>Front End Developer</p>
       </div>
       <div class="skills">
       <form onSubmit={this.handleSubmit}>
                            
                            <input type="text" 
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.fullName,
                              })}
                            placeholder="Name" 
                            name="fullName"
                            value={this.state.fullName}
                            onChange={this.handleChange}
                            />
                            {errors.fullName && (
                            <div className="invalid-feedback">{errors.fullName}</div>
                            )}
                        
                        
                            <input type="text" 
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.username,
                              })} 
                            placeholder="Email Address" 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                            {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                            )}
                            <hr></hr>
                            <textarea className="textarea-user-profile" type="text" 
                            placeholder="notes" 
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleChange}
                            />
                        
                    
                            <input type="password" hidden
                            className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.password,
                              })} 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            />
                            {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                            )}
                        
                        
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
       </div>
</div>
</div>
        </div>
        )
    }
}

UserProfile.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    updateCurrentUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    security: state.security,
    current_user: state.security.current_user,
    errors: state.errors
  });
  
  
  export default connect(mapStateToProps, {getCurrentUser, updateCurrentUser})(UserProfile);
  



