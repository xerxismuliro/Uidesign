

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            // Random position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            // Random size
            this.size = Math.random() * 4 + 1;

            // // Random velocity
            // this.speedX = Math.random() * 2 - 1;
            // this.speedY = Math.random() * 2 - 1;

            // Very slow movement for particles
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.2 - 0.1;

            // Random shape type (0: circle, 1: square, 2: triangle, 3: diamond, 4: plus)
            this.shapeType = Math.floor(Math.random() * 5);

            // Random color based on theme
            const html = document.documentElement;
            const isLightTheme = html.getAttribute('data-theme') === 'light';

            if (isLightTheme) {
                this.color = `rgba(73, 80, 87, ${Math.random() * 0.2 + 0.1})`;
            } else {
                // More vibrant color range for dark mode
                const hue = Math.random() * 360; // Full color spectrum
                this.color = `hsla(${hue}, 70%, 60%, ${Math.random() * 0.3 + 0.2})`;
            }

            // Random lifespan
            this.lifeSpan = Math.random() * 200 + 200;
            this.life = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;

            // Reset particle if it goes off screen or exceeds lifespan
            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height ||
                this.life >= this.lifeSpan) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = this.color;

            switch (this.shapeType) {
                case 0: // Circle
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 1: // Square
                    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                    break;

                case 2: // Triangle
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 3: // Diamond
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x + this.size, this.y);
                    ctx.lineTo(this.x, this.y + this.size);
                    ctx.lineTo(this.x - this.size, this.y);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 4: // Plus sign
                    ctx.beginPath();
                    ctx.fillRect(this.x - this.size/2, this.y - this.size*1.5, this.size, this.size*3);
                    ctx.fillRect(this.x - this.size*1.5, this.y - this.size/2, this.size*3, this.size);
                    break;
            }
        }
    }

    // Create particles - significantly increased density
    const particles = [];
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 1000), 800);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Update and draw particles
    function animate() {
        // Clear canvas with semi-transparent background to create trails
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw each particle
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Optional: Add connection lines between nearby particles
    function connectParticles() {
        const maxDistance = 100;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Calculate opacity based on distance
                    const opacity = 1 - (distance / maxDistance);
                    
                    // Get average color of the two particles
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 0.5;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Modified animate function to include connections
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Uncomment the next line if you want to enable connection lines
        // connectParticles();
        
        requestAnimationFrame(animate);
    }

    animate();

    // Update particle colors when theme changes
    document.querySelector('.theme-toggle').addEventListener('click', function () {
        setTimeout(() => {
            particles.forEach(particle => {
                const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
                if (isLightTheme) {
                    particle.color = `rgba(73, 80, 87, ${Math.random() * 0.2 + 0.1})`;
                } else {
                    // More vibrant colors for dark mode
                    const hue = Math.random() * 360; // Full color spectrum
                    particle.color = `hsla(${hue}, 70%, 60%, ${Math.random() * 0.3 + 0.2})`;
                }
            });
        }, 100);
    });
});
