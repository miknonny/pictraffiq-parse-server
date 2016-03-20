/**
 * Database Triggers for Pictraffiq.
 */

// Test Code for cloud.
Parse.Cloud.define('hello', function(request, response) {
  res.success('Hi');
});

/**
 * Ensures a single Databse entry for users.
 */
Parse.Cloud.beforeSave('Users', (request, response) => {
  var query = new Parse.Query('Users')
  console.log(request.object.get('email'))
  query.equalTo('email', request.object.get('email'))
  query.find()
  .then((results) => {
    console.log(results)
  }, (error) => {
    console.log('error: ', error.code + ' ' + error.message)
  })
  // response.success()
})
