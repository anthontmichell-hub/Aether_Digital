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
document.addEventListener('submit', function(e) {
    // Buscamos el formulario por el ID que tienes en tu HTML
    if (e.target.id === 'contactForm') {
        e.preventDefault();
        
        const formData = {
            nombre: e.target.querySelector('[name="nombre"]')?.value || "No provisto",
            email: e.target.querySelector('[name="email"]')?.value || "No provisto",
            mensaje: e.target.querySelector('[name="mensaje"]')?.value || "Sin mensaje"
        };

        // Buscamos el texto del terminal para cambiarlo
        const terminalStatus = document.getElementById('terminal-status') || document.querySelector('.text-yellow-500');
        
        if (terminalStatus) {
            terminalStatus.style.color = "#00E5FF"; // Color Cian
            terminalStatus.innerText = "> Conectando con Núcleo Render... [WAIT]";
        }

        fetch('https://aether-digital.onrender.com/enlace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (terminalStatus) {
                terminalStatus.style.color = "#4ADE80"; // Color Verde
                terminalStatus.innerText = "> Python Online. Transmisión Exitosa. [OK]";
            }
            alert("🚀 Protocolo Aether completado: Mensaje enviado.");
            e.target.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            if (terminalStatus) {
                terminalStatus.style.color = "#FACC15"; // Amarillo
                terminalStatus.innerText = "> ERROR: Fallo de enlace crítico.";
            }
            alert("❌ Error de conexión con el servidor.");
        });
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