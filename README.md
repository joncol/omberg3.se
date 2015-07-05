Installation
------------
* Install node.js
* Go to the client directory and run: `npm install`

Rebuilding Site
---------------

    grunt build:dist --force

Start Server
------------

    forever start -c "npm start" .

Start Client
------------

    grunt serve:dist --force
