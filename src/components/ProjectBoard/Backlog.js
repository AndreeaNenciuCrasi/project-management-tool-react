import React, { Component } from 'react'
import NewStatusColumn from './ProjectTasks/NewStatusColumn';
import ProjectTask from './ProjectTasks/ProjectTask'
import axios from "axios";

 class Backlog extends Component {
    constructor(props){
        super(props);
        this.state = { 
            clickedButton:false,
            column:"",
            statusList:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }

    handleClick() {
        this.setState({clickedButton : true});
        this.forceUpdate();
      }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
        const { project_tasks_prop } = this.props;
        const tasks = project_tasks_prop.map(project_task => (
                <ProjectTask key={project_task.id} project_task={project_task} />    
            ));
        const projectSequence = tasks[0].props.project_task.projectSequence;
        const projectId = projectSequence.substring(0, projectSequence.indexOf('-'));
        const newStatus = this.state.column;
        axios.patch(`/api/project/newStatus/${projectId}/${newStatus}`, {typesOfStatus: "new"}).then(
                (response)=>{
                    console.log(response.data);
      
                }
            )   
    }

    handleSubmit(e){
        e.preventDefault();
        const newColumn = {
            "column": this.state.column}

        

    }

    componentDidMount(){
        const { project_tasks_prop } = this.props;
         const tasks = project_tasks_prop.map(project_task => (
             <ProjectTask key={project_task.id} project_task={project_task} />  
         ));
         const projectSequence = tasks[0].props.project_task.projectSequence;
         const projectId = projectSequence.substring(0, projectSequence.indexOf('-'));
      axios.get(`/api/project/statusList/${projectId}`).then(
          (response)=>{
              console.log(response.data);

          }
      )
        }

     render() {
         const { project_tasks_prop } = this.props;
         const tasks = project_tasks_prop.map(project_task => (
             <ProjectTask key={project_task.id} project_task={project_task} />
         ));

         let todoItems = [];
         let inProgressItems = [];
         let doneItems = [];

         for (let i = 0; i < tasks.length; i++){
            //  console.log(tasks[i]);
             if (tasks[i].props.project_task.status === "TO_DO") {
                 todoItems.push(tasks[i]);
                //  console.log(tasks[i].props.project_task.projectSequence);
             }
             if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                inProgressItems.push(tasks[i]);
             }
             if (tasks[i].props.project_task.status === "DONE") {
                doneItems.push(tasks[i]);
            }
         }

        return (
            < div className="container">  
                <form class="form-inline" onSubmit={this.handleSubmit}>
                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" class="form-control-plaintext bg-white rounded"
                        value={this.state.value}
                        onChange={this.handleChange}/>
                </div>
                <button type="submit" 
                        // onClick={this.handleClick} 
                        className="btn text-light bg-dark mb-2">
                    <i className="fas fa-plus-circle pr-1"></i> Create New Status
                </button>
                </form>

                <div className="row">
                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>       
                        {todoItems}       
                        </div>

                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-info text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {inProgressItems} 
                        </div>

                        <div className="col-md-4 no-border">
                            <div className="card text-center mb-2 no-border">
                                <div className="card-header bg-success text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {doneItems}   
                        </div>
                    {this.state.clickedButton && <NewStatusColumn></NewStatusColumn>}
                        </div>
                    </div>
        )
    }
}

export default Backlog;