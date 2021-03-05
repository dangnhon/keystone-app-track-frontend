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
    allJobs: [],
    allMeets: [], 
    logout: false,
}

componentDidMount() {
  this.fetchLoggedInUser() 
  this.fetchJob() 
  this.fetchMeet() 
}

componentDidUpdate(prevProps, prevState) {
    if (prevState.userData.jobs !== this.state.userData.jobs || prevState.userData.meetups !== this.state.userData.meetups) {
    this.fetchJob();
    this.fetchMeet() 
  }
}

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

fetchJob = () => {
    let token = sessionStorage.getItem('token')
      if (token) {
        fetch('http://localhost:3000/jobs', {
        method: "GET",
        headers: {
        Authorization: `bearer ${token}`,
        }})
        .then(resp => resp.json())
        .then(jobs => { 
        this.setState({ allJobs: jobs} )}
      )} 
  }

  fetchMeet = () => {
    let token = sessionStorage.getItem('token')
      if (token) {
        fetch('http://localhost:3000/meetups', {
        method: "GET",
        headers: {
        Authorization: `bearer ${token}`,
        }})
        .then(resp => resp.json())
        .then(meetups => { 
          this.setState({ allMeets: meetups })}
      )}
  }

updateNewJob = (createdJob) => {
  this.setState({ 
    userData: {
      ...this.state.userData, 
        jobs: [createdJob, ...this.state.userData.jobs]
    }
  })
}

updateNewTask = (createdTask) => {
  let allJobTask = this.state.allJobs.map(job => job.id === createdTask.job.id ? {...job, tasks: [createdTask, ...job.tasks]} : job )
  this.setState({ 
    allJobs: allJobTask
  })
  this.updateTaskAgain(createdTask) 
}

updateTaskAgain = (createdTask) => {
  this.setState({
    userData: {
      ...this.state.userData, 
        tasks: [createdTask, ...this.state.userData.tasks]
    }
  })
}

updateNewContact = (createdContact) => {
  let allMeetContact = this.state.allMeets.map(meet => meet.id === createdContact.meetup.id ? {...meet, meetup_contacts: [createdContact, ...meet.meetup_contacts]} : meet )
  this.setState({ 
    allMeets: allMeetContact
  })
  this.updateContactAgain(createdContact)
}

updateContactAgain = (createdContact) => {
  this.setState({
    userData: {
      ...this.state.userData, 
        meetup_contacts: [createdContact, ...this.state.userData.meetup_contacts]
    }
  })
}

updateOldContact = (updatedContact) => {
  let findMeetArray = this.state.allMeets.find( meet => meet.id === updatedContact.meetup.id)
  let deleteContactArray = findMeetArray.meetup_contacts.filter(contact => contact.id !== updatedContact.id)
  let finalUpdatedContactArray = [updatedContact, ...deleteContactArray]
  let allMeetContact = this.state.allMeets.map(meet => meet.id === updatedContact.meetup.id ? {...meet, meetup_contacts: finalUpdatedContactArray} : meet )
  this.setState({
      allMeets: allMeetContact
  })
  this.updateOldContactAgain(updatedContact)
}

updateOldContactAgain = (updatedContact) => {
  let allOtherContact = this.state.userData.meetup_contacts.filter(contact => contact.id !== updatedContact.id)
  let updatedContactArray = [updatedContact, ...allOtherContact]
  this.setState({
    userData: {
      ...this.state.userData, 
      meetup_contacts: updatedContactArray
    }
  })
}

updateOldTask = (updatedTask) => {
  let findTaskArray = this.state.allJobs.find(job => job.id === updatedTask.job.id)
  let deleteTaskArray = findTaskArray.tasks.filter(task => task.id !== updatedTask.id)
  let finalUpdatedTaskArray = [updatedTask, ...deleteTaskArray]
  let allJobTask = this.state.allJobs.map(job => job.id === updatedTask.job.id ? {...job, tasks: finalUpdatedTaskArray} : job )
  this.setState({
      allJobs: allJobTask
  })
  this.updateOldTaskAgain(updatedTask)
}

updateOldTaskAgain = (updatedTask) => {
  let allOtherTask = this.state.userData.tasks.filter(task => task.id !== updatedTask.id)
  let updatedTaskArray = [updatedTask, ...allOtherTask]
  this.setState({
    userData: {
      ...this.state.userData, 
      tasks: updatedTaskArray
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

updateNewEvent = (createdEvent) => {
  this.setState({ 
    userData: {
        ...this.state.userData, 
        meetups: [createdEvent, ...this.state.userData.meetups]
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
  //.then(message => alert("You've deleted a Meetup!"))

  this.setState({
    userData: {
      ...this.state.userData, 
      meetups: updatedMeetArray,
      meetup_contacts: updatedMeetContactArray
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
  //.then(message => alert("You've deleted a job app!"))

  this.setState({
    userData: {
      ...this.state.userData, 
      jobs: updatedJobArray,
      tasks: updatedTaskArray
  }
  })
}

handleDeleteSpecificTask = (selectedTask, selectedJob) => {
  let findTaskArray = this.state.allJobs.find(job => job.id === selectedJob.id)
  let deletedTaskArray = findTaskArray.tasks.filter(task => task.id !== selectedTask.id)
  let allJobTask = this.state.allJobs.map(job => job.id === selectedJob.id ? {...job, tasks: deletedTaskArray} : job )

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
  },
    allJobs: allJobTask
  })
}

handleDeleteSpecificContact = (selectedContact, selectedMeet) => {
  let findContactArray = this.state.allMeets.find(meet => meet.id === selectedMeet.id)
  let deletedContactArray = findContactArray.meetup_contacts.filter(contact => contact.id !== selectedContact.id)
  let allMeetContact = this.state.allMeets.map(meet => meet.id === selectedMeet.id ? {...meet, meetup_contacts: deletedContactArray} : meet)

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
  },
    allMeets: allMeetContact
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
     allJobs={this.state.allJobs}
     allMeets={this.state.allMeets}
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
  // ADD A GIF DEMO VIDEO TO PLAY ON THE LOGIN AND SIGN UP PAGE SO USERS CAN SEE WHAT THE APP IS LIKE


