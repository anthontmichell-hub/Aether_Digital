// main.js - Motor Central Aether Digital v2.8 (Sincronización Total)

document.addEventListener("DOMContentLoaded", function() {
    // 1. CARGA DE NAVBAR
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (!placeholder) return;
            placeholder.innerHTML = data;
            const navElement = placeholder.querySelector('nav');
            if (navElement) {
                navElement.classList.add('aether-navbar-fixed');
                navElement.style.position = 'fixed';
                navElement.style.top = '0';
                navElement.style.width = '100%';
                navElement.style.zIndex = '999999';
            }
            highlightCurrentPage();
        })
        .catch(err => console.error("Error cargando el Navbar:", err));

    // 2. SISTEMA DE ANIMACIONES
    const observerOptions = { threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .glass-card, .counter').forEach(el => {
        if (!el.classList.contains('counter')) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        }
        scrollObserver.observe(el);
    });
});

// 3. SISTEMA DE CONTACTO Y TERMINAL (Enlace con Render)
// 3. SISTEMA DE CONTACTO Y TERMINAL (Sincronización Aether)
document.addEventListener('submit', function(e) {
    if (e.target.id === 'contactForm') {
        e.preventDefault();
        
        const overlay = document.getElementById('terminal-overlay');
        const terminalBody = document.getElementById('terminal-body');
        
        // Captura de datos usando el ID (ajustado a tu HTML)
        const formData = {
            nombre: document.getElementById('nombre')?.value || "Anónimo",
            email: document.getElementById('email')?.value || "No provisto",
            servicio: document.getElementById('servicio')?.value || "General",
            mensaje: document.getElementById('mensaje')?.value || "Sin mensaje"
        };

        if (overlay && terminalBody) {
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            terminalBody.innerHTML = ''; 

            const lines = [
                { text: "> Iniciando protocolo de enlace...", color: "text-gray-400" },
                { text: `> Usuario: ${formData.nombre} detectado...`, color: "text-[#BF00FF]" },
                { text: "> Bypass de cortafuegos Aether... [OK]", color: "text-[#00E5FF]" },
                { text: "> Sincronizando con Núcleo Render...", color: "text-gray-400" }
            ];

            let i = 0;
            const printLine = () => {
                if (i < lines.length) {
                    const p = document.createElement('p');
                    p.className = lines[i].color + " reveal";
                    p.innerText = lines[i].text;
                    terminalBody.appendChild(p);
                    i++;
                    setTimeout(printLine, 600);
                } else {
                    // --- REEMPLAZO MEJORADO ---
                    fetch('https://aether-digital.onrender.com/enlace', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        const ok = document.createElement('p');
                        ok.className = "text-[#4ADE80] font-bold mt-2 reveal"; 
                        ok.innerText = "> ENLACE ESTABLECIDO: Transmisión Exitosa";
                        terminalBody.appendChild(ok);
                        
                        const msg = document.createElement('p');
                        msg.className = "text-white/70 text-[10px] mt-1";
                        msg.innerText = "Respuesta: Protocolo Anthony archivado.";
                        terminalBody.appendChild(msg);

                        // Esperamos 5 segundos para que veas el éxito, luego limpiamos
                        setTimeout(() => { 
                            overlay.classList.add('hidden'); 
                            e.target.reset();
                            // Quitamos el location.reload() para que el terminal no parpadee
                        }, 5000);
                    })
                    .catch(() => {
                        const err = document.createElement('p');
                        err.className = "text-red-500 font-bold mt-2 reveal";
                        err.innerText = "> ERROR: Fallo de enlace crítico.";
                        terminalBody.appendChild(err);
                        setTimeout(() => { overlay.classList.add('hidden'); }, 4000);
                    });
                }
            };
            printLine();
        }
    }
});

// --- FUNCIONES DE SOPORTE ---
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('#navbar-placeholder a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-[#00E5FF]', 'font-bold');
        }
    });
}

function startCounter(counter) {
    if (counter.dataset.started === "true") return;
    counter.dataset.started = "true";
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const updateCount = () => {
        const inc = target / 50;
        if (count < target) {
            count += inc;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target + (target === 99 ? '%' : '+');
        }
    };
    updateCount();
}