let objects = []; // Array to store placed objects and dots

function setup() {
    createCanvas(windowWidth, windowHeight);
    populateCanvas();
    frameRate(30); // Set the frame rate for smoother animation
}

function draw() {
    background(0); // Black background
    stroke('wheat'); // Wheat color for outlines
    noFill(); // No fill for shapes

    // Define the army green color
    let greenColor = color('rgb(0, 100, 0)'); // Army green 75 83 32

    // Draw all objects and dots
    for (let obj of objects) {
        if (obj.type === 'dot') {
            noStroke(); // Dots have no outline
            fill(greenColor); // Apply green color
            ellipse(obj.x, obj.y, obj.size, obj.size); // Draw dot

            // Update position for animation
            obj.x += obj.vx;
            obj.y += obj.vy;

            // Bounce off edges
            if (obj.x < obj.size / 2 || obj.x > width - obj.size / 2) {
                obj.vx *= -1;
            }
            if (obj.y < obj.size / 2 || obj.y > height - obj.size / 2) {
                obj.vy *= -1;
            }
        } else {
            obj.draw(); // Draw other objects
        }
    }
}

function populateCanvas() {
    let maxAttempts = 1000; // Maximum attempts to place an object
    let minSize = 30; // Minimum size of an object
    let maxSize = 100; // Maximum size of an object

    // Place objects
    while (maxAttempts > 0) {
        let size = random(minSize, maxSize);
        let x = random(size, width - size);
        let y = random(size, height - size);

        let newObj = {
            x: x,
            y: y,
            size: size,
            type: int(random(20)), // Randomly select a shape type
            draw: function () {
                // Draw the object based on its type
                if (this.type === 0) drawCat(this.x, this.y, this.size);
                else if (this.type === 1) drawCar(this.x, this.y, this.size);
                else if (this.type === 2) drawTree(this.x, this.y, this.size);
                else if (this.type === 3) drawHouse(this.x, this.y, this.size);
                else if (this.type === 4) drawCloud(this.x, this.y, this.size);
                else if (this.type === 5) drawFlower(this.x, this.y, this.size);
                else if (this.type === 6) drawBook(this.x, this.y, this.size);
                else if (this.type === 7) drawWatch(this.x, this.y, this.size);
                else if (this.type === 8) drawLaptop(this.x, this.y, this.size);
                else if (this.type === 9) drawLightbulb(this.x, this.y, this.size);
                else if (this.type === 10) drawGlobe(this.x, this.y, this.size);
                else if (this.type === 11) drawAfrica(this.x, this.y, this.size);
                else if (this.type === 12) drawSun(this.x, this.y, this.size);
                else if (this.type === 13) drawMoon(this.x, this.y, this.size);
                else if (this.type === 14) drawStar(this.x, this.y, this.size);
                else if (this.type === 15) drawHeart(this.x, this.y, this.size);
                else if (this.type === 16) drawFish(this.x, this.y, this.size);
                else if (this.type === 17) drawButterfly(this.x, this.y, this.size);
                else if (this.type === 18) drawIceCream(this.x, this.y, this.size);
                else if (this.type === 19) drawHat(this.x, this.y, this.size);
                else if (this.type === 20) drawMountain(this.x, this.y, this.size);
                else drawBridge(this.x, this.y, this.size);
            }
        };

        // Check if the new object overlaps with any existing object
        let canPlace = true;
        for (let obj of objects) {
            if (dist(newObj.x, newObj.y, obj.x, obj.y) < (newObj.size / 2 + obj.size / 2)) {
                canPlace = false;
                break;
            }
        }

        // If no overlap, add the object to the array
        if (canPlace) {
            objects.push(newObj);
        }

        maxAttempts--;
    }

    // Place dots
    let dotAttempts = 5000; // Maximum attempts to place dots
    let dotMinSize = 2; // Minimum size of a dot
    let dotMaxSize = 8; // Maximum size of a dot

    while (dotAttempts > 0) {
        let size = random(dotMinSize, dotMaxSize);
        let x = random(size, width - size);
        let y = random(size, height - size);

        let newDot = {
            x: x,
            y: y,
            size: size,
            type: 'dot', // Mark this as a dot
            vx: random(-0.22, 0.22), // Random horizontal velocity also controls dot speed
            vy: random(-0.2, 0.22)  // Random vertical velocity also controls dot speed
        };

        // Check if the new dot overlaps with any existing object or dot
        let canPlace = true;
        for (let obj of objects) {
            if (dist(newDot.x, newDot.y, obj.x, obj.y) < (newDot.size / 2 + obj.size / 2)) {
                canPlace = false;
                break;
            }
        }

        // If no overlap, add the dot to the array
        if (canPlace) {
            objects.push(newDot);
        }

        dotAttempts--;
    }
}


