# Kalip ERP application

## Setup Backend

The first thing to do is to clone the repository:

```sh
$ git clone git@gitlab.com:sina.saderi/kalip_erp.git
$ cd kalip_erp
```

Go to backend app and create virtual environment to install dependencies in and activate it:

```sh
$ cd kalip_erp
$ cd backend
$ python3 -m venv env 
$ source env/bin/activate
```

Create Django settings file from sample:

```sh
$ cp source/settings_sample.py source/settings.py
```

Then install the dependencies:

```sh
(env)$ pip install -r requirements.txt
```

Create admin user:

```sh
(env)$ python manage.py createsuperuseruser
```

Note the `(env)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `venv`.

Once `pip` has finished downloading the dependencies:
```sh
(env)$ python manage.py runserver
```
And navigate backend `http://127.0.0.1:8000/admin/`


## Setup Frontend

Open a new terminal tab and go to front directory:

```sh
$ cd ../front
```

Install npm dependecies and start project:

```sh
$ npm install
$ npm run dev
```

And navigate frontend `http://127.0.0.1:3000/`

## Git Policy

If you want to start developing app, please create a new branch based on needed feature:

```sh
$ git checkout -b new_feature
```