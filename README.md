# Resilient Email Service

This project implements a resilient email sending service in JavaScript. It uses mock providers and includes features like retry with exponential backoff, fallback between providers, idempotency, rate limiting, status tracking, and optional logging.

## Features

- **Retry Mechanism** using exponential backoff
- **Fallback** between two mock providers
- **Idempotency** to avoid duplicate sends
- **Rate Limiting** to control send frequency
- **Status Tracking** for each email
- **Basic Logging** for debugging and observability

## Structure
- **src/EmailService.js**: main service
- **src/providers/**: mock providers
- **src/features/**: helpers
- **tests/**: unit tests

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Manojkumar809/Resilient-Email-Service.git
cd Resilient-Email-Service
```

### 2. Initialize Project (Optional)

If you plan to install Jest or manage dependencies, run:

```bash
npm init -y
```

Then install Jest:

```bash
npm install --save-dev jest
```
## Running Tests

### With Jest

Create a `package.json` file or use the one generated via `npm init -y`, and add this script:

```json
"scripts": {
"start": node index.js,
"test": "jest"
}
```

Then run:

```bash
npm test
```

### Without Jest (Manual Execution)

If you do not use Jest, you can manually import and test `EmailService` using Node.js. For example:

```bash
node test/EmailService.test.js
```

> Note: You’ll need to slightly modify the test file for pure Node.js execution without Jest.

## Code Documentation

### 📁 src/EmailService.js

#### 🔍 Purpose
This is the main class that handles:

- Sending emails using multiple providers

- Retry logic with exponential backoff

- Fallback to another provider if one fails

- Rate limiting

- Idempotency

- Status tracking

- Circuit breaker integration

#### 🧠 Key Concepts Used:
- Retry with delay doubling
- Circuit breaker per provider
- Simple in-memory idempotency and rate limiting

### 📁 src/providers/ProviderA.js & ProviderB.js
#### 🔍 Purpose
Simulate a mock email provider that can randomly fail.
- The sendEmail method randomly fails 50% of the time.
- Used to simulate real-world provider unreliability.
- ProviderB works the same way.

### 📁 src/features/RateLimiter.js
#### 🔍 Purpose
Prevents a user (or email ID) from making too many requests in a short time.
- Keeps a timestamp list of requests per key (like to address).

- If more than limit in time window, deny it.

### 📁 src/features/CircuitBreaker.js
#### 🔍 Purpose
Temporarily disables a failing provider to prevent repeated failures (resilience).

- If 3+ failures happen quickly, circuit opens.
- Temporarily disables the provider for 10 seconds (d
- Automatically resets if enough time has passed.

### 📁 tests/EmailService.test.js
#### 🔍 Purpose
Test all the behavior (happy path, fallback, failure, etc.)
- Sends an email and prints status
- Triggers retry, fallback, and logging automatically due to randomness

## Hosted API

Deployed on Render: https://email-service-render.onrender.com  (Just Example)

### Endpoints

- `POST /send-email`  
  Body:
  ```json
  {
    "id": "email-001",
    "to": "user@example.com",
    "subject": "Hello",
    "body": "Test email"
  }
