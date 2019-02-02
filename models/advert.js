const Joi = require("joi");
const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 150
    },
    city : {
        type : String,
        default : "",
    },
    institute : {
        type : String,
        default : "",
    },
    description : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 500
    },
    photos : {
        type : [String],
        required : true
    },
    tags : {
        type : [String],
        required : true
    },
    username : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    userphonenumber : {
        type : String,
        required : true
    },
    useremail : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 150
    },
    approved : {
        type : Boolean,
        default : false
    },
    publishedAt : {
        type : Number,
        required : true
    }
});

const Advert = mongoose.model("Advert", advertSchema);

function validateAdvert(advert) {
    const schema = {
        title : Joi.string().min(5).max(150).required(),
        city : Joi.string().min(5).max(150),
        institute : Joi.string().min(5).max(150),
        description : Joi.string().min(5).max(500).required(),
        useremail : Joi.string().min(5).max(255).required().email(),
        userphonenumber : Joi.string().min(8).max(15).required(),
        username : Joi.string().min(5).max(50).required(),
        tags : Joi.required(),
    };

    return Joi.validate(advert,schema);
}

exports.Advert = Advert;
exports.validate = validateAdvert;