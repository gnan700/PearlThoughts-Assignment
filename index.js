const express = require("express");
const EmailService = require("./src/EmailService");
const { Email } = require("./src/Email");
const ProviderA = require("./src/providers/ProviderA");
const ProviderB = require("./src/providers/ProviderB");

const app = express();
app.use(express.json());

const emailService = new EmailService([new ProviderA(), new ProviderB()], 5);

// POST /send-email
app.post("/send-email", async (req, res) => {
  const { id, to, subject, body } = req.body;
  if (!id || !to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const email = new Email(id, to, subject, body);
    await emailService.send(email);
    res.json({ status: emailService.getStatus(id) });
  } catch (e) {
    res.status(500).json({ error: e.message, status: emailService.getStatus(id) });
  }
});

// GET /status/:id
app.get("/status/:id", (req, res) => {
  const status = emailService.getStatus(req.params.id);
  if (!status) {
    return res.status(404).json({ error: "Email ID not found" });
  }
  res.json({ status });
});

app.get("/", (req, res) => {
  res.send("📫 EmailService API is running!");
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ EmailService API running at http://localhost:${PORT}`);
});

