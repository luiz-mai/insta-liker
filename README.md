# insta-liker

## Description

This bot was created to like photos on Instagram in the Explore page. It's possible to run it manually or deploying it to a server using, for example, Heroku.

For now, the bot only works with Facebook login.

## Dependencies

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)*
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)*

_* These dependencies are only required if you're deploying the bot to Heroku_ 

## Setup

The bot relies on 4 environment variables that must be set before running it, so duplicate the `.env_sample` file and rename it to `.env`.

In the file, you'll find the variables:

* **FACEBOOK_EMAIL:** _(required)_ Email used to log in using Facebook.
* **FACEBOOK_PASSWORD:** _(required)_ Password used to log in using Facebook.
* **N_PHOTOS_TO_LIKE:** _(required)_ Number of photos that will be liked when running the script.
* **TAG_TO_SEARCH:** _(optional)_ Tag used to filter photos. If this variable isn't set, the bot will use the Explore page.

## Running

### Locally

To run the script locally, after setting the `.env` file, you can simply use :

```shell
$ cd /path/to/your/folder

$ node main.js
```

### At Heroku

Since we can use Heroku's environment variables, there's no need to use the `.env` file, so in order to run it, first install the  and then:

```bash
# Logs in to Heroku account
$ heroku login

# Creates a new app
$ heroku create your_app_name

# Sends the application to Heroku
$ git push heroku master
```

Puppeteer raises an error due to missing dependencies when running on Heroku, so you should set a buildpack that allows Heroku to install those dependencies, I suggest using [this one](https://github.com/jontewks/puppeteer-heroku-buildpack), so simply run the command bellow and redeploy your application using `git push heroku master`.

```bash
$ heroku buildpacks:set jontewks/puppeteer
```

If you want to setup and scheduler, then run:

```bash
# Installs Scheduler to your Heroku app
$ heroku addons:create scheduler:standard
```

To configure the Scheduler, access the Heroku Dashboard, go to the application you created then navigate to **Resources > Heroku Scheduler > Add job**, then choose the interval to run the application and enter `node main.js` in the **Run command** input.