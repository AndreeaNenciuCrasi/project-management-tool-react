import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";

class UserProfile extends Component {
    render() {
        const {user} = this.props.security;
        console.log(user);
        return (
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-4 bg-userProfile1"></div>
                <div className="col-6 col-md-4">
                    <div className="bg-text-userProfile">
                        <h4>
                                Full Name </h4>
                                <h5>{user.fullName} </h5>
                        <br></br>
                        <h4>Email/Username</h4>
                        <h5>{user.username}</h5>
                    </div>
                </div>
                
                <div className="col-6 col-md-4 bg-userProfile2"></div>
            </div>


            <div className="row">
                <div className="col-6 col-md-4 bg-dark text-dark">.col-6 .col-md-4</div>
                <div className="col-6 col-md-4"></div>
                <div className="col-6 col-md-4 bg-dark text-dark">.col-6 .col-md-4</div>
            </div>


            <div className="row">
                <div className="col-6 col-md-4"></div>
                <div className="col-6 col-md-4 bg-dark text-dark">.col-6 .col-md-4</div>
                <div className="col-6 col-md-4"></div>
            </div>
        </div>
        )
    }
}

UserProfile.propTypes = {
    security: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    security: state.security
  });
  
  
  export default connect(mapStateToProps, {})(UserProfile);



