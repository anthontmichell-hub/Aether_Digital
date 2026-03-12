// main.js - Motor Central Aether Digital v2.6 (Final Fix)

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. CARGA DE NAVBAR ÚNICA Y REFORZADA
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (!placeholder) return;
            
            placeholder.innerHTML = data;
            
            // Forzamos al primer hijo (el <nav>) a ser fijo y estar arriba
            const navElement = placeholder.querySelector('nav');
            if (navElement) {
                // Refuerzo total: Clase CSS + Estilo directo por si acaso
                navElement.classList.add('aether-navbar-fixed');
                navElement.style.position = 'fixed';
                navElement.style.top = '0';
                navElement.style.width = '100%';
                navElement.style.zIndex = '999999';
            }

            highlightCurrentPage();
            // Si usas Lottie, esto lo inicializa
            if (typeof lottie !== 'undefined') initAetherLogo(); 
        })
        .catch(err => console.error("Error cargando el Navbar:", err));

    // 2. SISTEMA DE ANIMACIONES (Intersection Observer)
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

    // Aplicar solo a elementos que NO sean el navbar
    document.querySelectorAll('section, .glass-card, .counter').forEach(el => {
        if (!el.classList.contains('counter')) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        }
        scrollObserver.observe(el);
    });
});

// --- FUNCIONES DE SOPORTE ---

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('#navbar-placeholder a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-[#00E5FF]', 'font-bold');
            link.classList.remove('text-gray-400');
            link.style.filter = "drop-shadow(0 0 8px rgba(0, 229, 255, 0.5))";
        }
    });
}

function startCounter(counter) {
    if (counter.dataset.started === "true") return;
    counter.dataset.started = "true";
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const updateCount = () => {
        const inc = target / 50; // Velocidad del contador
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