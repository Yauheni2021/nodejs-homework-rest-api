const express = require('express')

const router = express.Router();

const { validation, ctrlWrapper } = require("../../helpers");

const { contactsSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema)

const {contacts: ctrl} = require("../../controllers")


router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

module.exports = router
