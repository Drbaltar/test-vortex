const queryAll = (model) => {
    return model.find().lean().exec();
};

const queryAllWithParameters = (model, params) => {
    return model.find(params).lean().exec();
};

const queryAllWithSelectFields = (model, fields) => {
    return model.find().select(fields).lean().exec();
};

const queryOneWithParameters = (model, params) => {
    return model.findOne(params).lean().exec();
};

const queryOneByID = (model, id) => {
    return model.findById(id).lean().exec();
};

const saveDocument = (document) => {
    return document.save();
};

const updateDocument = (model, id, updatedData) => {
    return model.findByIdAndUpdate(id, updatedData);
};

const deleteDocument = (model, id) => {
    return model.findByIdAndDelete(id);
};

module.exports = {
    queryAll,
    queryAllWithParameters,
    queryAllWithSelectFields,
    queryOneWithParameters,
    queryOneByID,
    saveDocument,
    updateDocument,
    deleteDocument
};