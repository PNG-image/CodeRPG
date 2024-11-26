const canvas = document.getElementsByClassName("canvas")[0];
const context = canvas.getContext("2d");


var tint = [0, 0.5, 0.5, 0.125];


function displayCard(co, no, txt, more) {
  context.fillStyle = co;
  x = 75;
  y = 100;
  context.fillRect((canvas.width/6*((2*no)-1))-x/2, canvas.height/3/2-y/2, x, y);
  context.fillStyle = "rgb(255 255 255 / 75%)";
  context.font = "20px monospace";
  context.fillText(txt,(canvas.width/6*((2*no)-1))-x/2, (canvas.height/3/2-y/2)+20, x, y);
  context.fillText(more,(canvas.width/6*((2*no)-1))-x/2, (canvas.height/3/2-y/2)+40, x, y);
}

function displayUpgrades() {
  if (moreInfo[0] == '' && moreInfo[1] == '' && moreInfo[2] == '') {
    for (let i = 0; i < 3; i++) {
      if (options[i] == 'function') {
        moreInfo[i] = functions[Math.floor(Math.random()*functions.length)];
      } else {
        moreInfo[i] = ('+').repeat(Math.floor(Math.random()*3)+1);
      }
    }
  }
  displayCard("rgb(255 153 153 / 75%)",1,options[0],moreInfo[0]);
  displayCard("rgb(153 255 153 / 75%)",2,options[1],moreInfo[1]);
  displayCard("rgb(153 153 255 / 75%)",3,options[2],moreInfo[2]);
}


function arrayConainsFirst(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value) {
      return i;
    }
  }
  return -1;
}
function arrayContainsAll(array, value) {
  let Return = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] == value) {
      Return.push(i);
    }
  }
  return Return;
}


typing = {
  str: 1,
  loc: 0
};
var codeStrings = [
  "attack(arrow)",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
]

class enemy {
  constructor() {
    this.hp = 100;
    this.atk = 10;
    this.pos = 374;
    this.speed = 1;
  }
}
var enemies = [];

var mxHp = 100;
var hp = 100;
var atk = 50;
var speed = 1;
var paused = false;
var xp = 0;
var unlocked = ['attack', 'arrow'];
var theory = ['logic and math', 'more arrows']
var functions = ['attack', 'while'];
var logic_and_math = ['booleans', 'logic operators', 'math', 'advanced math', 'and, or, not', 'if', 'else', 'closestEnemy'];
var other = ['arrow', 'flaming arrow'];
var options = [];
var all_options = ['damage', 'heal', 'max hp' , 'speed', 'function'];
var moreInfo = ['','',''];
var counters = [];
var all_counters = ['enemy spawn rate', 'enemy damage', 'enemy hp', 'enemy speed']
var enSpRt = 1;

function draw() {
  context.fillStyle = "rgb(51 51 51)";
  context.fillRect(0, 0, canvas.width, canvas.height/3);
  
  context.fillStyle = "rgb(102 102 102)";
  context.fillRect(0, 145, canvas.width, canvas.height/3-145);
  
  context.fillStyle = "rgb(153 153 153)";
  context.fillRect(30, 125, 10, 20);

  context.fillStyle = "rgb(255 51 51)";
  for(let i = 0; i < enemies.length; i++) {
    // color changes with hp
    context.fillStyle = `rgb(${Math.floor(enemies[i].hp*2.55)} 51 ${255-Math.floor(enemies[i].hp*2.55)})`;
    context.fillRect(enemies[i].pos, 125, 10, 20);
  }
  
  
  context.fillStyle = `rgb(${tint[0]*255} ${tint[1]*255} ${tint[2]*255} / ${tint[3]*100}%)`;
  context.fillRect(0, 0, canvas.width, canvas.height/3);
  if (paused) {
    displayUpgrades();
  }
}

// code text is rendered on screen
function code() {
  context.fillStyle = "rgb(0 0 0)";
  context.fillRect(0,216,canvas.width,216)
  context.fillStyle = "rgb(255 255 255)";
  context.font = "10px monospace";
  context.fillText("damage = "+atk, 10, 236);
  context.fillText("max hp = "+mxHp, 10, 246);
  context.fillText("hp = "+hp, 10, 256);
  context.fillText("speed = "+speed, 10, 266);
  // changed the "loop {" to "void Main { ok"
  context.fillText("void Main {", 10, 276);
  context.fillText("  delay(1000ms / speed)", 10, 286+(codeStrings.length*10));
  context.fillText("}", 10, 296+(codeStrings.length*10));
  for(let i = 0; i < codeStrings.length; i++) {
    context.fillText("  "+codeStrings[i], 10, 286+(i*10));
  }
}


