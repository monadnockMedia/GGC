'use strict';

angular.module('ggcApp').service('dealer', function (ggcGame, ggcDeck, $http, $q, $rootScope, ggcUtil, $interval, ggcMapper, $state, $filter, ngAudio, $location) {
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


  this.votePassSfx = ngAudio.load("../sound/vote_pass.wav");
  this.voteBlockSfx = ngAudio.load("../sound/vote_block.wav");
  this.panelSfx = ngAudio.load("../sound/panel_slide.wav");
  this.newsSfx = ngAudio.load("../sound/news_jingle.wav");
  this.confirmSfx = ngAudio.load("../sound/confirm.wav");
  this.introMusic = ngAudio.load("../sound/prologue_music.wav");

  var config = $rootScope.config.game;
  var events = [];
  var chosenIndex;
  var currentCards;
  var self = this;


  var tutorialIcons = [];

  var endings = {};

  $rootScope.$on("phaseChange", function(scope,arg,c){
    if(phases[arg]){
      phases[arg].call(self);
    }

  });

  ggcUtil.getEndings().then(function(d){
    ggcGame.setEndings ($filter("endObject")(d.data));
  })


  ggcUtil.getEvents().then(function (r) {
    r.data.map(function(d){return $filter("newsEvent")(d)});
    ggcGame.setEvents(r.data);
  });

  ggcUtil.getIcons().then(function (r) {
    tutorialIcons = r.data;
    console.log("Tutorial Icons: ", tutorialIcons);
  });

  function placeTutIcon(i) {
    addIcon(tutorialIcons[i]);
  }

  this.placeTutIcon = placeTutIcon;




///utility functions

  ///initialize
  function init() {

    deck.init().then(function(_players){
      ggcGame.init().then(function(){

          ggcGame.setPhase("setup");
      });
    })


  }
  this.init = init;

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
    deck.drawTwo().then(ggcGame.setPhase("choice")).catch(function(a){debugger;});
  }


  phases.event = function () {
    self.newsSfx.play();
    $state.go('game.play.event');
  }

  phases.endRound = function(){

  }

  phases.gameOver = function(){
    $state.go('game.play.endgame');
  }

  //TODO(Ryan) are these neccessary?
  ///currentPlayer Chooses an issue
  this.choose = function (p, i) {
    //set "chosen" on players choice card to true
    if (p == self.game.currentPlayer) {
      ggcGame.chooseIssue(p,i);
    }
  }

  ///called when each player votes
  this.vote = function (p, v) {

    if (v == 0) {
      this.voteBlockSfx.play();
    }else {
      this.votePassSfx.play();
    }

    ggcGame.voteIssue(p,v);


  };
  //random event video is over
  //TODO(Ray) attach callback to controller so it can be changed based on state?
  //$scope.videoEndEvent = function(){}
  this.videoEventEnd = function () {
    if ($rootScope.currentState == "game.play.event") {
      console.log("End Video: Loop");
      $state.go("game.play.loop");
      ggcGame.setPhase("eventScoring");
    } else if ($rootScope.currentState == "game.play.endgame") {
      ggcMapper.reset();
      init();
      //TODO(Ray) Qu'est-ce que c'est?
      //Where to these get used?  why reload them?
      ggcUtil.getIcons().then(function (r) {
        tutorialIcons = r.data;
        console.log("Tutorial Icons: ", tutorialIcons);
      });
      $location.url("/game/play/attract");
    }
  }
  this.playerChoice = function (p, b) {

    if ($rootScope.currentState == "game.play.loop") {
      if (self.game.phase == "choice") {
        self.choose(p, b);
      } else if (self.game.phase == "vote") {
        self.vote(p, b);
      }
    }

  };

});
