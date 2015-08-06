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
    phases[arg].call(self);
  });

  ggcUtil.getEndings().then(function(d){
    ggcGame.setEndings = $filter("endObject")(d.data);
  })


  ggcUtil.getEvents().then(function (r) {
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
      $rootScope.$on("votingComplete", function(t,c,n){phases.scoring();} );


    })


  }
  this.init = init;





  //TODO(Ryan) Delete once tested
  //function calculatePercentage() {
  //  var score = self.game.score;
  //  eachPlayer(function (p) {
  //    score[p].p = score[p].i / self.game.totalScore;
  //  });
  //}

  function nextPlayer() {
    var i = game.playerIndex;
    self.game.playerIndex = (i == 2 ) ? 0 : i + 1;
    setCurrentPlayer(self.game.playerIndex);
  }


  function isFirstPlayer() {
    var test = self.game.currentPlayer == self.players[0];
    return test;
  }

  function eachPlayer(f) {
    self.players.forEach(f);
  }

  //function makeDocked(p, b) {
  //  self.game.players[p].docked = b;
  //  self.game.players[p].panelClass = (b) ? panelClasses[1] : " ";
  //
  //  //console.log("MakeDocked", p, b);
  //}
  //
  //function dockAll(b) {
  //
  //  self.panelSfx.play();
  //  eachPlayer(function (p) {
  //    makeDocked(p, b);
  //
  //  });
  //}
  //
  //function dockOne(p, b) {
  //  self.panelSfx.play();
  //  eachPlayer(function (_p) {
  //    var docked = (_p === p) ? b : !b;
  //    makeDocked(_p, docked);
  //  });
  //}
  //
  //function setPanelState(p,s){
  //  self.game.players[p].panelClass = s;
  //}
  //
  //function setPanelStates(arg){
  //  if( isNaN(arg) ){ //arg is a string
  //    if(panelClasses.indexOf(arg) >=0) {
  //      eachPlayer(function(p){
  //        setPanelState(p,panelClasses[arg])
  //      })
  //    }else{ //arg is number
  //      console.log("foo");
  //    }
  //  }
  //}
  //this.dockAll = dockAll;
  //this.dockOne = dockOne;
  //this.makeDocked = makeDocked;

  function setCurrentPlayer(i) {
    //p is current player name
    var p = self.players[i];
    self.game.currentPlayer = p;
    eachPlayer(function (pp) {
      //for each player, if they are not current, set docked to true;
      self.game.players[pp].currentPlayer = (pp == p);
      //makeDocked(pp,!(pp==p));
      //self.game.players[pp].docked = !(pp==p);
    })
  }

  ///reset the hands
  function buildHands(player) {
    self.game.main = [];

    eachPlayer(nullHand);

    function nullHand(p) {
      self.game.players[p].voted = false;
      self.game.players[p].hand = {
        choices: null,
        issue: null
      }
    }

    self.game.players[player].hand.choices = [];
  }
  //TODO(Ryan) Delete when tested
  ///add a shuffled deck to the "bottom"
  function pushDeck(team) {
    var playerDeck = shuffle(self.freshDecks[team].slice(0)); //sheffle the players deck
    //if this deck doesn't exists on dealer deck, add it
    if (!self.decks[team]) self.decks[team] = new Array();
    //concat shuffled deck
    self.decks[team] = self.decks[team].concat(playerDeck);
  }

  ///Score
  function tally() {


    var score = self.game.score;

    eachPlayer(function (p) {
      score[p].i += self.game.action.effects[p].score;
      self.game.totalScore += score[p].i;

      self.game.players[p].hand.issue.scoreHTML = $filter("panelScore")(self.game.players[p].hand.issue.score, p);
    });

    calculatePercentage();
    addIcon(self.game.action.icon);
  }

  function addIcon(icon) {
    //ggcMapper.putIcon(ggcMapper.randomIndex(), icon._id);
    ggcMapper.addPriorityIcon(icon);

  }


  this.addIcon = addIcon;

  function gameOver() {
    self.game.phase = "ending";
    dockAll(true);
    var oc = calculateOutcome(self.game.score);
    self.game.outcome = (oc.balanced) ? endings.balanced : endings.unbalanced[oc.team];
    $state.go('game.play.endgame');
  }





///Phases
  var phases = {};
  this.phases = phases;

  phases.setup = function () {
    //dockAll(false);
   // ggcGame.setPhase("setup");
    //console.log(self.game.phase,self.game);
    //self.game.votes = {};
    //self.game.totalScore = 0;
    //buildHands(self.game.currentPlayer);
    deck.drawTwo().then(ggcGame.setPhase("choice")).catch(function(a){debugger;});
    //self.drawTwo(self.game.currentPlayer);

  }

  phases.choice = function () {


  }

  phases.vote = function () {

  }

  phases.scoring = function () {

  }

  phases.event = function () {
    self.newsSfx.play();
    $state.go('game.play.event');  // this is a mistake, no?
  }

  phases.endRound = function(){


    //if (self.game.round == config.rounds){
    //  console.log("GameOver");
    //  gameOver();
    //}else{
    //  self.game.round++;
    //  //var timedCb = (roll()) ? phases.event() : phases.setup();
    //  var callback = (roll()) ? "event" : "setup";
    //  var timer = $interval(function () {
    //    phases[callback].call(this);
    //    $interval.cancel(timer);
    //    //timedCb();
    //  }, config.duration.scoring)
    //
    //}
  }


///dealer methods
  //pull two cards from the deck
  //this.drawTwo = function (team) {
  //  currentCards = [];
  //  if (this.decks[team].length <= 4) {
  //    pushDeck(team);
  //
  //  }
  //  var i = 2;
  //
  //  var ret = [];
  //  while (i--) {
  //    currentCards.push(self.decks[team].shift());
  //
  //  }
  //  //call the first play phase
  //  phases.choice();
  //}


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

    //self.game.players[p].hand.issue.vote = v;
    //self.game.votes[p] = v;
    //self.game.players[p].voted = true;
    //var keys = Object.keys(self.game.votes);
    //
    //console.log("keys.length == ", keys.length);
    //if (keys.length == 3) {
    //
    //  //debugger;
    //  var i = 3;
    //  var ct = 0;
    //  while (i--) {
    //    ct += self.game.votes[keys[i]];
    //  }
    //  var passed = (ct >= 2);
    //
    //  //console.log(
    //  //  (passed) ? "PASSED" : "FAILED", ct
    //  //);
    //  dockAll(true);
    //
    //
    //
    //  if ($rootScope.currentState == "game.play.loop") {
    //    phases.scoring(passed);
    //  } else {
    //    phases.scoring(passed);
    //  }
    //
    //}
  };
  //random event video is over
  this.videoEventEnd = function () {
    if ($rootScope.currentState == "game.play.event") {
      console.log("End Video: Loop");
      $state.go("game.play.loop");
      ggcGame.setPhase("setup");
    } else if ($rootScope.currentState == "game.play.endgame") {
      /*$state.go("game.play.attract");
      self.prologue = false;
      self.signIn = false;
      self.introText = false;
      ggcMapper.reset();
      init();
      ggcUtil.getIcons().then(function (r) {
        tutorialIcons = r.data;
        console.log("Tutorial Icons: ", tutorialIcons);
      });
      console.log("End Video: Attract");*/
      ggcMapper.reset();
      init();
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
