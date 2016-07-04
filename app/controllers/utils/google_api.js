// google contacts api

var config_google={}
config_google['urls']={
  'contacts_api':'https://www.google.com/m8/feeds/contacts/default/full'
}
var parseString = require('xml2js').parseString;

exports.get_emails=function (request, reply) {
      var qs={}
    qs['access_token']='ya29.Ci8RA9iqtT0B_qBx5-ejlY0rtLz5TtKcN7GVnCfnmv2jdO3WAyg27Ekctwm0aLx9vw'
    var m=r.get({url:config_google['urls']['contacts_api'], qs:qs}, function(err, response, body) {
    if(err) { 
      console.log(response)
      return reply(err);    
    }
    parseString(response.body, function (err, result) {
      var email_list=[]
      for (var i = 0; i <=result['feed']['entry'].length - 1; i++) {
        if(result['feed']['entry'][i]['gd:email'])
          email_list.push(result['feed']['entry'][i]['gd:email'][0]['$']['address'])

      };
    return reply (email_list);
});
});
    }