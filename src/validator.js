const Joi = require('joi')

const schema = Joi.object().keys({
    data: Joi.object().keys({
        title: Joi.string().required(),
        projectName: Joi.string().required(),
    })
});

function validatePayload(payload){    
    return schema.validate(payload);
}

module.exports = {
    validatePayload,
};