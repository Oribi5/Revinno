
var CMD_Functions = {
  INIT: {
    method: function() {  return initialiseAnimation() },
    arguments: [],
    description: "Initialises the Simu-link Environment. Initialisation required before any further development."
  },

  CLEAR: {
    method: function() { return clearCMD()  },
    arguments: [],
    description: "Clears all previous input in the Command Window.",
  },

  HELP: {
    method: function(command) { return helpCMD(command)  },
    arguments:
      [
        {name: "commandName", type:"String", optional: true, description: "Name of the method you would like to know more about. [OPTIONAL]"}
      ],
    description: "Provides information regarding all or specific methods.",
  },

  MOVEARM: {
    method: function(x,y,z) { return arm.moveToPoint(x,y,z)  },
    arguments:
      [
        {name: "x", type:"Number", optional: false, description: "X-Coordinate of arm end-point position."},
        {name: "y", type:"Number", optional: false, description: "Y-Coordinate of arm end-point position."},
        {name: "z", type:"Number", optional: false, description: "Z-Coordinate of arm end-point position."}
      ],
    description: "Moves the arm to the Cartesian Coordinates provided.",
  },
}


var cmdLog = [""], cmdLogIndex = 0;


function initialiseCMD() {

  $cmd = $(".command-prompt-container");

  $cmdInput = $cmd.find("input");


  $cmdInput.on('keyup',function(e) {

    if ( cmdLog.length-1 == cmdLogIndex && (e.code.includes("Key") || e.code.includes("Digit")) ) {
      cmdLog[cmdLogIndex] = $cmdInput.val();
      // console.log($cmdInput.val());
    }

    switch ( e.which ) {

      //Enter arrow
      case 13: cmdEnter(); break;

      //Up arrow
      case 38:
        cmdLogIndex = cmdLogIndex <= 0 ? cmdLogIndex : cmdLogIndex-1;
        $cmdInput.val(cmdLog[cmdLogIndex]);
        break;

      case 40:
        cmdLogIndex = cmdLogIndex >= cmdLog.length-1 ? cmdLog.length-1 : cmdLogIndex+1;
        $cmdInput.val(cmdLog[cmdLogIndex]);
        break;

      default:
        // console.log(e.which);

    }

    // console.log(cmdLogIndex);
    // console.log(cmdLog);
  });

  function cmdEnter() {
    let value = $cmdInput.val();

    cmdLog[cmdLogIndex] = $cmdInput.val();

    let html =
    `<div class="command-line">
      <i class="las la-angle-double-right"></i>
        ${value}
    </div>`

    let result = processCommandString(value);
    // console.log(result);

    if ( result ) {
      if ( result instanceof Diagnostic ) {
        html +=
        `
        <div class="command-line indent-3 error">
          Error: ${result.message}
        </div>
        <div class="command-line spacer"></div>`

      } else {
        result.forEach(line => {
          if ( line.lineText == null ) {
            html +=`<div class="command-line spacer"></div>`;
          } else {
            html +=`<div class="command-line indent-${line.indent}">${line.lineText}</div>`;
          }
        })
        html += '<div class="command-line spacer"></div>'
      }
    }

    $(html).insertBefore($cmdInput.parent());
    $cmdInput.val("");

    var objDiv = document.getElementsByClassName("command-input-space")[0];
    objDiv.scrollTop = objDiv.scrollHeight;

    cmdLog.push("");
    cmdLogIndex++;
  }

  function processCommandString(stringCommand) {
    let arguments = stringCommand.split(" ");
    let command = arguments[0];
    let commandTag = command.toUpperCase();

    if ( CMD_Functions[commandTag] ) {
      let methodArguments = arguments.splice(1,arguments.length);
      let expectedArguments = CMD_Functions[commandTag].arguments;

      for ( let i=0; i<expectedArguments.length; i++ ) {
        if ( !expectedArguments[i].optional && methodArguments[i] == undefined ) {
          return new Diagnostic("Invalid Argument", `Method '${command}' expected argument '${expectedArguments[i].name}' but recieved none.`);
        }

        if ( methodArguments[i] != undefined && expectedArguments[i].type == "Number" ) {
          let numberArgument = parseFloat(methodArguments[i]);
          console.log(numberArgument);
          if ( isNaN(numberArgument) ) {
            return new Diagnostic("Invalid Argument", `Method '${command}' expected argument '${expectedArguments[i].name}' of type Number but recieved '${methodArguments[i]}'.`)
          } else {
            methodArguments[i] = numberArgument;
          }
        }

        // return new Diagnostic("Invalid Argument", `Method '${command}' expected argument '${expectedArguments[i].name}' but recieved none.`)
      }

      return CMD_Functions[commandTag].method(...methodArguments);
    } else {
      return new Diagnostic("Undefined", `Method '${command}' is undefined.`)
    }
  }


}


// function

function clearCMD() {
  $cmdInputs = $(".command-input-space").children();
  // $cmdInputSpace.not($cmdInput).empty();

  $.each($cmdInputs, function(index, val) {
    if ( index != $cmdInputs.length-1 ) {
      $(val).remove();
    }

  })
  $cmdInput.val("");
  // $cmdInputSpace.append(
  //   `<div class="command-line">
  //     <i class="las la-angle-double-right command-prefix"></i>
  //     <input class="command-input"></input>
  //   </div>`);
}


function helpCMD(command=null) {
  let results = new ResultCollection();

  if (command == null) {

    for ( let method in CMD_Functions ) {
      results.push();
      results.push(`${method}:    ${CMD_Functions[method].description}`);
      // CMD_Function.arguments.forEach(param => {
      //   results.push(`'${param.name}' {${param.type}}. ${param.description}`, 4)
      // });
    }


  } else {
    commandTag = command.toUpperCase();
    let method = CMD_Functions[commandTag];
    if ( method ) {
      results.push();
      results.push(`${commandTag}:    ${method.description}`);

      if ( method.arguments.length != 0 ) {
        results.push();
        method.arguments.forEach(arg => {
          results.push(`'${arg.name}' {${arg.type}}: ${arg.description}`, 5);
        })
      }



    } else {
      return new Diagnostic("Undefined", `Method '${command}' is undefined.`)
    }
  }

  return results.result;
}

class ResultCollection {
  constructor() {
    this.result = [];
  }

  push(lineText=null, indent=3) {
    this.result.push(new Line(lineText, indent));
  }

  get() {
    return this.result;
  }
}

class Line {
  constructor(lineText, indent) {
    this.lineText = lineText;
    this.indent = indent;
  }
}


class Diagnostic {

  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}

// class CMD_Result {
//   constructor
// }

  // static report()
  //
  // static errors = {
  //   undefinedError = function(values) {
  //     return new ``
  //   },
  // }
  //
  // static
  //
  // constructor(type, values) {
  //   return Diagnostic
  // }
// }
