import React from 'react' 
import Button from 'react-bootstrap/button'
import {Card} from 'react-bootstrap'

const ContactCard = (props) => {
    return (
        <div className="job-card">
            <Card className="contact-cards" text="black" style={{ width: '100%' }}>
                <Card.Body>
                        <Card.Title>{props.contact.name}</Card.Title>
                        <Card.Text>{props.contact.email}</Card.Text>
                        <Card.Text>{props.contact.phone_number}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ContactCard 