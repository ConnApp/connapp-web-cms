module.exports = function( app ) {
  const speakController = app.controllers.speaker;

  app.post( '/speaker', speakController.create );
  app.get( '/speaker', speakController.list );
  app.get( '/speaker/:_id', speakController.findOne );
  app.put( '/speaker', speakController.update );
  app.delete( '/speaker', speakController.disable );
  
};