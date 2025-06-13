export const validSchemas = (schema) => (req, res, next) => {
    try{
        console.log(req.body);
        schema.parse(req.body);
        next();
    }catch (error) {
        return res.status(400).json({
            message: 'Validation error',
            errors:error.errors
        });
    }
}