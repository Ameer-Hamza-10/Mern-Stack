const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
    } catch (err) {
        const status = 422
        const message = 'Fill the input properly'
        const extraDetails = err.errors[0].message || "Validation failed";
        console.error("Validation error:", message);
        // res.status(200).json({ message : message });
        const error = {
            status,
            message,
            extraDetails
        }
        next(error)
    }
}


module.exports = validate;