# Travlr Getaways – Full Stack Web Application

## Overview

Travlr Getaways is a full stack web application that supports both a customer-facing website and an administrative single-page application (SPA). The system was built using the MEAN stack (MongoDB, Express, Angular, Node.js) and implements secure authentication using Passport and JSON Web Tokens (JWT).

The public site allows users to browse travel packages, while the administrative interface enables authenticated users to create, update, and delete trips through a protected REST API.

This project represents the final iteration of a full stack development process and demonstrates layered architecture, secure endpoint management, and client-server integration.

---

# Architecture

This project incorporates two distinct frontend approaches: server-side rendering with Express and a client-side Angular SPA.

### Server-Rendered Public Site

The public-facing application uses Express with Handlebars templates. When a user navigates to `/travel`, the server retrieves trip data from MongoDB and renders a complete HTML response. Each request is processed server-side and results in a full page reload.

This approach is straightforward and effective for delivering content-focused pages.

### Angular Administrative SPA

The administrative interface is built as an Angular single-page application. Instead of rendering HTML on the server, Angular consumes JSON data from RESTful endpoints such as:

- `GET /api/trips`
- `PUT /api/trips/:tripCode`
- `POST /api/login`

The SPA dynamically updates the user interface without requiring a full page reload. Client-side routing manages navigation, and Angular services handle HTTP communication with the backend.

This separation between presentation logic, service layers, and backend controllers reinforces clean architecture principles.

### Backend and Database

The backend uses Node.js and Express to expose RESTful API endpoints. MongoDB was selected as the database because its document-based structure aligns naturally with JavaScript and the MEAN stack. Travel packages are stored as JSON-like documents, which integrate seamlessly with both the Express API and the Angular frontend.

Mongoose schemas enforce structure and validation while preserving the flexibility of a NoSQL database.

### Security

Authentication is implemented using Passport and JWT.

- Users authenticate via `POST /api/login`
- A signed JWT token is returned upon successful validation
- Protected endpoints require the token in the `Authorization` header
- Middleware verifies the token before allowing create, update, or delete operations

Public browsing routes remain accessible without authentication, while administrative CRUD operations are restricted.

---

# Functionality

## JSON and Full Stack Integration

JSON serves as the bridge between the frontend and backend layers.

While JavaScript powers both sides of the application, JSON is the structured format used to exchange data. Express controllers return trip data as JSON, and Angular binds that data directly to the UI through observable responses.

This consistent data format ensures clean communication between layers.

## Refactoring and Code Improvements

Throughout development, the application was refactored to improve clarity and efficiency.

Examples include:

- Separating `app_server` (server-rendered routes) and `app_api` (RESTful endpoints)
- Abstracting HTTP logic into Angular services
- Delegating database logic to Mongoose models
- Implementing JWT middleware to centralize authentication enforcement

These changes improved maintainability, reduced duplication, and reinforced separation of concerns.

## Reusable UI Components

The Angular `TripsComponent` and supporting services demonstrate reusable design patterns.

Reusable components provide:
- Consistent data rendering
- Centralized logic management
- Reduced redundancy
- Easier scalability for future features

This approach improves long-term maintainability and efficiency.

---

# Testing

Testing involved validating both functionality and security.

## Endpoint Testing

Each HTTP method was tested to confirm proper behavior:

- `GET` requests retrieved data from MongoDB
- `PUT` requests updated trip information and persisted changes
- `POST` and `DELETE` operations modified database records correctly

Data persistence was verified by refreshing the application and confirming changes were stored.

## Security Testing

JWT-protected endpoints were tested to ensure proper access control:

- Requests without a token were rejected
- Invalid tokens were denied
- Valid tokens allowed access to protected CRUD operations

This process reinforced understanding of middleware, authentication flow, and secure endpoint enforcement.

---

# Reflection

This project represents a significant milestone in my transition into technology.

Coming from a background in retail leadership, I was accustomed to managing systems and operations at a high level. Through this course, I moved from managing processes to building and architecting them at the code level.

I developed hands-on experience with:

- Full stack architecture design
- RESTful API development
- MongoDB schema modeling
- JWT-based authentication
- Angular SPA development
- Middleware-based security enforcement

More importantly, I learned how these layers integrate into a cohesive system.

This project strengthened both my technical skills and my confidence. I can now demonstrate the ability to design and implement a secure, full stack application using modern technologies. As I continue pursuing opportunities in software engineering and product-focused roles, this experience provides both practical expertise and architectural perspective.

---

# Technologies Used

- MongoDB
- Mongoose
- Express
- Node.js
- Angular
- Passport
- JSON Web Tokens (JWT)
- Handlebars (HBS)

---

# Author

**Rowvin Dizon**  
CS 465 – Full Stack Development  
Southern New Hampshire University