class button {
  constructor(pos, val) {
    this.pos = pos;
    this.val = val;
  }
  draw = () => {
    context.font = "35px Courier New";
    context.fillStyle = "rgb(255 255 255)";
    this.gap = 5;
    this.size = 25;
    this.tOffset = 22
    if (this.val != 'Delete' && this.val != 'Shift' && this.val != 'Enter') {
      context.fillRect(this.gap + (this.size + this.gap)*this.pos[0], 432 + this.gap + (this.size + this.gap)*this.pos[1],this.size,this.size);
      context.fillStyle = "rgb(0 0 0)";
      context.fillText(this.val, this.gap + 1 + (this.size + this.gap)*this.pos[0], 432 + this.tOffset + 1 + this.gap + (this.size + this.gap)*this.pos[1],this.size,this.size);
    } else if (this.val != 'Enter') {
      context.fillRect(this.gap + (this.size + this.gap)*this.pos[0], 432 + this.gap + (this.size + this.gap)*this.pos[1],this.size*2+this.gap,this.size);
      context.fillStyle = "rgb(0 0 0)";
      context.fillText(this.val, this.gap + 1 + (this.size + this.gap)*this.pos[0], 432 + this.tOffset + 1 + this.gap + (this.size + this.gap)*this.pos[1],this.size*2+this.gap,this.size);
    } else {
      context.fillRect(this.gap + (this.size + this.gap)*this.pos[0], 432 + this.gap + (this.size + this.gap)*this.pos[1],this.size,this.size*2+this.gap);
      context.fillStyle = "rgb(0 0 0)";
      context.rotate(Math.PI/2)
      context.fillText(this.val, this.gap + 432 + this.tOffset*1.4 + 1 + (this.size + this.gap)*this.pos[1] - this.gap - this.size, -(1 + this.gap + (this.size + this.gap)*this.pos[0]),this.size*2+this.gap,this.size);
      context.rotate(-Math.PI/2)
    }
  }
}

var buttons = [];

var keys = ["1","2","3","4","5","6","7","8","9","0","-","=","Q", "W", "E", "R", "T", "Y", "U", "I", "O","P","Delete", "A", "S", "D", "F", "G", "H", "J", "K","L",";","'","Enter", "Z", "X", "C", "V", "B", "N", "M", ",", ".","Shift"];
for (let key = 0; key < keys.length; key++) {
  if (key < 12) {
    buttons.push(new button([key,Math.floor(0)],keys[key]));
  } else if (key < 23) {
    buttons.push(new button([key-12,Math.floor(1)],keys[key]));
  } else if (key < 35) {
    buttons.push(new button([key-23,Math.floor(2)],keys[key]));
  } else if (key < 45) {
    buttons.push(new button([key-35,Math.floor(3)],keys[key]));
  }
}


function keyboard() {
  context.fillStyle = "rgb(204 204 204)";
  context.fillRect(0,432,canvas.width,216);
  for (let key = 0; key < 12; key++) {
    buttons[key].draw();
  }
  for (let key = 11; key < 23; key++) {
    buttons[key].draw();
  }
  for (let key = 23; key < 35; key++) {
    buttons[key].draw();
  }
  for (let key = 35; key < 45; key++) {
    buttons[key].draw();
  }
}

function spawn() {
  if (!paused) {
    enemies.push(new enemy());
  }
}
function update() {
  if (!paused) {
    if (xp >= 10) {
      paused = true;
      options = [all_options[Math.floor(Math.random()*all_options.length)], all_options[Math.floor(Math.random()*all_options.length)], all_options[Math.floor(Math.random()*all_options.length)]]
      counters = [all_counters[Math.floor(Math.random()*all_counters.length)], all_counters[Math.floor(Math.random()*all_counters.length)], all_counters[Math.floor(Math.random()*all_counters.length)]]
    }
    //console.log('update')
    for(let i = 0; i < enemies.length; i++) {
      if (enemies[i].pos > 40) {
        enemies[i].pos -= (7/3)*enemies[i].speed;
        if (enemies[i].hp <= 0) {
          xp ++;
          enemies.splice(i, 1);
          i--;
        }
      }
      else {
          hp -= enemies[i].atk;
          xp ++;
        enemies.splice(i, 1);
        i--;
      }
    }
    if (actions.length > 0) {
      for (let i = 0; i < actions.length; i++) {
        if (actions[i] == 'arrow') {
          for (let j = 0; j < enemies.length; j++) {
            if (enemies[j].pos < (40+400)) {
              enemies[j].hp -= atk;
              console.log(enemies[j].hp)              
              //console.log('dealt damage')
            }
            break
            //console.log('removed action "arrow"')
          }
        }
        actions.reverse()
        actions.pop()
        actions.reverse()
        i--;
      }
    }
  }
}
function detect(start, end, string) {
  let Return = '';
  for (let pos = start; pos < end+1; pos++) {
    Return += string.charAt(pos);
  }
  //console.log(Return)
  return Return;
}

function next() {
  line ++;
  compile()
}

var actions = [];
var line = 0;

function compile() {
  try {
    if (detect(0, 6, codeStrings[line]) == 'attack(' && unlocked.indexOf('attack')>-1) {
      if (detect(7, 13, codeStrings[line]) == 'arrow)' && unlocked.indexOf('arrow')>-1) {
        actions.push('arrow');
        //console.log('pushed arrow')
      }
    }
    if (!paused) {
      setTimeout(next, 100 / speed)
    }
  } catch {
    line = 0
    compile()
  }
}



setInterval(draw, 1000 / 60);
setInterval(code, 1000 / 60);
setInterval(keyboard, 1000 / 60);
setInterval(spawn, 2000 * enSpRt);
setInterval(update, 1000 / 30);
compile();