require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const line = require("@line/bot-sdk");

const {
  getDirectLineToken,
  startConversation,
  sendMessage,
  checkForBotMessages,
} = require("./controllers/copilotGetInput.controller");

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  try {
    // Receive messages from users and send them to Copilot.
    await Promise.all(
      events.map(async (event) => {
        if (event.type !== "message" || event.message.type !== "text") {
          return;
        }

        const userInput = event.message.text;
        console.log("Received user input:", userInput);

        // Use Direct Line API to get tokens
        const tokenData = await getDirectLineToken(process.env.ENDPOINT_URL);
        const token = tokenData.token;
        const conversationId = await startConversation(token);

        // Send a message from a user to Copilot
        await sendMessage(token, conversationId, userInput);

        // Check the response from Copilot
        const botResponses = await checkForBotMessages(token, conversationId);

        // Send messages received from Copilot to LINE users.
        if (botResponses && botResponses.length > 0) {
          const replyText = botResponses[0];
          const echo = { type: "text", text: replyText };
          await client.replyMessage(event.replyToken, echo);
        } else {
          const echo = {
            type: "text",
            text: "ขอโทษค่ะ, ฉันไม่สามารถตอบกลับได้ในขณะนี้",
          };
          await client.replyMessage(event.replyToken, echo);
        }
      })
    );

    res.status(200).end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).end();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
