var Mailgun = require('mailgun-js')
const mailTemplates = require('./utils/mailTemplates')

// Your mailgun API details.
const mailgunAPI = {
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
}

// Passing the mailAPI to identify and send mails
const mailgun = new Mailgun(mailgunAPI)

// Test Code for cloud.
Parse.Cloud.define('hello', function(request, response) {
  res.success('Hi');
});

/**
 * Database Triggers for Pictraffiq.
 */

// Ensures a single Databse entry for users.
Parse.Cloud.beforeSave('Users', (request, response) => {
  const query = new Parse.Query('Users')
  console.log(request.object.get('email'))

  // results is an array of objects with email match for example
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
    if (results.length === 0) {
      // save the object
      response.success()
    }
  }, (error) => {
    console.log('error: ', error.code + ' ' + error.message)
  })
})

/**
 * Send users a welcome message and add them to our mailing list.
 */
Parse.Cloud.afterSave('Users', (request, response) => {

  // Getting needed data from request object
  const object = request.object
  const username = object.get('username')
  const email = object.get('email')

  // Template to send
  const welcomeTemplate = mailTemplates(username).welcomeUser()

  // Data to be sent.
  const mailData = {
    from: 'team@pictraffiq.com',
    to: email,
    subject: 'Hello from Pictraffiq',
    html: welcomeTemplate
  }

  // Data to be included to mailing list.
  const members = [
    {
      address: email,
      name: username
    }
  ]

  mailgun.messages().send(mailData, (err, body) => {
    if (err) return console.log(err)
    console.log(body, 'sent successfully')
  })

  // Add the user to our mailing list.
  mailgun.lists('all-users@pictraffiq.com').members()
  .add({members: members, subscribed: true}, (err, body) => {
    if (err) return console.log(err)
    console.log('added to mailing list ', body)
  })
})
