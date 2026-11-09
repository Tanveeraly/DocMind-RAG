import service from "./chat.service.js";

async function ask(req, res, next) {
  try {
    const { question, documentId, conversationId } = req.body;
    res.json(await service.ask({ userId: req.userId, question, documentId, conversationId }));
  } catch (err) {
    next(err);
  }
}

async function listConversations(req, res, next) {
  try {
    res.json({ conversations: await service.listConversations(req.userId) });
  } catch (err) {
    next(err);
  }
}

async function getMessages(req, res, next) {
  try {
    res.json({ messages: await service.getMessages(Number(req.params.id), req.userId) });
  } catch (err) {
    next(err);
  }
}

export default { ask, listConversations, getMessages };