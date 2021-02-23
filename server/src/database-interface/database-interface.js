const queryAll = async (model) => {
    try {
        return await model.find().lean().exec();
    } catch (error) {
        throw new Error(error);
    }
};

const queryAllWithParameters = async (model, params) => {
    try {
        return await model.find(params).lean().exec();
    } catch (error) {
        throw new Error(error);
    }
};

const queryOneWithParameters = async (model, params) => {
    try {
        return await model.findOne(params).lean().exec();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    queryAll,
    queryAllWithParameters,
    queryOneWithParameters
};