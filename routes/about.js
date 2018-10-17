var express = require('express')
var router = express.Router()
var Stack = require('../models/contentstack')


// router.get('/about', function (req, res) {
//     var contentTypeUID = "about"

//     Stack.ContentType(contentTypeUID).Query()
//         .toJSON()
//         .find()
//         .spread(function success(result) {
//             res.render('about.html', {
//                 entry: result[0],
//             })
//         }, function error(error) {
//             next(error)
//         })
// })

router.get('/:code?/about', function (req, res) {
    var contentTypeUID = "about"
    console.log(req.params.code,"-----------------------------------------------------------")

    let languageCode = 'en-us';
    if(req.params.code == "zh"){
        languageCode = "zh-cn"
    }else if(req.params.code == "es"){
        languageCode = "es-ar"
    }

    Stack.ContentType(contentTypeUID).Query()
        .language(languageCode)
        .toJSON()
        .find()
        .spread(function success(result) {
            res.render('about.html', {
                entry: result[0],
            })
        }, function error(error) {
            next(error)
        })
})

module.exports = router