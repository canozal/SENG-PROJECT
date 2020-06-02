const Comment = require('../database/models/commentModel');
const { formatMongoData, checkObjectId } = require('../helper/dbHelper');
const constats = require('../constants');


module.exports.createComment = async (serviceData) => {
    try {
    let comment = new Comment({...serviceData});
    let result = await comment.save();
    return formatMongoData(result);
    } catch (error) {
        console.log('something went wrong: service: createProduct')
        throw new Error(error);
    }
};

module.exports.getAllComments = async ({skip=0, limit=10}) => {
    try {
    let comments = await Comment.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(comments);
    } catch (error) {
        console.log('something went wrong: service: getAllComments');
        throw new Error(error);
    }
};


module.exports.getControllerById = async ({ id }) => {
    try {
        checkObjectId(id);
        let comment = await Comment.findById(id);
        if(!comment){
            throw new Error(constats.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(comment);
        } catch (error) {
            console.log('something went wrong: service: getControllerById');
            throw new Error(error);
        }
};




module.exports.updateComment = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        let comment = await Comment.findOneAndUpdate(
            { _id: id },
            updateInfo,
            {new: true}
            );
        if(!comment){
            throw new Error(constats.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(comment);
        } catch (error) {
            console.log('something went wrong: service: updateComment');
            throw new Error(error);
        }
};


module.exports.deleteComment = async ({ id }) => {
    try {
        checkObjectId(id);
        let comment = await Comment.findByIdAndDelete(id);
        if(!comment){
            throw new Error(constats.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(comment);
        } catch (error) {
            console.log('something went wrong: service: deleteComment');
            throw new Error(error);
        }
};