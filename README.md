## **REST API Testing with Playwright-Typecript**

This project is a scalable API client built using the Playwright library. It provides a simple interface for making HTTP requests to a base URL, with built-in support for reusing the API request context to improve performance.

### **Scalability**

One of the key design decisions in this project is the use of a single API request context that is reused across all requests. This approach ensures that the overhead of creating a new request context for each request is minimized, resulting in improved performance and scalability.

## Usage

To use this project, you will need to install the latest version of Node 20+, required dependencies and set up a Playwright browser context. You can then create an instance of the ApiClient class and use its methods to make HTTP requests to the specified endpoints.


### **REST API Setup**
You can use 'JSON server' which will allow you to create tests against the endpoints defined in the supplied db.json file.

#### Install and configure REST API mock server:
1. Install the **JSON Server** globally:

        npm install -g json-server

2. Run the server:

        json-server --watch db.json --port 3000


#### a. **Run Test**:
- Copy the project to your local:

        git clone 

- Install dependencies:

        npm i

- Run the tests:

        npm test


### **More Features to be implemented**

These are scenarios that are yet to be implemented:

>   **Pagination** :

    Get rooms with default pagination, Get rooms with custom pagination, Get rooms with offset pagination,  Negative scenario - Get rooms with invalid pagination parameters

>   **Filtering and sorting** :

    Get rooms with filter by name, Get rooms with filter by price, Get rooms with sort by name,  Negative scenario - Get rooms with invalid parameters

>   **Error Handling** :

    Validate Server-side errors, Client-side errors


### **Limitations**

This project, while robust and scalable, has some limitations that should be considered:

- **Concurrency**: The single API request context may not handle high levels of concurrent requests effectively, potentially leading to bottlenecks.
- **Error Handling**: Advanced error handling mechanisms are not fully implemented, which may result in unhandled exceptions or inadequate error reporting.
- **Scalability**: While the project is designed for scalability, it may require additional optimizations to handle very large datasets or high-frequency requests efficiently.
- **Extensibility**: Adding new features or extending existing functionality might require some extra refactoring especially for `bookings.spec.ts` and `edge-cases.spec.ts` files, as I ran out of time getting the entire suite fully modular.

### **Flaky Tests**

Delete a room and try to fetch it again, this is a flaky test, it will fail sometimes.
This is because the server needs to be restarted every time ia `PUT` or `POST` request is made. An alternative is to use a mock server which will allow you to create tests against the endpoints defined in the supplied db.json file or disable playwright 's built in caching service which will impact performance. To fix the failure, you can restart the server by running the following command.

    npm run start:server


