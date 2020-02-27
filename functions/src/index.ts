import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

const cors = require('cors') ({origin: true});

export const webApi = functions.https.onRequest(main);
let trans: any[] = [];

app.get(`/test/`, (request, response) => {
  cors(request, response, () => {
   let pgN = +request.query.pg;
    let pgS= +request.query.pgS;
    let startingPoint = pgN * pgS;
    let endingPoint = startingPoint + pgS;
    let count=0;

    admin.database().ref('/translates/ar/')
    .orderByKey()
    .startAt('')
    .once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if (count >= startingPoint && count < endingPoint){
        trans.push({
          key: childSnapshot.key,
          value: childSnapshot.val()
        }) // push
      } // if
      count ++;
    }) // forEach
    count=0; 
  response.send(trans);
  trans=[];
  }) // then

}) // cors
}) //app

