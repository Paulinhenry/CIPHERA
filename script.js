const terminal = document.getElementById("terminalOutput");
const revelationSection = document.getElementById("revelation");

let realLocation = null;

// =============================
// BUSCAR LOCALIZAÇÃO REAL VIA IP
// =============================
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
        // fallback se API falhar
        realLocation = null;
    }
}

// =============================
// GERADOR DE IP FAKE (backup)
// =============================
function generateFakeIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
}

function rand() {
    return Math.floor(Math.random() * 255);
}

// =============================
// EFEITO DE DIGITAÇÃO
// =============================
function typeLine(text, callback) {
    let line = document.createElement("p");
    terminal.appendChild(line);

    let i = 0;
    let interval = setInterval(() => {
        line.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            if (callback) setTimeout(callback, 600);
        }
    }, 35);
}

// =============================
// SEQUÊNCIA PRINCIPAL
// =============================
function startHackSimulation() {

    const detectedIP = realLocation?.ip || generateFakeIP();
    const detectedCity = realLocation
        ? `${realLocation.city}, ${realLocation.region} - ${realLocation.country}`
        : "Localização não identificada";
    const detectedISP = realLocation?.org || "Provedor desconhecido";

    const messages = [
        "Estabelecendo conexão...",
        "Iniciando varredura...",
        "Analisando IP público...",
        `IP detectado: ${detectedIP}`,
        "Rastreando localização aproximada...",
        `Localização: ${detectedCity}`,
        `Provedor identificado: ${detectedISP}`,
        "Detectando sistema operacional...",
        `Navegador detectado: ${navigator.userAgent}`,
        "Buscando vulnerabilidades...",
        "Extraindo dados do navegador...",
        "Sincronizando contatos...",
        "Upload concluído."
    ];

    function next(index = 0) {
        if (index < messages.length) {
            typeLine(messages[index], () => next(index + 1));
        } else {
            setTimeout(showRevelation, 1800);
        }
    }

    next();
}

// =============================
// REVELAÇÃO
// =============================
function showRevelation() {

    // Vibrar celular
    if (navigator.vibrate) {
        navigator.vibrate([300, 100, 300]);
    }

    // Flash vermelho
    document.body.style.backgroundColor = "#8b0000";

    setTimeout(() => {
        document.body.style.backgroundColor = "#000";
        revelationSection.scrollIntoView({ behavior: "smooth" });
    }, 400);
}

// =============================
// INICIAR
// =============================
window.onload = async () => {
    terminal.innerHTML = "";
    await fetchLocation();
    startHackSimulation();
};