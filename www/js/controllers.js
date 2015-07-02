
angular.module('starter.controllers', [])

.controller('QuizCtrl', function($scope, $stateParams, $ionicModal,  Quiz) {
  $scope.resp = ["faux", "vrai", "vrai et faux"];
  $scope.quest = Quiz.next($stateParams.quizID, $stateParams.questID);
  $scope.quiz = Quiz.all();
  $scope.quiz = $scope.quiz[$scope.quest.idQ];

  if (parseInt($stateParams.questID)+1 < Quiz.allQLength($scope.quest.idQ))
    $scope.next = "#/quiz/" + $scope.quest.idQ + "/" + parseInt($scope.quest.id + 1);
  else
    $scope.next = "#/score/" + $scope.quest.idQ + "/" + $scope.quest.id;

  if ($stateParams.questID > 0) 
    localStorage[$stateParams.questID - 1] = window.location.hash.split("#")[2];

  $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) { 
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  }); 

  $scope.openModal = function(rep) {
    $scope.modal.show();
    $scope.curRep = rep;
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.controller('ScoreCtrl', function($scope, $stateParams, Quiz) {
  localStorage[$stateParams.questID] = window.location.hash.split("#")[2];

  $scope.storage = localStorage; 

  $scope.max = Quiz.allQLength($stateParams.quizID); 
  $scope.result = Quiz.result($stateParams.quizID);
  $scope.pourcent = Math.round(($scope.result * 100 / $scope.max) * 10) / 10;

  localStorage.clear();
})



.controller('QuizSelect', function($scope, $stateParams, Quiz) {
  $scope.quiz = Quiz.all();
})

.controller('DashCtrl', function($scope) {
$scope.images = [];
 
  $scope.loadImages = function() {
    for(var i = 0; i < 4; i++) {
      $scope.images.push({id: i, src: "http://placehold.it/50x50"});
    }
  }

});
