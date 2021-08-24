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
                <div className="topNavbarImage"></div>
                <div className=" landing-container">
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-lg btn-secondary mr-2">
                             Login
                         </Link>
                </div>

            </div>
    // <div className="landing">
    //     <div className="light-overlay landing-inner text-dark">
    //         <div>
    //             <div className="row">
    //                 <div className=" text-center">
    //                 <div className=" landing-container">
    //                     {/* <h3 className="landingTitle text-class">Personal Project Management Tool</h3> */}
    //                     {/* <p className="lead text-info">
    //                         Create your account to join active projects or start your own
    //                     </p> */}
    //                     {/* <hr/> */}
    //                     <div className="btn-landing-margin">
    //                     <Link to="/register" className="btn btn-lg btn-info mr-2">
    //                         Sign Up
    //                     </Link>
    //                     <Link to="/login" className="btn btn-lg btn-secondary mr-2">
    //                         Login
    //                     </Link>
    //                     </div>
    //                 </div>
                        
    //                     {/* <br></br>
    //                     <br></br>  */}
    //      {/* <div class="container">
    //     <div class="row">
    //         <div class="col order-last">
    //         <iframe width="520" height="275" src="https://www.youtube.com/embed/EG16dFYK0gw?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            </div>
    //         <div class="col">
    //         <iframe width="520" height="275" src="https://www.youtube.com/embed/w6uciYsaJv0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            </div>
    //         <div class="col order-first">
    //         <iframe width="560" height="315" src="https://www.youtube.com/embed/IqukiTGZ0AY?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>             </div>
    //     </div>
    //     </div> */}
                        
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
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