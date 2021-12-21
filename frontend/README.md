# HelloWorld Containerized Angular Webapp

This is a simple web app that fetches data from the dotnet API built in lesson 1. Follow along with the [tutorial here](http://localhost:4000/KubernetesAITutorial_2/)

## Prerequisites

+  [NodeJS](https://nodejs.org/en/) and npm to run the web app
+  [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli) to use Angular
+  [Docker](https://docs.docker.com/get-docker/) to [containerize](https://cloud.google.com/containers#:~:text=Containerization%20provides%20a%20clean%20separation,configurations%20specific%20to%20the%20app.) 
+  [Google chrome](https://www.google.com/chrome/) or Microsoft edge chromium


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Dockerize the application and run the container

```shell
# For me this directory is 'angular-dotnet-webapp-tutorial/Lesson 2 - Angular App'
cd </directory/to/webapp> 
docker build -t webapp:v1 .
docker run -it --rm -p 8081:80 webapp:v1
```

The application is running at `http://localhost:8081/` now. This application fetches data from the application build in lesson 1. Be sure to have the application running simultaneously in a separate terminal.