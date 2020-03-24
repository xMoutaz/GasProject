// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// import * as express from 'express';
// import * as bodyParser from "body-parser";

var admin = require("firebase-admin");
var express = require('express');
var bodyParser = require('body-parser');
var serviceAccount = require('./serviceAccountKey.json');
const cors = require('cors') ({origin: true});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gasproject-2f4cb.firebaseio.com"
  });

const _port = 80;

const app = express();

let trans= [];


// http://192.168.99.100/translations?pg=2&&pgS=5

app.get(`/translations/`, (request, response) => {
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

app.listen(_port, () => {
    console.log(`Node Express Server for Gas App listening on http://localhost:${_port}/`);
  });
  