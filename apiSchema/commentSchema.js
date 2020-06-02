const joi = require('@hapi/joi');

module.exports.createCommentSchema = joi.object().keys({
    topic: joi.string().required(),
    comment: joi.string().required()
});

module.exports.getAllCommentsSchema = joi.object().keys({
    skip: joi.string(),
    limit: joi.string()
});

module.exports.updateCommentSchema = joi.object().keys({
    topic: joi.string(),
    comment: joi.string()
});