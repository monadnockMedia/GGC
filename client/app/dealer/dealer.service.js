'use strict';
var app = angular.module('ggcApp');
app.service('dealer', function (ggcGame, ggcDeck, ggcGovernor, $http, $q, $rootScope, ggcUtil, $interval, ggcMapper, $state, $filter, ggcSounds) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  this.decks = {};

  //TODO(@cupofnestor) Make game service
  var game = ggcGame.game;
  this.game = game;
  self = {game:game}; //temporary
  var deck = ggcDeck;
  this.prologue = false;
  this.signIn = false;
  this.introText = false;

  var config = $rootScope.config.game;
  var events = [];
  var chosenIndex;
  var currentCards;
  var self = this;


  var tutorialIcons = [];


  $rootScope.$on("phaseChange", function(scope,arg,c){
    if(phases[arg]){
      phases[arg].call(self);
    }

  });

  $rootScope.$on("AIReset", function(scope,arg,c){
    reset();
  });





  ggcUtil.getEvents().then(function (r) {
    r.data.map(function (d) {
      return $filter("newsEvent")(d)
    });
    ggcGame.setEvents(r.data);
    ggcUtil.getEndings().then(function (d) {
      ggcGame.setEndings($filter("endObject")(d.data));
     // init();
    })
  });






///utility functions

  ///initialize
  function init() {
    //console.log("Dealer Init");
    var d = $q.defer();
    ggcGame.init().then(function(){
      deck.init().then(function(){
          ggcGovernor.init();
          ggcGame.setPhase("setup");
          d.resolve("foo");
      });
    });
    return d.promise;

  }
  this.init = init;

  function reset(){
    ggcGovernor.killTimers();
   // ggcUtil.killTimeouts();
    ggcMapper.reset();
    $state.go("game.play.attract", {}, {reload: true});
    if($rootScope.config.hardReset) location.reload();
  }
  this.reset = reset;
  //TODO(Ray) use ggcMapper.addIcon directly form controller
  function addIcon(icon) {
    //ggcMapper.putIcon(ggcMapper.randomIndex(), icon._id);
    ggcMapper.addPriorityIcon(icon);

  }

  this.addIcon = addIcon;


///Phases
  var phases = {};
  this.phases = phases;

  phases.setup = function () {
   // if($rootScope.currentState != 'game.play.loop') $state.go('game.play.loop');
    deck.drawTwo().then(ggcGame.setPhase("choice")).catch(function(a){debugger;});
  }


  phases.event = function () {
    ggcSounds.newsSfx.play();
    $state.go('game.play.event');
  }



  phases.gameOver = function(){
    $state.go('game.play.endgame');
  }

  phases.warn = function(){
    $state.go('game.play.warn');
  }

  //TODO(Ryan) are these neccessary?
  ///currentPlayer Chooses an issue
  this.choose = function (p, i) {
    //set "chosen" on players choice card to true
    if (p == self.game.currentPlayer) {
      ggcSounds.confirmSfx.play();
      ggcGame.chooseIssue(p,i);
    }
  }

  ///called when each player votes
  this.vote = function (p, v) {

    if (v == 0) {
      ggcSounds.voteBlockSfx.play();
    }else {
      ggcSounds.votePassSfx.play();
    }

    ggcGame.voteIssue(p,v);


  };
  //random event video is over
  //TODO(Ray) attach callback to controller so it can be changed based on state?
  //$scope.videoEndEvent = function(){}
  this.videoEventEnd = function (d, i, a) {
    if ($rootScope.currentState == "game.play.event") {
      //console.log("End Video: Loop");
      $state.go("game.play.loop");
      ggcGame.setPhase("eventScoring");
    } else if ($rootScope.currentState == "game.play.endgame") {
      reset();
    }
  }
  this.playerChoice = function (p, b) {

    if ($rootScope.currentState == "game.play.loop") {
      ggcGovernor.active(p);
      (ggcGame.isAI(p)) ? choiceFunctions.ai(p) : choiceFunctions[self.game.phase].call(self,p,b);
      //if (self.game.phase == "choice") {
      //  self.choose(p, b);
      //} else if (self.game.phase == "vote") {
      //  self.vote(p, b);
      //}
    }

  };

  var choiceFunctions = {
    choice: function(p,b){
      self.choose(p,b)
    },
    vote: function(p,b){
      self.vote(p,b)
    },
    ai: function(p){
      ggcGame.setAI(p,false);
    }
  };




});

