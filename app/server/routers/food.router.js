'use strict'

const router = require('express').Router();

router.get("/:city", function(req, res, next){
	let Food = req.app.locals.db.model('Food');
	let Place = req.app.locals.db.model('Place');
	let cityParam = req.params.city;
    let cityId = (req.params.city.split("-"))[1];
    let cityName = (req.params.city.split("-"))[0];

	Place.findById(cityId, function(err, city){
		if(err){
			console.log(err);
		}else{
			console.log(city);
    		if (city == undefined || city == null) {
    			return next(new Error('Empty record'));
    		}
			let foodIds = city.foods;
			console.log(foodIds);
		Food.find({_id: {$in: foodIds}}, function(err, allResults){
		if(err){
			console.log(err);
		}else{
			console.log(allResults);
			let dinner = [];
			let lunch = [];
			let breakfast = [];
			let cheapEat = [];
			let midRange = [];
			let luxury = [];
			let localFood = [];
			for (let result of allResults){
                 if(result.restaurant.isRes == true){
                 	 let isDinner = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "dinner")
                 	 })
                 	 let isLunch = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "lunch")
                 	 })
                 	 let isBreak = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "breakfast")
                 	 })
                 	 let isCheap = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "cheapEat")
                 	 })
                 	 let isMid = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "midRange")
                 	 })
                 	 let isLuxury = result.tags.findIndex((value, index, arr) => {
                 	 	      return (value == "luxury")
                 	 })
                 	 console.log(isLunch);

                     if(isDinner >= 0){
                     	dinner.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }
                     if(isLunch >= 0){
                     	lunch.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }
                     if(isBreak >= 0){
                     	breakfast.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }
                     if(isCheap >= 0){
                     	cheapEat.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }
                     if(isMid >= 0){
                     	midRange.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }
                     if(isLuxury >= 0){
                     	luxury.push({
                     		location: result.restaurant.location,
                     		email: result.restaurant.email,
                     		phone: result.restaurant.phone,
                     		image: result.image[0],
                     		name: result.name,
                     		descript: result.descript,
                     		url: "/f/view/" + result.name.split(" ").join("-")
                     	})
                     }

                 }else{
                 	localFood.push({
                 		image: result.image,
                 		name: result.name,
                 		descript: result.descript
                 	})

                 }


				// ret.push({
				// 	image: result.image,
				// 	name: result.name,
				// 	descript: result.descript
				// })
			}
			console.log("test");
			console.log(localFood);
			console.log(lunch);
			res.render("food/food", {dinner: dinner,
				                     lunch: lunch,
				                     breakfast: breakfast,
				                     cheapEat: cheapEat,
				                     midRange: midRange,
				                     luxury: luxury,
				                     localFood: localFood});
		}
	})

		}
	})



} )

module.exports = router;


router.get("/view/:name", function(req, res, next){
	let Food = req.app.locals.db.model('Food');
	let name = req.params.name.split("-").join(" ");
	Food.find({"name": name}, function(err, results){
		if(err){
			console.log(err);
		}else{
			let result = results[0];
			if (result == undefined || result == null) {
    			return next(new Error('Empty record'));
    		}
			let ret = {
				name : result.name,
				descript : result.descript,
				image : result.image,
				location : result.restaurant.location,
				email : result.restaurant.email,
				phone : result.restaurant.phone
			}
			res.render("food/The Breakfast Club", {restaurant: ret})

		}
	})
})
