
rotationSpeed = 1*Math.PI/180;
const ARM_CONFIGURATION = {

  arms: [{
    length: 30,
  },
  {
    length: 80,
  },
  {
    length: 80,
  }],

  hinges: [{
    angle: 0,
    target: 0,
    zeroAngle: 0,
    rotationSpeed: rotationSpeed,
    range: 300*Math.PI/180,
  }, {
    angle: 40*Math.PI/180,
    target: 40*Math.PI/180,
    zeroAngle: 40*Math.PI/180,
    rotationSpeed: rotationSpeed,
    range: 225*Math.PI/180,
  }, {
    angle: 70*Math.PI/180,
    target: 70*Math.PI/180,
    zeroAngle: 70*Math.PI/180,
    rotationSpeed: rotationSpeed,
    range: 200*Math.PI/180,
  }, {
    angle: 0,
    target: 0,
    zeroAngle: 0,
    rotationSpeed: rotationSpeed,
    range: null,
  }, {
    angle: 0,
    target: 0,
    zeroAngle: 0,
    rotationSpeed: rotationSpeed,
    range: 180*Math.PI/180,
  }, {
    angle: 0,
    target: 0,
    zeroAngle: 0,
    rotationSpeed: rotationSpeed,
    range: null,
  }],

  pincher : {

  }
}

class Arm {
  constructor() {
    this.randomMotion = false;
    // this.test = [];
    // this.i = 0;
  }

  update() {
    ARM_CONFIGURATION.hinges.forEach(hinge => {
      let angleDifference = hinge.target - hinge.angle;
      if ( angleDifference != 0 ) {
        let absoluteDifference = Math.abs(angleDifference)

        if ( absoluteDifference <= hinge.rotationSpeed ) {
          hinge.angle = hinge.target;

        } else {
          // console.log(hinge.rotation);
          hinge.angle += hinge.rotationSpeed*(angleDifference/absoluteDifference);
        }
      }
    });

    // console.log([1][this.i]);

    if ( this.randomMotion ) {
      this.randomisePositions();
    }
    // this.i++;
  }

  // setPosition(hinge, angle) {
  //
  // }

  randomisePositions() {

    ARM_CONFIGURATION.hinges.forEach(hinge => {
      if ( hinge.target == hinge.angle ) {
        let range = hinge.range == null ? 2*PI : hinge.range;
        hinge.target = hinge.zeroAngle + (Math.random() - 0.5)*range;
      }
    });

    // console.log(ARM_CONFIGURATION);
    // console.log(a);
  }

  moveTo(x, y, z, type="straight") {

  }

  moveToPoint(x, y, z) {
    let localX = y, localY = z, localZ = -x;
    x = localX, y = localY, z = localZ;

    let rotation = Math.atan(x/z);
    if ( z < 0 ) {
      rotation += PI;
    }
    rotation -= PI;





    let a = ARM_CONFIGURATION.arms[1].length,
        b = ARM_CONFIGURATION.arms[2].length,
        h = y - ARM_CONFIGURATION.arms[0].length,
        R = Math.sqrt(x*x + z*z),
        l = Math.sqrt(R*R + h*h);

    let gamma = atan(h/R),
        L = Math.acos((a*a + b*b - l*l)/(2*a*b)),
        B = Math.asin(b*Math.sin(L)/l);

    // console.log();
    if ( l >= a+b ) {
      return new Diagnostic("Invalid Coordinates", `This position exceeds the total arm length.`);
    }

    // console.log(`Gamma: ${gamma*180/PI} deg`);
    // console.log(`R: ${R}`);
    // console.log(`l: ${l}`);

    ARM_CONFIGURATION.hinges[0].target = rotation;
    ARM_CONFIGURATION.hinges[1].target = PI/2 - B - gamma;
    ARM_CONFIGURATION.hinges[2].target = PI - L;

    console.log(ARM_CONFIGURATION);






    // let b = ARM_CONFIGURATION.arms[1].length, c = ARM_CONFIGURATION.arms[2].length;
    // let h = y - ARM_CONFIGURATION.arms[0].length
    // let R = Math.sqrt(z*z + x*x);
    // let H = Math.sqrt(R*R + h*h);
    //
    //
    //
    // let beta = Math.acos((b*b + c*c - H*H)/(2*b*c));
    // console.log(`Beta: ${beta*180/PI} deg`);
    // ARM_CONFIGURATION.hinges[2].target = PI - beta;
    //
    // let gamma = atan(h/R);
    // if ( R < 0 ) {
    //   gamma += PI;
    // }
    // console.log(H*Math.sin(beta)/b);
    // let alpha = Math.asin(H*Math.sin(beta)/b);
    //
    // console.log(`Gamma: ${gamma*180/PI} deg`);
    // console.log(`Alpha: ${alpha*180/PI} deg`);
    //
    // ARM_CONFIGURATION.hinges[1].target = PI/2 - alpha - gamma;



  }

  show() {
    fill(200);
    stroke(110);
    push();

    let angles = ARM_CONFIGURATION.hinges.reduce(function(angles, val) {
      angles.push(val.angle);
      return angles;
    }, []);

    rotateX(PI/2);

    translate(0, 15*unitLength, 0);
    rotateY(PI/2 + angles[0]);

    cylinder(10*unitLength, 30*unitLength, 16, 1);
    translate(0, 15*unitLength, 0);

    rotateZ(PI/2);
    cylinder(10*unitLength, 21*unitLength, 16, 1);
    rotateZ(-PI/2);

    rotateX(angles[1]);
    // rotateY(mouseY/40);

    translate(0, 40*unitLength, 0);
    cylinder(10*unitLength, 80*unitLength, 16, 1);

    translate(0, 40*unitLength, 0);
    rotateZ(PI/2);
    cylinder(10*unitLength, 21*unitLength, 16, 1);
    rotateZ(-PI/2);

    rotateX(angles[2]);

    // console.log(angles[3]);
    // rotateX(mouseY/40);
    translate(0, 40*unitLength, 0);
    rotateY(angles[3]);
    // rotateY(mouseY/40);
    cylinder(10*unitLength, 80*unitLength, 16, 1);

    translate(0, 40*unitLength, 0);
    rotateZ(PI/2);
    cylinder(10*unitLength, 21*unitLength, 16, 1);
    rotateZ(-PI/2);


    // rotateX(angles[4]);
    rotateX(-angles[1]-angles[2]+PI/2);

    rotateY(angles[5]);
    translate(0, 5*unitLength, 0);
    cylinder(10*unitLength, 10*unitLength, 16, 1);

    translate(0, 7.5*unitLength, 0);
    box(20*unitLength, 4*unitLength, 4*unitLength);

    translate(-7*unitLength, 12*unitLength, 0);
    box(4*unitLength, 20*unitLength, 4*unitLength)
    translate(14*unitLength, 0, 0);
    box(4*unitLength, 20*unitLength, 4*unitLength)
    pop();
  }
}
