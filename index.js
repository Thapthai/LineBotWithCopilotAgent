require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const line = require("@line/bot-sdk");

const {
  getDirectLineToken,
  startConversation,
  sendMessage,
  checkForBotMessages,
  isTokenValid,
  isConversationIdValid,
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
    await Promise.all(
      events.map(async (event) => {
        if (event.type !== "message" || event.message.type !== "text") {
          return;
        }

        const userInput = event.message.text;
        const userId = event.source.userId; // รับ userId

        let session = await getUserSession(userId); // ดึง session จากฐานข้อมูล

        if (!session || !(await isTokenValid(session.token))) {
          console.log("Token expired or session not found, refreshing...");
          const tokenData = await getDirectLineToken(process.env.ENDPOINT_URL);
          session = {
            userId,
            token: tokenData.token,
            conversationId: tokenData.conversationId,
          };
          await updateUserSession(userId, session);
        }

        // ตรวจสอบ conversation ID ว่าใช้งานได้
        if (
          !(await isConversationIdValid(session.conversationId, session.token))
        ) {
          console.log("Conversation ID expired, starting new conversation...");
          session.conversationId = await startConversation(session.token);
          await updateUserSession(userId, session);
        }

        await sendMessage(session.token, session.conversationId, userInput);

        const botResponses = await checkForBotMessages(
          session.token,
          session.conversationId
        );

        if (botResponses && botResponses.length > 0) {
          const replyText = botResponses[0];
          const echo = { type: "text", text: replyText };
          await client.replyMessage(event.replyToken, echo);
          session.botResponse = replyText;
          await updateUserSession(userId, session); // อัปเดต session กับคำตอบของ Bot
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
