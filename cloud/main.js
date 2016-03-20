/**
 * Database Triggers for Pictraffiq.
 */

// Test Code for cloud.
Parse.Cloud.define('hello', function(request, response) {
  res.success('Hi');
});

/**
 * Ensure a single Databse entry for users.
 */
Parse.Cloud.beforeSave('Users', (request, response) => {
  console.log(request.object)
  query.equalsTo('email', request.object.username)
  query.find()
  .then((results) {
    console.log(results)
  }, (error) {
    console.log('error: ', error.code + ' ' + error.message)
  })
  // response.success()
})
