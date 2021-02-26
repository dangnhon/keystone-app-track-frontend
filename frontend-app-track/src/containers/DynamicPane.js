import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AllJobAndTask from '../components/AllJobAndTask.js'
import AllEventAndCntact from '../components/AllEventAndContact.js'

export default class DynamicPane extends React.Component {
    render() {
        return(
            <div className="dynamic-container">

                <div className="container-child left"> 
                    <AllJobAndTask userData={this.props.userData} />  
                </div> 

                <div className="container-child right"> 
                    <AllEventAndCntact userData={this.props.userData} />
                </div> 

            </div>
        )
    }
}