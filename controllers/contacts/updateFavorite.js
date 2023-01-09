const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");


const updateFavorite = async (req, res,) => {

        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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

module.exports = updateFavorite; 