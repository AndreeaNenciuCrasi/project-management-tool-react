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
    <div className="landing">
        <div className="light-overlay landing-inner text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="landingTitle">Personal Project Management Tool</h3>
                        <p className="lead">
                            Create your account to join active projects or start your own
                        </p>
                        <hr/>
                        <Link to="/register" className="btn btn-lg btn-primary mr-2">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                            Login
                        </Link>
                        <br></br>
                        <br></br>
        <div class="container">
        <div class="row">
            <div class="col order-last">
            <iframe width="520" height="275" src="https://www.youtube.com/embed/EG16dFYK0gw?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            </div>
            <div class="col">
            <iframe width="520" height="275" src="https://www.youtube.com/embed/w6uciYsaJv0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            </div>
            <div class="col order-first">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/IqukiTGZ0AY?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>             </div>
        </div>
        </div>
                        
                    </div>
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