'use strict'

const router = require('express').Router();

router.get('/:place', (req, res, next)=>{
  let Place = req.app.locals.db.model('Place');
  let Spot = req.app.locals.db.model('Spot');

  let place = req.params.place.split('-');
  let placeName = place[0];
  let placeId = place[1];
  console.log(placeName);
  Place.findById(placeId, function(err, place){
    if (err) { console.log(err);}
    else{

      let spotss = place.spots;
      console.log(spotss);

      Spot.find({'_id': {$in : spotss }}).limit(3).exec(function(err, result1){
        if (err){console.log(err);}
        else{
        console.log('===== Here is spot query result =====');
        console.log(result1);

        let top = [];
        let regular3 =[];
        for (let result of result1){

          top.push({
            img : result.img,
            //url : '/e/' + result.name + '-' + result._id,
            title: result.title,
            details: result.details,
            ticketInfo: result.ticketInfo,

          })
        };
        Spot.find({'_id':{$in: spotss}}).skip(3).exec(function(err,result2){
          for (let result of result2){

            regular3.push({
              img : result.img,
              //url : '/e/' + result.name + '-' + result._id,
              title: result.title,
              details: result.details,
              ticketInfo: result.ticketInfo,

            })
          };
            res.render('entertainment/entertainment',
             {
               city: placeName,
               top3: top,
               regular: regular3,
             });

        }); //2st find spot end


}//1st spot find else end

}); //1st find spot end

} // find place else end

}); // find place block end


}); //get block end

module.exports = router;
