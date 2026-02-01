// --- CONFIGURATION ---
const svgWidth = 1000; // Largeur de ton viewBox
const config = {
    rows: 14,           // Nombre de rangs
    seatSize: 20,       // Taille d'un siège (carré)
    gap: 6,             // Espace entre les sièges (serré)
    aisleWidth: 50,     // Largeur des allées (plus grand que le gap)
    rowGap: 12,         // Espace entre les rangs (jambes)
    radius: 6,
    startY: 100          // Position verticale de départ (après l'estrade)
};

const blocksStructure = [4, 13, 4];

// --- CALCUL DU CENTRAGE (Mathématiques) ---
function getBlockWidth(seatCount) {
    if (seatCount === 0) return 0;
    return (seatCount * config.seatSize) + ((seatCount - 1) * config.gap);
}

const totalContentWidth = 
    getBlockWidth(blocksStructure[0]) + config.aisleWidth + 
    getBlockWidth(blocksStructure[1]) + config.aisleWidth + 
    getBlockWidth(blocksStructure[2]);

let currentX = (svgWidth - totalContentWidth) / 2;


// --- DESSIN DE L'AMPHI ---
const container = document.getElementById('seats-container');
let globalSeatNumber = 1;

for (let r = 0; r < config.rows; r++) {
    let rowX = (svgWidth - totalContentWidth) / 2;
    const rowY = config.startY + (r * (config.seatSize + config.rowGap));

    blocksStructure.forEach((seatsInBlock, blockIndex) => {
        for (let s = 0; s < seatsInBlock; s++) {

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", rowX);
            rect.setAttribute("y", rowY);
            rect.setAttribute("width", config.seatSize);
            rect.setAttribute("height", config.seatSize);
            rect.setAttribute("rx", config.radius);
            rect.setAttribute("class", "seat");
            
            rect.setAttribute("id", `seat-${globalSeatNumber}`);
            rect.setAttribute("data-number", globalSeatNumber);
            
            const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
            title.textContent = `Place n°${globalSeatNumber}`;
            rect.appendChild(title);

            container.appendChild(rect);

            rowX += config.seatSize + config.gap;
            
            globalSeatNumber++;
        }

        if (blockIndex < blocksStructure.length - 1) {
            rowX += (config.aisleWidth - config.gap); 
        }
    });
}