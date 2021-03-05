import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import { Card } from 'react-bootstrap'
import NewTask from '../components/NewTask.js'
import  EditTask from '../components/EditTask.js'
import React from 'react'

export default class EditJobViewTask extends React.Component {

    state = { 
        jobAppData: {
        company_name: this.props.selectedJob.company_name,
        job_title: this.props.selectedJob.job_title,
        date: this.props.selectedJob.date,
        salary: this.props.selectedJob.salary,
        status: false, 
        note: this.props.selectedJob.note,
        contact_number: this.props.selectedJob.contact_number,
        user_id: this.props.userData.id
        },
        isOpen: false,
        openEdit: false,
        selectedTask: {}
    }

    openModal = () => this.setState({ isOpen: true })

    closeModal = () => this.setState({ isOpen: false })

    openEditModal = (e, task) => {
        this.setState({ openEdit: true })
        this.setState({selectedTask: task}) 
    }

    closeEditModal = () => this.setState({ openEdit: false })

    handleChange = (e) => {
        this.setState({
            jobAppData: {
                ...this.state.jobAppData, 
                [e.target.name]: e.target.value
            }
        })
    }

    getAllJobTask = () => {
        let matchJobs = this.props.allJobs.find(job => job.id === this.props.selectedJob.id)
        if (matchJobs.tasks.length !== 0) {
            
            return matchJobs.tasks.map(task =>  
                <div className="job-card">
                <Card onClick={(e) => this.openEditModal(e, task)} style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>Task:</Card.Title>
                        <Card.Text>{task.task}</Card.Text>
                            <Card.Text>
                                {task.completed === false ? "Not yet completed" : "Completed"}
                        </Card.Text>
                    </Card.Body>
                    
                </Card>
                <Button onClick={(e) => this.handleDeleteTask(e, task)} variant="primary" >delete</Button>
                </div> 
            )
        } else {
            return <p>please create a task</p>
        }
    }

    handleSubmitEditJob = (e) => {
        e.preventDefault() 
        let editedJob = this.state.jobAppData
        let token = sessionStorage.getItem("token")
        fetch(`http://localhost:3000/jobs/${this.props.selectedJob.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(editedJob)
        })
        .then(reps => reps.json()) 
        .then(updatedJob => this.props.updateOldJob(updatedJob))
        .then(this.props.closeEditModal)
    }

    handleDeleteApp = () => {
        let job = this.props.selectedJob
        this.props.handleDeleteJob(job)
        this.props.closeEditModal()
    }

    handleDeleteTask = (e, task) => {
        let selectedJob = this.props.selectedJob
        this.props.handleDeleteSpecificTask(task, selectedJob)
    }

 
    render() {
        return(

            <Modal 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                show={this.props.openEdit} 
                onHide={this.props.closeEditModal}>

                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Job</Modal.Title>
                </Modal.Header>
                 <Modal.Body>
                <Form.Group >

                    <Form.Label>Status: </Form.Label>
                    <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="status" >
                    <option value={false}>In Review</option>
                    <option value={true}>Offer Received</option>
                    </Form.Control>

                    <Form.Label>Company Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="company_name"  defaultValue={this.props.selectedJob.company_name}/>

                    <Form.Label>Job Position: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="job_title"  defaultValue={this.props.selectedJob.job_title}/> 

                    <Form.Label>Date Applied: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="date"  defaultValue={this.props.selectedJob.date}/> 

                    <Form.Label>Salary: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="salary"  defaultValue={this.props.selectedJob.salary}/> 

                    <Form.Label>Contact Number: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="contact_number"  defaultValue={this.props.selectedJob.contact_number}/> 

                    <Form.Label>Notes: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="note"  defaultValue={this.props.selectedJob.note}/> 

                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitEditJob(e)} type="submit" >Submit Edit</Button>
                <Button variant="primary" onClick={() => this.handleDeleteApp()} >Delete App</Button>
                <Button variant="primary" onClick={this.openModal} >New Task</Button>
                </Modal.Footer>
                <div className="job-container-child right" >

                { this.state.isOpen ? <NewTask
                    updateNewTask={this.props.updateNewTask} 
                    closeModal={this.closeModal} 
                    isOpen={this.state.isOpen} 
                    selectedJob={this.props.selectedJob} /> : null }
                
                {this.getAllJobTask()}

                { this.state.openEdit ? <EditTask
                     closeEditModal={this.closeEditModal} 
                     openEdit={this.state.openEdit} 
                     selectedJob={this.props.selectedJob}
                     updateNewTask={this.props.updateNewTask}
                     updateOldTask={this.props.updateOldTask}
                     selectedTask={this.state.selectedTask} /> : null }

                </div>
            </Modal>
        )
    }
}