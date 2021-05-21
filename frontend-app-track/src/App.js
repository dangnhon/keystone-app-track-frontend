import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import SuperContainer from './containers/SuperContainer.js'
import LoginAndSignup from './containers/LoginAndSignup.js'
import { withRouter } from 'react-router-dom';


class App extends React.Component{

  state = {
    userData: {
      email: null,
      name: null,
      jobs: [], 
      meetup_contacts: [], 
      meetups: [], 
      tasks: []
    },
    logout: false,
  }

componentDidMount() {
  this.fetchLoggedInUser() 
}

// USER RELATED ACTIONS
fetchLoggedInUser = () => {
  let token = sessionStorage.getItem('token')
  if (token) {
    fetch('http://localhost:3000/profile', {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
      }, 
    })
    .then(resp => resp.json())
    .then(user => {
      this.setState({
      userData: user.user
    })}
    )
  }
}

deleteUser = () => {
  let token = sessionStorage.getItem('token')
  fetch(`http://localhost:3000/users/${this.state.userData.id}`, {
          method: "DELETE",
          headers: {
              Authorization: `bearer ${token}`,           
          },
      })
      .then(resp => resp.json())
      .then(alertMessage => alert('Your account has been successfully deleted'));

      sessionStorage.clear() 
      this.setState({
        logout: true
      })
}

logout = () => {
  sessionStorage.clear() 
  this.setState({
    logout: true 
  })
  this.props.history.push("/")
}

handleUserSession = (user) => {
  sessionStorage.setItem('token', user.jwt)
  this.setState({
    userData: user.user,
  })
}

// JOB RELATED ACTIONS
updateNewJob = (createdJob) => {
  this.setState({ 
    userData: {
      ...this.state.userData, 
        jobs: [createdJob, ...this.state.userData.jobs]
    }
  })
}

updateOldJob = (updatedJob) => {
  let allOtherJob = this.state.userData.jobs.filter(job => job.id !== updatedJob.id)
  let updatedJobArray = [updatedJob, ...allOtherJob]
  this.setState({
    userData: {
      ...this.state.userData, 
      jobs: updatedJobArray
    }
  })
}

handleDeleteJob = (job) => {
  let jobId = job.id 
  let updatedJobArray = this.state.userData.jobs.filter(job => job.id !== jobId)
  let updatedTaskArray = this.state.userData.tasks.filter(task => task.job.id !== jobId)
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())

  this.setState({
    userData: {
      ...this.state.userData, 
      jobs: updatedJobArray,
      tasks: updatedTaskArray
    }
  })
}

// TASK RELATED ACTIONS
updateNewTask = (createdTask) => {
  this.setState({
    userData: {
      ...this.state.userData, 
        tasks: [createdTask, ...this.state.userData.tasks]
    }
  })
}

updateOldTask = (updatedTask) => {
  let allOtherTask = this.state.userData.tasks.filter(task => task.id !== updatedTask.id)
  let updatedTaskArray = [updatedTask, ...allOtherTask]
  this.setState({
    userData: {
      ...this.state.userData, 
      tasks: updatedTaskArray
    }
  })
}

handleDeleteSpecificTask = (selectedTask) => {
  let updatedTaskArray = this.state.userData.tasks.filter(task => task.id !== selectedTask.id)
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/tasks/${selectedTask.id}`, {
    method: "DELETE",
    headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  
  this.setState({
    userData: {
      ...this.state.userData,
      tasks: updatedTaskArray
    }
  })
}

// CONTACT RELATED ACTIONS
updateNewContact = (createdContact) => {
  this.setState({
    userData: {
      ...this.state.userData, 
        meetup_contacts: [createdContact, ...this.state.userData.meetup_contacts]
    }
  })
}

updateOldContact = (updatedContact) => {
  let allOtherContact = this.state.userData.meetup_contacts.filter(contact => contact.id !== updatedContact.id)
  let updatedContactArray = [updatedContact, ...allOtherContact]
  this.setState({
    userData: {
      ...this.state.userData, 
      meetup_contacts: updatedContactArray
    }
  })
}

handleDeleteSpecificContact = (selectedContact) => {
  let updatedContactArray = this.state.userData.meetup_contacts.filter(contact => contact.id !== selectedContact.id)
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/meetup_contacts/${selectedContact.id}`, {
    method: "DELETE",
    headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
    }
  })
  .then(resp => resp.json())
  this.setState({
    userData: {
      ...this.state.userData,
      meetup_contacts: updatedContactArray
    }
  })
}

// MEETUP RELATED ACTIONS
updateNewEvent = (createdEvent) => {
  this.setState({ 
    userData: {
        ...this.state.userData, 
        meetups: [createdEvent, ...this.state.userData.meetups]
    }
  })
}

updateOldMeet = (updatedMeet) => {
  let allOtherMeet = this.state.userData.meetups.filter(meet => meet.id !== updatedMeet.id)
  let updatedMeetArray = [updatedMeet, ...allOtherMeet]
  this.setState({
    userData: {
      ...this.state.userData, 
      meetups: updatedMeetArray
    }
  })
}

handleDeleteMeet = (meet) => {
  let meetId = meet.id 
  let updatedMeetArray = this.state.userData.meetups.filter(meet => meet.id !== meetId)
  let updatedMeetContactArray = this.state.userData.meetup_contacts.filter(contact => contact.meetup.id !== meetId)
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/meetups/${meetId}`, {
      method: "DELETE",
      headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())

  this.setState({
    userData: {
      ...this.state.userData, 
      meetups: updatedMeetArray,
      meetup_contacts: updatedMeetContactArray
    }
  })
}

render() {
  return (
    <div className="App">
     {sessionStorage.getItem('token') !== null ? <SuperContainer 
     updateOldJob={this.updateOldJob} 
     updateNewEvent={this.updateNewEvent} 
     updateOldMeet={this.updateOldMeet}
     updateNewJob={this.updateNewJob} 
     updateNewTask={this.updateNewTask} 
     updateNewContact={this.updateNewContact}
     logout={this.logout} 
     deleteUser={this.deleteUser} 
     userData={this.state.userData} 
     updateOldTask={this.updateOldTask}
     handleDeleteMeet={this.handleDeleteMeet}
     handleDeleteJob={this.handleDeleteJob} 
     handleDeleteSpecificTask={this.handleDeleteSpecificTask}
     handleDeleteSpecificContact={this.handleDeleteSpecificContact}
     updateOldContact={this.updateOldContact} 
     /> : <LoginAndSignup handleUserSession={this.handleUserSession} /> }    
    </div>
  )}
}

export default withRouter(App)
  


