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
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    render() {
        return (
    <div className="register">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Sign Up</h1>
                    <p className="lead text-center">Create your Account</p>
                    <form action="create-profile.html">
                        <div className="form-group">
                            <input type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Name" 
                            name="fullName"
                            value={this.state.fullName} 
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            className="form-control form-control-lg" 
                            placeholder="Email Address" 
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>

                        </div>
                        <div className="form-group">
                            <input type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" 
                            className="form-control form-control-lg" 
                            placeholder="Confirm Password" 
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}/>
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
export default Register;