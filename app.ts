window.onload = () => {
  const pixelsize = 4;
  const boardSize = 200 * pixelsize;
  let arr: number[][] = [[boardSize/pixelsize], [boardSize/pixelsize]];
  // Get reference to canvas
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  init();
  calc();
  // Call 'draw' function whenever browser renders a frame on the screen

  function calc() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    for (let i: number = 1; i < arr.length - 1; i++) {
      for (let j: number = 1; j < arr.length - 1; j++) {
        let neighboors = arr[i - 1][j] + arr[i - 1][j + 1] + arr[i - 1][j - 1] + arr[i][j - 1] + arr[i][j + 1] + arr[i + 1][j] + arr[i + 1][j - 1] + arr[i + 1][j + 1];
        if (arr[i][j] == 1) {
          if (neighboors < 2 || neighboors > 3) {
            arr[i][j] = 0;
          }
        } else if (neighboors == 3) {
          arr[i][j] = 1;
        }
        if (arr[i][j] == 1)
          ctx.fillRect(i * pixelsize, j * pixelsize, pixelsize, pixelsize);
      }
    }
    window.requestAnimationFrame(calc);
  }

  function init() {
    ctx.clearRect(0, 0, boardSize, boardSize);
    for (let i: number = 0; i < boardSize; i++) {
      arr[i] = [];
      for (var j: number = 0; j < boardSize; j++) {
        arr[i][j] = 0;
      }
    }
    // Demo code showing how to draw in the canvas
    let percantage: number = boardSize * boardSize * (3 / 100);
    for (let i = 0; i < percantage; i++) {
      let x: number;
      let y: number;
      do {
        x = Math.floor(Math.random() * (boardSize-1)+1);
        y = Math.floor(Math.random() * (boardSize-1)+1);
      } while (arr[x][y] == 1);
      arr[x][y] = 1;
    }
  }
};