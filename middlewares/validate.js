export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.query); 
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};