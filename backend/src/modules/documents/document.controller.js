import * as service from "./document.service.js";

function parseId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("Invalid document id");
    err.status = 400;
    throw err;
  }
  return id;
}

export async function upload(req, res, next) {
  try {
    const document = await service.processUpload(req.file, req.userId);
    res.status(201).json({ document });
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    res.json({ documents: await service.list(req.userId) });
  } catch (err) {
    next(err);
  }
}

export async function download(req, res, next) {
  try {
    res.json(await service.getDownload(parseId(req), req.userId));
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await service.remove(parseId(req), req.userId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}