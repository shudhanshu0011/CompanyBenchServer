# cb-node-web-api-service

This repository serves as a sample project that can be used as a reference for defining the project structure of future Node.js projects. It includes various components such as configuration files, error codes, entity routes, and data models based on MongoDB schema.

## Project Structure

The project structure is organized as follows:

```
- config/
    - service.js
    - error_codes.js
- routes/
- models/
```

## Configuration

The `config/service.js` file contains the project configurations. This file is used to define various settings and parameters required for the proper functioning of the project. Feel free to modify this file to suit your specific project requirements.

## Error Codes

The `config/error_codes.js` file includes all the error codes along with their corresponding error messages. This file is a centralized location to manage and maintain error codes throughout the project. You can add, modify, or remove error codes and their messages as needed.

## Entity Routes

The `routes/` folder contains all the entity routes for the project. Each entity typically has its own file that defines the routes related to that specific entity. You can create new route files or modify the existing ones to handle the desired functionality for your project.

## Data Models

The `models/` folder houses the data-model files based on the underlying MongoDB schema. These files define the structure and behavior of the data entities in your application. You can create new model files or modify the existing ones to reflect the data requirements of your project.

## Usage

To use this project as a starting point for your own Node.js project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the project dependencies: `npm install`
3. Configure the project settings in `config/service.js` as per your requirements.
4. Customize the error codes and messages in `config/error_codes.js`.
5. Define your entity routes in the `routes/` folder.
6. Modify or create new data models in the `models/` folder based on your MongoDB schema.
7. Run the project on local using command as "node app.local.js".

## Contributors

- [Piyush Agarwal](https://github.com/piyushcompanybench) - Initial author
- [Abhishek Bhardwaj](https://github.com/cgabhishek)