'use strict';
var twitter_api=require('../utils/twitter_api.js')

exports.view = {
    description: 'Returns the home page',
    handler: function(request, reply) {
        reply.view('homepage', { 'message': 'Hello, world'});
    }
};

exports.foo = {
    description: 'returns foo page',
    handler: function(request, reply) {
    	twitter_api.get_users_from_list(request,reply);
    }
};
