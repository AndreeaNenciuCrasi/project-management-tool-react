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
            "notes": ""
        }
    }

    componentDidMount() {
        this.props.getCurrentUser(this.props.history);
    }

    render() {
        // const {user} = this.props.security;
        // console.log(user);
        return (
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-4 bg-userProfile1"></div>
                <div className="col-6 col-md-4">
                    <div className="bg-text-userProfile">
                    <form 
                    className=" login-input rounded">
                        <div className="form-group">    
                            <input type="text" 
                            placeholder="Name" 
                            name="fullName"
                            // value={user.fullName}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            placeholder="Email Address" 
                            name="username"
                            // value={user.username}
                            />
                        </div>
                        <div className="form-group">
                            <textarea type="text" 
                            placeholder="notes" 
                            name="notes"
                            // value={user.notes}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                            placeholder="Password" 
                            name="password"
                            />
                        </div>
                        
                        <input type="submit" className="btn btn-info btn-block mt-4"/>
                    </form>
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
  



