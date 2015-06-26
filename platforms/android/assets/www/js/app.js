// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'appcohol' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var db = null;

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
    if (window.cordova && window.SQLitePlugin) {
      db = $cordovaSQLite.openDB("db/db.sqlite");
    } else {
      // Ionic serve syntax
      db = window.openDatabase("db/db.sqlite", "1.0", "appcohol", -1);
      db.transaction(function(tx) {
      	tx.executeSql("CREATE TABLE TableTesassteasd (id REAL UNIQUE, text TEXT)", [], function(tx){
          console.log("TableTestee created !");
      		// log.innerHTML = '<p>Table1Test created!</p>';
      	}, function (e){
          console.log("TableTest error !");
        });
      });

      // db.executeSQL(db, "CREATE TABLE IF NOT EXISTS persons (id integer primary key, name text, age integer, sexe text, height integer, weight integer)");
    }
    // window.sqlitePlugin.execute(db, "CREATE TABLE IF NOT EXISTS persons (id integer primary key, name text, age integer, sexe text, height integer, weight integer)");
    // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS persons (id integer primary key, name text, age integer, sexe text, height integer, weight integer)");

  });
})
