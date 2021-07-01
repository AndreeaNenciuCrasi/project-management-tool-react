import React, { Component } from 'react'
import ProjectTask from './ProjectTask'

class NewStatusColumn extends Component {
    constructor(props){
        super(props);
     }
    render() {
        return (   
        <div className="col-md-4 no-border">
            <div className="card text-center mb-2 no-border">
                <div className="card-header bg-secondary text-white">
                    <h3>
                        
                    </h3>
                </div>
            </div>   
            {/* <ProjectTask/>          */}
        </div>
        )
    }
}
export default NewStatusColumn;
