angular.module('appcohol.controllers', [])

.controller('PersonCtrl', function($scope, Team) {
  $scope.team = [];
  $scope.team = null;

  $scope.updateTeam = function() {
    Team.all().then(function(team){
      $scope.team = team;
    });
  }

  $scope.updateTeam();

  $scope.createNewTeamMember = function(member) {
    Team.add(member);
    $scope.updateTeam();
  };

  $scope.removeMember = function(member) {
    Team.remove(member);
    $scope.updateTeam();
  };

  $scope.editMember = function(origMember, editMember) {
    Team.update(origMember, editMember);
    $scope.updateTeam();
  };

})
