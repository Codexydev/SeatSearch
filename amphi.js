// --- CONFIGURATION ---
const svgWidth = 1000;
const config = {
    rows: 13,           // Nombre de rangs standards
    seatSize: 20,       // Taille d'un siège
    gap: 6,             // Espace entre les sièges
    aisleWidth: 50,     // Largeur des allées
    rowGap: 12,         // Espace entre les rangs
    radius: 6,
    startY: 100         // Position verticale de départ
};

const blocksStructure = [5, 11, 5]; // Gauche (5), Centre (11), Droite (5)

// --- CALCUL DU CENTRAGE ---
function getBlockWidth(seatCount) {
    if (seatCount === 0) return 0;
    return (seatCount * config.seatSize) + ((seatCount - 1) * config.gap);
}

const totalContentWidth = 
    getBlockWidth(blocksStructure[0]) + config.aisleWidth + 
    getBlockWidth(blocksStructure[1]) + config.aisleWidth + 
    getBlockWidth(blocksStructure[2]);


// --- FONCTION UTILITAIRE POUR DESSINER UN SIÈGE ---
// J'ai sorti ça pour éviter de copier-coller 4 fois le gros bloc de création de siège
const container = document.getElementById('seats-container');
let globalSeatNumber = 1;

function drawSeat(x, y) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
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
    
    globalSeatNumber++;
}


// --- 1. DESSIN DE L'AMPHI PRINCIPAL (Tes 13 rangs) ---
for (let r = 0; r < config.rows; r++) {
    let rowX = (svgWidth - totalContentWidth) / 2;
    const rowY = config.startY + (r * (config.seatSize + config.rowGap));

    blocksStructure.forEach((seatsInBlock, blockIndex) => {
        for (let s = 0; s < seatsInBlock; s++) {
            drawSeat(rowX, rowY); // Appel de la fonction
            rowX += config.seatSize + config.gap;
        }

        if (blockIndex < blocksStructure.length - 1) {
            rowX += (config.aisleWidth - config.gap); 
        }
    });
}

// --- 2. AJOUT DU RANG DU FOND (Le 14ème rang spécifique) ---

const backRowY = config.startY + (config.rows * (config.seatSize + config.rowGap));
const baseStartX = (svgWidth - totalContentWidth) / 2;

let cursorX = baseStartX + (1 * (config.seatSize + config.gap));

for (let s = 0; s < 4; s++) {
    drawSeat(cursorX, backRowY);
    cursorX += config.seatSize + config.gap;
}

cursorX = baseStartX + getBlockWidth(blocksStructure[0]) + config.aisleWidth;
cursorX += (2 * (config.seatSize + config.gap)); // Ajout du décalage

for (let s = 0; s < 7; s++) {
    drawSeat(cursorX, backRowY);
    cursorX += config.seatSize + config.gap;
}

cursorX = baseStartX + getBlockWidth(blocksStructure[0]) + config.aisleWidth + getBlockWidth(blocksStructure[1]) + config.aisleWidth;

for (let s = 0; s < 4; s++) {
    drawSeat(cursorX, backRowY);
    cursorX += config.seatSize + config.gap;
}


// --- FONCTION DE RECHERCHE ---
function startSearch(event) {
    event.preventDefault(); 
    const header = document.getElementById('header');
    if(header) header.classList.remove('centered'); // Petit check de sécurité
    console.log("Animation lancée !");
    
    const containerGlobal = document.querySelector('.container-global');
    if(containerGlobal) containerGlobal.style.opacity = "1";
}