const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const db = require('../../db/models');

const { Note } = db;

router.get('/', 
asyncHandler(async function(req, res) {
  const notes = await Note.findAll();
  return res.json(notes);
}));

router.post(
  '/',
  asyncHandler(async function (req, res) {
    const id = await notesRepository.create(req.body);
    return id;
  })
);

router.put(
  '/:id',
  asyncHandler(async function (req, res) {
    const id = await notesRepository.update(req.body);
    const pokemon = await notesRepository.one(id);
    return res.json(pokemon);
  })
);

router.get('/types', asyncHandler(async function (_req, res) {
  return res.json(types);
}));

router.get('/random', asyncHandler(async function(_req, res){
  const pokemon = await notesRepository.random();
  return res.json(pokemon);
}));

router.get('/battle', asyncHandler(async function(req, res){
  const pokemon = await notesRepository.battle(
    req.query.allyId,
    req.query.opponentId
  );
  return res.json(pokemon);
}));

router.get('/:id', asyncHandler(async function(req, res) {
  const pokemon = await notesRepository.one(req.params.id);
  return res.json(pokemon);
}));

router.get('/:id/items', asyncHandler(async function(req, res) {
  const items = await ItemsRepository.itemsByPokemonId(req.params.id);
  return res.json(items);
}));

router.post(
  '/:id/items',
  asyncHandler(async function(req, res) {
    if (!req.body.imageUrl)
      req.body.imageUrl = randomItemImage();
    const item = await ItemsRepository.addItem(req.body, req.params.id);
    return res.json(item);
  })
);

module.exports = router;
