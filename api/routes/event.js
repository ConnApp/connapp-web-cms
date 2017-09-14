module.exports = function( app ) {
  const eventController = app.controllers.event;

  app.post( '/event', eventController.create );
  app.get( '/event', eventController.list );
  app.get( '/event/:_id', eventController.findOne );
  app.put( '/event', eventController.update );
  app.delete( '/event', eventController.disable );
  
};