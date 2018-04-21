'use strict'

const router = require('express').Router();


//url

router.get('/view/:hotel', function(req, res,next){
 let hotel = req.params.hotel.split('-');
 let hotelName = hotel[0];
 let hotelId = hotel[1];

 let Acco = req.app.locals.db.model('Acco');

 Acco.findById(hotelId, function(err, hotel) {
   if (!err) {
     console.log(hotel.desc);
     console.log(hotel.address);
  res.render('accommodation_new/subtest1', { img_source_1: (hotel.img)[1], img_source_2: (hotel.img)[2], img_source_3:(hotel.img)[3],
                                        name: hotel.name, phone: hotel.phone, price: hotel.price, email: hotel.email, address:hotel.address, description:hotel.desc});
     }

   })
 });


// location: "boston"-"_id"
router.get('/:place',(req, res, next)=>{
  let Place = req.app.locals.db.model('Place');
  let Acco = req.app.locals.db.model('Acco');

  let place = req.params.place.split('-');
  let placeName = place[0];
  let placeId = place[1];

  Place.findById(placeId, function(err, place) {
    if (!err) {
      let hotels = place.hotels;


    Acco.find({ '_id': { $in: hotels } }).sort({ 'price': '-1' }).limit(4).exec(function(err, accos) {
        console.log(accos);
          let cheap = [];
          let luxury = [];
          let romantic = [];
          let top = [];
          let business=[];
          let family=[];
          let vote=[];


          for (let acco of accos) {
            cheap.push({
              image_source: (acco.img)[0],
              //imgs: acco.img,
              url: '/a/view/' + acco.name + '-' + acco._id,
              name: acco.name,
              address: acco.address
            })
          };

      Acco.find({ '_id': { $in: hotels } }).sort({ 'price': '1' }).limit(4).exec(function(err, accos) {
              for (let acco of accos) {
                luxury.push({
                  image_source: (acco.img)[0],
                  url: '/a/view/' + acco.name + '-' + acco._id,
                  //imgs: acco.img,
                  name: acco.name,
                  address: acco.address,
                  desc:acco.desc
                })
              };

              Acco.find({ '_id': { $in: hotels } ,'tags': 'romantic'}).limit(4).exec(function(err, accos) {
                  //console.log(accos);
                  for (let acco of accos) {
                    romantic.push({
                      image_source: (acco.img)[0],
                      //imgs: acco.img,
                      url: '/a/view/' + acco.name + '-' + acco._id,
                      name: acco.name,
                      address: acco.address,
                      desc:acco.desc
                    })
                  };

                  Acco.find({ '_id': { $in: hotels } ,'tags': 'business'}).limit(4).exec(function(err, accos) {
                      //console.log(accos);
                      for (let acco of accos) {
                        business.push({
                          image_source: (acco.img)[0],
                          //imgs: acco.img,
                          url: '/a/view/' + acco.name + '-' + acco._id,
                          name: acco.name,
                          address: acco.address,
                          desc:acco.desc
                        })
                      };

                      Acco.find({ '_id': { $in: hotels } ,'tags': 'family-friendly'}).limit(4).exec(function(err, accos) {
                          //console.log(accos);
                          for (let acco of accos) {
                            family.push({
                              image_source: (acco.img)[0],
                              //imgs: acco.img,
                              url: '/a/view/' + acco.name + '-' + acco._id,
                              name: acco.name,
                              address: acco.address,
                              desc:acco.desc

                            })
                          };

                        Acco.aggregate()
                          .unwind('votes')
                          .group({ _id: '$_id', votesCount: { $sum: 1 }, name: { $first: '$name' }, email: { $first: '$email' }, img: { $first: '$img' }, votes: { $first: '$vote' }})
                          .sort({ 'votesCount': 1})
                          .exec(function(err, accos) {
                                   if (err) console.log(err);
                                   console.log('1232313312321313123123');
                                   console.log(accos);
                  });

                         Acco.find({ '_id': { $in: hotels } }).limit(4).exec(function(err, accos) {

                                                  for (let acco of accos) {
                                                                vote.push({
                                                                     image_source: (acco.img)[0],

                                                                      url: '/a/view/' + acco.name + '-' + acco._id,
                                                                      name: acco.name,
                                                                      address: acco.address,
                                                                      desc:acco.desc
                                                                      })
                                                                };



                      res.render('accommodation_new/test1', { CheapHotel: cheap, LuxuryHotel: luxury, RomanticHotel:romantic, BusinessHotel:business, Family_friendlyHotel:family, TopHotel: vote});

                    });
                  });
                });
             });
          });
        });

     }
   });

  });

  module.exports = router;



         /*
        tophotel sort with votes


        Acco.aggregate([{'_id': { $in: hotels}}, { $unwind: "$votes" }, { $sortByCount: "$votes" }]).limit(1).exec(function(err, accos) {
            console.log(accos);
            for (let acco of accos) {
              top.push({
                image_source: (acco.img)[3],
                imgs: acco.img,
                name: acco.name,
                email: acco.email
                */
