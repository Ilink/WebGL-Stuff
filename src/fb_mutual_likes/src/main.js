// Process data after all the AJAX calls have been completed
ml.fb_data_ready = new Ready({
	targets: ['my_likes', 'friends_likes'],
	name: 'fb_data_ready',
	ready: function(data){
		console.log('available data: ', data);
		console.log('friends likes: ', data.friends_likes);
		console.log('my likes: ', data.my_likes);
		var common = {};

		// this routine runs in O(N) time, where N is total number of likes.
		// 		-> total likes = #friends * likes per friend
		// this could be optimized - the user with the least likes should be the point of comparison.
		// If I had less likes than friend A, I would iterate over my likes. This would result in fewer compare operations.

		$.each(data.friends_likes, function(friend_id, v){
			$.each(v, function(i, like){
				if(typeof data['my_likes'][i] !== 'undefined'){
					// create the first common like
					if(typeof common[i] === 'undefined'){
						common[i] = like;
					}

					if(typeof common[i].shared_by === 'undefined'){
						common[i].shared_by = [];
					}
					common[i].shared_by.push(friend_id); // used for future lookups
				}
			});
		});

		// this utilizes DOM elements - must use ready callback
		$(document).ready(function(){
			ml.render_cubes(common);
		});

		console.log('common likes:', common);
	}
});

// This performs actions upon FB logging in properly
fb_init(function(){
	var friends_likes = {};

	// This loads all friends and their likes. The resulting data structure uses a hash of user keys.
	// The value of each of these is another hash, keyed by the ID of their likes.

	// With convential API calls, this is slow. I could not get the proper permissions to work to allow FQL queries on the Likes table.
	// Unfortuantely, this means we wind up with a large number of HTTP requests.
	// Additionally, an FQL query would probably be faster regardless, simlply because it occurs server side.
	ml.load_friends(function(friends){
		$.each(friends, function(i, friend){
			ml.load_likes(friend.id, function(likes){
				var map = ml.to_map(likes.data, 'id');
				friends_likes[friend.id] = map;

				// At the end of array - data is ready
				if(i === friends.length-1){
					$(document).trigger('fb_data_ready', {
						name: 'friends_likes',
						data: friends_likes
					});
				}
			});
		});
	});

	FB.api('/me/likes', function(response) {
		console.log('my likes response: ', response);
		var map = ml.to_map(response.data, 'id');
		console.log(map);

		$(document).trigger('fb_data_ready', {
			name: 'my_likes',
			data: map
		});
	});
});