module.exports = function( app ) {
  const eventTypeController = app.controllers.eventType;

  app.post( '/eventTypes', eventTypeController.create );
  app.get( '/eventTypes', eventTypeController.list );
  app.get( '/eventTypes/:_id', eventTypeController.findOne );
  app.put( '/eventTypes', eventTypeController.update );
  app.delete( '/eventTypes', eventTypeController.disable );
  
};