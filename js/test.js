var sketch_2 = function( p ) {

  let originalMouse = null;

  let resolution = 350;
  let points = [];

  let index = 0;
  let growing = true;

  let angle = 0;

  p.setup = function() {
    let width = 200;
    let height = 200;
    var canvas = p.createCanvas(width, height, p.WEBGL);
    p.frameRate(30);
    // noLoop();
  }

  p.draw = function() {

    p.clear();
    p.noFill();

    p.stroke(150 + 155*Math.sin(p.millis()/1000), 150 + 155*Math.sin(5+p.millis()/1300), 150 + 155*Math.sin(10+p.millis()/1700), 200);
    p.strokeWeight(5);
    // p.translate(p.width/2, p.height/2);
    p.rotateX(angle/150);
    p.rotateY(angle/100);

    if ( originalMouse == null ) {
      originalMouse = new p5.Vector(p.mouseX, p.mouseY);
    } else {
      let dx = p.mouseX - originalMouse.x;
      let dy = p.mouseY - originalMouse.y;
      let d = Math.sqrt(dx*dx + dy*dy);

      originalMouse = new p5.Vector(p.mouseX, p.mouseY);

      if ( !isNaN(parseFloat(d)) && isFinite(d) ) {
        // angle += d/20;
      }


    }

    angle++;

    if ( growing ) {
      index++;
      let beta = Math.PI*index/resolution;

      let r = 0.8 + 1.6*p.sin(6*beta);
      let theta = 2 * beta;
      let phi = 0.6 * Math.PI * p.sin(12 * beta);

      let x = r * p.cos(phi) * p.cos(theta);
      let y = r * p.cos(phi) * p.sin(theta);
      let z = r * p.sin(phi);

      let newPoint = new p5.Vector(x,y,z);
      newPoint.mult(25);

      // PVector[] tempArray = new PVector[points.length + 1];
      let tempArray = [];
      for ( let i=0; i<points.length; i++ ) {
        tempArray.push(points[i]);
      }
      tempArray.push(newPoint);
      points = tempArray;

      if ( index >= resolution ) {
        growing = false;
      }
    } else {
      let tempArray = [];
      tempArray.length = points.length - 1;
      for ( let i=0; i<tempArray.length; i++ ) {
        tempArray[i] = points[i+1];
      }
      points = tempArray;

      if ( points.length == 0 ) {
        growing = true;
        index = 0;
      }
    }

    p.beginShape();
    for ( let i=0; i<points.length; i++ ) {
      p.vertex(points[i].x, points[i].y, points[i].z);
    }
    p.endShape();
    }




  //------------------------EVENT ACTION METHODS--------------------------------

};

// var visual_p5 = new p5(sketch_2, "p5-container-1");
// var visual_p5 = new p5(sketch_2, "p5-container-2");
//
// var visual_p5 = new p5(sketch_2, "p5-container-3");
// var visual_p5 = new p5(sketch_2, "p5-container-4");
// var visual_p5 = new p5(sketch_2, "p5-container-5");
