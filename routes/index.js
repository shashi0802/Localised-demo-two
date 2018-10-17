
module.exports = function(app) {
  app.use('/', require('../middlewares'))
  
  app.use('/', require('./about'))
  app.use('/', require('./services'))
  app.use('/', require('./faq'))
  app.use('/', require('./contact'))
  app.use('/', require('./modularblockdemo'))
  app.use('/', require('./home'))
}