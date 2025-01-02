async function getUserSession(userId) {
  return await UserSession.findOne({ where: { userId } });
}

async function updateUserSession(userId, sessionData) {
  const [updated, created] = await UserSession.upsert({
    userId,
    ...sessionData,
  });
  return created ? "Session created" : "Session updated";
}
