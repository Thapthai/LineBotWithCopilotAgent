async function getDirectLineToken(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      token: data.token,
      expires_in: data.expires_in,
      conversationId: data.conversationId,
    };
  } catch (error) {
    console.error("Error fetching Direct Line token:", error);
  }
}

async function startConversation(token) {
  const response = await fetch(
    "https://directline.botframework.com/v3/directline/conversations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.conversationId;
}

async function isTokenValid(token) {
  try {
    const response = await fetch(
      `${process.env.ENDPOINT_URL}/v3/directline/tokens/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}

async function isConversationIdValid(conversationId) {
  try {
    const response = await fetch(
      `${process.env.ENDPOINT_URL}/v3/directline/conversations/${conversationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // หากคืนค่า 200 แสดงว่าการสนทนายังมีอยู่
    return response.ok;
  } catch (error) {
    console.error("Error verifying conversation ID:", error);
    return false;
  }
}

async function sendMessage(token, conversationId, inputMessage) {
  const response = await fetch(
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "message",
        from: { id: "userId", name: "userName" },
        text: inputMessage,
        textFormat: "plain",
        locale: "en-US",
      }),
    }
  );
  const data = await response.json();
  return data;
}

async function getBotResponse(token, conversationId, watermark = null) {
  const response = await fetch(
    `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities?watermark=${watermark}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  // console.log("bot Response", data);

  // Filter activities that are waiting for user input
  const acceptingInputActivities = data.activities.filter(
    (activity) => activity.inputHint === "acceptingInput"
  );

  const extractedTexts = acceptingInputActivities.map(
    (message) => message.text
  );

  return extractedTexts;
}

async function checkBotResponse(token, conversationId, watermark = null) {
  try {
    const botResponses = await getBotResponse(token, conversationId, watermark);

    if (botResponses.length > 0) {
      watermark = botResponses[botResponses.length - 1].id;
    } else {
      console.log("No new response from bot yet.");
    }

    return botResponses;
  } catch (error) {
    console.error("Error checking bot response:", error);
  }
}

async function checkForBotMessages(token, conversationId) {
  let watermark = null;

  // Create a Promise that will wait for a response from the Bot.
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const test = await checkBotResponse(token, conversationId, watermark);

        if (test) {
          clearInterval(interval);
          resolve(test);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 3000);
  });
}

module.exports = {
  sendMessage,
  startConversation,
  getDirectLineToken,
  checkForBotMessages,
  getBotResponse,
  checkBotResponse,
  isTokenValid,
  isConversationIdValid,
};
