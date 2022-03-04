const errorHandler = (error, req, res, _next) => {
    console.error(JSON.stringify(error));
    res.status(error.status ?? 500).json({ error: error.message });
};

module.exports = errorHandler;
