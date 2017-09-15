module.exports = function( app ) {
  const localController = app.controllers.local;

  app.post( '/local', localController.create );
  app.get( '/local', localController.list );
  app.get( '/local/:_id', localController.findOne );
  app.put( '/local', localController.update );
  app.delete( '/local', localController.disable );
  
};