const express = require('express');
const asyncHandler = require('express-async-handler');

const {Notebook, Note} = require('../../db/models');

const router = express.Router();

router.get('/:userId', asyncHandler(async(req, res) => {
  const userId = req.params.userId;
  const notebooks = await Notebook.findAll({
      where: { userId: userId },
      order: [["updatedAt", "DESC"]],
  });
  return res.json(notebooks);
}));

router.get('/:notebookId/notes', asyncHandler(async(req,res) => {
  const notebookId = req.params.notebookId;

  const notes = await Note.findAll ({
      where: { notebookId: notebookId },
      order: [["updatedAt", "DESC"],]
  });
  console.log(notes);
  return res.json(notes);
}));

router.get('/:notebookId', asyncHandler(async(req, res) => {
  const notebookId = req.params.notebookId;

  const notebook = await Notebook.findByPk(notebookId);
  return res.json(notebook);
}));

/////Creat a notebook
router.post( '/new', asyncHandler(async function (req, res) {
    console.log("in the post route");
    const { userId, title } = req.body;
    const newlyCreatedNotebook = await Notebook.create({
      userId: userId,
      title: title
    });
    console.log("after the create", newlyCreatedNotebook);
    return res.json(newlyCreatedNotebook);
  })
);

//DELETE A NOTEBOOK
router.delete('/:notebookId', asyncHandler(async (req, res) => {
    const notebookId = req.params.notebookId;
    const notebook = await Notebook.findByPk(notebookId);
    console.log("intheDeleteNOtebook",notebook);
    await notebook.destroy();
    return res.json(notebook);
  })
);;


module.exports = router;
