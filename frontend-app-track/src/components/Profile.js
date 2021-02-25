import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Profile extends React.Component {

    state = {
       user: {
           email: this.props.userData.email,
            name: this.props.userData.name
       }
    }

    handleChangeEmail = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                email: e.target.value
            }
        })
    }

    handleChangeName = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                name: e.target.value
            }
        })
    } 

    updateUser = (e) => {
        e.preventDefault() 
        let updatedUser = this.state.user
        let token = sessionStorage.getItem('token')
            fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
                method: "PATCH",
                headers: {
                  Authorization: `bearer ${token}`,
                  "Content-Type": "application/json"           
                }, 
                body: JSON.stringify(updatedUser)
            })
            .then(resp => resp.json())
            .then(updated => alert("You've successfully updated your profile!"))
        }


    render() {
        
        return(
            <div className="profile-container">
                
            <h2>This is your profile</h2><br></br>
            <div>
            <form className="profile-form" onSubmit={(e) => this.updateUser(e)}>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={(e) => this.handleChangeEmail(e)} type="text" className="form-control" defaultValue={this.props.userData.email} />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input onChange={(e) => this.handleChangeName(e)} type="tag" className="form-control" defaultValue={this.props.userData.name} />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block">Update Profile</button><br></br>
                <button onClick={() => this.props.deleteUser()} className="btn btn-dark btn-lg btn-block">Delete Account?</button><br></br>

            </form>
            </div> 
               
            </div>
        )
    }
}