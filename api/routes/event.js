module.exports = function( app ) {
  const eventController = app.controllers.event;

  app.post( '/events', eventController.create );
  app.get( '/events', eventController.list );
  app.get( '/events/:_id', eventController.findOne );
  app.put( '/events', eventController.update );
  app.delete( '/events', eventController.disable );
  
};