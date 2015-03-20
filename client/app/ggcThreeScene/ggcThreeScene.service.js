'use strict';

angular.module('ggcApp')
  .service('ggcThreeScene', function (THREE) {
    var config;
    var self = this;
    this.setup = function(c){
      config = c;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, config.width / config.height, 0.1, 1000 );
      this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(config.width, config.height );
    };


    this.addCube = function() {
      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var material = new THREE.MeshLambertMaterial({color: 0xffffff});

      var pointLight = new THREE.PointLight(0xFF0000);
      var pointLight2 = new THREE.PointLight(0x0000ff);

      pointLight.position.set(10,50,300);
      pointLight2.position.set(-2,-20,1200);




      this.scene.add(pointLight);
      this.scene.add(pointLight2);
      this.cube = new THREE.Mesh( geometry, material );
      this.scene.add( this.cube );
    };






    function render() {
      self.cube.rotation.x += 0.01;
      self.cube.rotation.y += 0.01;
      requestAnimationFrame(render);
      self.renderer.render(self.scene, self.camera);
    }

    this.render = function(){
      render();
    }

  });
