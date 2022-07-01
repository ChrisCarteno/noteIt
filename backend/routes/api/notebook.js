const express = require('express');
const asyncHandler = require('express-async-handler');

const {Notebook, Note} = require('../../db/models');

const router = express.Router();

router.get('/:notebookId', asyncHandler(async function(req, res) {
  const notes = await Note.byFolder(req.params.notebookId)
  return res.json(notes)
}))

router.get('/', 
asyncHandler(async (req, res) => {
  console.log("in the api notebook.js");
  const notebooks = await Notebook;
  res.json(notebooks);
}));

router.post(
  '/',
  asyncHandler(async function (req, res) {
    console.log("in the post route");
    const newlyCreatedNotebook = await Notebook.create(req.body);
    console.log("after the create",newlyCreatedNotebook);
    return newlyCreatedNotebook;
  })
);



module.exports = router;
