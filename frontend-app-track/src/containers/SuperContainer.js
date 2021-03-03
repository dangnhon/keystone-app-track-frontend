import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route, Link } from "react-router-dom";
import DynamicPane from './DynamicPane.js'
import Profile from '../components/Profile.js'
import Appointment from '../components/Appointment.js'
import About from '../components/About.js'
import Logout from '../components/Logout.js'




export default class SuperContainer extends React.Component {


    render(){
        return (
            <div className="App">
              <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                  <Link className="navbar-brand" to={"/home"}>Home</Link>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/profile"}>Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/appointment"}>Appointment</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/about"}>About</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/logout"}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        
              <div className="outer">
                <div className="inner">
                  <Switch>
                    
                    <Route exact path='/home' render={() => {
                    return <DynamicPane 
                    updateNewEvent={this.props.updateNewEvent} 
                    updateNewJob={this.props.updateNewJob} 
                    updateNewTask={this.props.updateNewTask}
                    updateNewContact={this.props.updateNewContact} 
                    userData={this.props.userData} 
                    allJobs={this.props.allJobs}
                    allMeets={this.props.allMeets}
                    updateOldJob={this.props.updateOldJob} 
                    updateOldMeet={this.props.updateOldMeet} 
                    updateOldContact={this.props.updateOldContact} 
                    updateOldTask={this.props.updateOldTask}
                    handleDeleteMeet={this.props.handleDeleteMeet} 
                    handleDeleteJob={this.props.handleDeleteJob} /> 
                     }} />

                    <Route exact path="/profile" render={() => {
                    return <Profile deleteUser={this.props.deleteUser} userData={this.props.userData} /> 
                     }} />

                    <Route exact path="/about" component={About} />

                    <Route exact path="/logout" render={() => {
                    return <Logout logout={this.props.logout} /> 
                     }} />

                     <Route exact path='/' render={() => {
                    return <DynamicPane 
                    updateNewEvent={this.props.updateNewEvent} 
                    updateNewJob={this.props.updateNewJob} 
                    updateNewTask={this.props.updateNewTask}
                    updateNewContact={this.props.updateNewContact} 
                    userData={this.props.userData}
                    allJobs={this.props.allJobs}
                    allMeets={this.props.allMeets}
                    updateOldJob={this.props.updateOldJob}
                    updateOldMeet={this.props.updateOldMeet}
                    updateOldContact={this.props.updateOldContact}
                    updateOldTask={this.props.updateOldTask}
                    handleDeleteMeet={this.props.handleDeleteMeet}
                    handleDeleteJob={this.props.handleDeleteJob} /> 
                     }} />

                  </Switch>
                </div>
              </div>
            </div>
          );
    }
}