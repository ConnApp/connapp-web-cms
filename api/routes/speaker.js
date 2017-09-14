module.exports = function( app ) {
  const speakerController = app.controllers.speaker;

  app.post( '/speaker', speakerController.create );
  app.get( '/speaker', speakerController.list );
  app.get( '/speaker/:_id', speakerController.findOne );
  app.put( '/speaker', speakerController.update );
  app.delete( '/speaker', speakerController.disable );
  
};