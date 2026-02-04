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

let globalSeatIndex = 0; // On compte les sièges de 0 à 294

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


function generateSequentialArray(length) {
    return Array.from({length: length}, (_, i) => (i + 1).toString());
}

const amphiData = {
    "Paris": generateSequentialArray(290), 
    "Recoura": generateSequentialArray(290), 
    "Niepce": generateSequentialArray(290), 
    "Bernard": generateSequentialArray(290),
    "Gevrey": generateSequentialArray(290)
};

function setMotivation() {
    // C'est ici que ça bloquait : on utilise querySelector pour une classe
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

    const motivation = document.getElementById('motivation-text');

    let seat = null;
    
    
    if (amphiData[amphiSelect]) {
        const physicalIndex = amphiData[amphiSelect].indexOf(number.value.trim());
        
        if (physicalIndex !== -1) {
            seat = document.getElementById(`seat-index-${physicalIndex}`);
        }
    }

    const seats = document.querySelectorAll('.seat');

    seats.forEach(s => s.classList.remove('highlighted'));


    if (seat) {
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
        
        console.log("Animation lancée !");
        
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
    // this.setSelectionRange(len, len);
});


function showLegal(event) {
    event.preventDefault();
    alert(
        "MENTIONS LÉGALES\n\n" +
        "Éditeur : Développé par Antoine Ragot-Raillat.\n" +
        "Non affilié officiellement à l'université.\n\n" +
        "Hébergeur : GitHub Pages (GitHub Inc., USA).\n\n" +
        "Confidentialité : Ce site ne collecte AUCUNE donnée. " +
        "Tout se passe sur votre téléphone. Aucun cookie publicitaire."
    );
}