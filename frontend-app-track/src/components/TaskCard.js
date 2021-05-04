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
                    {props.task.completed ? null : <Button onClick={() => props.completeTask(props.task)}>Complete Task</Button>}
                </Card.Body>
            </Card>
        </div> 
    )
}

export default TaskCard