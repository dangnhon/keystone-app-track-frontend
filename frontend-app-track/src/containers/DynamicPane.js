import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AllJobAndTask from '../components/AllJobAndTask.js'
import AllEventAndContact from '../components/AllEventAndContact.js'

export default class DynamicPane extends React.Component {

    render() {
        return(
            <div className="dynamic-container">

                <div className="container-child left"> 

                    <AllJobAndTask  
                    updateNewJob={this.props.updateNewJob} 
                    updateNewTask={this.props.updateNewTask} 
                    userData={this.props.userData} 
                    allJobs={this.props.allJobs}
                    updateOldJob={this.props.updateOldJob} 
                    updateOldTask={this.props.updateOldTask}
                    handleDeleteSpecificTask={this.props.handleDeleteSpecificTask}
                    handleDeleteJob={this.props.handleDeleteJob}/>  
                </div> 

                <div className="container-child right"> 
                    <AllEventAndContact 
                    updateNewEvent={this.props.updateNewEvent} 
                    updateNewContact={this.props.updateNewContact}
                    userData={this.props.userData} 
                    allMeets={this.props.allMeets}
                    updateOldMeet={this.props.updateOldMeet} 
                    updateOldContact={this.props.updateOldContact}
                    handleDeleteSpecificContact={this.props.handleDeleteSpecificContact}
                    handleDeleteMeet={this.props.handleDeleteMeet} />
                </div> 

            </div>
        )
    }
}