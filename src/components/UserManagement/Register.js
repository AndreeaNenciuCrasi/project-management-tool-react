import React, { Component } from 'react'
import {createNewUser} from "../../actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard");
        }
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
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        this.props.createNewUser(newUser, this.props.history);
      }
    render() {
        const {errors} = this.state;
        return (
    <div className="register ">
        <div>
            <div className="register-container">
                <div className="row">
                    <div className="div-content">
	          
            <form onSubmit={this.handleSubmit} className="form-project">
            <div className="user existing">
	          		    <p className="sign">Sign Up</p>
                          <input type="text" 
                            className={classnames("form-control form-control-lg form-input", {
                                "is-invalid": errors.fullName,
                              })}
                            placeholder="Name" 
                            name="fullName"
                            value={this.state.fullName} 
                            onChange={this.handleChange}/>
                            {errors.fullName && (
                            <div className="invalid-feedback text-white">{errors.fullName}</div>
                            )}

                    <input type="text" 
                            className={classnames("form-control form-control-lg form-input", {
                                "is-invalid": errors.username,
                              })} 
                            placeholder="Email Address" 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                            {errors.username && (
                            <div className="invalid-feedback text-white">{errors.username}</div>
                            )}
                            <input type="password" 
                            className={classnames("form-control form-control-lg form-input", {
                                "is-invalid": errors.password,
                              })} 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                            {errors.password && (
                            <div className="invalid-feedback text-white">{errors.password}</div>
                            )}
                            <input type="password" 
                            className={classnames("form-control form-control-lg form-input", {
                                "is-invalid": errors.confirmPassword,
                              })}  
                            placeholder="Confirm Password" 
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}/>
                            {errors.confirmPassword && (
                            <div className="invalid-feedback text-white">{errors.confirmPassword}</div>
                            )}	
	          </div>

	          <hr/>

	          <div class="user new">
	
                  <input
                  type="submit"
                  className="btn text-light bg-dark btn-sm"
                />
                  </div> 
	          	</form>
                    </div>
                </div>
            
            

            </div>
        </div>
    </div>
        )
    }
}
Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps =state =>({
    security: state.security,
    errors: state.errors
})
export default connect(mapStateToProps, {createNewUser})(Register);