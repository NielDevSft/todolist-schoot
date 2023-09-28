# todolist-schoot

System to organize tasks

# Presentation

This project is a proof of concept using spring boot for Java 17, angular 15 and myqls database

# Application and deploy

This application provides a simple interface that aims to allow task management. With a deadline, description and priorities. All buttons and models are
made using the framework Angular whit angular material.
To be able to publish locally, you will need to import the maven project from the /api/todolist folder to a Java IDE of your choice and run the build.
With maven installed locally it is possible to run the "mvn package" command.
This will generate the target folder with the jar file we will need to deploy.
To publish, you will need to have Docker installed.
The only command needed to upload the application will be "docker-compose up".
At the end of publication, the application will be available at http://localhost:4200/item
To close the application, run the "docker-compose down" command
