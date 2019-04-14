tinyChatr
=====================

tinyChatr is a client-side single-page application that allows multiple users to chat with each other. Users are able to set their username and chat in real-time through through the Websocket server.

## Final App
![tinyChatr](https://github.com/jerryhuang3/tinyChatr/blob/master/dist/assets/tinychatr.gif)

### Usage

Clone the repo to your local machine.
```
git clone git@github.com:jerryhuang3/tinyChatr.git
cd tinyChatr
```
Install the dependencies and start the server.
```
npm install
npm start
open http://localhost:3001
```

### Heroku
To deploy on Heroku, you need to change the local socket server under src/App.jsx.  
Change  
`this.socket = new WebSocket('ws://0.0.0.0:3001')` 
to   
`this.socket = new WebSocket('wss://[yourAppName].herokuapp.com')`

### Dependencies
* ReactJS
* Parcel
* Babel
* SASS
* Express
* Websockets
* Moment
* UUID
