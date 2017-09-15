module.exports = function( app ) {
  const speakerController = app.controllers.speaker;

  app.post( '/speakers', speakerController.create );
  app.get( '/speakers', speakerController.list );
  app.get( '/speakers/:_id', speakerController.findOne );
  app.put( '/speakers', speakerController.update );
  app.delete( '/speakers', speakerController.disable );
  
};