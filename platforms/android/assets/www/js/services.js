angular.module('appcohol.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(self.db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
})

.factory('Person', function($cordovaSQLite, DBA) {
  var self = this;

  self.all = function() {
    return DBA.query("SELECT id, name, age, sexe, height, weight FROM persons")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.get = function(memberId) {
    var parameters = [memberId];
    return DBA.query("SELECT id, name, age, sexe, height, weight FROM team WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.add = function(member) {
    var parameters = [member.id, member.name];
    return DBA.query("INSERT INTO team (id, name, age, sexe, height, weight) VALUES (?,?)", parameters);
  }

  self.remove = function(member) {
    var parameters = [member.id];
    return DBA.query("DELETE FROM team WHERE id = (?)", parameters);
  }

  self.update = function(origMember, editMember) {
    var parameters = [editMember.id, editMember.name, origMember.id];
    return DBA.query("UPDATE team SET id = (?), name = (?), age = (?), sexe = (?), height = (?), weight = (?) WHERE id = (?)", parameters);
  }

  return self;
})
