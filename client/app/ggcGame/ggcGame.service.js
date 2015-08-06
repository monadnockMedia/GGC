'use strict';

angular.module('ggcApp')
  .service('ggcGame', function ($rootScope, $q, $interval, $filter, ggcMapper, ggcUtil) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var config = $rootScope.config.game;
    var playerNames = [];
    var self = this;
    var votes = {};
    var endings = {};
    var cards = [];
    var chosenIndex;
    var votePassed;
    var events;
    this.votePassed = votePassed;
    var roll = ggcUtil.roll;
    var addIcon = ggcMapper.addPriorityIcon;
    var null_game = {
      main: {},
      phase: "none",
      players: {},
      currentPlayer: {},
      playerIndex: 0,
      action: {},
      round:1,
      score : {environment: {}, economy: {}, energy: {}},
      totalScore : 0
    };
    var game = clone(null_game);
    this.game = game;
    var null_hand = {choices: [], issue: {} };
    var panelClasses = ["fullRetract","retract","signIn"," "]

    //////////
    function init(){

      var d = $q.defer();


      eachPlayer(function (k) {
        var init_score = config.initialScores[k];

        //var rand = ~~(Math.random() * 4 + 3);
        //rand = (k == "environment") ? Math.max(~~(rand / 4), 1) : rand;
        game.totalScore += init_score;
        game.score[k] = {i: init_score, p: 0};


        game.players[k] = {hand: clone(null_hand), docked: true, panelClass: false, isCurrentPlayer:false};
      })
      setCurrentPlayer(game.playerIndex);


      d.resolve("foo");
      return d.promise;
    }
    ////////
    function eachPlayer(f) {
      playerNames.forEach(f);
    }
    function nextPlayer() {
      var i = game.playerIndex;
      game.playerIndex = (i == 2 ) ? 0 : i + 1;
      setCurrentPlayer(game.playerIndex);
    }


    function isFirstPlayer() {
      var test = game.currentPlayer === playerNames[0];
      return test;
    }

    function isLastPlayer() {
      var test = game.currentPlayer === playerNames[2];
      return test;
    }

    ////////SETTERS////////

    function setPlayerNames(pn){
      playerNames = pn;
    }
    function setCards(cc){
      cards = cc;
    }
    function setEndings(e){
      endings = e;
    }
    function setEvents(e){
      events = e;
    }

    function setCurrentPlayer(i) {
      //p is current player name
      var p = playerNames[i];
      game.currentPlayer = p;
      eachPlayer(function (pp) {
        game.players[pp].isCurrentPlayer = (pp === p);
      });
    }

    ///reset the hands
    function buildHands() {

      game.main = [];
      eachPlayer(nullHand);

      function nullHand(p) {
        game.players[p].voted = false;
        game.players[p].hand = clone(null_hand);
      }
      game.players[game.currentPlayer].hand.choices = [];
    }

    function calculatePercentage() {
      var score = game.score;
      eachPlayer(function (p) {
        score[p].p = score[p].i / self.totalScore;
      });
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

    ////////DOCKING
    function makeDocked(p, b) {
      game.players[p].docked = b;
      game.players[p].panelClass = (b) ? panelClasses[1] : " ";

      //console.log("MakeDocked", p, b);
    }

    function dockAll(b) {

      //self.panelSfx.play();
      eachPlayer(function (p) {
        makeDocked(p, b);

      });
    }

    function dockOne(p, b) {
      //self.panelSfx.play();
      eachPlayer(function (_p) {
        var docked = (_p === p) ? b : !b;
        makeDocked(_p, docked);
      });
    }

    function setPanelState(p, arg) {
      var s = false;
      if (isNaN(arg)) { //if string is valid
        if (panelClasses.indexOf(arg) >= 0) { //if string is valid
          s = arg;
        }
      } else { //arg is number
        s = (arg >= 0 || arg <= panelStates.length) ? panelStates[arg] : false;
      }

      if (s) {
        game.players[p].panelClass = s;
      }
    }


    function setPanelStates(arg) {
      eachPlayer(function (p) {
        setPanelState(p, arg)
      })
    }

    /////////EXPORTS
    this.dockAll = dockAll;
    this.dockOne = dockOne;
    this.makeDocked = makeDocked;
    this.setPanelStates = setPanelStates;
    this.setPanelState = setPanelState;

    function clone(o){
      return JSON.parse(JSON.stringify(o));
    }

    this.chooseIssue = function(p,i){
      game.players[game.currentPlayer].hand.choices[i].chosen = true;
      game.action = cards[i];

      chosenIndex = i;

      game.main[+!Boolean(i)].hidden = true;
      game.main[i].chosen = true;
      setPhase("vote");
    };

    this.voteIssue = function(p,v){
      game.players[p].hand.issue.vote = v;
      votes[p] = v;
      game.players[p].voted = true;
      var keys = Object.keys(votes);

      if (keys.length == 3) { //if all players have voted
        var i = 3;
        var ct = 0;
        while (i--) {
          ct += votes[keys[i]];
        }
        votePassed = (ct >= 2);
        dockAll(true);


        $rootScope.$emit("votingComplete");
        setPhase("scoring");

      }

    };

    function randomEvent() {
      return events[~~(Math.random() * events.length)];
    }

    var phaseFunctions = {
      ////////SETUP////////
      setup: function () {
        dockAll(false);
        dockOne(game.currentPlayer, false);
        votes = {};
        game.totalScore = 0;
        buildHands();
      },
      ////////CHOICE////////
      choice: function () {
        game.main = cards.map(function (c, i) {
          var card = clone(c);
          //sneakily sort out player cards in the loop
          eachPlayer(function (k) {
            //if this is the current player
            if (k === game.currentPlayer) {
              //build the choice view
              var playerEffects = card.effects[k];
              game.players[k].hand.choices[i] = {
                action: playerEffects.action,
                icon: playerEffects.icon
              };
            }
          });
          delete card.effects;
          return card;
        })
      },
      ////////VOTE////////
      vote: function () {

        eachPlayer(
          function (k) {
            var playerEffects = clone(game.action.effects[k]);
            game.players[k].hand.issue = clone(playerEffects);
          }
        );
        dockAll(false);
      },
      ////////SCORING////////
      scoring: function () {
        dockAll(false);
        //(self.game.phase,self.game);
        eachPlayer(function (k) {

          game.players[k].hand.issue.passed = votePassed;
        });
        game.main[chosenIndex].passed = votePassed;
        game.action.passed = votePassed;
        if (votePassed) tally(); //maybe need a deferred here

        //If it's the prologue, don't do this
        if ($rootScope.currentState == "game.play.loop") {

          var nextPhase = (isLastPlayer()) ? "endRound" : "setup"; //if we're on the last turn, go to end round, if not, just setup another turn.
          nextPlayer();
          var timer = $interval(function () {
            $interval.cancel(timer);
            setPhase(nextPhase);
          }, config.duration.scoring);
        }
      },
      ////////EVENT////////
      event: function () {
        dockAll(false);
        debugger;
        game.main = randomEvent();
      },
      ////////ENDROUND////////
      endRound: function () {
        dockAll(true)

        if (game.round == config.rounds){ ///It's the last round
          console.log("GameOver");
          setPhase("gameOver");
        }else{
          game.round++;
          //var timedCb = (roll()) ? phases.event() : phases.setup();
          var callback = (roll(config.eventChance)) ? "event" : "setup";
          var timer = $interval(function () {
            setPhase(callback);
            $interval.cancel(timer);
            //timedCb();
          }, 0)

        }
      },
      gameOver: function(){
        dockAll(true);
        var oc = calculateOutcome(game.score);
        game.outcome = (oc.balanced) ? endings.balanced : endings.unbalanced[oc.team];
      }
    };

    function setPhase(p) {
      console.log("GamePhase: ",p);
      game.phase = p;
      phaseFunctions[p].call(self);
      $rootScope.$emit("phaseChange", p);
    }

    function tally() {


      var score = game.score;

      eachPlayer(function (p) {
        score[p].i += game.action.effects[p].score;
        game.totalScore += score[p].i;

        game.players[p].hand.issue.scoreHTML = $filter("panelScore")(game.players[p].hand.issue.score, p);
      });



      calculatePercentage();
      addIcon(game.action.icon);
    }


    this.init = init;
    this.setPlayerNames = setPlayerNames;
    this.setCards = setCards;
    this.setPhase = setPhase;
    this.setEndings = setEndings;
    this.setEvents = setEvents;



 /*   return{
      init: init,
      main: main,
      players: players,
      phase:phase,
      setPlayerNames: setPlayerNames,
      getCurrentPlayer: function(){return CurrentPlayer},
      currentCards: currentCards,
      playerIndex: playerIndex,
      action:action,
      phase:phase,
      round:round,
      totalScore:totalScore,
      score:score,
      phase: setPhase
    }; */



  });
