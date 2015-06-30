// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'appcohol' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



angular.module('appcohol', ['ionic', 'appcohol.controllers', 'appcohol.services', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var pouchDbUrl = "http://as-app:4|7s|dFB/IBNP~V@redrop.thekey.pw:5984/app_test_1";
    var localDB = new PouchDB("app_test_1");
    var remoteDB = new PouchDB(pouchDbUrl, {adapter: 'websql'});
    if (!remoteDB.adapter) {
      remoteDB = new PouchDB(pouchDbUrl);
      console.log("used PouchDB without websql adapter.");
    }
    localDB.sync(remoteDB, {live: true});
  });
})
