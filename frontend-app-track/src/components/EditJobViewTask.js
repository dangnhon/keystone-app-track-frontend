import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import { Card } from 'react-bootstrap'
import NewTask from '../components/NewTask.js'
import  EditTask from '../components/EditTask.js'
import DeleteCheck from '../components/DeleteCheck.js'


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
        deleteAppCheck: false,
        selectedTask: {}
    }

    openModal = () => this.setState({ isOpen: true })

    closeModal = () => this.setState({ isOpen: false })

    openEditModal = (e, task) => {
        this.setState({ openEdit: true })
        this.setState({selectedTask: task}) 
    }

    closeEditModal = () => this.setState({ openEdit: false })

    openDelete = () => this.setState({ deleteAppCheck: true })

    closeDelete = () => this.setState({ deleteAppCheck: false })

    handleChange = (e) => {
        this.setState({
            jobAppData: {
                ...this.state.jobAppData, 
                [e.target.name]: e.target.value
            }
        })
    }

    getAllJobTask = () => {
        let matchTask = this.props.userData.tasks.filter(task => task.job.id === this.props.selectedJob.id)
        if (matchTask.length !== 0) {
            return matchTask.map(task =>  
                <div className="job-card">
                <Card className="task-cards" text="black"  style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>Task Prioity: {task.priority}</Card.Title>
                            <Card.Text>
                                {task.task}<br></br>
                                {task.completed === false ? "Not yet completed" : "Completed"}
                            </Card.Text>
                            <Modal.Footer>
                                <Button onClick={(e) => this.openEditModal(e, task)} variant="primary" >Edit</Button>
                                <Button onClick={(e) => this.handleDeleteTask(e, task)} variant="primary" >Delete</Button>
                            </Modal.Footer>
                    </Card.Body>
                </Card>
                </div> 
            )
        } else {
            return <p>Please create some tasks</p>
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
        this.props.handleDeleteSpecificTask(task)
    }
 
    render() {
        return( 
            <Modal 
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                show={this.props.openEdit} 
                onHide={this.props.closeEditModal}>
                 <Modal.Body>
                <Form.Group >

                    <Form.Label>Status: </Form.Label>
                    <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="status" defaultValue={this.props.selectedJob.status} >
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
                <Button variant="primary" onClick={() => this.openDelete()} >Delete App</Button>
                <Button variant="primary" onClick={this.openModal} >New Task</Button>
                </Modal.Footer>
                

                <div className="task-container-child right" >

                { this.state.isOpen ? <NewTask
                    updateNewTask={this.props.updateNewTask} 
                    closeModal={this.closeModal} 
                    isOpen={this.state.isOpen} 
                    selectedJob={this.props.selectedJob} /> : null }

                { this.state.openEdit ? <EditTask
                     closeEditModal={this.closeEditModal} 
                     openEdit={this.state.openEdit} 
                     selectedJob={this.props.selectedJob}
                     updateNewTask={this.props.updateNewTask}
                     updateOldTask={this.props.updateOldTask}
                     selectedTask={this.state.selectedTask} /> : null }

                { this.state.deleteAppCheck ? <DeleteCheck 
                    openDelete={this.openDelete}
                    closeDelete={this.closeDelete} 
                    handleDeleteApp={this.handleDeleteApp} /> : null }

                </div>

                <div className="task-card-container">
                    {this.getAllJobTask()}
                </div>
            </Modal>
        )
    }
}