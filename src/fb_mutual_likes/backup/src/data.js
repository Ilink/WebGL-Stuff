// Namespace - create if not defined
if(typeof ml === 'undefined'){
    var ml = {};
}

/*
@function to_map
Utilizes the IDs from within each map to create a keys in a new hash.
Assumes all properties, minus the named 'uuid' property will be transferred to the new map.
Takes an array of maps as an argument. Also takes the name of the UUID to use as a key.

EG:

    arr_of_maps = [{
        category: ABC,
        name: some_name,
        id: 123456789
    }];

This structure would be turned into:

    map = {
        id: {
            category: ABC,
            name: some_name
        }
    }
*/
ml.to_map = function(arr, id_name){
    var map = {};

    $.each(arr, function(i, val){
        map[val[id_name]] = val;
        delete(map[val[id_name]].id);
    });
    return map;
};

/*
 @function load_friends
 Loads up all the friends and provides a callback.
 The callback itself is provided a reference to the data.

 This function could be much more general, but in order to keep things simple, this is quite specific.
 Were this a broader application, I would provide a more generic iterator.
 */
ml.load_friends = function(callback){
	FB.api('/me/friends', function(response){
		callback(response.data);
	});
};

/*
@function load_friends_likes
Loads up all the friends likes and provides a callback.
The callback itself is provided a reference to the data.

This function could be much more general, but in order to keep things simple, this is quite specific.
Were this a broader application, I would provide a more generic iterator.
 */
ml.load_likes = function(id, callback){
	FB.api('/'+id+'/likes', function(response){
		callback(response);
	});
};