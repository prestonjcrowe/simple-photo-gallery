export default function minesweeper(p) {
  class Grid {
    constructor(gridSize, cellSize, startingMines) {
      this.gridSize = gridSize;
      this.cellSize = cellSize;
      this.startingMines = startingMines;
      this.board = Array(gridSize);
      this.tileColor = p.color(29, 27, 28);
      this.gameOver = false;
      this.mines = [];
      this.NUM_COLORS = [
        [99, 177, 240],
        [176, 214, 139],
        [213, 96, 97],
        [174, 137, 213],
        [253, 166, 87],
        [145, 203, 216],
        [255, 255, 255],
        [137, 158, 156]
      ];

      for (var i = 0; i < gridSize; i++) {
        this.board[i] = [];
        for (var j = 0; j < gridSize; j++) {
          this.board[i][j] = {
            x: i,
            y: j,
            state: 0,
            cellSize: cellSize,
            flagged: false,
            hidden: true
          };
        }
      }
    }

    init() {
      let mineX = [];
      let mineY = [];

      let mineStrings = [];

      for (var p = 0; p < this.startingMines; p++) {
        let randX = Math.floor(Math.random() * Math.floor(this.gridSize - 1));
        let randY = Math.floor(Math.random() * Math.floor(this.gridSize - 1));
        let mineStr = randX + "," + randY;

        // if mine already exists, generate new random values
        if (mineStrings.includes(mineStr)) {
          p--;
        } else {
          mineX.push(randX);
          mineY.push(randY);
          mineStrings.push(mineStr);
        }
      }
      for (var i = 0; i < this.startingMines; i++) {
        let x = mineX[i];
        let y = mineY[i];

        this.board[x][y].state = -1;
        this.mines.push(this.board[x][y]);
        for (var r = x - 1; r < x + 2; r++) {
          for (var t = y - 1; t < y + 2; t++) {
            if (
              r > -1 &&
              r < this.gridSize &&
              t > -1 &&
              t < this.gridSize &&
              this.board[r][t].state != -1
            ) {
              this.board[r][t].state = this.board[r][t].state + 1;
            }
          }
        }
      }
    }

    draw() {
      for (var i = 0; i < this.gridSize; i++) {
        for (var j = 0; j < this.gridSize; j++) {
          this.drawCell(this.board[i][j]);
        }
      }
    }

    drawCell(cell) {
      const { x, y, state, hidden, flagged } = cell;
      p.fill(15, 15, 15);
      p.rect(
        this.cellSize * x,
        this.cellSize * y,
        this.cellSize,
        this.cellSize
      );
      p.textSize(15);
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      if (state > 0) {
        var c = p.color(
          this.NUM_COLORS[state - 1][0],
          this.NUM_COLORS[state - 1][1],
          this.NUM_COLORS[state - 1][2]
        );
        p.fill(c);
        p.text(
          state,
          x * this.cellSize + this.cellSize / 2,
          y * this.cellSize + this.cellSize / 2
        );
      } else if (state == -1) {
        this.drawMine(x, y);
      }

      if (hidden) {
        p.fill(this.tileColor);
        p.rect(
          this.cellSize * x,
          this.cellSize * y,
          this.cellSize,
          this.cellSize
        );
      }
      if (flagged == true && hidden) {
        this.drawFlag(x, y);
      }
    }

    drawMine(x, y) {
      p.fill(244, 86, 66);
      p.rect(
        x * this.cellSize,
        y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    }

    drawFlag(x, y) {
      p.fill(158, 229, 91);
      p.ellipse(
        x * this.cellSize + this.cellSize / 2,
        y * this.cellSize + this.cellSize / 2,
        this.cellSize / 3,
        this.cellSize / 3
      );
    }

    revealCell(cell) {
      const { x, y, state, hidden } = cell;
      cell.hidden = false;
      if (state === 0) {
        for (var r = x - 1; r < x + 2; r++) {
          for (var t = y - 1; t < y + 2; t++) {
            if (
              r > -1 &&
              r < this.gridSize &&
              t > -1 &&
              t < this.gridSize &&
              this.board[r][t].hidden
            ) {
              this.revealCell(this.board[r][t]);
            }
          }
        }
      } else if (state == -1) {
        this.gameOver = true;
      }
    }

    onClick(mouseX, mouseY, shiftHeld) {
      if (!this.gameOver) {
        const x = Math.floor(mouseX / this.cellSize);
        const y = Math.floor(mouseY / this.cellSize);
        if (x >= this.gridSize || y >= this.gridSize) {
          return;
        }
        let cell = this.board[x][y];

        if (shiftHeld) {
          cell.flagged = !cell.flagged;
        } else {
          if (!cell.flagged) {
            this.revealCell(cell);
            if (this.mines.includes(cell)) {
              this.gameOver = true;
            }
          }
        }
      }
    }
  }

  const GRID_SIZE = 20;
  const CELL_SIZE = 25;
  const MINES = 50;

  var grid;
  var shiftHeld;

  p.setup = function() {
    p.createCanvas(GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    shiftHeld = false;
    grid = new Grid(GRID_SIZE, CELL_SIZE, MINES);
    grid.init();
  };

  p.draw = function() {
    p.background(0);
    grid.draw();
  };

  p.mousePressed = function() {
    grid.onClick(p.mouseX, p.mouseY, shiftHeld);
  }

  p.keyPressed = function() {
    if (p.keyCode === p.SHIFT) {
      shiftHeld = true;
    }
    if (p.key === " ") {
      p.setup();
    }
  }

  p.keyReleased = function () {
    if (p.keyCode === p.SHIFT) {
      shiftHeld = false;
    }
  }
}
