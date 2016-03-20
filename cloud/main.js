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

  // Returns an array of objects with email match
  /**
   * [ ParseObject { _objCount: 16, className: 'Users', id: 'pQz90ExmeJ' },
   * ParseObject { _objCount: 17, className: 'Users', id: 'Kxa4KZD4Au' },
   * ParseObject { _objCount: 18, className: 'Users', id: 'nc6Wf6K0Gj' },
   * ParseObject { _objCount: 19, className: 'Users', id: 'wdq997Vsvq' } ]
   */
  query.equalTo('email', request.object.get('email'))
  query.find()
  .then((results) => {
    console.log(results)
  }, (error) => {
    console.log('error: ', error.code + ' ' + error.message)
  })
  response.success()
})
