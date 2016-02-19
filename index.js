// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseName = '';

if(process.env.OPENSHIFT_APP_NAME) {
	databaseName = 'parse-server';
}

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI 
	|| process.env.MONGODB_URL + databaseName;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port =  process.env.NODE_PORT || process.env.PORT || 1337;
var ip = process.env.NODE_IP || process.env.IP || 'localhost';
app.listen(port, ip, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
