<h1> Assignment Management System. </h1>

## Description

- AMS - Assignment Management System.

## Project Stack

- Docker
- PostgreSQL
- Express
- NodeJS
  <br/>

### Installation

- install the **[docker](https://docs.docker.com/engine/install/ubuntu/)** and **[docker compose](https://docs.docker.com/compose/install/)**.
  <br/>


## Development
- create a SQL database named ams
- get inside to project directory,
  ```sh
  $ cd ams
  ```
- install dependencies
  ```sh
  $ npm install
  ```
- start the project
  ```sh
  $ npm run start
  ```
- start test
  ```sh
  $ npm run test
  ```

## Docker
- in terminal, run this command inside the project directory to start docker. (Wouldn't connect to the internal postgres db because of some network config which needs to be fixed. Please try manual installation with a local postgres db from the .env.example and run the server with npm)

  ```sh
  $ docker-compose build;
  $ docker-compose up;
  ```

- use the following command to stop docker.

  ```sh
  $ docker-compose down;
  ```

- Visit **http://localhost:3000/login** for accessing the web interface.
  <br/>

## Features
- Login
  - Authentication system for admin users. For the demo, use seeded user:
    - email: admin@metaschool.so
    - password: Admin1234
  - Authentication system for students. For the demo, use seeded user:
    - email: student_user_1@metaschool.so
    - password: Student1
    - *OR*
    - email: student_user_2@metaschool.so
    - password: Student2
- Create Assessments which can have multiple sections. Each sections can have multiple questions of different types. Each question can have multiple options and at least one correct answer.
- Simple authentication for admin to view and create assessments. Visit this route for creating assessment: **http://localhost:3000/dashboard**
- Students can view assessments and start test from this route: **http://localhost:3000/assessments**


## TODO
- Add delete logic for all entities
- Add schema validation for all the requests
- Add update logic for all the entities
- Handle change of MCQ to MSQ question type
- Handle students submitting the assessments and storing the assessment attemps so that the Admins can view when and how many times the students attempted to take the test
- Handle score of the assessments attempted by students
- Handle authorisation logic
- Fix docker-compose network issue to connect to localhost
- Implement proper logout functionality
- Change UI to react.js

## Note
The goal of this assignment for me is to show the way I design and architect my projects rather than showing a fully completed one. That's why I mention the TODOs so that the project progress is known. I have purposely left implementing some features because they would be repetitive for this test IE, saving the assessment attempt. I have also used EJS just to load the HTML pages but the pages are using APIs instead of embedded objects, so the idea is to change the UI to react.js or other FE frameworks. Please navigate to different pages via the URL mentioned above.
