var async = require('async')
var Stack = require('../models/contentstack')

module.exports = function (req, res, next) {
		var contentTypes = ["header", "footer"]
		console.log("Chaina--------",req.originalUrl);
		let languageCode = 'en-us';
		if(req.originalUrl.indexOf("/zh/") > -1){
			// console.log("Chaina--------",req.params.code);
			languageCode = "zh-cn"
		}else if(req.originalUrl.indexOf("/es/") > -1){
			 console.log("Spanish--------");
			languageCode = "es-ar"
		}
		console.log("Languade Code--------",languageCode);

		async.map(
			contentTypes,
			function (contentType, callback) {
				Stack.ContentType(contentType).Query()
				.language(languageCode)
				.toJSON()
				.find()
				.spread(function (result){

					// console.log("-----------------",result);
					callback(null, result[0])
				})			
			},
			function (error, success) {
				if (error) return next(error)
				res.locals.partials = {}
				contentTypes.forEach((key, result)=> res.locals.partials[key] = success[result])
				next()
			}
		)	
}
