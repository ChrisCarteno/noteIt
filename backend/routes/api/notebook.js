const express = require('express');
const asyncHandler = require('express-async-handler');

const Notebook = require('../../db/models');

const router = express.Router();

router.get('/', 
asyncHandler(async (req, res) => {
  const notebooks = await Notebook.findAll();
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
