'use strict';

angular.module('ggcApp').service('dealer', function ($http, $q, $rootScope, ggcUtil, $interval, ggcMapper, $state, $filter, ngAudio) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  this.decks = {};
  this.game = {main: {}, players: {}, currentPlayer: {}, playerIndex: 0, action: {}, round:1};
  this.game.score = {environment: {}, economy: {}, energy: {}};
  this.game.phase = "none";
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
  var chance = config.eventChance;
  var shuffle = ggcUtil.shuffle;

  var tutorialIcons = [];


  var endings = {};

  //console.log("DEALER");
  ///
  ///Setup the "fresh" deck
  ///
  $http.get('/api/cards/grouped').then(function (r) {
    self.players = Object.keys(r.data);
    self.freshDecks = r.data;
    init();
  });


  ggcUtil.getEndings().then(function(d){
    endings = $filter("endObject")(d.data);
  })


  ggcUtil.getEvents().then(function (r) {
    events = r.data;
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

    //make a new set of deck, with shuffled cards
    self.game.totalScore = 0;

    //setup the game by players
    eachPlayer(function (k) {
      pushDeck(k);
      var score = config.initialScores[k];

      //var rand = ~~(Math.random() * 4 + 3);
      //rand = (k == "environment") ? Math.max(~~(rand / 4), 1) : rand;
      self.game.totalScore += score;
      self.game.score[k] = {i: score, p: 0};
      self.game.players[k] = {hand: {choices: [], issue: {}}, docked: true};
    })

    calculatePercentage();
    setCurrentPlayer(self.game.playerIndex);
    //console.log("deck pushed", self.decks, self.hands);
    //ggcMapper.reset();
    phases.setup();
  }
  this.init = init;

  function roll() {
    var noRoll = (chance == 0);

    return (noRoll) ? false : (~~(Math.random() * chance) == 0);


  }

  function randomEvent() {
    return events[~~(Math.random() * events.length)];
  }

  function calculatePercentage() {
    var score = self.game.score;
    eachPlayer(function (p) {
      score[p].p = score[p].i / self.game.totalScore;
    });
  }

  function nextPlayer() {
    var i = self.game.playerIndex;
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

  function makeDocked(p, b) {
    self.game.players[p].docked = b;
    self.panelSfx.play();
    //console.log("MakeDocked", p, b);
  }

  function dockAll(b) {
    eachPlayer(function (p) {
      makeDocked(p, b);
      self.panelSfx.play();
    });
  }

  function dockOne(p, b) {
    eachPlayer(function (_p) {
      var docked = (_p === p) ? b : !b;
      makeDocked(_p, docked);
      self.panelSfx.play();
    });
  }

  this.dockAll = dockAll;
  this.dockOne = dockOne;
  this.makeDocked = makeDocked;

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

  function calculateOutcome(score) {
    var outcome = {};
    var average = 0;
    var spread = [];

    eachPlayer(sumScores);
    average /= 3;
    eachPlayer(makeSpread); //subtract average from each score
    spread.sort(function(a,b){return a.spread - b.spread}).reverse();
    //eachPlayer(orderSpread); //put in order
    outcome.balanced = checkBalance();
    outcome.team = spread[0].team;

    return outcome;


    function sumScores(p){
      average += score[p].i;
    };

    function makeSpread(p){
      spread.push( {team:p,spread:score[p].i - average})  ;
    }

    function checkBalance(){
      var highSpread = spread[0].spread;
      var lowSpread = spread[2].spread;
      var spreadWidth = highSpread - lowSpread;
      return (spreadWidth <= config.balanceThreshold);
    }


  }



///Phases
  var phases = {};
  this.phases = phases;

  phases.setup = function () {
    dockAll(false);
    self.game.phase = "setup";
    //console.log(self.game.phase,self.game);
    self.game.votes = {};
    self.game.totalScore = 0;
    buildHands(self.game.currentPlayer);
    self.drawTwo(self.game.currentPlayer);

  }

  phases.choice = function () {

    dockOne(self.game.currentPlayer, false);

    self.game.phase = "choice";
    //console.log(self.game.phase,self.game);
    //console.log("PHASE CHOICE");
    //loop through the two drawn cards
    var cPlayerCards = currentCards.map(function (c, i) {
      var copy = JSON.parse(JSON.stringify(c));
      //sneakily sort out player cards in the loop
      eachPlayer(function (k) {
        //if this is the current player
        if (k == self.game.currentPlayer) {
          //build the choice view
          var playerEffects = copy.effects[k];
          self.game.players[k].hand.choices[i] = {
            action: playerEffects.action,
            icon: playerEffects.icon
          };
        }
      });
      delete copy.effects;
      return copy;
    })
    self.game.main = cPlayerCards;
  }

  phases.vote = function (i) {
    self.game.phase = "vote";


    eachPlayer(function (k) {
      var playerEffects = self.game.action.effects[k];
      self.game.players[k].hand.issue = playerEffects;
    });
    dockAll(false);
  }

  phases.scoring = function (passed) {

    self.game.phase = "scoring";
    dockAll(false);
    //(self.game.phase,self.game);
    eachPlayer(function (k) {
      self.game.players[k].hand.issue.passed = passed;
    });
    self.game.main[chosenIndex].passed = passed;
    self.game.action.passed = passed;
    if (passed) tally(); //maybe need a deferred here

    //TODO(Ray) please explain?  can we link this to a state transition?
    //var timer1 = $interval(function () {
    //  $interval.cancel(timer1);
    //  dockAll(false);
    //}, 1000);



    //If it's the prologue, don't do this
    if ($rootScope.currentState == "game.play.loop") {
      nextPlayer();

      if (isFirstPlayer()) {
        phases.endRound();
      } else {
        var timer = $interval(function () {
          $interval.cancel(timer);
          phases.setup();
        }, config.duration.scoring)
      }
    } else {
      //self.prologue = true;
    }



  }

  phases.event = function () {
    dockAll(false);
    self.newsSfx.play();
    self.game.phase = "event";
    //console.log(self.game.phase,self.game);
    $state.go('game.play.event');  // this is a mistake, no?

    self.game.main = randomEvent();

  }

  phases.endRound = function(){


    if (self.game.round == config.rounds){

      gameOver();
    }else{
      self.game.round++;
      var timedCb = (roll()) ? phases.event() : phases.setup();
      var timer = $interval(function () {
        $interval.cancel(timer);
        timedCb();
      }, config.duration.scoring)

    }
  }


///dealer methods
  //pull two cards from the deck
  this.drawTwo = function (team) {
    currentCards = [];
    if (this.decks[team].length <= 4) {
      pushDeck(team);

    }
    var i = 2;

    var ret = [];
    while (i--) {
      currentCards.push(self.decks[team].shift());

    }
    //call the first play phase
    phases.choice();
  }


  ///currentPlayer Chooses an issue
  this.choose = function (p, i) {
    //set "chosen" on players choice card to true
    if (p == self.game.currentPlayer) {
      self.confirmSfx.play();
      self.game.players[self.game.currentPlayer].hand.choices[i].chosen = true;
      self.game.action = currentCards[i];

      chosenIndex = i;

      self.game.main[+!Boolean(i)].hidden = true;
      self.game.main[i].chosen = true;

      phases.vote(i);
    }
  }

  ///called when each player votes
  this.vote = function (p, v) {

    if (v == 0) {
      this.voteBlockSfx.play();
    }else {
      this.votePassSfx.play();
    }

    self.game.players[p].hand.issue.vote = v;
    self.game.votes[p] = v;
    self.game.players[p].voted = true;
    var keys = Object.keys(self.game.votes);

    if (keys.length == 3) {
      var i = 3;
      var ct = 0;
      while (i--) {
        ct += self.game.votes[keys[i]];
      }
      var passed = (ct >= 2);

      //console.log(
      //  (passed) ? "PASSED" : "FAILED", ct
      //);
      dockAll(true);



      if ($rootScope.currentState == "game.play.loop") {
        phases.scoring(passed);
      } else {
        phases.scoring(passed);
      }

    }
  };
  //random event video is over
  this.videoEventEnd = function () {
    if ($rootScope.currentState != "game.play.endgame") {
      console.log("End Video: Loop");
      $state.go("game.play.loop");
      phases.setup();
    } else {
      $state.go("game.play.attract");
      ggcMapper.reset();
      init();
      ggcUtil.getIcons().then(function (r) {
        tutorialIcons = r.data;
        console.log("Tutorial Icons: ", tutorialIcons);
      });
      console.log("End Video: Attract");
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
