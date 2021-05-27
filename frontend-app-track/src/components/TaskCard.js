import React from 'react' 
import Button from 'react-bootstrap/button'
import {Card} from 'react-bootstrap'

 const TaskCard = (props) => {
    return (
            <div className="job-card">
            <Card className="task-cards" text="black" style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>{props.task.job.company_name} Task Priority: {props.task.priority} </Card.Title>
                    <Card.Text>{props.task.task}</Card.Text>
                        <Card.Text>
                            {props.task.completed === false ? "Not yet completed" : "Completed"}
                    </Card.Text>
                    {props.task.completed ? <Button onClick={() => props.handleDeleteSpecificTask(props.task, props.task.job)}>Delete Task</Button> : <Button onClick={() => props.completeTask(props.task)}>Complete Task</Button>}
                    {/* <Button onClick={(e) => props.openEditModal(e, props.task)} variant="primary" >Edit</Button> */}
                </Card.Body>
            </Card>
        </div> 
    )
}

export default TaskCard

// export default class TaskCard extends React.Component {

//     state = {
//         buttonToggle: false
//     }

//     render() {
//         return (
//             <div className="job-card">
//             <Card className="task-cards" text="black" style={{ width: '100%' }}>
//                 <Card.Body>
//                     <Card.Title>{this.props.task.job.company_name} Task Priority: {this.props.task.priority} </Card.Title>
//                     <Card.Text>{this.props.task.task}</Card.Text>
//                         <Card.Text>
//                             {this.props.task.completed === false ? "Not yet completed" : "Completed"}
//                     </Card.Text>
//                     {this.props.task.completed ? <Button onClick={() => this.props.handleDeleteSpecificTask(this.props.task, this.props.task.job)}>Delete Task</Button> : <Button onClick={() => this.props.completeTask(this.props.task)}>Complete Task</Button>}
//                     {this.state.buttonToggle ? <Button onClick={(e) => this.props.openEditModal(e, this.props.task)} variant="primary" >Edit</Button> : null}
//                 </Card.Body>
//             </Card>
//         </div>  
//         )
//     }
// }