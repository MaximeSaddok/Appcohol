angular.module('starter.services', [])

.factory('Quiz', function() { 
    var quiz = [{
      id: 0,
      pic : "http://st.depositphotos.com/1005920/3440/i/950/depositphotos_34402371-alcohol-icon.jpg",
      title: "Quiz 1",
      desc: "test description"
    }, {
      id: 1,
      title: "Quiz 2",
      pic : "http://cdn1.beeffco.com/files/poll-images/normal/radical-marijuana_1158.jpg",
      desc: "test description"
     }, {
      id: 2,
      title: "Test",
      pic : "http://kaisman.fr/mesmots/mydossier/myimg/Songbird/Acces-interdit.png",
      desc: "test description"
    }];

    var quest = [{
      id: 0,
      idQ: 0,
      quest: 'Test ??',
      pic: '/img/img3.jpg',
      resp: 1,
      rDesc: "vrai et nike"
    }, { 
      id: 1,
      idQ: 0,
      pic: '/img/img3.jpg',
      quest: 'test 2',
      resp: 2,
      rDesc: "nike"
    }, { 
      id: 2,
      idQ: 0,
      pic: '/img/img3.jpg',
      quest: 'test 2',
      resp: 0,
      rDesc: "nike"
    }, {
      id: 0,
      idQ: 1,
      quest: 'test 3',
      resp: 1,
      rDesc: "vrai et nike"
    }, {
      id: 1,
      idQ: 1,
      quest: 'test 4',
      resp: 1,
      rDesc: "vrai et nike"
    }, {
      id: 0,
      idQ: 2,
      quest: 'test 5',
      resp: 1,
      rDesc: "vrai et nike"
    }, {
      id: 1,
      idQ: 2,
      quest: 'test 5',
      resp: 1,
      rDesc: "vrai et nike"
    }];

  return {
    all: function() {
      return quiz;
    },
    result: function(idQ){
      var result = 0;

      for (var i = 0; i < quest.length; i++) {
        if (parseInt(idQ) == parseInt(quest[i].idQ)){
          if (parseInt(localStorage[quest[i].id]) == parseInt(quest[i].resp))
            result++;
        }
      }

      return result;
    },
    allQLength: function(idQ) {
      var questLength = 0;

      for (var i = 0; i < quest.length; i++) {
        if (quest[i].idQ == idQ)
          questLength++;
      }

      return questLength;
    },
    next: function(id, lvl) {
      for (var i = 0; i < quest.length; i++) {
        if (parseInt(quest[i].id) == lvl && parseInt(quest[i].idQ) == id) 
          return quest[i];
      }

      return null;
    }
  };
});