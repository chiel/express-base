# core

The `core` directory might look a little daunting at first sight, but it
separates the concerns of the core application. Below is a description of what
each of the files in `core` is meant for:

- `config.js` - this loads the `config.json` file synchronously on startup,
  again easily `require`'d throughout your application
- `app.js` - this creates the express app, which can then easily be `require`'d
  into other files to extend it
- `settings.js` - this sets application-wide configurations, for the express app
  as well as other components, such as the templating engine
- `pre-routes.js` - this loads middleware that's supposed to come before your
  application's routes
- `post-routes.js` - this loads middleware that's supposed to come after your
  application's routes (i.e., error handlers)
- `listen.js` - this contains boilerplate code to help your application listen
  on either a port or a unix socket

## Routing

Since routing can be done in a variety of ways, it has been left out of this
boilerplate; the correct approach depends much on the structure and modularity
of your application.

You should `require` a routing mechanism of your choice between the inclusion of
`pre-routes` and `post-routes`.
