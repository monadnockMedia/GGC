'use strict';

angular.module('ggcApp')
  .config(function ($stateProvider) {
    $stateProvider
	.state('preview',{
        url: '/preview',

        templateUrl: 'app/preview/preview.html',
		controller: 'PreviewCtrl'
      })
      .state('preview.cards', {
        url: '/cards',
        templateUrl: 'app/preview/preview.cards.html',
        controller: 'CardCtrl',
      })
	.state('preview.icons', {
        url: '/icons',
        templateUrl: 'app/preview/preview.icons.html',
        controller: 'IconCtrl',
      })
	.state('preview.screen', {
        url: '/screen',
        templateUrl: 'app/preview/preview.screen.html',
        controller: 'ScreenCtrl', //CardCtrl
	  })
	.state('preview.test', {
        url: '/test',
         templateUrl: 'app/preview/preview.test.html',
        controller: 'TestCtrl',
      })
	
  });

	// JavaScript Document
	var visibiltyAccess=false, enviroPanelExtended=false, econoPanelExtended=false, energyPanelExtended=false;

	function initializeMe() {
		$( document ).ready(function() {

			$('#enviroPanelInner').on('mouseup', function(e){ toggleEnviroPanel()} );
			$('#econoPanelInner').on('mouseup', function(e){ toggleEconoPanel()} );
			$('#energyPanelInner').on('mouseup', function(e){ toggleEnergyPanel()} );

		});

	}

	function toggleEnviroPanel() {
		 //clickB.play();
		if (!enviroPanelExtended) {
			$('#enviroPanelInner').addClass('extended');
			enviroPanelExtended = true;
		} else {
			$('#enviroPanelInner').removeClass('extended');
			enviroPanelExtended = false;
		}
	}
	function toggleEconoPanel() {
		 //clickB.play();
		if (!econoPanelExtended) {
			$('#econoPanelInner').addClass('extended');
			econoPanelExtended = true;
		} else {
			$('#econoPanelInner').removeClass('extended');
			econoPanelExtended = false;
		}
	}
	function toggleEnergyPanel() {
		 //clickB.play();
		if (!energyPanelExtended) {
			$('#energyPanelInner').addClass('extended');
			energyPanelExtended = true;
		} else {
			$('#energyPanelInner').removeClass('extended');
			energyPanelExtended = false;
		}
	}