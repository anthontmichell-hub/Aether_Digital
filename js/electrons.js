(function() {
    const canvas = document.getElementById('canvas-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        // Aumentamos a 200 para que se vea poblado pero sutil
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                // ULTRA PEQUEÑAS: Máximo 1 píxel para nitidez extrema
                size: Math.random() * 0.8 + 0.2, 
                opacity: Math.random() * 0.6 + 0.2,
                // Movimiento autónomo casi imperceptible
                vx: (Math.random() - 0.5) * 0.1, 
                vy: (Math.random() - 0.5) * 0.1,
                parallaxSpeed: Math.random() * 0.3 + 0.05
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scrollY = window.scrollY;

        stars.forEach(star => {
            // 1. Movimiento autónomo (deriva lenta)
            star.x += star.vx;
            star.y += star.vy;

            // 2. Aplicamos el scroll (Parallax)
            let currentY = star.y - (scrollY * star.parallaxSpeed);

            // 3. Sistema de "valla infinita" para que no desaparezcan
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            
            // Reajuste circular para el eje Y considerando el scroll
            currentY = ((currentY % canvas.height) + canvas.height) % canvas.height;

            ctx.beginPath();
            // Color Cyan Aether con opacidad variable
            ctx.fillStyle = `rgba(0, 229, 255, ${star.opacity})`;
            ctx.arc(star.x, currentY, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();
})();