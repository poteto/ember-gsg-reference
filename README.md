# Ember-getting-started

[![Circle CI](https://circleci.com/gh/poteto/ember-getting-started.svg?style=svg)](https://circleci.com/gh/poteto/ember-getting-started)

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

First, create a new [Firebase app](https://www.firebase.com/), and then note down the URL. Make a copy of `.env.example` and save it as `.env`, with your URL like so:

```
FIREBASE_URL=app-url
TYPEKIT_ID=typekit-id 
```

You can also add a [Typekit ID](https://typekit.com/) if you have one.

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Seed data

To get some seed data into your Firebase instance, a seed script is included. To run it simply execute `npm run seed` from the project root, and you will have some cities and listings.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

### Heroku

Easily deploy this app to Heroku using the excellent [Ember CLI Buildpack](https://github.com/tonycoco/heroku-buildpack-ember-cli) by [@tonycoco](https://github.com/tonycoco).

```bash
$ heroku create --buildpack https://github.com/tonycoco/heroku-buildpack-ember-cli.git

$ git push heroku master
...
-----> Heroku receiving push
-----> Fetching custom buildpack
...

```

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

