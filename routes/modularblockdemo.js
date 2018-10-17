var express = require('express')
var router = express.Router()
var Stack = require('../models/contentstack')


router.get('/:code?/modularblockdemo', function (req, res) {
    var contentTypeUID = "modularblock"

    console.log(req.params.code, "-----------------------Inside Modular  page------------------------------------")

    let languageCode = 'en-us';
    if (req.params.code == "zh") {
        languageCode = "zh-cn"
    } else if (req.params.code == "es") {
        languageCode = "es-ar"
    }

    Stack.ContentType(contentTypeUID).Query()
        .language(languageCode)
        .toJSON()
        .find()
        .spread(function success(result) {
            res.render('modularblockdemo.html', {
                entry: result[0],
            })
        }, function error(error) {
            next(error)
        })
})

module.exports = router