import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";

class Header extends Component {
  logout(){
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const {validToken, user} = this.props.security;
    console.log(validToken);
    const userIsAuthenticated =(
      <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link navbar-text-color" to="/dashboard">
            Dashboard
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link " to="/userProfile">
            <i className="fas fa-user-circle mr-1"/>{user.fullName}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbar-text-color" to="/logout" onClick={this.logout.bind(this)}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
    )

    const userIsNotAuthenticated =(
      <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link navbar-text-color" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbar-text-color" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
    )

    let headerLinks;
    if(validToken && user){
      headerLinks = userIsAuthenticated;
    }else{
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark navbar-with-line">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Team Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {headerLinks}
          
        </div>
      </nav>
      
      </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});


export default connect(mapStateToProps, {logout})(Header);
