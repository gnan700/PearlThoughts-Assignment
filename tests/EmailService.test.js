// test/emailService.test.js
const EmailService = require('../src/EmailService');
const ProviderA = require('../src/providers/ProviderA');
const ProviderB = require('../src/providers/ProviderB');
const { Email } = require('../src/Email');

describe('EmailService', () => {
  let emailService;
  let email;

  // Creating new objects before each test.
  beforeEach(() => {
    const providerA = new ProviderA();
    const providerB = new ProviderB();
    emailService = new EmailService([providerA, providerB], 5); // small rate limit for testing
    email = new Email('1', 'user@example.com', 'Test Subject', 'Test Body');
  });

  // Checking the send option.
  test('should send email successfully using one of the providers', async () => {
    await expect(emailService.send(email)).resolves.toBeUndefined();
    expect(emailService.getStatus(email.id)).toBe('sent');
  });

  // Checking the idempotency behavior.
  test('should prevent duplicate email sends (idempotency)', async () => {
    await emailService.send(email);
    await expect(emailService.send(email)).resolves.toBeUndefined();
  });

  // Checking the rate limiter behavior.
  test('should rate limit after exceeding limit', async () => {
    const email2 = new Email('2', 'user2@example.com', 'Subject 2', 'Body 2');
    const email3 = new Email('3', 'user3@example.com', 'Subject 3', 'Body 3');
    const email4 = new Email('4', 'user4@example.com', 'Subject 4', 'Body 4');
    const email5 = new Email('5', 'user5@example.com', 'Subject 5', 'Body 5');
    const email6 = new Email('6', 'user6@example.com', 'Subject 6', 'Body 6');

    await emailService.send(email);
    await emailService.send(email2);
    await emailService.send(email3);
    await emailService.send(email4);
    await emailService.send(email5);

    await expect(emailService.send(email6)).rejects.toThrow('Rate limit exceeded');
  });

  // Checking the failover.
  test('should mark email status as failed when all providers fail', async () => {
    // Forcing providers to always fail
    const alwaysFailingProvider = {
      name: 'AlwaysFailing',
      send: async () => { throw new Error('Fail'); }
    };
    const service = new EmailService([alwaysFailingProvider], 5);
    const emailFail = new Email('fail1', 'fail@example.com', 'Fail Subject', 'Fail Body');

    await expect(service.send(emailFail)).rejects.toThrow('All providers failed');
    expect(service.getStatus(emailFail.id)).toBe('failed');
  });
  
});