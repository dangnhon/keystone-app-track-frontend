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
                    userData={this.props.userData} 
                    updateOldJob={this.props.updateOldJob} />  
                </div> 

                <div className="container-child right"> 
                    <AllEventAndContact 
                    updateNewEvent={this.props.updateNewEvent} 
                    userData={this.props.userData} 
                    updateOldMeet={this.props.updateOldMeet} />
                </div> 

            </div>
        )
    }
}