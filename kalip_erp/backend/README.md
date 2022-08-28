# ERP

## Setup

The first thing to do is to create ZERP directory:
```sh
$ mkdir zerp
$ cd zerp
```

Clone the repository and change project folder name from zerp to source:
```sh
$ git clone git@gitlab.com:sina.saderi/zerp.git
$ mv zerp source
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ python3 -m venv env
$ source env/bin/activate
```

Then go to source and install the dependencies:

```sh
(env)$ cd source
(env)$ pip install -r requirements.txt
```

Once `pip` has finished downloading the dependencies:
```sh
(env)$ python manage.py runserver
```
And navigate to `http://127.0.0.1:8000/admin/`.

Login to admin by username:admin and password:admin321321

You can change the language from Turkish to English by modifing source/settings.py

Change LANGUAGE_CODE = 'tr' to LANGUAGE_CODE = 'en'

But try to learn Turkish on this project Mr, Master Mind