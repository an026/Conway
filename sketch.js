class GameOfLife {

  constructor() {
      // size of one cell
      this.resolution = 10;
      // color for cells
      this.deadColor = `#000000`;
      this.aliveColor = `#FFFFFF`;
      // number of rows and columns in grid
      this.cols = Math.floor(canvas.width / this.resolution);
      this.rows = Math.floor(canvas.height / this.resolution);
      // 2D array with state of current gen
      this.currentArr = [];
      // 2D array with state of next generation.
      this.nextArr = [];

      this.arrInit = () => {
        // create two 2D arrays filled with zeroes
        for (let i = 0; i < this.rows; i++) {
          this.currentArr[i] = [];
          for (let j = 0; j < this.cols; j++) {
            this.currentArr[i][j] = 0;
          }
          this.nextArr[i] = this.currentArr[i].slice();
        }
      };

      this.randomButtonHandler = () => {
        // randomly fills current array with ones and zeroes
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 2) == 0) {
                  this.currentArr[i][j] = 0;
                }
                else {
                  if (Math.floor(Math.random() * 2) == 0) {
                    this.currentArr[i][j] = 0;
                  }
                  else {
                    this.currentArr[i][j] = Math.floor(Math.random() * 2);
                  }
                }
              }
            }
          };

      this.onclickHandler = (x, y) => {
        let cols = Math.floor(x / this.resolution);
        let rows = Math.floor(y / this.resolution);
        if (this.currentArr[rows][cols] == 1) {
          this.currentArr[rows][cols] = 0;
        }
        else {
          this.currentArr[rows][cols] = 1;
        } 
      };

      this.fillArr = () => {
        // fill arr with colors based on its state 
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
              let color;
              if (this.currentArr[i][j] == 1)  
                color = this.aliveColor; 
              else
                color = this.deadColor; 
              ctx.fillStyle = color;
              // x-coord, y-coord, width, height
              ctx.fillRect(j * this.resolution, i * this.resolution, this.resolution - 1, this.resolution -1);
          }
        }
      };

      this.setCellValueHelper = (row, col) => {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.currentArr[row][col]; 
        } else {
            return 0;
        }
    };

      this.countNeighbors = (row, col) => {
        // count neighbors surrounding a cell
        let totalNeighbors = 0;
        totalNeighbors += this.setCellValueHelper(row - 1, col - 1);
        totalNeighbors += this.setCellValueHelper(row - 1, col);
        totalNeighbors += this.setCellValueHelper(row - 1, col + 1);
        totalNeighbors += this.setCellValueHelper(row, col - 1);
        totalNeighbors += this.setCellValueHelper(row, col + 1);
        totalNeighbors += this.setCellValueHelper(row + 1, col - 1);
        totalNeighbors += this.setCellValueHelper(row + 1, col);
        totalNeighbors += this.setCellValueHelper(row + 1, col + 1);
        return totalNeighbors;
      };

      this.updateCellValue = (row, col) => {
        // update cell value based on sum of neighbors & returns 0 or 1
        const total = this.countNeighbors(row, col);
        // 0 (dead) => exactly 3 neighbors => 1 (alive)
        if (this.currentArr[row][col] == 0 && total == 3) { 
          return 1; 
        }
        // 1 (alive) => more than 3 or less than 2 neighbors => 0 (dead)
        else if (this.currentArr[row][col] == 1 && (total < 2 || total > 3)) { 
          return 0; 
        }
        // 
        else { 
          return this.currentArr[row][col]; 
        }
        
      };

      this.updateLifeCycle = () => {
        // set new cell value to the nextArr
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            let newState = this.updateCellValue(i, j);
            this.nextArr[i][j] = newState;
          }
        }
        for (let i = 0; i < this.rows; i++) {
          this.currentArr[i] = this.nextArr[i].slice();
        }
      };

      this.gameSetUp = () => {
        this.arrInit();
      };

      this.runGame = () => {
        this.updateLifeCycle();
        this.fillArr();
      };
  }
}