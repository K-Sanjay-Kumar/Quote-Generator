**Project Title:**

Quote API with IP-Based Rate Limiting

**Description:**

A RESTful API built with Express.js that serves random inspirational quotes. It implements IP-based rate limiting to allow a maximum of 5 requests per minute from each unique IP to prevent abuse.

Setup Instructions
Clone the repository:

**git clone <repository-url>**

**cd <repository-folder>**

Install dependencies:
**npm install**

Run the server locally:
**node app.js**

Access the application:

Backend API: **http://localhost:3000/api/quote**

Frontend UI: **http://localhost:3000/**

Design Decisions and Assumptions
Used Express.js for quick and flexible backend API development.

Utilized rate-limiter-flexible library for robust and precise IP-based rate limiting.

Rate limiting settings: 5 requests per minute per IP.

In-memory rate limiting used (no database) as per requirements.

Logs request IP and response status using morgan middleware.

Simple frontend UI served as static files to demonstrate the API usage.

Assumed single instance server deployment; in-memory rate limiter is sufficient here.

No persistent storage or database required, all data and rate limit state kept in memory.

API Endpoint
GET /api/quote
Returns a JSON object with a random inspirational quote.
Example response:
json
{ "quote": "The only way to do great work is to love what you do. - Steve Jobs" }

Rate limit exceeded response:
HTTP status code 429
Example response:
json
{ "error": "Rate limit exceeded. Try again in X seconds." }
Testing the API
You can test the API using curl or Postman.

Fetch a random quote:
**curl http://localhost:3000/api/quote**
To test rate limiting, make more than 5 requests within one minute from the same IP, e.g.:

If deployed, put the public URL here, e.g.:
https://your-domain.com/api/quote

Bonus Features (Optional)
Unit tests for rate-limiting logic (can be added later).
Used rate-limiter-flexible library to handle concurrency and thread safety robustly.

