import React from 'react'

const Logout = (props) => {
    return(
        <div className="logout-container">
            <h2>Logout?</h2>
            <button onClick={() => props.logout()} className="btn btn-secondary btn-md">Logout</button>
        </div>
    )
}

export default Logout  