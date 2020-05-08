
let nodes, spacing, totalLength, unitLength;

let initialisationFrameStamp;
let secondaryFrameStamp;
let tertiaryFrameStamp;

let startAnimationFinished = false;

let zOffset = 0;

var arm;

// let

function setup() {
  $container = $("#p5-container");
  let canvas = createCanvas($container.width(), $container.height(), WEBGL);
  canvas.parent($container[0])

  nodes = 16;
  let largerDimension = width > height*0.6 ? width : height*0.6;
  spacing = 0.4*largerDimension/(nodes);
  unitLength = spacing/20;
  totalLength = spacing*nodes;

  // normalMaterial();
  // debugMode();

  perspective();
}

function draw() {
  background(0);

  orbitControl();
  normalMaterial();

  translate(0, 0, 200);

  rotateX(0.7*PI/2);
  rotateZ(PI/10);
  translate(0, 0, -20);
  arm = new Arm();


  if (tertiaryFrameStamp || startAnimationFinished) {
    showFloor();
  }
  if ( initialisationFrameStamp && !startAnimationFinished ) {
    initialiseAnimation()
  }

  if (startAnimationFinished) {
    arm.update();
    arm.show();
  }


  // console.log(frameCount);
}

function showFloor() {

  let floorColor, lineColor;//#ece503

  noStroke();
  if ( startAnimationFinished ) {
    floorColor = 150
    lineColor = [217, 187, 5]
  } else {
    floorColor = min(8*(frameCount - tertiaryFrameStamp), 150);
    lineColor = [217, 187, 5, floorColor]
    if ( floorColor >= 150 ) {
      startAnimationFinished = true;
    }
  }



  push();
  translate(0, 0, -2);
  fill(floorColor);
  // translate(0, 0, 5)
  plane(totalLength, totalLength)

  let lineWidth = totalLength*0.02;
  let gap = lineWidth*1.5
  fill(lineColor);

  push();
  translate(-totalLength/2+2*lineWidth,0, 1)
  plane(lineWidth, totalLength-2*gap);
  pop();
  push();
  translate(+totalLength/2-2*lineWidth,0, 1)
  plane(lineWidth, totalLength-2*gap);
  pop();
  push();
  translate(0,-totalLength/2+2*lineWidth, 1)
  plane(totalLength-2*gap, lineWidth);
  pop();
  push();
  translate(0, totalLength/2-2*lineWidth, 1)
  plane(totalLength-2*gap, lineWidth);
  pop();

  pop();
}

function initialiseAnimation() {

  if ( !initialisationFrameStamp ) {
    initialisationFrameStamp = frameCount;
  }

  let waveFunction = function(t) {
    t = -t;
    // console.log(t)
    if ( t <= 0.3 ) {
      return sin(PI-10*t);
    } else {
      return (PI-10*t)/exp(10*t-PI);
    }
  }

  let strokeValue = function(r) {
    // console.log((0.2-r));
    return [255, min((0.2-2*r)*150, 150) + fadeColor];
  }



  // stroke(255, 150);

  let r;

  // strokeWeight(1);
  noStroke();

  let matrixOrigin = new p5.Vector(nodes/2, nodes/2);
  let t = frameCount - initialisationFrameStamp

  let fadeColor = tertiaryFrameStamp == undefined ? 0 : -8*(frameCount-tertiaryFrameStamp);

  if ( !tertiaryFrameStamp ) {
    for ( let y=0; y<nodes; y++ ) {
      for ( let x=0; x<nodes; x++ ) {
        let position = new p5.Vector(
          x-matrixOrigin.x,
          y-matrixOrigin.y
        );
        r = (position.x*position.x + position.y*position.y)/(nodes*nodes/4) - t/15;
        // console.log(r);

        push();
        translate(position.x*spacing, position.y*spacing, spacing*waveFunction(r))
        fill(strokeValue(r));
        sphere(1.5, 4, 4);
        pop();
        // point(, , 0)
      }
    }
  }


  if ( !secondaryFrameStamp ) {
    if ( t > 20 ) {
      secondaryFrameStamp = frameCount;
    } else {
      return;
    }
  }

  t = frameCount - secondaryFrameStamp

  // stroke(180)

  for ( let y=0; y<nodes-1; y++ ) {
    for ( let x=0; x<nodes-1; x++ ) {
      let position = new p5.Vector(
        x+0.5-matrixOrigin.x,
        y+0.5-matrixOrigin.y
      );
      r = (position.x*position.x + position.y*position.y)/(nodes*nodes/4) - t/15;
      // console.log(r);

      push();
      translate(position.x*spacing, position.y*spacing, spacing*waveFunction(r));
      fill(strokeValue(r));
      plane(spacing, spacing);
      pop();
      // point(, , 0)
    }
  }

  if ( secondaryFrameStamp && t > 24 && !tertiaryFrameStamp ) {
    tertiaryFrameStamp = frameCount;
  }

  console.log(tertiaryFrameStamp);


  // fill(255, 150)

  // fill(150, t);
  // stroke(150)
  // plane(totalLength, totalLength);
  // rotateZ(PI/2)
  // plane(totalLength, totalLength);


}

// console.log(canvas.width);
