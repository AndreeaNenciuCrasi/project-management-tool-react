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

    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.security.validToken){
            this.props.history.push("/dashboard");
        }

        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
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
            <div>
            <div className="login-container">
                <div className="row">
                    <div className="div-content">
                    <form onSubmit={this.handleSubmit} 
                    className="form-project">
                        <p className="sign">Login</p>
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
                        
                        <input type="submit" className="btn btn-dark btn-block mt-4"/>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security:PropTypes.object.isRequired
}

const mapStateToProps =state =>({
    security: state.security,
    errors: state.errors
})
export default connect(mapStateToProps, {login})(Login);