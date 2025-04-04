document.addEventListener('DOMContentLoaded', function () {
    // Configuration object for easy settings management
    const config = {
        particles: {
            count: 800,
            densityFactor: 1000,   // Lower means more particles
            maxSize: 4,
            minSize: 1,
            speed: {
                min: -0.15,
                max: 0.15
            },
            lifespan: {
                min: 200,
                max: 400
            },
            shapes: 5,  // Number of different shapes
            connections: {
                enabled: false,
                maxDistance: 100,
                lineWidth: 0.5
            }
        },
        colors: {
            light: {
                base: 'rgba(73, 80, 87, ',
                opacity: {
                    min: 0.1, 
                    max: 0.2
                }
            },
            dark: {
                hueRange: 360,
                saturation: '70%',
                lightness: '60%',
                opacity: {
                    min: 0.2,
                    max: 0.5
                }
            }
        }
    };
    
    // Canvas setup
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Initialize the canvas
    function initCanvas() {
        resizeCanvas();
        createParticles();
        animate();
        setupEventListeners();
    }
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Create the particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(
            Math.floor((canvas.width * canvas.height) / config.particles.densityFactor), 
            config.particles.count
        );
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        window.addEventListener('resize', handleResize);
        document.querySelector('.theme-toggle').addEventListener('click', handleThemeChange);
    }
    
    // Resize event handler
    function handleResize() {
        resizeCanvas();
        createParticles();
    }
    
    // Theme change handler
    function handleThemeChange() {
        setTimeout(() => {
            particles.forEach(particle => {
                particle.updateColor();
            });
        }, 100);
    }
    
    // Get current theme
    function isLightTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light';
    }
    
    // Generate a random color based on theme
    function getRandomColor() {
        if (isLightTheme()) {
            const opacity = Math.random() * 
                (config.colors.light.opacity.max - config.colors.light.opacity.min) + 
                config.colors.light.opacity.min;
            return `${config.colors.light.base}${opacity})`;
        } else {
            const hue = Math.random() * config.colors.dark.hueRange;
            const opacity = Math.random() * 
                (config.colors.dark.opacity.max - config.colors.dark.opacity.min) + 
                config.colors.dark.opacity.min;
            return `hsla(${hue}, ${config.colors.dark.saturation}, ${config.colors.dark.lightness}, ${opacity})`;
        }
    }
    
    // Particle class
    class Particle {
        constructor() {
            this.init();
        }
        
        init() {
            // Position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Size
            this.size = Math.random() * config.particles.maxSize + config.particles.minSize;
            
            // Velocity
            const speed = config.particles.speed;
            this.speedX = Math.random() * (speed.max - speed.min) + speed.min;
            this.speedY = Math.random() * (speed.max - speed.min) + speed.min;
            
            // Shape
            this.shapeType = Math.floor(Math.random() * config.particles.shapes);
            
            // Color
            this.updateColor();
            
            // Lifespan
            const lifespan = config.particles.lifespan;
            this.lifespan = Math.random() * (lifespan.max - lifespan.min) + lifespan.min;
            this.life = 0;
        }
        
        updateColor() {
            this.color = getRandomColor();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life++;
            
            if (this.isOffScreen() || this.life >= this.lifespan) {
                this.init();
            }
        }
        
        isOffScreen() {
            return this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            this.drawShape();
        }
        
        drawShape() {
            switch (this.shapeType) {
                case 0: // Circle
                    this.drawCircle();
                    break;
                case 1: // Square
                    this.drawSquare();
                    break;
                case 2: // Triangle
                    this.drawTriangle();
                    break;
                case 3: // Diamond
                    this.drawDiamond();
                    break;
                case 4: // Plus
                    this.drawPlus();
                    break;
            }
        }
        
        drawCircle() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        drawSquare() {
            ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        }
        
        drawTriangle() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x - this.size, this.y + this.size);
            ctx.lineTo(this.x + this.size, this.y + this.size);
            ctx.closePath();
            ctx.fill();
        }
        
        drawDiamond() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.size);
            ctx.lineTo(this.x + this.size, this.y);
            ctx.lineTo(this.x, this.y + this.size);
            ctx.lineTo(this.x - this.size, this.y);
            ctx.closePath();
            ctx.fill();
        }
        
        drawPlus() {
            ctx.beginPath();
            ctx.fillRect(this.x - this.size/2, this.y - this.size*1.5, this.size, this.size*3);
            ctx.fillRect(this.x - this.size*1.5, this.y - this.size/2, this.size*3, this.size);
        }
    }
    
    // Animation functions
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateAndDrawParticles();
        
        if (config.particles.connections.enabled) {
            connectParticles();
        }
        
        requestAnimationFrame(animate);
    }
    
    function updateAndDrawParticles() {
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }
    
    function connectParticles() {
        const maxDistance = config.particles.connections.maxDistance;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = config.particles.connections.lineWidth;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Initialize the canvas
    initCanvas();
});