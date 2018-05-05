'use strict';

const router = require('express').Router();

router.get('/:place', (req, res, next) => {
    //console.log(req.params);
    let placeInfo = req.params.place.split('-');
    let placeName = placeInfo[0];
    let placeId = placeInfo[1];

    let Place = req.app.locals.db.model('Place');
    Place
        .findById(placeId)
        .exec()
        .then((place) => {
            let Food = req.app.locals.db.model('Food');
            let Acco = req.app.locals.db.model('Acco');
            let Spot = req.app.locals.db.model('Spot');
            let Guide = req.app.locals.db.model('Guide');
            let Trans=req.app.locals.db.model('Trans');

            let sub = {
                intro: '',
                guide: {},
                food: {},
                acco: {},
                spot: {},
                trans:{}
            };

            Guide.findById((place.guides)[0]).then((guide) => {
                sub.guide = {
                    title: guide.title,
                    tags: guide.tags,
                    banner: guide.banner,
                    url: '/g/' + guide.title.split(' ').join('-'),
                    listUrl: '/g/' + place.name + '-' + place._id
                };

                return new Promise((resolve, reject) => {
                    Acco.findById((place.hotels)[0]).then((hotel) => {
                        sub.acco = {
                            title: 'Best hotels in ' + place.name + '!',
                            name: hotel.name,
                            banner: (hotel.img)[0],
                            tags: hotel.tags,
                            url: '/a/view/' + hotel.name + '-' + hotel._id,
                            listUrl: '/a/' + place.name + '-' + place._id
                        };
                        resolve(sub);
                    }).catch(reject);
                }).then((sub) => {

                  return new Promise((resolve, reject) => {
                      Trans.findById((place.trans)[0]).then((trans) => {
                          sub.trans = {
                              title: trans.name,
                              banner: trans.img,
                              url: '/t/' + place.name + '-' + place._id,
                              listUrl: '/t/' + place.name + '-' + place._id
                          };
                          resolve(sub);
                      }).catch(reject);
                  });
                }).then((sub) => {

                    return new Promise((resolve, reject) => {
                        Spot.findById((place.spots)[0]).then((spot) => {
                            sub.spot = {
                                title: spot.title,
                                banner: spot.img,
                                url: '/e/' + place.name + '-' + place._id,
                                listUrl: '/e/' + place.name + '-' + place._id
                            };
                            resolve(sub);
                        }).catch(reject);
                    });
                }).then((sub) => {
                    return new Promise((resolve, reject) => {
                        Food
                            .where('_id').in(place.foods)
                            .where('restaurant.isRes').equals(true)
                            .limit(1)
                            .exec()
                            .then((food) => {
                                sub.food = {
                                    title: 'Best food in ' + place.name + '!',
                                    name: food[0].name,
                                    location: food[0].restaurant.location,
                                    banner: (food[0].image)[0],
                                    url: '/f/' + food[0].name.split(' ').join('-'),
                                    listUrl: '/f/' + place.name + '-' + place._id
                                };
                                resolve(sub);
                            }).catch(reject);
                    });
                }).then((sub) => {
                    //console.log(place.panoramas.length);
                    res.render('places/index', {
                        city_name: place.name,
                        city_banner: place.meta.banner,
                        city_intro: 'https://www.youtube.com/embed/R1WKehsqzMI',
                        city_imgs: place.imgs,
                        city_panoramas: place.panoramas,
                        city_geo: place.geo,
                        city_desc: place.desc,
                        sub: sub
                    });
                }).catch((err) => {
                    console.log(err);
                    next(err);
                });
            });

            console.log(place);
            console.log(place.meta);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;
