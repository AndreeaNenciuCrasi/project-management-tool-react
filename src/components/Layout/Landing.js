import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Landing extends Component {

    componentDidMount(){
        if(this.props.security.validToken){
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
            <div>
                <div className="topNavbarImage">
                    <div>
                        {/* <h1 className="form-titles">This Tool</h1> */}
                        <div className="padding-top">
                        <h1 className="form-titles align-h1">Helps teams</h1>
                         <h1 className="form-titles align-h1">move work forward</h1>
                         </div>
                        <div className="align-p">
                        <p className="text-white">Collaborate, manage projects,</p>
                        <p className="text-white">and reach new productivity peaks. From high rises to the home office, </p>
                        <p className="text-white">the way your team works is unique—accomplish it all with Team Project Management Tool.</p>
                        </div>
                    </div>
                </div>
            </div>
    
        )
    }
}

Landing.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps)(Landing);