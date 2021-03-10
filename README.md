# README

# AppTrack

# Goal and Background: 

    The goal of this application is to allow users the ability to track the all of the jobs they've applied to, associate tasks with each job, track the meetups they've been to, and associate contacts they've acquired at each meetup. Alongside all of this, they can schedule appointments to their google calendar account right from the app as well. The UI is simple in design but was done so in order to keep relevant information always accessible at a glance. I undertsand how exhausting it can be during the job hunt, so designed the app to be quick and easy to use. 

# Symbols throughout the README:

    1. "" ==> What is displayed in the application terminal
    
    2. '' ==> What to type into the terminal (excluding the '')

# Prerequisites and installation guide to get started (HOSTED BACKEND):

    1. Please have the latest version of React JS and an environment such Visual Studio.

    2. Fork and clone down a copy of the frontend repository into your local machine from https://github.com/dangnhon/keystone-app-track-frontend.

    3. Ensure that all packages have been installed and updated correctly. This will be done for you by running 'npm install' or 'yarn install' in the terminal.

    4. If servers are up and hosted, run 'npm start' once to start the application.
    
    5. From there, you may follow the prompts of creating an account (first time users).

# Prerequisites and installation guide to get started (UNHOSTED BACKEND):

    1. Please have the latest version of React JS and an environment such Visual Studio.

    2. Fork and clone down a copy of this repository into your local machine.

    3. Ensure that all packages have been installed and updated correctly. This will be done for you by running 'npm install' or 'yarn install' in the terminal.

    4. Fork and clone down the backend API server from https://github.com/dangnhon/keystone-app-track-backend

    5. cd into the backend, and type in 'bundle install' within the terminal. Once all gems are installed, type in 'rails s' to start the backend server

    6. Ensuring the backend is up and running, cd into the front end. 
    
    7. run 'npm start' within the terminal of the frontend to start the application. 


# As a user of our application, a user can do a few things:

    1. Create a profile and account. (account is neccessary to have access to all features of the AppTrack).

    2. View all job applications, tasks, meetups, and contacts.

    3. Able to Create, Read, Update, and Delete their account, job applications, tasks, meetups, and contacts.

    4. Sort all of their tasks in priority of 1-5. 

    5. Search through all of their contacts by name. 

    6. Create a google calendar appointment from the appointment tab and have that sent directly imported into their calendar. 

    7. Keep track and manage all of their data at a glance with as few clicks as possible. 

# Packages used in the development of the frontend application:

    1. React Gapi @ https://www.npmjs.com/package/react-gapi

    2. Bootstrap @ https://react-bootstrap.github.io/

    3. React Router DOM @ https://reactrouter.com/web/guides/quick-start

    4. React Datetime Picker @ https://www.npmjs.com/package/react-datetime-picker

    5. React Alice Carousel @ https://www.npmjs.com/package/react-alice-carousel

# Packages used in the development of the backend application:
    1. JWT @ https://jwt.io/

    2. Rails API Serializer @ https://github.com/rails-api/active_model_serializers

    3. Bcrypt @ https://rubygems.org/gems/bcrypt/versions/3.1.12