function drawCat(x, y, s) {
    // Body
    beginShape();
    vertex(x - s * 0.3, y + s * 0.2);
    bezierVertex(x - s * 0.5, y - s * 0.1, x - s * 0.2, y - s * 0.4, x, y);
    bezierVertex(x + s * 0.2, y + s * 0.5, x + s * 0.8, y + s * 0.5, x + s * 0.9, y + s * 0.2);
    bezierVertex(x + s * 0.7, y + s * 0.6, x + s * 0.3, y + s * 0.6, x - s * 0.3, y + s * 0.2);
    endShape(CLOSE);

    // Tail
    beginShape();
    vertex(x - s * 0.3, y + s * 0.2);
    bezierVertex(x - s * 0.6, y + s * 0.1, x - s * 0.7, y - s * 0.2, x - s * 0.5, y - s * 0.4);
    endShape();

    // Head
    beginShape();
    vertex(x + s * 0.1, y - s * 0.1);
    bezierVertex(x + s * 0.2, y - s * 0.3, x + s * 0.4, y - s * 0.4, x + s * 0.6, y - s * 0.3);
    bezierVertex(x + s * 0.7, y - s * 0.2, x + s * 0.6, y, x + s * 0.4, y + s * 0.1);
    bezierVertex(x + s * 0.2, y + s * 0.1, x + s * 0.1, y - s * 0.1, x + s * 0.1, y - s * 0.1);
    endShape(CLOSE);

    // Ears
    triangle(x + s * 0.3, y - s * 0.4, x + s * 0.4, y - s * 0.6, x + s * 0.5, y - s * 0.4);
    triangle(x + s * 0.5, y - s * 0.4, x + s * 0.6, y - s * 0.6, x + s * 0.7, y - s * 0.4);

    // Eyes
    ellipse(x + s * 0.35, y - s * 0.2, s * 0.08, s * 0.12);
    ellipse(x + s * 0.55, y - s * 0.2, s * 0.08, s * 0.12);

    // Nose
    triangle(x + s * 0.42, y - s * 0.1, x + s * 0.48, y - s * 0.1, x + s * 0.45, y - s * 0.05);

    // Mouth
    line(x + s * 0.45, y - s * 0.05, x + s * 0.45, y);
    bezier(x + s * 0.45, y, x + s * 0.4, y + s * 0.05, x + s * 0.5, y + s * 0.05, x + s * 0.55, y);
}

function drawCar(x, y, s) {
    // Body
    beginShape();
    vertex(x, y);
    vertex(x + s * 0.8, y);
    vertex(x + s * 0.8, y - s * 0.3);
    vertex(x + s * 0.7, y - s * 0.5);
    vertex(x + s * 0.1, y - s * 0.5);
    vertex(x, y - s * 0.3);
    vertex(x, y);
    endShape(CLOSE);

    // Windows
    beginShape();
    vertex(x + s * 0.1, y - s * 0.3);
    vertex(x + s * 0.2, y - s * 0.4);
    vertex(x + s * 0.6, y - s * 0.4);
    vertex(x + s * 0.7, y - s * 0.3);
    endShape(CLOSE);

    // Wheels
    ellipse(x + s * 0.2, y, s * 0.2, s * 0.2);
    ellipse(x + s * 0.6, y, s * 0.2, s * 0.2);
}

function drawTree(x, y, s) {
    // Leaves
    beginShape();
    vertex(x, y - s * 0.8);
    bezierVertex(x - s * 0.3, y - s * 0.6, x - s * 0.3, y - s * 0.2, x, y - s * 0.1);
    bezierVertex(x + s * 0.3, y - s * 0.2, x + s * 0.3, y - s * 0.6, x, y - s * 0.8);
    endShape(CLOSE);

    // Trunk
    rect(x - s * 0.05, y - s * 0.1, s * 0.1, s * 0.3);
}

function drawHouse(x, y, s) {
    // Base
    rect(x - s * 0.3, y - s * 0.4, s * 0.6, s * 0.4);

    // Roof
    triangle(x - s * 0.3, y - s * 0.4, x + s * 0.3, y - s * 0.4, x, y - s * 0.7);

    // Door
    rect(x - s * 0.1, y - s * 0.2, s * 0.2, s * 0.2);

    // Window
    rect(x + s * 0.05, y - s * 0.3, s * 0.15, s * 0.15);
}

function drawCloud(x, y, s) {
    // Cloud shape
    ellipse(x, y, s * 0.8, s * 0.5);
    ellipse(x + s * 0.4, y, s * 0.6, s * 0.4);
    ellipse(x - s * 0.4, y, s * 0.6, s * 0.4);
}

