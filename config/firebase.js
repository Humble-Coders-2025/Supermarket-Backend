var admin = require("firebase-admin");

var serviceAccount = require("/etc/secrets/firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smart-basket-d81f5-default-rtdb.firebaseio.com",
});

module.exports = admin;
