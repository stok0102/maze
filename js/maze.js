// BACK END //

function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.startX = null;
  this.startY = null;
  this.startOrientation = null;
  this.endX = null;
  this.endY = null;

  this.directions = ["north","east","south","west"];
  this.spaces = [];

  var x, y;
  for (x = 1; x <= this.width; x += 1) {
    this.spaces[x] = [];
    for (y = 1; y <= this.height; y += 1) {
        this.spaces[x][y] = new MazeSpace();
    }
  }
}

function MazeSpace() {
  this.north = false;
  this.east = false;
  this.south = false;
  this.west = false;
  this.playerSpace = false;
}

function Player(x,y,m) {
  this.x = x;
  this.y = y;
  // this.orientation = null;
  this.maze = m;
}


Maze.prototype.setStart = function(x, y, orientation) {
  this.startX = x;
  this.startY = y;
  this.startOrientation = orientation;
}

Maze.prototype.setEnd = function(x, y) {
  this.endX = x;
  this.endY = y;
}

Maze.prototype.isInside = function(x, y) {
  if (x>0 && x<=this.width && y>0 && y<=this.height) {
    return true;
  } else {
    return false;
  }
}

Maze.prototype.createWall = function (x, y, direction) {
  this.spaces[x][y].setWallDirection(direction);
  return true;
}

MazeSpace.prototype.setWallDirection = function(direction) {
  this[direction] = true;
}

Maze.prototype.render = function() {
  $(".maze table").empty();
  var mazeRow, $mazeSpace;
  for (var y = this.height; y >= 1; y--) {
    mazeRow = $("<tr class='mazeRow'>").appendTo(".maze table");
    for (var x = 1; x <= this.width; x++) {
      $mazeSpace = $("<td class='mazeSpace'>").appendTo(mazeRow);
      $mazeSpace.append("")
      if (maze.spaces[x][y]["east"] === true) {
        $mazeSpace.addClass("eastWall");
      }
      if (maze.spaces[x][y]["north"] === true) {
        $mazeSpace.addClass("northWall");
      }
      if (maze.spaces[x][y]["playerSpace"] === true) {
        $mazeSpace.addClass("playerSpace");
      }
    }
  }
}

MazeSpace.prototype.renderSpace = function (x, y) {
  this.playerSpace = true;
};

/*************************************
To refactor for movement functions later:
**************************************/
// function boundaryCheck(oldx, oldy, newx, newy)
//   if (this.maze.isInside(this.x, this.y) === false) {
//     this.x = x;
//     this.y = y;
//     newx = oldx;
//     newy = oldy;
// }


Player.prototype.moveNorth = function(x, y) {
  if (this.maze.spaces[x][y].north === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x;
    this.y = y+1;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  this.maze.spaces[x][y+1].playerSpace = true;
  }
  this.win();
  maze.render();
}

Player.prototype.moveEast = function(x, y) {
  if (this.maze.spaces[x][y].east === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x+1;
    this.y = y;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  this.maze.spaces[x+1][y].playerSpace = true;
  }
  this.win();
  maze.render();
}

Player.prototype.moveSouth = function(x, y) {
  if (this.maze.spaces[x][y].south === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x;
    this.y = y-1;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  this.maze.spaces[x][y-1].playerSpace = true;
  }
  this.win();
  maze.render();
}

Player.prototype.moveWest = function(x, y) {
  if (this.maze.spaces[x][y].west === false) {
    this.maze.spaces[x][y].playerSpace = false;
    this.x = x-1;
    this.y = y;
    if (this.maze.isInside(this.x, this.y) === false) {
      this.x = x;
      this.y = y;
    }
  console.log(this.x, this.y);
  this.maze.spaces[x-1][y].playerSpace = true;
  }
  this.win();
  maze.render();
}

Player.prototype.win = function(){
  if (player.x === player.maze.endX && player.y === player.maze.endY) {
    $(".maze table").hide();
    $(".winning-image").fadeIn();
  }
}
// USER INTERFACE LOGIC //

$(document).ready(function() {
  maze = new Maze(5,5);
  maze.setStart(1,1, "north");
  maze.setEnd(5,5);

  var xVertWallsArray = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
  var yVertWallsArray = [1,2,3,4,5,4,3,2,1,2,3,4,5,4,3,2];

  for (var i = 0; i < xVertWallsArray.length; i++) {
    maze.createWall(xVertWallsArray[i], yVertWallsArray[i], "east");
  }
  for (var i = 0; i < xVertWallsArray.length; i++) {
    maze.createWall(xVertWallsArray[i]+1, yVertWallsArray[i], "west");
  }

  maze.spaces[1][1].playerSpace = true;

  maze.render();
  player = new Player(1,1, maze);


  // console.log(player.x, player.y);

  $('#north').click(function(){player.moveNorth(player.x, player.y)});
  $('#north').mousedown(function(){$(this).toggleClass('btn-press')}); $('#north').mouseup(function(){$(this).toggleClass('btn-press')});
  $('#east').click(function(){player.moveEast(player.x, player.y)});
  $('#east').mousedown(function(){$(this).toggleClass('btn-press')});
  $('#east').mouseup(function(){$(this).toggleClass('btn-press')});
  $('#south').click(function(){player.moveSouth(player.x, player.y)});
  $('#south').mousedown(function(){$(this).toggleClass('btn-press')});
  $('#south').mouseup(function(){$(this).toggleClass('btn-press')});
  $('#west').click(function(){player.moveWest(player.x, player.y)});
  $('#west').mousedown(function(){$(this).toggleClass('btn-press')});
  $('#west').mouseup(function(){$(this).toggleClass('btn-press')});

  $(document).keydown(function(e){
    switch(e.which) {
      case 37: //left arrow
        player.moveWest(player.x, player.y);
        break;
      case 38: //up arrow
        player.moveNorth(player.x, player.y);
        // $('#north').toggleClass('btn-press');
        break;
      case 39: //right arrow
        player.moveEast(player.x, player.y);
        break;
      case 40: //down arrow
        player.moveSouth(player.x, player.y);
        break;
    }
  });

  // console.log(player.x, player.y);
});
