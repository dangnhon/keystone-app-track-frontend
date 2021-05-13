import React from 'react'
import {Card} from 'react-bootstrap'

const EventCard = (props) => {
    return (
        <div className="job-card">
        <Card text="black" className="meet-cards" onClick={(e) => props.openEditModal(e, props.meet)} style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>Meetup: {props.meet.name}</Card.Title>
                    <Card.Text>
                        Location: {props.meet.location}<br></br>
                        Date: {props.meet.date}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    )
}

export default EventCard