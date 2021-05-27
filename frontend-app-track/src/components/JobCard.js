import React from 'react' 
import {Card} from 'react-bootstrap'

const JobCard = (props) => {
    return (
        <div className="job-card">
                <Card text="black" className="job-cards" onClick={(e) => props.openEditModal(e, props.job)} style={{ width: '100%' }}>
                    <Card.Body >
                        <Card.Title>Applied To: {props.job.company_name}</Card.Title>
                            <Card.Text>
                                {props.job.status}
                        </Card.Text>
                    </Card.Body>
                </Card>
        </div> 
    )
}

export default JobCard