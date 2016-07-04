'use strict'
const fs = require('fs');
const download = require('download');

var download_images=function(user){
	var url=user['profile_image_url']
	if ( url === undefined ) {
		console.log('url undefined for user' + user['name'])
	}
	download(url).pipe(fs.createWriteStream('resource/images/'+user['screen_name']));
}
exports.list_min_followers_filter=function(data,collect_data){
	var min_followers=200;
	for (var item in data['users'])
	{
		if (data['users'][item]['followers_count']>=min_followers)
		{
			//download_images(data['users'][item])
			collect_data.push(data['users'][item])
		}
	
}
return collect_data;
}

exports.list_subscribers_filter=function(data,collect_data){
	for (var item in data['users'])
	{
		collect_data.push(data['users'][item])
	}
return collect_data;
}



exports.hash_min_followers_filter=function(data){
	data = JSON.parse(data);
	var min_followers=200;
	var members=[];
	for (var item in data['statuses'])
	{
		console.log(data['statuses'][item])
		if (data['statuses'][item]['user']['followers_count']>=min_followers)
		{
			members.push(data['statuses'][item]['user'])
		}
	
}
console.log(members)
return members
}
