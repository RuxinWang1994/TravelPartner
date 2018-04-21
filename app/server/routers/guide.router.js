'use strict'

const router = require('express').Router();


router.get("/create", async function(req, res, next){
  /*
	let user = req.body.user;
	if(user == undefined || user == ""){
		console.log(23445);
		res.sendStatus(403);
		return next;
	}

	try{
		user = await req.app.locals.auth(req.app.locals.token, user);
		res.render("TG/upload", {});
	}catch(errs){
		console.log(errs);
		res.sendStatus(403);

	}
  */
  res.render("TG/upload");

})

router.post("/new", async function(req, res, next){
    let username = req.body.user;
    if(username == undefined || username == ""){
    	res.sendStatus(403);
    	return next;
    }

    try{
    	username = await req.app.locals.auth(req.app.locals.token, username);

      let Guide = req.app.locals.db.model('Guide');
    	let title = req.body.title;
    	let user = req.body.user;
    	let tags = req.body.tags;
    	let content = req.body.content;
    	let image = req.body.image;
      let banner = req.body.banner;
    	//let newGuide = {title: title, user: user, tags: tags, content: content, image: image, banner: banner};
    	// Create a new Guide to the DB
    	//Guide.create(newGuide, function(err, newGuide){
      let newGuide = new Guide({
        title: title,
        user: user,
        tags: tags,
        content: content,
        image: image,
        banner: banner
      });
        
        //console.log(newGuide.isNew);
        //console.log(123566666);
        //console.log(newGuide);
        //console.log(23390080);

      newGuide.save(function(err, newGuide) {
    		if(err){
    			console.log(err);
    			res.json({
    			    status: 'error',
    			    err: [
    			      { name: "repeat title", msg: "200" },
    			    ]
    			});
    		}else{
    		    //let ret = {};
    		    //res.redirect("/g/view/" + newGuide.title.split(' ').join('-'));
    		    res.json({
    		      status: 'success',
    		      url: '/g/view/' + newGuide.title.split(' ').join('-')
    		    });
    		}
    	});
    } catch(errs){
    	console.log(errs);
    	res.sendStatus(403);
    }
});

router.get("/:city",function(req, res, next) {
    let Guide = req.app.locals.db.model('Guide');
    let Place = req.app.locals.db.model('Place');
    let cityParam = req.params.city;
    let cityId = (req.params.city.split("-"))[1];
    let cityName = (req.params.city.split("-"))[0];

    Place.findById(cityId, function(err, city){
    	if(err){
    		console.log(err);
    		next(err);
    	}else{
    		console.log(city);
    		if (city == undefined || city == null) {
    			return next(new Error('Empty record'));
    		}
    		let guidesId = city.guides;
    		console.log(guidesId);
        Guide.find({_id: {$in: guidesId}}, function(err, allResult){
        if(err){
            console.log(err);
        }else{
            // res.render(title.handlebar);
            console.log(allResult);
            // Store a brief summary in summary
     		let ret = [];
     		for (let result of allResult) {
     			ret.push({
     				title: result.title,
     				image: result.image[0],
     				user: result.user,
     				tags: result.tags,
     				summary: result.content.substr(0,20),
     				//url: '/g/' + cityParam + "/" + result.title.split(' ').join('-'),
            url: '/g/view/' + result.title.split(' ').join('-'),
     				updated_at: result.updated_at,
     				votes: result.votes.length
     			});
     		}
     		let create= '/g/' + 'create';
            res.render("TG/tg", { guide: ret, create: create, place: cityName});

        }
        });

    	}
    });
});




//router.get('/:city/:title', function(req, res, next) {
router.get('/view/:title', function(req, res, next) {
    let Guide = req.app.locals.db.model('Guide');
    let title = req.params.title.split("-").join(" ");


    Guide.find({"title": title}, function(err, results){
        if(err){
            console.log(err);
        }else{
            // res.render(title.handlebar);

            let result = results[0];
            console.log(result);

            let ret = {
                title: result.title,
                user: result.user,
                tags: result.tags,
                content: result.content,
                updated_at: result.updated_at,
                image: result.image,
                banner: result.image
                //url: '/g/' + result.title.split(' ').join('-')
            }
            //console.log(result.title);
            res.render("TG/specificGuide", {guide: ret});
        }

    })

    // console.log(location);
    // res.json({location: location});
});





module.exports = router;
