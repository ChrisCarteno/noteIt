const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Note} = require('../../db/models');

router.get('/one/:id', asyncHandler(async function(req, res) {
  const id = req.params.id;
  const note = await Note.findByPk(id);
  return res.json(note);
}));


router.get('/:id', asyncHandler(async (req,res) => {
  const userId = req.params.id;
  console.log("inside of get id", userId);
  const notes = await Note.findAll({
    where: {
      userId
  }})
  console.log("this is the notes", notes)
  return res.json(notes);
}));



router.post('/new', asyncHandler(async (req, res) => {
  const { userId, notebookId, note } = req.body;
  const data = await Note.create({
    userId: userId,
    notebookId: notebookId,
    note: note
  })

  return res.json(data);
})
);

router.put( '/:id/edit', asyncHandler(async (req, res) => {
  console.log("inthe put note");
  const { note} = req.body;
  const newNote = await Note.findByPk(req.params.id);
  newNote.note = note;
  await newNote.save;
  return res.json(newNote);
})
);

router.delete('/:id', asyncHandler(async(req, res) => {
  console.log("inthe delete note");
  const id = req.params.id;
  const note = await Note.findByPk(id)
  await note.destroy();

  return res.json(note);
})
);

module.exports = router;
