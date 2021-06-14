const projectInfo = require('../projects/projects-model');

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${time} ${req.ip} ${req.method} ${req.url}`);
  next();
}

async function validateField(req, res, next) {
  const { completed } = await req.body;
  if (completed) {
    next()
  } else {
    res.status(400).json({ message: "missing required completed status" })
  }
}

async function validateProjectId(req, res, next) {
  const projectID = req.params.id;
  const user = await projectInfo.get(projectID)
  if (user) {
    req.user = user
    next()
  } else {
    res.status(404).json({ message: "user not found" })
  }
}

module.exports = {
  logger,
  validateField,
  validateProjectId
};