document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById('puzzle');
    const imageUrl = 'https://i.postimg.cc/mDFFgVmM/glitter-psd.jpg'; // Image URL
    const gridSize = 8; // 8x8 grid
    let tiles = [];
    let puzzleSize = gridSize * gridSize;

    // Create a shuffled puzzle
    function createShuffledPuzzle() {
        // Create an array of tile positions
        let tilePositions = [];
        for (let i = 0; i < puzzleSize; i++) {
            tilePositions.push(i);
        }

        // Shuffle the positions randomly
        tilePositions = shuffleArray(tilePositions);

        // Create and display the tiles
        for (let i = 0; i < puzzleSize; i++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');

            // Get row and column for background positioning
            let row = Math.floor(tilePositions[i] / gridSize);
            let col = tilePositions[i] % gridSize;

            // Set background image and position for each tile
            tile.style.backgroundImage = `url(${imageUrl})`;
            tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`; // Position in the image

            tile.setAttribute('data-index', tilePositions[i]); // Set data-index attribute to track the tile's original position
            tile.addEventListener('click', tileClick);

            puzzleContainer.appendChild(tile);
            tiles.push(tile);
        }
    }

    // Shuffle function to randomize tile order
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr;
    }

    // Function to handle tile click and swap
    function tileClick(e) {
        let clickedTile = e.target;
        let clickedIndex = parseInt(clickedTile.getAttribute('data-index'));

        // Find adjacent tiles to swap
        let adjacentIndex = getAdjacentIndex(clickedIndex);
        if (adjacentIndex !== null) {
            swapTiles(clickedIndex, adjacentIndex);
        }
    }

    // Get the index of an adjacent tile
    function getAdjacentIndex(index) {
        let adjacentIndices = [];
        let row = Math.floor(index / gridSize);
        let col = index % gridSize;

        // Check adjacent tiles (up, down, left, right)
        if (row > 0) adjacentIndices.push(index - gridSize); // Up
        if (row < gridSize - 1) adjacentIndices.push(index + gridSize); // Down
        if (col > 0) adjacentIndices.push(index - 1); // Left
        if (col < gridSize - 1) adjacentIndices.push(index + 1); // Right

        // Return a randomly chosen adjacent tile
        return adjacentIndices.length > 0 ? adjacentIndices[Math.floor(Math.random() * adjacentIndices.length)] : null;
    }

    // Swap the positions of two tiles
    function swapTiles(index1, index2) {
        let tile1 = tiles[index1];
        let tile2 = tiles[index2];

        // Swap the tile's background positions and update data-index attribute
        let tempStyle = tile1.style.backgroundPosition;
        tile1.style.backgroundPosition = tile2.style.backgroundPosition;
        tile2.style.backgroundPosition = tempStyle;

        // Swap data-index attribute to track new position
        let tempIndex = tile1.getAttribute('data-index');
        tile1.setAttribute('data-index', tile2.getAttribute('data-index'));
        tile2.setAttribute('data-index', tempIndex);
    }

    // Initialize the puzzle
    createShuffledPuzzle();
});
