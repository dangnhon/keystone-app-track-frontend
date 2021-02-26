
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'
import React from 'react'

export default class AddNewJob extends React.Component {
    
    state={ name: null }

    handleChange = (e) => this.setState({name: e.target.value})
  
    render(){
      return(
        <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.isOpen} 
            onHide={this.props.closeModal}
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Modal Form Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.name} placeholder="name input"/>           
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={() => this.props.handleSubmit(this.state.name)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
      )
    }
  }

