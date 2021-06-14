// Write your "projects" router here!
const express = require("express");
const projectInfo = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await projectInfo.get();
  res.status(200).json(projects);
})

router.get('/:id', async (req,res) => {
   await projectInfo.get(req.params.id)
    .then((projectID) => {
      if (projectID) {
      res.status(200).json(projectID)
      } else {
        res.status(404).json({
          message: "Project not found"
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving projects",
      })
    })
})

router.post('/', async (req,res) => {
  await projectInfo.insert(req.body);
  if (!req.body.name || !req.body.description || !req.body.completed) {
    return res.status(400).json({
      message: "Missing name, description or complete status"
    })
  }

  res.status(200).json(req.body);
});

module.exports = router