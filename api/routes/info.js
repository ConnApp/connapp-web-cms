module.exports = function( app ) {
  const infoController = app.controllers.info;

  app.post( '/info', infoController.create );
  app.get( '/info', infoController.list );
  app.get( '/info/:_id', infoController.findOne );
  app.put( '/info', infoController.update );
  app.delete( '/info', infoController.disable );
  
};