/*Task:
Implement a resilient email sending service in TypeScript/JavaScript.

Requirements:
1. Create an EmailService class that works with two mock email providers.
2. Implement retry logic with exponential backoff.
3. Add a fallback mechanism to switch providers on failure.
4. Ensure idempotency to prevent duplicate sends.
5. Implement basic rate limiting.
6. Provide status tracking for email sending attempts.

Key Features:
    Retry mechanism
    Fallback between providers
    Idempotency
    Rate limiting
    Status tracking
    Simple logging

*/


const EmailService = require("./src/EmailService");
const { Email } = require("./src/Email");
const ProviderA = require("./src/providers/ProviderA");
const ProviderB = require("./src/providers/ProviderB");

// Creating objects for Email class.
const email1 = new Email(1, "test1@gmail.com", "test subject", "test body");
const email2 = new Email(2, "test2@gmail.com", "test subject", "test body");

// Calling the send method to send email.
const service1 = new EmailService([new ProviderA()], 5);
(async ()=> {
    await service1.send(email1);
})()
const service2 = new EmailService([new ProviderB()], 5);
// (async ()=> {
//     await service2.send(email2);
// })()

// Checking the rate limiter behavior - it should throw an error.
// (async ()=> {
//     await service1.send(new Email("1", "test1@gmail.com", "test subject", "test body"));
//     await service1.send(new Email("2", "test2@gmail.com", "test subject", "test body"));
//     await service1.send(new Email("3", "test3@gmail.com", "test subject", "test body"));
//     await service1.send(new Email("4", "test4@gmail.com", "test subject", "test body"));
//     await service1.send(new Email("5", "test5@gmail.com", "test subject", "test body"));
//     await service1.send(new Email("6", "test6@gmail.com", "test subject", "test body"));
// })()

