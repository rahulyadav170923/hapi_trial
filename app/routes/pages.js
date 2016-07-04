'use strict';

exports.register = function(server, options, next) {

    var Controllers = {
        pages: {
            home: require('../controllers/pages/home')
        }
    };

    server.route([

        // Home Page
        {
            method: 'GET',
            path: '/',
            config: Controllers.pages.home.view
        },
        {
            method: 'GET',
            path: '/foo',
            config: Controllers.pages.home.foo
        }

    ]);

    next();
};

exports.register.attributes = {
    name: 'pages_routes',
    version: require('../../package.json').version
};
