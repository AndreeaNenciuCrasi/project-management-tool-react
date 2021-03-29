import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {login} from "../../actions/securityActions";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

      handleSubmit(e) {
        e.preventDefault();
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.login(loginRequest, this.props.history);
      }
    render() {
        const {errors} = this.state;
        return (
            <div className="login">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <form onSubmit={this.handleSubmit}>
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
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps =state =>({
    security: state.security,
    errors: state.errors
})
export default connect(mapStateToProps, {login})(Login);