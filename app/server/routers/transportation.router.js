'use strict'

const router = require('express').Router();



//define the url of transportation part
// location: "boston"-"_id"
  router.get('/:place',(req, res, next)=>{
    let Place = req.app.locals.db.model('Place');
    let Trans = req.app.locals.db.model('Trans');

    let place = req.params.place.split('-');
    let placeName = place[0];
    let placeId = place[1];

    Place.findById(placeId, function(err, place) {
      if (!err) {
        console.log(place);
        let trans = place.trans;


//find four spots 
      Trans.find({ '_id': { $in: trans } }).limit(4).exec(function(err, transs) {
            console.log(transs);
            let spot = [];

            for (let iterator of transs) {
              spot.push({
                image_source: (iterator.img)[0],
                name: iterator.name,
                description: iterator.desc
              })
            };



                        res.render('transportation_new/test1', { attraction: spot});

                      });

       }
     });

    });

    module.exports = router;
