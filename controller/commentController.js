const commentService = require('../service/commentService');
const constants = require('../constants');

module.exports.createProducts = async(req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromService = await commentService.createComment(req.body);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('something went wrong: Controller: CreateComment', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};


module.exports.getAllComments = async(req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromService = await commentService.getAllComments(req.query);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCH;
        response.body = responseFromService;
    } catch (error) {
        console.log('something went wrong: Controller: getAllComments', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};


module.exports.getControllerById = async(req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromService = await commentService.getControllerById(req.params);
        response.status = 200;
        response.message = constants.productMessage.PRODUCT_FETCH;
        response.body = responseFromService;
    } catch (error) {
        console.log('something went wrong: Controller: getControllerById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};


module.exports.updateComment = async(req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromService = await commentService.updateComment({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = 'Product Updated';
        response.body = responseFromService;
    } catch (error) {
        console.log('something went wrong: Controller: updateComment', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};




module.exports.deleteComment = async(req, res) => {
    let response = {...constants.defaultServerResponse};
    try {
        const responseFromService = await commentService.deleteComment(req.params);
        response.status = 200;
        response.message = 'Product Deleted Successfully';
        response.body = responseFromService;
    } catch (error) {
        console.log('something went wrong: Controller: deleteComment', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
};