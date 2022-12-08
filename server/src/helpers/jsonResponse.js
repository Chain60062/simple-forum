// mensagem de erro em comum
export const jsonMessage = (res, status, message) => {
    return res.status(status).json({
        status,
        message,
    });
};