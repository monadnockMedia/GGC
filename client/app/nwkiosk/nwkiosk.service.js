'use strict';

angular.module('ggcApp')
  .service('nwkiosk', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this functio
    this.showDevTools;
    var mouseHidden = false;
    var kioskMode;
    var devTools = false;
    this.toggleMouse = function(){
      (mouseHidden) ? $("html").css("cursor","none") : $("html").css("cursor","default") ;
      mouseHidden = !mouseHidden;
    }


    if($rootScope.kiosk){
      kioskMode = true;
      var gui=require("nw.gui");
      var win = gui.Window.get();

      win.enterKioskMode();

      this.toggleKiosk = function(){
        (kioskMode) ? win.enterKioskMode() : win.leaveKioskMode() ;
        kioskMode = !kioskMode;
      }

      this.toggleDevTools = function(){
        (devTools) ? gui.Window.get().showDevTools() : gui.Window.get().closeDevTools();
        devTools=!devTools;
      }
    }else{
      kioskMode = false;

      this.toggleKiosk = function(){
        console.log("kioskMode unavailable");
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      }

      this.toggleDevTools = function(){
        console.log("devTools unavailable")
      }
    }


  });
