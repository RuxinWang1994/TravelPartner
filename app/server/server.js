'use strict';

const fs = require('fs'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      hbs = require('express-handlebars'),
      path = require('path');

const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      env = app.get('env'),
      viewPath = path.join(__dirname, '../client/app/');

const mongoose = require('mongoose'),
      AccommodationModel = require('./data/accommodation'),    // Model 'Acco'
      EntertainmentModel = require('./data/entertainment'),    // Model 'Spot'
      GuideModel = require('./data/guide'),                    // Model 'Guide'
      UserModel = require('./data/user'),                      // Model 'User'
      FoodModel = require('./data/food'),                      // Model 'Food'
      CommentModel = require('./data/comment'),                // Model 'Comment'
      TransportationModel = require('./data/transportation'),  // Model 'Trans'
      SiteModel = require('./data/site'),                      // Model 'Site'
      LocationModel = require('./data/location');              // Model 'Place'


const config = require('./config'),
      routers = require('./routers/routers'),
      token = require('./lib/token');

app.locals.auth = token.auth;

/**
 *  Load database configuration.
 */

const database = ((config) => {
    let c = config.database[env] || {};
    let db = c.db || 'test',
        port = c.port || '27017',
        host = c.host.join(`:${port},`) || 'localhost',
        user = c.user || '',
        pwd = c.pwd || '',
        extra = c.extra || '';

    return {
        "db": db, "port": port, "host": host,
        "user": user, "pwd": pwd, "extra": extra
    };
})(config);

/**
 *  Connect to database and return a promise.
 */

const dbConnection = ((db) => {
    let userString = '';
    if (db.user != '' && db.pwd != '')
        userString = `${db.user}:${db.pwd}@`;

    let connection = `mongodb://${userString}${db.host}:${db.port}/${db.db}`;
    if (db.extra != '')
        connection += `?${db.extra}`;

    //console.log(connection);
    return mongoose.connect(connection);
})(database);

/**
 *  Load data models.
 */

console.log("--------------");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine(
    '.hbs',
    hbs({
        defaultLayout: 'index',
        extname: '.hbs',
        layoutsDir: `${viewPath}../layouts`,
        partialsDir: `${viewPath}../partials`
    }));
app.set('view engine', '.hbs');
app.set('views', viewPath);

app.use((req, res, next) => {
    // console.log(req.headers);
    console.log(`New connection. IP:${req.ip} ${req.method} ${req.path}`);
    next();
});

// !!!!!!!! Cannot prevent replay !!!!!!!!!

app.use((req, res, next) => {
    let tokenGet = req.get('Authorization');
    req.app.locals.token = undefined;

    if (tokenGet != undefined && tokenGet.search('Bearer ') === 0) {
        tokenGet = tokenGet.substr(7);
        req.app.locals.token = tokenGet;
        token.check(tokenGet, '').then((decoded) => {
            let iat = decoded.iat;
            let exp = decoded.exp;
            if (Date.now() + 1800000 < exp) return next();

            return token.get(decoded.u).then((t) => {
                res.set('Authorization', 'Bearer ' + t);
                return next();
            }, next);
        }, (err) => { next(); });
    } else {
        next();
    }
});

/**
 *  Load custom routers.
 */
// app.use('/v1', routers);
app.use(routers);

if (config.server.staticFile) {
    let path = config.server.staticPath;
    if (path === undefined || !fs.existsSync(path)) path = __dirname + "/../../public";
    app.use(express.static(path));
    app.use('*', (req, res) => { res.sendFile('index.html', { root: path }); });
}

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).end('500 http error.');
});

dbConnection.then((res) => {
    console.log('Database connected.');

    app.locals.db = mongoose;

    app.listen(port, () => {
        console.log('Server is running. Listening port ' + port);
    });

}, (err) => {
    console.log('Cannot connect to the database.');
});
