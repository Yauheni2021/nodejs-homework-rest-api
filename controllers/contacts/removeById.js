const {removeContact} = require("../../models/contacts")
const { NotFound } = require("http-errors");

const removeById = async (req, res,) => {

  const { contactId } = req.params;
  const result = await removeContact(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  };
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  })
};

module.exports = removeById;