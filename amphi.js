// --- CONFIGURATION ---
const svgWidth = 1000;
const config = {
    rows: 14,           // Nombre de rangs standards
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

let globalSeatIndex = 0; 

function drawSeat(x, y) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", config.seatSize);
    rect.setAttribute("height", config.seatSize);
    rect.setAttribute("rx", config.radius);
    rect.setAttribute("class", "seat");

    rect.setAttribute("id", `seat-index-${globalSeatIndex}`);

    rect.setAttribute("data-index", globalSeatIndex);

    rect.style.animationDelay = `${globalSeatIndex * 0.004}s`;

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `Siège physique index ${globalSeatIndex}`;
    rect.appendChild(title);

    container.appendChild(rect);
    globalSeatIndex++;
}


// --- 1. DESSIN DE L'AMPHI PRINCIPAL (Tes 13 rangs) ---
for (let r = 0; r < config.rows; r++) {
    let rowX = (svgWidth - totalContentWidth) / 2;
    const rowY = config.startY + (r * (config.seatSize + config.rowGap));

    blocksStructure.forEach((seatsInBlock, blockIndex) => {
        for (let s = 0; s < seatsInBlock; s++) {
            drawSeat(rowX, rowY);
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
cursorX += (2 * (config.seatSize + config.gap));

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
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key === "Enter") {
        startSearch(evt);
    }
};

const amphiMap = [
    // --- RANG 0 (Bas) : Gauche à Droite (Places 1-12) ---
    "1", "-1", "2", "-1", "3", "4", "-1", "5", "-1", "6", "-1", "7", "-1", "8", "-1", "9", "10", "-1", "11", "-1", "12", 
    
    // --- RANG 1 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 2 (Standard) : Droite à Gauche (Places 13-24) ---
    "24", "-1", "23", "-1", "22", "21", "-1", "20", "-1", "19", "-1", "18", "-1", "17", "-1", "16", "15", "-1", "14", "-1", "13", 
    
    // --- RANG 3 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 4 (Standard) : Gauche à Droite (Places 25-36) ---
    "25", "-1", "26", "-1", "27", "28", "-1", "29", "-1", "30", "-1", "31", "-1", "32", "-1", "33", "34", "-1", "35", "-1", "36", 
    
    // --- RANG 5 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 6 (Standard) : Droite à Gauche (Places 37-48) ---
    "48", "-1", "47", "-1", "46", "45", "-1", "44", "-1", "43", "-1", "42", "-1", "41", "-1", "40", "39", "-1", "38", "-1", "37", 
    
    // --- RANG 7 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 8 (Standard) : Gauche à Droite (Places 49-60) ---
    "49", "-1", "50", "-1", "51", "52", "-1", "53", "-1", "54", "-1", "55", "-1", "56", "-1", "57", "58", "-1", "59", "-1", "60", 
    
    // --- RANG 9 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 10 (Standard) : Droite à Gauche (Places 61-72) ---
    "72", "-1", "71", "-1", "70", "69", "-1", "68", "-1", "67", "-1", "66", "-1", "65", "-1", "64", "63", "-1", "62", "-1", "61", 
    
    // --- RANG 11 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 12 (Standard) : Gauche à Droite (Places 73-84) ---
    "73", "-1", "74", "-1", "75", "76", "-1", "77", "-1", "78", "-1", "79", "-1", "80", "-1", "81", "82", "-1", "83", "-1", "84", 
    
    // --- RANG 13 (Standard) : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 14 (LE FOND - PHYSIQUE 4-7-4) : De Droite à Gauche (Places 85-88) ---
    // Bloc de Droite (4 sièges physiques : 1 sur 2)
    "88", "-1", "87", "-1",   
    
    // Bloc du Centre (7 sièges physiques : TOUT VIDE)
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // Bloc de Gauche (4 sièges physiques : 1 sur 2)
    "-1", "86", "-1", "85"
];

const amphiMapParis = [
    // --- RANG 0 (Bas) : Gauche à Droite (Places 1-12) ---
    "1", "-1", "2", "-1", "3", "4", "-1", "5", "-1", "6", "-1", "7", "-1", "8", "-1", "9", "10", "-1", "11", "-1", "12", 
    
    // --- RANG 1 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 2 (Standard) : Droite à Gauche (Places 13-24) ---
    "24", "-1", "23", "-1", "22", "21", "-1", "20", "-1", "19", "-1", "18", "-1", "17", "-1", "16", "15", "-1", "14", "-1", "13", 
    
    // --- RANG 3 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 4 (Standard) : Gauche à Droite (Places 25-36) ---
    "25", "-1", "26", "-1", "27", "28", "-1", "29", "-1", "30", "-1", "31", "-1", "32", "-1", "33", "34", "-1", "35", "-1", "36", 
    
    // --- RANG 5 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 6 (Standard) : Droite à Gauche (Places 37-48) ---
    "48", "-1", "47", "-1", "46", "45", "-1", "44", "-1", "43", "-1", "42", "-1", "41", "-1", "40", "39", "-1", "38", "-1", "37", 
    
    // --- RANG 7 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 8 (Standard) : Gauche à Droite (Places 49-60) ---
    "49", "-1", "50", "-1", "51", "52", "-1", "53", "-1", "54", "-1", "55", "-1", "56", "-1", "57", "58", "-1", "59", "-1", "60", 
    
    // --- RANG 9 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 10 (Standard) : Droite à Gauche (Places 61-72) ---
    "72", "-1", "71", "-1", "70", "69", "-1", "68", "-1", "67", "-1", "66", "-1", "65", "-1", "64", "63", "-1", "62", "-1", "61", 
    
    // --- RANG 11 : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 12 (Standard) : Gauche à Droite (Places 73-84) ---
    "73", "-1", "74", "-1", "75", "76", "-1", "77", "-1", "78", "-1", "79", "-1", "80", "-1", "81", "82", "-1", "83", "-1", "84", 
    
    // --- RANG 13 (Standard) : Vide ---
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "88", "-1", "87", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // --- RANG 14 (LE FOND - PHYSIQUE 4-7-4) : De Droite à Gauche (Places 85-88) ---
    // Bloc de Droite (4 sièges physiques : 1 sur 2)
    "90", "-1", "89", "-1",   
    
    // Bloc du Centre (7 sièges physiques : TOUT VIDE)
    "-1", "-1", "-1", "-1", "-1", "-1", "-1", 
    
    // Bloc de Gauche (4 sièges physiques : 1 sur 2)
    "-1", "86", "-1", "85"
];


function createReverseMap(originalMap) {
    let maxSeat = 0;
    originalMap.forEach(seat => {
        if (seat !== "-1") {
            const num = parseInt(seat, 10);
            if (num > maxSeat) maxSeat = num;
        }
    });

    return originalMap.map(seat => {
        if (seat === "-1") {
            return "-1";
        } else {
            const currentNum = parseInt(seat, 10);
            const newNum = (maxSeat + 1) - currentNum;
            return newNum.toString();
        }
    });
}

const amphiMapReverse = createReverseMap(amphiMap);

const amphiData = {
    "Recoura": amphiMap, 
    "Paris": amphiMapParis, 
    "Bernard": amphiMap,
    "Niepce": amphiMapReverse, 
    "Gevrey": amphiMapReverse
};

function setMotivation() {
    const motivationDiv = document.querySelector('.motivation-text');
    
    if (motivationDiv) {
        const phrases = [
            "Courage, tu vas gérer ! 🚀",
            "Respire un bon coup, ça va bien se passer. 🧘‍♂️",
            "La réussite est au bout du stylo ! ✍️",
            "C'est juste un exam, t'es plus fort que ça. 💪",
            "Une place trouvée = un point en plus (c'est faux mais on y croit) 😉",

            "Sur un malentendu, ça peut passer ! 🍀",
            "Si tu ne sais pas, invente avec conviction. 🧠",
            "L'important c'est de participer... non je rigole, vise le 20 ! 🚀",
            "Tu as trouvé ta place, c'était le plus dur. Le reste c'est bonus. 😎",
            "Le talent, c'est 1% d'inspiration et 99% de stylo qui marche. ✍️",
            "Chat GPT ne ferait pas mieux que toi (promis). 🤖",
            "C'est juste une feuille de papier, elle ne peut pas te manger. 📄",
            "Technique ancestrale : répondre au hasard avec assurance. 🎲",
            
            "Ce sujet a peur de toi. Regarde-le dans les yeux. 👀",
            "T'es pas venu ici pour enfiler des perles. 🔥",
            "Mode 'Génie incompris' activé. 💡",
            "Tu es le boss final de cet examen. 🥊",
            "Une étape de plus vers la liberté (et les vacances). 🏖️",
            "Rien ne t'arrête. Sauf peut-être une panne de réveil. ⏰",
            
            "Respire. T'as bossé, ça va payer. 🤝",
            "Panique pas, t'es plus intelligent que tu ne le crois. 🧘‍♂️",
            "Dans 2 heures, tu es libre. Tiens bon ! 🏁",
            "Fais-toi confiance, t'es une machine. 🦾"
        ];

        // Choisir une phrase au hasard
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        // Mettre à jour le texte
        motivationDiv.innerText = randomPhrase;
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSearch(event) {
    event.preventDefault();

    const header = document.getElementById('header');

    const number = document.getElementById('number-input'); 
    const amphiSelect = document.getElementById('amphi-select').value;

    let seat = null;
    
    
    if (amphiData[amphiSelect]) {
        const physicalIndex = amphiData[amphiSelect].indexOf(number.value.trim());
        
        if (physicalIndex !== -1) {
            seat = document.getElementById(`seat-index-${physicalIndex}`);
        }
    }

    const seats = document.querySelectorAll('.seat');

    seats.forEach(s => s.classList.remove('highlighted'));


    if (seat && number.value.trim() !== "-1") {
        if( navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ){
            await sleep(100);
        }

        seat.classList.add('highlighted');
        if (header) header.classList.remove('centered');
        
        const containerGlobal = document.querySelector('.container-global');
        const amphiContainer = document.querySelector('.amphi-container');
        if (containerGlobal) containerGlobal.style.opacity = "1";
        if (amphiContainer) amphiContainer.classList.add('show-amphi');
        
        setMotivation();

    } else if (number.value.trim() === "" && amphiSelect === "") {
    alert("Bon, t'es perdu toi ? Il faut remplir les deux champs !");
    } else if (amphiSelect === "" && number.value.trim() !== "") {
        alert("Bon écoute, c'est peut-être l'heure de regarder dans quel amphi tu n'es pas attendu !");
    } else {
        alert(`Aïe aïe, c'est mal barré pour l'exam, ce siège n'existe pas !`);
        number.value = '';
    }
}


const inputNumber = document.getElementById('number-input');

inputNumber.addEventListener('focus', function() {
    setTimeout(() => {
        const val = this.value;
        this.value = ''; 
        this.value = val;
    }, 0);
});


inputNumber.addEventListener('click', function() {
    const len = this.value.length;
});


function showLegal(event) {
    event.preventDefault();
    alert(
        "MENTIONS LÉGALES\n\n" +
        "Éditeur : Développé par Antoine Ragot-Raillat.\n" +
        "Non affilié officiellement à l'université.\n\n" +
        "Hébergeur : GitHub Pages (GitHub Inc., USA).\n\n" +
        "Confidentialité : Aucun cookie traceur/publicitaire. Seules les données techniques (IP partiellement masquée, navigateur, heure) sont conservées 6 mois maximum pour la sécurité et la maintenance du site."
    );
}


// Mais dit moi tu est curieux !
// Si tu lis ça, c'est que tu as probablement jeté un œil au code source. J'espère que tu as trouvé ta place dans l'amphi ! N'hésite pas à partager le site avec tes camarades pour les aider à trouver la leur aussi. 🚀