function drawFlower(x, y, s) {
    // Stem
    rect(x - s * 0.02, y - s * 0.2, s * 0.04, s * 0.4);

    // Petals
    ellipse(x, y - s * 0.3, s * 0.2, s * 0.2);
    ellipse(x + s * 0.15, y - s * 0.25, s * 0.2, s * 0.2);
    ellipse(x - s * 0.15, y - s * 0.25, s * 0.2, s * 0.2);
    ellipse(x + s * 0.1, y - s * 0.35, s * 0.2, s * 0.2);
    ellipse(x - s * 0.1, y - s * 0.35, s * 0.2, s * 0.2);

    // Center
    fill(255, 200, 0);
    ellipse(x, y - s * 0.3, s * 0.1, s * 0.1);
    noFill();
}

function drawBook(x, y, s) {
    // Cover
    rect(x - s * 0.2, y - s * 0.3, s * 0.4, s * 0.6);

    // Spine
    rect(x - s * 0.2, y - s * 0.3, s * 0.05, s * 0.6);

    // Pages
    line(x - s * 0.15, y - s * 0.3, x - s * 0.15, y + s * 0.3);
    line(x + s * 0.15, y - s * 0.3, x + s * 0.15, y + s * 0.3);
}

function drawWatch(x, y, s) {
    // Face
    ellipse(x, y, s * 0.8, s * 0.8);

    // Hands
    line(x, y, x + s * 0.2, y - s * 0.2); // Hour hand
    line(x, y, x + s * 0.3, y + s * 0.1); // Minute hand
}

function drawLaptop(x, y, s) {
    // Screen
    rect(x - s * 0.3, y - s * 0.2, s * 0.6, s * 0.4);

    // Keyboard
    rect(x - s * 0.25, y + s * 0.25, s * 0.5, s * 0.1);
}

function drawLightbulb(x, y, s) {
    // Bulb
    ellipse(x, y - s * 0.2, s * 0.4, s * 0.6);

    // Base
    rect(x - s * 0.1, y + s * 0.1, s * 0.2, s * 0.1);
}

function drawGlobe(x, y, s) {
    // Sphere
    ellipse(x, y, s * 0.8, s * 0.8);

    // Stand
    rect(x - s * 0.05, y + s * 0.4, s * 0.1, s * 0.2);
}

function drawAfrica(x, y, s) {
    // Simplified outline of Africa
    beginShape();
    vertex(x - s * 0.3, y + s * 0.4);
    vertex(x - s * 0.2, y - s * 0.3);
    vertex(x + s * 0.2, y - s * 0.4);
    vertex(x + s * 0.3, y + s * 0.2);
    vertex(x, y + s * 0.5);
    endShape(CLOSE);
}

function drawCamera(x, y, s) {
    // Body
    rect(x - s * 0.2, y - s * 0.15, s * 0.4, s * 0.3);

    // Lens
    ellipse(x, y, s * 0.3, s * 0.3);

    // Flash
    rect(x + s * 0.1, y - s * 0.2, s * 0.1, s * 0.1);
}

function drawRocket(x, y, s) {
    // Body
    rect(x - s * 0.05, y - s * 0.4, s * 0.1, s * 0.8);

    // Nose
    triangle(x - s * 0.1, y - s * 0.4, x + s * 0.1, y - s * 0.4, x, y - s * 0.6);

    // Fins
    triangle(x - s * 0.1, y + s * 0.4, x - s * 0.2, y + s * 0.2, x - s * 0.05, y + s * 0.2);
    triangle(x + s * 0.1, y + s * 0.4, x + s * 0.2, y + s * 0.2, x + s * 0.05, y + s * 0.2);

    // Flame
    triangle(x - s * 0.05, y + s * 0.4, x + s * 0.05, y + s * 0.4, x, y + s * 0.6);
}

function drawUmbrella(x, y, s) {
    // Canopy
    arc(x, y - s * 0.2, s * 0.6, s * 0.6, PI, TWO_PI);

    // Handle
    line(x, y, x, y + s * 0.4);
}

function drawCup(x, y, s) {
    // Body
    rect(x - s * 0.15, y - s * 0.2, s * 0.3, s * 0.4);

    // Handle
    arc(x + s * 0.2, y, s * 0.1, s * 0.2, HALF_PI, PI + HALF_PI);
}

function drawBicycle(x, y, s) {
    // Wheels
    ellipse(x - s * 0.2, y, s * 0.3, s * 0.3);
    ellipse(x + s * 0.2, y, s * 0.3, s * 0.3);

    // Frame
    line(x - s * 0.2, y, x + s * 0.2, y);
    line(x, y - s * 0.3, x + s * 0.2, y);
    line(x, y - s * 0.3, x - s * 0.2, y);
}

