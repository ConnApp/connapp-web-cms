module.exports = function( app ) {
  const newsController = app.controllers.news;

  app.post( '/news', newsController.create );
  app.get( '/news', newsController.list );
  app.get( '/news/:_id', newsController.findOne );
  app.put( '/news', newsController.update );
  app.delete( '/news', newsController.disable );
  
};