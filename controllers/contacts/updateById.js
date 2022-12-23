const { updateContactById } = require("../../models/contacts");
const { NotFound } = require("http-errors");


const updateById = async (req, res,) => {

        const { contactId } = req.params;
        const result = await updateContactById(contactId, req.body);
        if (!result) {
            throw new NotFound(`Product with id=${contactId} not found`)
        };
        res.json({
            status: "success",
            code: 200,
            message: "contact deleted",
            data: {
                result
            }
        });
};


module.exports = updateById