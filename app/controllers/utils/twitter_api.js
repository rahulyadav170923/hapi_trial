var config_twitter={}

config_twitter['auth_keys'] = {
  "consumerKey": "eQAWZELmYLo0jIDoj4WxVOFOL",
  "consumerSecret": "sHLC19ktgqBIktpDwnBKh0wutakAySnEajrdWidbwcoXZ9lrzc",
  "accessToken": "3130630774-kiiDGsJiSgeFQVKcQZvmWxIz4NoXfoiBut3bMrj",
  "accessTokenSecret": "za6EOgU2ql0R29v6YE9jNgvmfIv0OaWVkY2OPlFz3pUiU"
}

config_twitter['urls']={
  "create_list":"https://api.twitter.com/1.1/lists/create.json?mode=public&description=list&name=",
  "list":"https://api.twitter.com/1.1/lists/members.json?list_id=",
  "search_hash":"https://api.twitter.com/1.1/search/tweets.json?q=",
  "update_members":"https://api.twitter.com/1.1/lists/members/create.json?",
  "delete_members":"https://api.twitter.com/1.1/lists/members/destroy.json?",
  "tweets_from_list":"https://api.twitter.com/1.1/lists/statuses.json?",
  "delete_list":"https://api.twitter.com/1.1/lists/destroy.json?",
  "subscribe_to_list":"https://api.twitter.com/1.1/lists/subscribers/create.json?",
  "unsubscribe_to_list":"https://api.twitter.com/1.1/lists/subscribers/destroy.json?",
  "subscribers":"https://api.twitter.com/1.1/lists/subscribers.json?"
}
var fs = require('fs');
var filter=require('./filter.js')
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      config_twitter['auth_keys']['consumerKey'],
      config_twitter['auth_keys']['consumerSecret'],
      '1.0A',
      null,
      'HMAC-SHA1'); 


// twitter

var users=function(url,config_twitter,collect_data,cursor,reply,filter_fun){
  console.log(url+'&cursor='+cursor);
  oauth.get(
      url+'&cursor='+cursor,
      config_twitter['auth_keys']['accessToken'],
      config_twitter['auth_keys']['accessTokenSecret'],            
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          data = JSON.parse(data);
          cursor=data["next_cursor"];
          collect_data=filter_fun(data,collect_data);
          if(cursor==0)
          {            
            return reply.view('search/search',{'users':collect_data});
          }
          users(url,config_twitter,collect_data,cursor,reply,filter_fun);

        }
          
      });
}



// get users from list

exports.get_users_from_list=function (request,reply) {
    var cursor=-1;
    var collect_data=[];
    users(config_twitter['urls']['list']+request.payload.query,config_twitter,collect_data,cursor,reply,filter.list_min_followers_filter);      
  }


// get users from hash tag
exports.get_users_from_hash_tag=function (request,reply) {
    console.log(config_twitter['urls']['search_hash']+encodeURIComponent('#'+request.payload.query));
    oauth.get(
      config_twitter['urls']['search_hash']+encodeURIComponent('#'+request.payload.query),
      config_twitter['auth_keys']['accessToken'], 
      config_twitter['auth_keys']['accessTokenSecret'],              
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return filter.hash_min_followers_filter(data,reply);
        }
          
      });
  }

// create new list
exports.create_new_list=function (request, reply) {
      console.log(config_twitter['urls']['create_list']);
      oauth.post(
      config_twitter['urls']['create_list']+request.params.list_id,
      config_twitter['auth_keys']['accessToken'],  
      config_twitter['auth_keys']['accessTokenSecret'],            
      '',
      '',
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data)
        }
          
      });
    }


// update members to the list
exports.update_members_to_the_list=function (request, reply) {
      console.log(config_twitter['urls']['update_members']);
      oauth.post(
      config_twitter['urls']['update_members']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name+'&screen_name='+request.params.twitter_handle,
      config_twitter['auth_keys']['accessToken'], 
      config_twitter['auth_keys']['accessTokenSecret'],           
      '',
      '',
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data)
        }
          
      });
    }

//delete members from list
exports.delete_members_from_list=function (request, reply) {
      oauth.post(
      config_twitter['urls']['delete_members']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name+'&screen_name='+request.params.twitter_handle,
      config_twitter['auth_keys']['accessToken'],
      config_twitter['auth_keys']['accessTokenSecret'],          
      request.params.list_id,
      'text',
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data)
        }
          
      });
    }

//get tweets from list
exports.get_tweets_from_list=function (request,reply) {
    oauth.get(
      config_twitter['urls']['tweets_from_list']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name,
      config_twitter['auth_keys']['accessToken'], 
      config_twitter['auth_keys']['accessTokenSecret'], 
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data);
        }
          
      });
  }

// delete list
exports.delete_list=function (request, reply) {
      console.log(config_twitter['urls']['create_list']);
      oauth.post(
      config_twitter['urls']['delete_list']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name,
      config_twitter['auth_keys']['accessToken'], 
      config_twitter['auth_keys']['accessTokenSecret'],        
      '',
      '',
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data)
        }
          
      });
    }

// subscribe to the list
exports.subscribe_to_the_list=function (request, reply) {
      console.log(config_twitter['urls']['subscribe_to_list']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name);
      oauth.post(
      config_twitter['urls']['subscribe_to_list']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name,
      config_twitter['auth_keys']['accessToken'], 
      config_twitter['auth_keys']['accessTokenSecret'], 
      '',
      '',
      function (e, data, res){
        if (e) 
          {
          console.log(e.url)
        }
        else{
          return reply(data)
        }
          
      });
    }

// unsubscribe to list
exports.unsubscribe_to_list=function (request, reply) {
      console.log(config_twitter['urls']['unsubscribe_to_list']);
      oauth.post(
      config_twitter['urls']['unsubscribe_to_list']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name,
      config_twitter['auth_keys']['accessToken'],  
      config_twitter['auth_keys']['accessTokenSecret'],        
      '',
      '',
      function (e, data, res){
        if (e) 
          {console.error(e);        
          console.log(require('util').inspect(data));
        }
        else{
          return reply(data)
        }
          
      });
    }

// subscribers of the list
exports.subscribers_of_the_list=function (request, reply) {
    var cursor=-1;
    var collect_data=[];
    users(config_twitter['urls']['subscribers']+'slug='+request.params.list_name+'&owner_screen_name='+request.params.screen_name,config_twitter,collect_data,cursor,reply,filter.list_min_followers_filter);
    }
