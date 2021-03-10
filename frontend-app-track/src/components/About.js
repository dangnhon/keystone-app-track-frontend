import React from 'react'

const About = () => {
    return(
        <div className="about-container">
            <h2>About Our App!</h2>
            <p>Welcome to AppTrack. Here's what you can do: </p>
            <ul>
                <li>
                    View all job applications, tasks, meetups, and contacts.
                </li>
                <li>
                    Able to create, read, update, and delete your account, job applications, tasks, meetups, and contacts.
                </li>
                <li>
                    Sort all of your tasks in priority of 1-5.
                </li>
                <li>
                    Search through all of your contacts by name.
                </li>
                <li>
                    Create a Google Calendar appointment from the appointment tab and have that sent directly into your Google Calendar account.
                </li>
                <li>
                    Keep track and manage all of your data at a glance with as few clicks as possible.
                </li>
            </ul>
        </div>
    )
}

export default About 