const Joi    = require('@hapi/joi'); 

const registerValidation = data => {
    const schema = Joi.object({
        name     :Joi.string().required(),
        email    :Joi.string().email().required(),
        password :Joi.string().min(8).max(1024).required(),
        confirmpswd:Joi.ref('password')
    });
    return schema.validate(data)
};


const loginValidation = data => {
    const schema = Joi.object({
        email    :Joi.string().email().required(),
        password :Joi.string().min(8).max(1024).required()
    });
    return schema.validate(data);
};

const updateEmailValidation = data =>{
    const schema = Joi.object({
        email :Joi.string().email().required()
    });
    return schema.validate(data);
}

const updatePassword = data =>{
    const schema = Joi.object({
        email :Joi.string().email().required(),
        password :Joi.string().min(8).max(1024).required(),
        confirmpswd:Joi.ref('password')
    });
    return schema.validate(data);
}

module.exports.registerValidation    = registerValidation;
module.exports.loginValidation       = loginValidation;
module.exports.updateEmailValidation = updateEmailValidation;
module.exports.updatePassword        = updatePassword;