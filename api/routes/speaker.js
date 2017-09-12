module.exports = function( app ) {
  const speakController = app.controllers.speaker;

  app.post( '/speaker', speakController.create );
  app.get( '/speaker', speakController.list );
  
};