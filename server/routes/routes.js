const EventController= require('../controllers/EventCotrollers');


module.exports=(app)=>{
    app.get('/api/Events', EventController.findAll)
    app.post('/api/create', EventController.create)
    app.get('/api/Events/:id', EventController.getOne)
    app.delete('/api/delete/:id',  EventController.delete)
    app.put('/api/update/:id',  EventController.update)
}