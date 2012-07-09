/*
Ready
This helps coordinate multiple async requests.
More specifically, it fires a function when some specific events have happened.
Leverages jQuery's event system, despite the fact that the class does not really use the DOM.
 */

function Ready(args){
	var targets = {};
	var remaining = 0;
	var data = {};

	// These targets will be set to true when they are ready
	// The bool isn't used, but I think it could be useful later!
	$.each(args.targets, function(i, target){
		targets[target] = false;
		remaining++;
	});

	// Setup events
	// This is a little overly-simple. If we needed a "cancel" event this wouldnt work.
	$(document).bind(args.name, function(e, param){
		if(typeof targets[param.name] !== 'undefined') {
			remaining--;

			targets[param.name] = true;
			data[param.name] = param.data;
			if(!remaining) {
				args.ready(data);
			}
			console.log('only: '+ remaining + ' event(s) to go');
		}
	});
}