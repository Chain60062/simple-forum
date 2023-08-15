const errorHandler = (err, req, res, next) => {
    console.log(`O erro foi: ${err}`);
    const status = err.status || 400;
    res.status(status).send(err.message);
};
export default errorHandler;
