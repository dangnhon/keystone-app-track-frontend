import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AllJobAndTask from '../components/AllJobAndTask.js'
//import AllTask from '../components/AllTask.js'

export default class DynamicPane extends React.Component {
    render() {
        return(
            <div className="dynamic-container">

                <div className="container-child left"> 
                    <AllJobAndTask userData={this.props.userData} />  
                </div> 

                <div className="container-child right"> 
                    right dynamic pane
                </div> 

            </div>
        )
    }
}