const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let columns, drops;
const binary = "01";
const fontSize = 14; // Subimos ligeramente de 12 a 14 para mejor legibilidad

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = Array(Math.floor(columns)).fill(1);
}

function drawMatrix() {
    // Estela de rastro: un poco más oscura para que el texto resalte más
    ctx.fillStyle = "rgba(2, 2, 2, 0.15)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold " + fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        
        // Solo en la mitad derecha para mantener el diseño limpio
        if ((i * fontSize) > (canvas.width * 0.55)) {
            const rand = Math.random();
            
            // --- COLORES NOTORIOS (Opacidad 0.8 + Glow) ---
            let color;
            if (rand > 0.6) color = "rgba(255, 49, 49, 0.8)";      // Rojo Aether
            else if (rand > 0.3) color = "rgba(191, 0, 255, 0.8)"; // Violeta Aether
            else color = "rgba(0, 229, 255, 0.9)";                 // Celeste Aether (más brillante)

            ctx.fillStyle = color;
            
            // EFECTO NEÓN: Esto es lo que los hará "notorios"
            ctx.shadowBlur = 8;
            ctx.shadowColor = color;
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Limpiamos el brillo para que no ralentice el navegador
            ctx.shadowBlur = 0;
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

window.addEventListener('resize', initMatrix);
initMatrix();
setInterval(drawMatrix, 50); // Un pelín más rápido para dar dinamismo