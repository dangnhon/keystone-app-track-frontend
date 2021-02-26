
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
            status: false, 
            note: "",
            contact_number: ""
    }

    handleChange = (e) => {
        this.setState({
                    [e.target.name]: e.target.value,
        })
    }

    handleSubmitNewJob = (e) => {
        debugger
        e.preventDefault() 
        //make a POST request after builidng out the create backend action
        console.log(e)
    }

  
    render(){
      return(
        <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.isOpen} 
            onHide={this.props.closeModal}
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Track A New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >

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
                <Button variant="primary" type="submit" onSubmit={(e) => this.handleSubmitNewJob}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
      )
    }
  }

