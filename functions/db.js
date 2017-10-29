const functions = require("firebase-functions");
const express = require("express");
const admin = require('firebase-admin');

const app = express();

app.get("*", (req, res) => {
  admin.database().ref(req.path).once('value').then(snapshot => {
    res.send(snapshot.val());
  });
});

app.post("*", (req, res) => {
  admin.database().ref(req.path).update(req.body).then(() => {
    res.sendStatus(200);
  });
});

app.put("*", (req, res) => {
  admin.database().ref(req.path).set(req.body).then(() => {
    res.sendStatus(200);
  });
});

app.put("*", (req, res) => {
  admin.database().ref(req.path).remove(req.body).then(() => {
    res.sendStatus(200);
  });
});

module.exports = functions.https.onRequest(app);