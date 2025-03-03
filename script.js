document.addEventListener("DOMContentLoaded", () => {
  const shuffledGrid = document.getElementById("shuffledGrid");
  const correctGrid = document.getElementById("correctGrid");
  const winnerMessage = document.getElementById("winnerMessage");

  const imageUrl = "https://i.postimg.cc/mDFFgVmM/glitter-psd.jpg";
  const gridSize = 8; // 8x8 grid
  const tileSize = 75; // 75px per tile
  const totalTiles = gridSize * gridSize;

  let tiles = [];
  let correctOrder = [];

  // Function to create shuffled tiles
  function createShuffledTiles() {
    let positions = [];
    for (let i = 0; i < totalTiles; i++) {
      positions.push(i);
    }

    // Shuffle the tile positions
    positions = shuffleArray(positions);

    // Create tiles for the shuffled grid
    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      let row = Math.floor(positions[i] / gridSize);
      let col = positions[i] % gridSize;

      // Set background position for each tile based on shuffled positions
      tile.style.backgroundImage = `url(${imageUrl})`;
      tile.style.backgroundPosition = `-${col * tileSize}px -${
        row * tileSize
      }px`;

      tile.setAttribute("data-id", positions[i]); // Store original position in data-id
      tile.setAttribute("draggable", true);

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("drop", dropTile);

      shuffledGrid.appendChild(tile);
      tiles.push(tile);
    }
  }

  // Function to shuffle the array of positions
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  // Handle drag start
  function dragStart(e) {
    e.dataTransfer.setData("tile", e.target.getAttribute("data-id"));
  }

  // Allow tiles to be dropped
  function dragOver(e) {
    e.preventDefault();
  }

  // Handle dropping tiles into the correct grid
  function dropTile(e) {
    e.preventDefault();
    const tileId = e.dataTransfer.getData("tile");
    const tile = tiles.find((t) => t.getAttribute("data-id") === tileId);
    const correctTile = document.createElement("div");

    correctTile.classList.add("tile");
    correctTile.style.backgroundImage = `url(${imageUrl})`;
    correctTile.style.backgroundPosition = tile.style.backgroundPosition;
    correctTile.setAttribute("data-id", tileId);

    correctTile.addEventListener("dragstart", dragStart);
    correctTile.setAttribute("draggable", true);
    correctGrid.appendChild(correctTile);
    checkPuzzleSolved();
  }

  // Check if the puzzle is solved
  function checkPuzzleSolved() {
    const correctTiles = Array.from(correctGrid.children);

    if (correctTiles.length === totalTiles) {
      let solved = true;

      correctTiles.forEach((tile, index) => {
        if (parseInt(tile.getAttribute("data-id")) !== index) {
          solved = false;
        }
      });

      if (solved) {
        winnerMessage.classList.remove("hidden");
      }
    }
  }

  // Initialize the game by creating shuffled tiles
  createShuffledTiles();
});
