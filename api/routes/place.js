module.exports = function( app ) {
  const placeController = app.controllers.place;

  app.post( '/places', placeController.create );
  app.get( '/places', placeController.list );
  app.get( '/places/:_id', placeController.findOne );
  app.put( '/places', placeController.update );
  app.delete( '/places', placeController.disable );
  
};