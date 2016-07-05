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
            method: ['GET'],
            path: '/search_by_hash',
            config: Controllers.pages.home.search
        },
        {
            method: ['POST'],
            path: '/search_by_hash',
            config: Controllers.pages.home.search_hash
        },
        {
            method: ['GET'],
            path: '/search_by_list',
            config: Controllers.pages.home.search
        },
        {
            method: ['POST'],
            path: '/search_by_list',
            config: Controllers.pages.home.search_list
        },
        
    ]);

    next();
};

exports.register.attributes = {
    name: 'pages_routes',
    version: require('../../package.json').version
};
