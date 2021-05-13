import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class EditTask extends React.Component {

    state = {
        jobTask: {
            task: this.props.selectedTask.task,
            completed: this.props.selectedTask.completed,
            priority: this.props.selectedTask.priority,
            job_id: this.props.selectedJob.id
        }
    }

    handleChange = (e) => {
        this.setState({
            jobTask: {
                ...this.state.jobTask, 
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmitNewEditTask = (e) => {
        e.preventDefault() 
        let editedTask = this.state.jobTask
        let token = sessionStorage.getItem("token")
        fetch(`http://localhost:3000/tasks/${this.props.selectedTask.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(editedTask)
        })
        .then(reps => reps.json()) 
        .then(updatedTask => this.props.updateOldTask(updatedTask))
        .then(this.props.closeEditModal)
    }

    render() {
        return (
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            size="md"
            className="new-task"
            show={this.props.openEdit} 
            onHide={this.props.closeEditModal}
            >

            <Modal.Body>
                <Form.Group >

                    <Form.Label>Task Description: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="task"  defaultValue={this.props.selectedTask.task} />

                    <Form.Label>Priority: </Form.Label>
                    <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="priority" defaultValue={this.props.selectedTask.priority} >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    </Form.Control>

                    <Form.Label>Completed? </Form.Label>
                    <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="completed" defaultValue={this.props.selectedTask.completed} >
                    <option value={false}>Not Completed</option>
                    <option value={true}>Completed</option>
                    </Form.Control>

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewEditTask(e)} type="submit" >Submit Edit</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}