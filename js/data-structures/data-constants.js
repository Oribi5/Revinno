

const pageTypes = {
  Logistics: "logistics",
  PreliminaryDesign: "preliminary-design",

  Connections: "iot-connections",
  OrderStatus: "order-status",
  LiveFeed: "live-feed",
  Reconstruction: "3D-reconstruction",

  ProductionDashboard: "production-dashboard",
  Analysis: "3D-analysis"
}

function getKeyFromType(type, collection) {
  let keys = Object.keys(collection);
  for ( let i=0; i<keys.length; i++ ) {
    let key = keys[i];
    if ( collection[key] == type ) {
      return key;
    }
  }
  return null;
}

const connectionTypes = {
  Skynet: "skynet",
  RoboticArm4A: "robotic-arm-4D-A",
  RoboticArm4B: "robotic-arm-4D-B",
  RoboticArm6: "robotic-arm-6D",

  Dispenser: "dispenser",
  Machine: "machine",
  Plotter: "plotter",
  ConveyerBelt: "conveyer-belt",

  OrientationCamera: "orientation-camera",
  ReconstructionCamera: "reconstruction-camera",
  UltraSonicCamera: "ultra-sonic-camera"
}

const connectionTitles = {
  Skynet: "SKYNET",
  RoboticArm4A: "Robotic Arm (4D-A)",
  RoboticArm4B: "Robotic Arm (4D-B)",
  RoboticArm6: "Robotic Arm (6D)",

  Dispenser: "Dispenser",
  Machine: "Machine",
  Plotter: "Plotter",
  ConveyerBelt: "Conveyer Belt",

  OrientationCamera: "Orient. Cam.",
  ReconstructionCamera: "Reconst. Cam.",
  UltraSonicCamera: "Ultra Sonic Cam."
}
