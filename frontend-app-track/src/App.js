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
    allTask: [], 
    logout: false,
}

componentDidMount() {
  this.fetchLoggedInUser() 
  this.fetchJob() 
  this.fetchMeet() 
}

componentDidUpdate(prevProps, prevState) {
  // if (prevState.userData.jobs !== this.state.userData.jobs || prevState.userData.meetups !== this.state.userData.meetups || prevState.userData.tasks !== this.state.userData.tasks || prevState.allJobs !== this.state.allJobs || prevState.allMeets !== this.state.allMeets) {
    if (prevState.userData.jobs !== this.state.userData.jobs || prevState.userData.meetups !== this.state.userData.meetups || prevState.userData.tasks !== this.state.userData.tasks ) {
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
        .then()
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
        .then()
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
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/meetups/${meetId}`, {
      method: "DELETE",
      headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())
  .then(message => alert("You've deleted a Meetup!"))

  this.setState({
    userData: {
      ...this.state.userData, 
      meetups: updatedMeetArray
  }
  })
}

handleDeleteJob = (job) => {
  let jobId = job.id 
  let updatedJobArray = this.state.userData.jobs.filter(job => job.id !== jobId)
  let token = sessionStorage.getItem("token")
  fetch(`http://localhost:3000/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json"
      }
  })
  .then(resp => resp.json())
  .then(message => alert("You've deleted a job app!"))

  this.setState({
    userData: {
      ...this.state.userData, 
      jobs: updatedJobArray
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
  alert("Come back soon!")
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
     handleDeleteMeet={this.handleDeleteMeet}
     handleDeleteJob={this.handleDeleteJob} 
     /> : <LoginAndSignup handleUserSession={this.handleUserSession} /> }    
    </div>
    )}
  }

  export default withRouter(App)
  // ADD A GIF DEMO VIDEO TO PLAY ON THE LOGIN AND SIGN UP PAGE SO USERS CAN SEE WHAT THE APP IS LIKE


