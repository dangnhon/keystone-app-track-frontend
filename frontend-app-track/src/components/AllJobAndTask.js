import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap'

export default class AllJobAndTask extends React.Component {

    getAllJob = () => {
       return this.props.userData.map(job => 
            <div className="job-card">
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>{job.company_name}</Card.Title>
                        <Card.Text>
                            {job.status === false ? "Status: In Review" : "Status: Accepted"}
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

                {this.getAllJob()}
                </div>

                <div className="job-container-child right">
                all Tasks!
                </div>

            </div>
        )
    }
}