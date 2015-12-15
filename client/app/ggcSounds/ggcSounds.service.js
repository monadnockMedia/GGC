'use strict';

angular.module('ggcApp')
  .service('ggcSounds', function (ngAudio) {
    this.votePassSfx = ngAudio.load("../sound/vote_pass.wav");
    this.voteBlockSfx = ngAudio.load("../sound/vote_block.wav");
    this.panelSfx = ngAudio.load("../sound/panel_slide.wav");
    this.newsSfx = ngAudio.load("../sound/news_jingle.wav");
    this.confirmSfx = ngAudio.load("../sound/confirm.wav");
    this.introMusic = ngAudio.load("../sound/prologue_music.wav");
    this.wooshSfx = ngAudio.load("../sound/digital_woosh.wav");
    this.winningMusic = ngAudio.load("../sound/winning_music.wav");
    this.losingMusic = ngAudio.load("../sound/losing_music.wav");
  });
