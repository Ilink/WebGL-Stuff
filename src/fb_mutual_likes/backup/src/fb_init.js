// Load the SDK Asynchronously
(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

function fb_init(logged_in_callback){
	// Init the SDK upon load
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '46081186454', // App ID
			channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});

		// listen for and handle auth.statusChange events
		FB.Event.subscribe('auth.statusChange', function(response) {
			if (response.authResponse) {
				// user has auth'd your app and is logged into Facebook
				// We're in! Let's run some API calls.
				logged_in_callback();

				document.getElementById('auth-loggedout').style.display = 'none';
				document.getElementById('auth-loggedin').style.display = 'block';
			} else {
				// user has not auth'd your app, or is not logged into Facebook
				document.getElementById('auth-loggedout').style.display = 'block';
				document.getElementById('auth-loggedin').style.display = 'none';
			}
		});

		// respond to clicks on the login and logout links
		document.getElementById('auth-loginlink').addEventListener('click', function(){
			FB.login();
		});
		document.getElementById('auth-logoutlink').addEventListener('click', function(){
			FB.logout();
		});
	}
}