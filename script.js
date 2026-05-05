const intro = document.getElementById("intro");
const terminalSection = document.getElementById("terminal");
const terminal = document.getElementById("terminalOutput");
const revelationSection = document.getElementById("revelation");
const lessonSection = document.getElementById("lesson");
const startBtn = document.getElementById("startExperience");

let realLocation = null;
let simulationStarted = false;

document.body.classList.add("lock-scroll");


// ==========================
// Buscar localização via IP
// ==========================
async function fetchLocation() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        realLocation = {
            ip: data.ip,
            city: data.city,
            region: data.region,
            country: data.country_name,
            org: data.org
        };
    } catch (error) {
        realLocation = null;
    }
}


// ==========================
// Gerador IP Fake (backup)
// ==========================
function generateFakeIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
}

function rand() {
    return Math.floor(Math.random() * 255);
}


// ==========================
// Efeito Digitação Realista
// ==========================
function typeLine(text) {
    return new Promise(resolve => {

        const line = document.createElement("p");
        terminal.appendChild(line);

        let i = 0;

        function typing() {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 20 + Math.random() * 40);
            } else {
                setTimeout(resolve, 500);
            }
        }

        typing();
    });
}


// ==========================
// Boot Sequence Cinemático
// ==========================
async function startHackSimulation() {

    const detectedIP = realLocation?.ip || generateFakeIP();
    const detectedCity = realLocation
        ? `${realLocation.city}, ${realLocation.region} - ${realLocation.country}`
        : "Localização não identificada";
    const detectedISP = realLocation?.org || "Provedor desconhecido";

    const messages = [
        "Inicializando sistema...",
        "Carregando módulos de rede...",
        "Verificando conexão externa...",
        "Conexão estabelecida.",
        `IP detectado: ${detectedIP}`,
        "Rastreando localização aproximada...",
        `Localização: ${detectedCity}`,
        `Provedor identificado: ${detectedISP}`,
        "Analisando dispositivo...",
        `Navegador: ${navigator.userAgent}`,
        "Buscando vulnerabilidades...",
        "Extraindo metadados...",
        "Transferência concluída."
    ];

    for (let msg of messages) {
        await typeLine(msg);
    }

    setTimeout(showRevelation, 1500);
}


// ==========================
// Revelação
// ==========================
function showRevelation() {

    revelationSection.style.display = "flex";
    lessonSection.style.display = "block";

    document.body.classList.remove("lock-scroll");

    // Vibração (se suportado)
    if (navigator.vibrate) {
        navigator.vibrate([200, 80, 200]);
    }

    // Flash vermelho dramático
    document.body.style.transition = "background 0.3s ease";
    document.body.style.background = "#8b0000";

    setTimeout(() => {
        document.body.style.background = "#000";
        revelationSection.scrollIntoView({ behavior: "smooth" });
    }, 400);
}


// ==========================
// Botão Inicia Tudo
// ==========================
startBtn.addEventListener("click", async () => {

    if (simulationStarted) return;
    simulationStarted = true;

    // Fade elegante
    intro.classList.add("fade-out");

    setTimeout(async () => {

        intro.style.display = "none";
        terminalSection.style.display = "flex";
        terminal.innerHTML = "";

        await fetchLocation();
        await startHackSimulation();

    }, 800);
});


// ==========================
// Partículas Responsivas
// ==========================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particlesArray = [];

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.reset();
            this.y = 0;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0,255,136,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 90; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();