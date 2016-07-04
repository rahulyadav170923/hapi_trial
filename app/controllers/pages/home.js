'use strict';

exports.view = {
    description: 'Returns the home page',
    handler: function(request, reply) {
        reply.view('homepage', { 'message': 'Hello, world'});
    }
};

exports.foo = {
    description: 'returns foo page',
    handler: function(request, reply) {
        reply.view('foopage', { 'message': 'bar'});
    }
};
