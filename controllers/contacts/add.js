const { addContact } = require("../../models/contacts");

const add = async (req, res,) => {
    const { name, email, phone } = req.body;
    const result = await addContact({ name, email, phone })
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
};

module.exports = add;