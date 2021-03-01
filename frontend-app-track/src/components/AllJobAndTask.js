import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'
import AddNewJob from '../components/AddNewJob.js'
import EditJobViewTask from '../components/EditJobViewTask.js'

export default class AllJobAndTask extends React.Component {

    state = {
        isOpen: false,
        openEdit: false,
        selectedJob: {},
        allJobs: []
    }

    componentDidMount() {
        let token = sessionStorage.getItem('token')
            if (token) {
            fetch('http://localhost:3000/jobs', {
            method: "GET",
            headers: {
            Authorization: `bearer ${token}`,
            }, 
        })
        .then(resp => resp.json())
        .then()
        .then(jobs => { 
            this.setState({
                allJobs: 
                   jobs
            })}
            )
        } 
    }    

    openModal = () => this.setState({ isOpen: true })
    closeModal = () => this.setState({ isOpen: false })

    openEditModal = (e, job) => {
        this.setState({ openEdit: true })
        this.setState({selectedJob: job}) 
    }

    closeEditModal = () => this.setState({ openEdit: false })
    
    getAllJob = () => {
       return this.props.userData.jobs.map(job => 
            <div className="job-card">
            <Card  className={job.id} onClick={(e) => this.openEditModal(e, job)} style={{ width: '100%' }}>
                <Card.Body >
                    <Card.Title>Applied To: {job.company_name}</Card.Title>
                        <Card.Text>
                            {job.status === false ? "Status: In Review" : "Status: Accepted"}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div> 
        )
    }

    getAllTask = () => {
        return this.props.userData.tasks.map(task => 
            <div className="job-card">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>Task:</Card.Title>
                    <Card.Text>{task.task}</Card.Text>
                        <Card.Text>
                            {task.completed === false ? "Not yet completed" : "Completed"}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div> 
        )
    }
    

    render() {         

        return(
            <div className="job-dynamic-container">
                <div className="job-container-child left">
                    <button onClick={this.openModal} className="add-new">Add New Job</button>

                    { this.state.isOpen ? <AddNewJob 
                        closeModal={this.closeModal} 
                        isOpen={this.state.isOpen} 
                        updateNewJob={this.props.updateNewJob} 
                        userData={this.props.userData} /> : null }

                    {this.getAllJob()}

                    { this.state.openEdit ? <EditJobViewTask 
                        closeEditModal={this.closeEditModal} 
                        openEdit={this.state.openEdit} 
                        updateOldJob={this.props.updateOldJob} 
                        userData={this.props.userData} 
                        allJobs={this.state.allJobs} 
                        selectedJob={this.state.selectedJob} 
                        handleDeleteJob={this.props.handleDeleteJob} /> : null }

                </div>

                <div className="job-container-child right">
                <button className="add-new">Sort All Tasks</button>
                    {this.getAllTask()}
                </div>
            </div>
        )
    }
}