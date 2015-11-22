Prerequisites
-------------
node.js: `sudo apt-get install nodejs-legacy`
bower: `sudo npm install -g bower`
grunt: `sudo npm install -g grunt-cli`
curl: `sudo apt-get install curl`
rvm: `\curl -sSL https://get.rvm.io | bash -s stable`
ruby: `rvm install 2.2.3`
forever: `sudo npm install -g forever`

compass:

    gem update --system
    gem install compass

From the client directory, run:

    npm install
    bower install

From the server directory, run:

    npm install

Rebuilding Site
---------------

From the client directory, run:

    grunt build:dist --force

Start Server
------------

From the server directory, run:

    forever start -c "npm start" .

Start Client
------------

    grunt serve:dist --force
