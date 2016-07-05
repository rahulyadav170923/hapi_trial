'use strict';
var twitter_api=require('../utils/twitter_api.js')

exports.view = {
    description: 'Returns the home page',
    handler: function(request, reply) {
        reply.view('homepage', { 'message': 'Hello, world'});
    }
};

exports.search = {
    description: 'Returns search page',
    handler: function(request, reply) {
        reply.view('search/search');
    }
};
exports.search_hash = {
    description: 'Returns search result',
    payload: {
        parse:true
    },
    handler: function(request, reply) {
        twitter_api.get_users_from_hash_tag(request,reply);
    }
};
exports.search_list = {
    description: 'Returns search result',
    payload: {
        parse:true
    },
    handler: function(request, reply) {
        twitter_api.get_users_from_list(request,reply);
    }
};
