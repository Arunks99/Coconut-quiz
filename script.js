const gridSize = 6;
const tileSize = 70;
let correctTiles = 0;
const totalTiles = gridSize * gridSize;

const grid = document.getElementById("grid");
const tileGrid = document.getElementById("tile-grid");
const winnerText = document.getElementById("winner");
let tiles = [];

// Generate shuffled positions
let positions = [];
for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        positions.push({ row, col });
    }
}
positions.sort(() => Math.random() - 0.5); // Shuffle positions

// Create tiles
for (let i = 0; i < positions.length; i++) {
    let { row, col } = positions[i];
    let tile = document.createElement("div");
    tile.classList.add("tile");

    // Correctly position the background image for each tile
    tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;

    tile.dataset.correctPosition = `${row}-${col}`;
    tile.draggable = true;
    
    // Add drag event
    tile.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tile.dataset.correctPosition);
    });

    tiles.push(tile);
}

// Shuffle and append tiles to the tile grid
for (let tile of tiles.sort(() => Math.random() - 0.5)) {
    tileGrid.appendChild(tile);
}

// Create drop zones in the puzzle grid
for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        let dropZone = document.createElement("div");
        dropZone.style.width = `${tileSize}px`;
        dropZone.style.height = `${tileSize}px`;
        dropZone.dataset.targetPosition = `${row}-${col}`;
        dropZone.addEventListener("dragover", (e) => e.preventDefault());
        
        // Handle tile drop
        dropZone.addEventListener("drop", (e) => {
            let draggedPos = e.dataTransfer.getData("text/plain");
            let draggedTile = tiles.find(t => t.dataset.correctPosition === draggedPos);
            
            if (draggedTile && draggedPos === dropZone.dataset.targetPosition) {
                dropZone.appendChild(draggedTile);
                draggedTile.style.position = "static";
                draggedTile.classList.add("blinking");

                // Remove blinking effect after 1 second
                setTimeout(() => draggedTile.classList.remove("blinking"), 1000);
                
                correctTiles++;
                if (correctTiles === totalTiles) {
                    winnerText.style.display = "block";
                    winnerText.style.animation = "winner-blink 0.5s 5 alternate";
                }
            }
        });

        grid.appendChild(dropZone);
    }
}
