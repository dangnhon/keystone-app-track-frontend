import React from "react" 

export default class Analytic extends React.Component {


    render() {
        return (
            <div className="dynamic-container">

                <div className="container-child left"> 
                    Job analytics
                </div> 

                <div className="container-child right"> 
                    Meetup analytics
                    <h3>Can you see this? cool!</h3>
                </div> 
                    
            </div>
        )
    }
}