function drawClock(x, y, s) {
    // Face
    ellipse(x, y, s * 0.6, s * 0.6);

    // Hands
    line(x, y, x + s * 0.1, y - s * 0.2); // Hour hand
    line(x, y, x + s * 0.2, y + s * 0.1); // Minute hand
}

function drawPencil(x, y, s) {
    // Body
    rect(x - s * 0.05, y - s * 0.3, s * 0.1, s * 0.6);

    // Tip
    triangle(x - s * 0.05, y - s * 0.3, x + s * 0.05, y - s * 0.3, x, y - s * 0.5);
}

function drawBalloon(x, y, s) {
    // Balloon
    ellipse(x, y - s * 0.3, s * 0.4, s * 0.6);

    // String
    line(x, y, x, y + s * 0.4);
}

function drawSun(x, y, s) {
    // Sun center
    ellipse(x, y, s * 0.5, s * 0.5);

    // Sun rays
    for (let i = 0; i < 8; i++) {
        let angle = TWO_PI / 8 * i;
        let x1 = x + cos(angle) * s * 0.3;
        let y1 = y + sin(angle) * s * 0.3;
        let x2 = x + cos(angle) * s * 0.6;
        let y2 = y + sin(angle) * s * 0.6;
        line(x1, y1, x2, y2);
    }
}

function drawMoon(x, y, s) {
    // Moon
    arc(x, y, s * 0.6, s * 0.6, -HALF_PI, HALF_PI);
    arc(x + s * 0.1, y, s * 0.6, s * 0.6, HALF_PI, -HALF_PI);
}

function drawStar(x, y, s) {
    // Star
    beginShape();
    vertex(x, y - s * 0.4);
    vertex(x + s * 0.1, y - s * 0.1);
    vertex(x + s * 0.4, y - s * 0.1);
    vertex(x + s * 0.15, y + s * 0.1);
    vertex(x + s * 0.25, y + s * 0.4);
    vertex(x, y + s * 0.2);
    vertex(x - s * 0.25, y + s * 0.4);
    vertex(x - s * 0.15, y + s * 0.1);
    vertex(x - s * 0.4, y - s * 0.1);
    vertex(x - s * 0.1, y - s * 0.1);
    endShape(CLOSE);
}

function drawHeart(x, y, s) {
    // Heart
    beginShape();
    vertex(x, y - s * 0.3);
    bezierVertex(x - s * 0.3, y - s * 0.6, x - s * 0.6, y - s * 0.2, x, y + s * 0.3);
    bezierVertex(x + s * 0.6, y - s * 0.2, x + s * 0.3, y - s * 0.6, x, y - s * 0.3);
    endShape(CLOSE);
}

function drawFish(x, y, s) {
    // Body
    ellipse(x, y, s * 0.6, s * 0.3);

    // Tail
    triangle(x + s * 0.3, y, x + s * 0.5, y - s * 0.2, x + s * 0.5, y + s * 0.2);

    // Eye
    ellipse(x - s * 0.2, y - s * 0.1, s * 0.05, s * 0.05);
}

function drawButterfly(x, y, s) {
    // Body
    ellipse(x, y, s * 0.1, s * 0.3);

    // Wings
    beginShape();
    vertex(x - s * 0.2, y - s * 0.1);
    bezierVertex(x - s * 0.4, y - s * 0.2, x - s * 0.4, y + s * 0.1, x - s * 0.2, y + s * 0.2);
    endShape();

    beginShape();
    vertex(x + s * 0.2, y - s * 0.1);
    bezierVertex(x + s * 0.4, y - s * 0.2, x + s * 0.4, y + s * 0.1, x + s * 0.2, y + s * 0.2);
    endShape();
}

function drawIceCream(x, y, s) {
    // Cone
    triangle(x - s * 0.2, y + s * 0.2, x + s * 0.2, y + s * 0.2, x, y + s * 0.6);

    // Scoop
    ellipse(x, y, s * 0.4, s * 0.4);
}

function drawHat(x, y, s) {
    // Brim
    ellipse(x, y + s * 0.1, s * 0.6, s * 0.1);

    // Top
    arc(x, y - s * 0.1, s * 0.4, s * 0.4, PI, TWO_PI);
}

function drawMountain(x, y, s) {
    // Mountain
    triangle(x - s * 0.4, y + s * 0.2, x + s * 0.4, y + s * 0.2, x, y - s * 0.4);
}

function drawBridge(x, y, s) {
    // Base
    rect(x - s * 0.3, y - s * 0.1, s * 0.6, s * 0.2);

    // Arches
    arc(x - s * 0.2, y - s * 0.1, s * 0.2, s * 0.2, 0, PI);
    arc(x + s * 0.2, y - s * 0.1, s * 0.2, s * 0.2, 0, PI);
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    objects = []; // Clear existing objects and dots
    populateCanvas(); // Repopulate the canvas
    redraw();
}
