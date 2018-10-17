var express = require('express')
var router = express.Router()
var Stack = require('../models/contentstack')
var config = require('config')

// console.log("-------------------",config.languages);

router.get('/:code?', function (req, res) {
    // console.log("asdfafgsdgdsfhfg",req);
    var contentTypeUID = "home"

    let languageCode = 'en-us';
    if(req.params.code == "zh"){
        languageCode = "zh-cn"
    }else if(req.params.code == "es"){
        languageCode = "es-ar"
    }
    // console.log( req.params.code,languageCode,"landsdfdfg");
    Stack.ContentType(contentTypeUID).Query()
        .language(languageCode)
        .toJSON()
        .find()
        .spread(function success(result) {
            // console.log(result[0])
            res.render('home.html', {
                entry: result[0],
            })
        }, function error(error) {
            next(error)
        })
})
module.exports = router