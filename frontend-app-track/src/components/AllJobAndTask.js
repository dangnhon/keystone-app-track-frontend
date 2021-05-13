import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import AddNewJob from '../components/AddNewJob.js'
import EditJobViewTask from '../components/EditJobViewTask.js'
import TaskCard from '../components/TaskCard.js'
import JobCard from '../components/JobCard.js'

export default class AllJobAndTask extends React.Component {

    state = {
        isOpen: false,
        openEdit: false,
        selectedTask: {},
        selectedJob: {},
        priority: "See All Task",
        beginSort: false
    }   

    openModal = () => this.setState({ isOpen: true })
    closeModal = () => this.setState({ isOpen: false })

    openEditModal = (e, job) => {
        this.setState({ openEdit: true })
        this.setState({selectedJob: job}) 
    }

    closeEditModal = () => this.setState({ openEdit: false })

    completeTask = (task) => {
        let token = sessionStorage.getItem("token")
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                completed: true
            })
        })
        .then(reps => reps.json()) 
        .then(updatedTask => this.props.updateOldTask(updatedTask))
    } 

    getAllJob = () => {
        return this.props.userData.jobs.map(job => <JobCard job={job} key={job.id} openEditModal={this.openEditModal} />)
     }

    getAllTask = () => {
       return this.props.userData.tasks.map(task => <TaskCard task={task} completeTask={this.completeTask} handleDeleteSpecificTask={this.props.handleDeleteSpecificTask} key={task.id} />)
    }

    sortAllTask = () => {
        if (this.state.priority === "All Task") { 
            this.setState({
                beginSort: false
            })
        } else if (this.state.priority === "false" || this.state.priority === "true") {
            let specificTasks = this.props.userData.tasks.filter(task => task.completed.toString() === this.state.priority)
            return specificTasks.map(task => <TaskCard task={task} completeTask={this.completeTask} key={task.id} />)
        } else {
            let sortedTask = this.props.userData.tasks.filter(task => task.priority === parseInt(this.state.priority)) 
            return sortedTask.map(task => <TaskCard task={task} completeTask={this.completeTask} key={task.id} />)
        }
    }

    handleChangeSort =(e) => {
        this.setState({
            priority: e.target.value,
            beginSort: true
        })
    }

    render() {         
        return(
            <div className="job-dynamic-container">
                <div className="job-container-child left">
                    <Button onClick={this.openModal} className="add-new">Add New Job Application</Button>

                    { this.state.isOpen ? <AddNewJob 
                        closeModal={this.closeModal} 
                        isOpen={this.state.isOpen} 
                        updateNewJob={this.props.updateNewJob} 
                        userData={this.props.userData} /> : null }

                    {this.getAllJob()}

                    { this.state.openEdit ? <EditJobViewTask 
                        closeEditModal={this.closeEditModal} 
                        updateNewTask={this.props.updateNewTask} 
                        openEdit={this.state.openEdit} 
                        updateOldJob={this.props.updateOldJob} 
                        updateOldTask={this.props.updateOldTask}
                        userData={this.props.userData} 
                        allJobs={this.props.allJobs} 
                        selectedJob={this.state.selectedJob} 
                        handleDeleteSpecificTask={this.props.handleDeleteSpecificTask}
                        handleDeleteJob={this.props.handleDeleteJob} /> : null }

                </div>

                <div className="job-container-child right">
                    
                    <Form.Group className="sort" >
                        <Form.Label>Sort Task: </Form.Label>
                        <Form.Control as="select" name="priority" onChange={this.handleChangeSort} defaultValue="All Task" >
                        <option value="All Task">See All Task</option>
                        <option value={false}>Pending Tasks</option>
                        <option value={true}>All Completed</option>
                        <option value={1}>Task Priority: 1</option>
                        <option value={2}>Task Priority: 2</option>
                        <option value={3}>Task Priority: 3</option>
                        <option value={4}>Task Priority: 4</option>
                        <option value={5}>Task Priority: 5</option>
                        </Form.Control>
                    </Form.Group>
                
                    {this.state.beginSort ? this.sortAllTask() : this.getAllTask()}

                </div>
            </div>
        )
    }
}
