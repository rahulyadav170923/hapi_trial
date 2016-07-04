
//facebook api

var config_facebook={}
config_facebook['urls']={
  "base_url":"https://graph.facebook.com/v2.6/1060207107400619",
  "page_feed":"https://graph.facebook.com/v2.6/1060207107400619/feed",
  "page_photos":"https://graph.facebook.com/v2.6/1060207107400619/photos",
  "page_videos":"https://graph.facebook.com/v2.6/1060207107400619/videos"
}
config_facebook['auth_keys'] = {
  'user_access_token':'EAACEdEose0cBAIdO2aFhHPETbjghvep9luVlnZAn9ZATGDemNVLPVc4HFgL5qQ4QINlXsrGUACrGDV7HUlDdAeBl3nI2CJ5Nrahxs723d0CJuMCBi6jtdiyEkwvEF9KkEaQaa1JVcZCGWStd3l7yQZBENav5ijcQTVu8LbfQZBAZDZD',
  'page_access_token':'EAACEdEose0cBADsmmWBSbe7UnV6MQa1VkbRllZC1YHuPsjJoXJCYtMaWRGfeyeTPSWR4ZC3Hk8A22OCCpzCxZCHBMoh9sGpbMJAlWw7hPIuHX5TODMMUd5gvrta4bDTwHlEWNeg1Butox74Nfyt8JZCToot0EzFhbeRM8VYZCvwZDZD'
}


var r=require('request')

exports.get_page_access_token=function (request, reply) {
    var qs={}
    qs['access_token']=config_facebook['auth_keys']['user_access_token']
    qs['fields']='access_token'
    r.get({url:config_facebook['urls']['base_url'], qs:qs}, function(err, response, body) {
  if(err) { return reply(error);}
  console.log("Get response: " + response.statusCode);
  return reply (body)
});
}


// post message and links
exports.post_message_and_links=function (request, reply) {
    var qs={}
    qs['access_token']=config_facebook['auth_keys']['page_access_token']
    qs['message']="testing api"
    qs['link']='https://google.com'
    r.post({url:config_facebook['urls']['page_feed'], qs:qs}, function(err, response, body) {
  if(err) { return reply(error);}
  console.log("Get response: " + response.statusCode);
  return reply (response.body)
});
}

// post photos
exports.post_photos=function (request, reply) {
    var qs={}
    qs['access_token']=config_facebook['auth_keys']['page_access_token']
    var m=r.post({url:config_facebook['urls']['page_photos'], qs:qs}, function(err, response, body) {
    if(err) { 
      console.log(response)
      return reply(error);    
    }
    console.log(response.form);
    return reply (response.body)
});
    var forms = m.form();
    forms.append('custom_file', fs.createReadStream(__dirname + '/photo.jpg'), {filename: 'photo.jpg'});
}

// post videos

exports.post_videos=function (request, reply) {
    var qs={}
    qs['access_token']=config_facebook['auth_keys']['page_access_token']
    var m=r.post({url:config_facebook['urls']['page_videos'], qs:qs}, function(err, response, body) {
    if(err) { 
      console.log(response)
      return reply(error);    
    }
    console.log(response.form);
    return reply (response.body)
});
    var forms = m.form();
    forms.append('custom_file', fs.createReadStream(__dirname + '/yo.mp4'), {filename: 'yo.mp4'});
}

