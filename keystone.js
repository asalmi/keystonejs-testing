// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');


if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    keystone.set('mongo uri', process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME);
}

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    keystone.set('mongo url', process.env.OPENSHIFT_MONGODB_DB_URL);
}
if (process.env.OPENSHIFT_NODEJS_IP) {
  keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}
if (process.env.OPENSHIFT_NODEJS_PORT) {
  keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
}

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'The Testsite',
	'brand': 'The Testsite',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

	'cloudinary config': 'cloudinary://288452951436584:eimuxfiKQUUqkyr1PFmO8krsYQM@dmsbgudgs',

	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	//'posts': ['posts', 'post-categories'],
	'sites': 'sites',
	'reviews': ['reviews', 'admin-reviews'],
	'nodes': 'nodes',
	//'galleries': 'galleries',
	//'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
