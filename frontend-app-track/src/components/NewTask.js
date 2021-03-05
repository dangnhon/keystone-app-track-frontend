import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class NewTask extends React.Component {

    state = {
        jobTask: {
            task: "",
            completed: false,
            priority: 1,
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

    handleSubmitNewTask = (e) => {
        e.preventDefault() 
        let createTask = this.state.jobTask
        let token = sessionStorage.getItem("token")
        fetch('http://localhost:3000/tasks', {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(createTask)
        })
        .then(reps => reps.json()) 
        .then(createdTask => this.props.updateNewTask(createdTask))
        .then(this.props.closeModal)
    }

    render() {
        return(
            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            size="md"
            className="new-task"
            show={this.props.isOpen} 
            onHide={this.props.closeModal}>


            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Create a New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >

                    <Form.Label>Task Description: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="task"  placeholder="Enter Task..."/>

                    <Form.Label>Priority: </Form.Label>
                    <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="priority" >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    </Form.Control>

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewTask(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}