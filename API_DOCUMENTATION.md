# API Documentation - Servecly Service Marketplace

This document outlines the RESTful API endpoints required to support the Servecly frontend. All requests and responses are in JSON format.

## Base URL
`https://api.servecly.com/v1`

## Authentication
Authentication is handled via JWT (JSON Web Tokens). Most endpoints require an `Authorization` header with a `Bearer <token>`.

---

## 1. Authentication Endpoints

### POST `/auth/login`
Authenticates a user and returns a JWT.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "eyJhbG...",
    "user": { "id": "u123", "name": "John Doe", "role": "client" }
  }
  ```

### POST `/auth/signup`
Registers a new user (Client or Tasker).
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword",
    "role": "tasker"
  }
  ```
- **Response (201 Created):**
  ```json
  { "message": "User registered successfully", "userId": "u124" }
  ```

---

## 2. Services & Taxonomy

### GET `/services/categories`
Retrieves a list of all service categories.
- **Response (200 OK):**
  ```json
  [
    { "id": "cat1", "name": "Assembly", "icon": "🛠️", "taskerCount": 1200 },
    { "id": "cat2", "name": "Cleaning", "icon": "✨", "taskerCount": 3000 }
  ]
  ```

---

## 3. Tasks & Marketplace

### POST `/tasks`
Posts a new task to the marketplace.
- **Request Body:**
  ```json
  {
    "categoryId": "cat1",
    "title": "Assemble IKEA Bed",
    "description": "Need help assembling a MALM queen bed frame.",
    "location": "New York, NY",
    "budget": 75
  }
  ```

### GET `/tasks`
Lists available tasks (filtered by location, category, or status).
- **Query Parameters:** `category`, `status`, `lat`, `lng`

---

## 4. Bookings & Payments

### POST `/bookings`
Creates a booking between a client and a tasker.
- **Request Body:**
  ```json
  {
    "taskId": "t567",
    "taskerId": "u890",
    "scheduledAt": "2026-04-15T14:00:00Z"
  }
  ```

### GET `/bookings`
Retrieves bookings for the authenticated user.

---

## 5. Admin & Vetting

### GET `/admin/vetting/pending`
(Admin only) Lists taskers awaiting background checks or verification.

### PATCH `/admin/vetting/:userId`
(Admin only) Updates a tasker's vetting status.
- **Request Body:**
  ```json
  { "status": "approved" }
  ```

---

## 6. Availability

### GET `/taskers/:userId/availability`
Retrieves a tasker's schedule.

### POST `/availability`
(Tasker only) Updates the tasker's own availability slots.
