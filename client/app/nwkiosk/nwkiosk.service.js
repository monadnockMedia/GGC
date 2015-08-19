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


    console.log("Get GUI");

    try {
      var gui=require("nw.gui");
      var win = gui.Window.get();

      console.log("GUI");
      kioskMode = false;


      //win.enterKioskMode();
      //win.showDevTools();
      this.setKioskMode = function(_kioskMode){
        if (_kioskMode != kioskMode){
          kioskMode = _kioskMode;
          (kioskMode) ? win.enterKioskMode() : win.leaveKioskMode() ;
        }
      }
      this.toggleKiosk = function(){
        (!kioskMode) ? win.enterKioskMode() : win.leaveKioskMode() ;
        kioskMode = !kioskMode;
      }

      this.toggleDevTools = function(){
        (devTools) ? win.showDevTools() : win.closeDevTools();
        devTools=!devTools;
      }
    }
    catch(err) {
      console.log("Error: ", err);
      kioskMode = false;
      var docElm = document.documentElement;
      this.toggleKiosk = function(){
        console.log("kioskMode unavailable");

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
      this.setKioskMode = function(_kioskMode){
        console.log("devTools unavailable")
        docElm.webkitRequestFullScreen();
      }
    }


  });
