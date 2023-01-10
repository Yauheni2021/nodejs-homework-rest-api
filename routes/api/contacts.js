const express = require('express')

const router = express.Router();

const { validation, ctrlWrapper } = require("../../middleware");

const { contactsSchema } = require("../../models");

const validateMiddleware = validation(contactsSchema);

const {schemas} = require("../../models/contact")

const {contacts: ctrl} = require("../../controllers")


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', validateMiddleware(schemas.joiSchema), ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware(schemas.joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateMiddleware(schemas.joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validateMiddleware(schemas.favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;
