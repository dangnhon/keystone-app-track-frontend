
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class AddNewJob extends React.Component {
    
    state = { 
            company_name: "",
            job_title: "",
            date: "",
            salary: "",
            status: "In Review", 
            note: "",
            contact_number: "",
            user_id: this.props.userData.id,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmitNewJob = (e) => {
        e.preventDefault() 
        let createJob = this.state
        let token = sessionStorage.getItem("token")
        fetch('http://localhost:3000/jobs', {
            method: "POST",
            headers: {
                Authorization: `bearer ${token}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(createJob)
        })
        .then(reps => reps.json()) 
        .then(createdJob => this.props.updateNewJob(createdJob))
        .then(this.props.closeModal)
    }

    render(){
      return(   

        <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            text="white"
            size="lg"
            show={this.props.isOpen} 
            onHide={this.props.closeModal}>

            <Modal.Body bg="info">
                <Form.Group >

                    <Form.Label>Status: </Form.Label>
                        <Form.Control as="select" custom onChange={(e) => this.handleChange(e)} name="status" defaultValue={"In Review"} >
                        <option value={"In Review"}>In Review</option>
                        <option value={"Offer Received"}>Offer Received</option>
                        <option value={"Rejected"}>Rejected</option>
                    </Form.Control>


                    <Form.Label>Company Name: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="company_name"  placeholder="Enter company name..."/>

                    <Form.Label>Job Position: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="job_title"  placeholder="Enter position..."/> 

                    <Form.Label>Date Applied: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="date"  placeholder="MM/DD/YYYY"/> 

                    <Form.Label>Salary: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="salary"  placeholder="Ex: $90,000"/> 

                    <Form.Label>Contact Number: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="contact_number"  placeholder="(XXX)-XXX-XXXX"/> 

                    <Form.Label>Notes: </Form.Label>
                    <Form.Control type="text" onChange={(e) => this.handleChange(e)} name="note"  placeholder="Enter notes..."/> 

                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e) => this.handleSubmitNewJob(e)} type="submit" >Submit</Button>
            </Modal.Footer>
        </Modal>

      )
    }
  }

