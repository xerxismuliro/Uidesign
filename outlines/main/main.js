/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */



let objects = []; function setup() {
  createCanvas(windowWidth, windowHeight);
  populateCanvas();
  frameRate(30);
} function draw() {
  background(0);
  stroke('wheat');
  noFill();


  let greenColor = color('rgb(0, 100, 0)');


  for (let obj of objects) {
    if (obj.type === 'dot') {
      noStroke();
      fill(greenColor);
      ellipse(obj.x, obj.y, obj.size, obj.size);


      obj.x += obj.vx;
      obj.y += obj.vy;


      if (obj.x < obj.size / 2 || obj.x > width - obj.size / 2) {
        obj.vx *= -1;
      }
      if (obj.y < obj.size / 2 || obj.y > height - obj.size / 2) {
        obj.vy *= -1;
      }
    } else {
      obj.draw();
    }
  }
} function populateCanvas() {
  let maxAttempts = 1000;
  let minSize = 30;
  let maxSize = 100;


  while (maxAttempts > 0) {
    let size = random(minSize, maxSize);
    let x = random(size, width - size);
    let y = random(size, height - size);

    let newObj = {
      x: x,
      y: y,
      size: size,
      type: int(random(20)),
      draw: function () {

        if (this.type === 0) drawCat(this.x, this.y, this.size);else
        if (this.type === 1) drawCar(this.x, this.y, this.size);else
        if (this.type === 2) drawTree(this.x, this.y, this.size);else
        if (this.type === 3) drawHouse(this.x, this.y, this.size);else
        if (this.type === 4) drawCloud(this.x, this.y, this.size);else
        if (this.type === 5) drawFlower(this.x, this.y, this.size);else
        if (this.type === 6) drawBook(this.x, this.y, this.size);else
        if (this.type === 7) drawWatch(this.x, this.y, this.size);else
        if (this.type === 8) drawLaptop(this.x, this.y, this.size);else
        if (this.type === 9) drawLightbulb(this.x, this.y, this.size);else
        if (this.type === 10) drawGlobe(this.x, this.y, this.size);else
        if (this.type === 11) drawAfrica(this.x, this.y, this.size);else
        if (this.type === 12) drawSun(this.x, this.y, this.size);else
        if (this.type === 13) drawMoon(this.x, this.y, this.size);else
        if (this.type === 14) drawStar(this.x, this.y, this.size);else
        if (this.type === 15) drawHeart(this.x, this.y, this.size);else
        if (this.type === 16) drawFish(this.x, this.y, this.size);else
        if (this.type === 17) drawButterfly(this.x, this.y, this.size);else
        if (this.type === 18) drawIceCream(this.x, this.y, this.size);else
        if (this.type === 19) drawHat(this.x, this.y, this.size);else
        if (this.type === 20) drawMountain(this.x, this.y, this.size);else
        drawBridge(this.x, this.y, this.size);
      }
    };


    let canPlace = true;
    for (let obj of objects) {
      if (dist(newObj.x, newObj.y, obj.x, obj.y) < newObj.size / 2 + obj.size / 2) {
        canPlace = false;
        break;
      }
    }


    if (canPlace) {
      objects.push(newObj);
    }

    maxAttempts--;
  }


  let dotAttempts = 5000;
  let dotMinSize = 2;
  let dotMaxSize = 8;

  while (dotAttempts > 0) {
    let size = random(dotMinSize, dotMaxSize);
    let x = random(size, width - size);
    let y = random(size, height - size);

    let newDot = {
      x: x,
      y: y,
      size: size,
      type: 'dot',
      vx: random(-0.22, 0.22),
      vy: random(-0.2, 0.22)
    };


    let canPlace = true;
    for (let obj of objects) {
      if (dist(newDot.x, newDot.y, obj.x, obj.y) < newDot.size / 2 + obj.size / 2) {
        canPlace = false;
        break;
      }
    }


    if (canPlace) {
      objects.push(newDot);
    }

    dotAttempts--;
  }
} function drawCat(x, y, s) {beginShape();
  vertex(x - s * 0.3, y + s * 0.2);
  bezierVertex(x - s * 0.5, y - s * 0.1, x - s * 0.2, y - s * 0.4, x, y);
  bezierVertex(x + s * 0.2, y + s * 0.5, x + s * 0.8, y + s * 0.5, x + s * 0.9, y + s * 0.2);
  bezierVertex(x + s * 0.7, y + s * 0.6, x + s * 0.3, y + s * 0.6, x - s * 0.3, y + s * 0.2);
  endShape(CLOSE);


  beginShape();
  vertex(x - s * 0.3, y + s * 0.2);
  bezierVertex(x - s * 0.6, y + s * 0.1, x - s * 0.7, y - s * 0.2, x - s * 0.5, y - s * 0.4);
  endShape();


  beginShape();
  vertex(x + s * 0.1, y - s * 0.1);
  bezierVertex(x + s * 0.2, y - s * 0.3, x + s * 0.4, y - s * 0.4, x + s * 0.6, y - s * 0.3);
  bezierVertex(x + s * 0.7, y - s * 0.2, x + s * 0.6, y, x + s * 0.4, y + s * 0.1);
  bezierVertex(x + s * 0.2, y + s * 0.1, x + s * 0.1, y - s * 0.1, x + s * 0.1, y - s * 0.1);
  endShape(CLOSE);


  triangle(x + s * 0.3, y - s * 0.4, x + s * 0.4, y - s * 0.6, x + s * 0.5, y - s * 0.4);
  triangle(x + s * 0.5, y - s * 0.4, x + s * 0.6, y - s * 0.6, x + s * 0.7, y - s * 0.4);


  ellipse(x + s * 0.35, y - s * 0.2, s * 0.08, s * 0.12);
  ellipse(x + s * 0.55, y - s * 0.2, s * 0.08, s * 0.12);


  triangle(x + s * 0.42, y - s * 0.1, x + s * 0.48, y - s * 0.1, x + s * 0.45, y - s * 0.05);


  line(x + s * 0.45, y - s * 0.05, x + s * 0.45, y);
  bezier(x + s * 0.45, y, x + s * 0.4, y + s * 0.05, x + s * 0.5, y + s * 0.05, x + s * 0.55, y);
} function drawCar(x, y, s) {beginShape();vertex(x, y);
  vertex(x + s * 0.8, y);
  vertex(x + s * 0.8, y - s * 0.3);
  vertex(x + s * 0.7, y - s * 0.5);
  vertex(x + s * 0.1, y - s * 0.5);
  vertex(x, y - s * 0.3);
  vertex(x, y);
  endShape(CLOSE);


  beginShape();
  vertex(x + s * 0.1, y - s * 0.3);
  vertex(x + s * 0.2, y - s * 0.4);
  vertex(x + s * 0.6, y - s * 0.4);
  vertex(x + s * 0.7, y - s * 0.3);
  endShape(CLOSE);


  ellipse(x + s * 0.2, y, s * 0.2, s * 0.2);
  ellipse(x + s * 0.6, y, s * 0.2, s * 0.2);
} function drawTree(x, y, s) {beginShape();vertex(x, y - s * 0.8);
  bezierVertex(x - s * 0.3, y - s * 0.6, x - s * 0.3, y - s * 0.2, x, y - s * 0.1);
  bezierVertex(x + s * 0.3, y - s * 0.2, x + s * 0.3, y - s * 0.6, x, y - s * 0.8);
  endShape(CLOSE);


  rect(x - s * 0.05, y - s * 0.1, s * 0.1, s * 0.3);
} function drawHouse(x, y, s) {rect(x - s * 0.3, y - s * 0.4, s * 0.6, s * 0.4);

  triangle(x - s * 0.3, y - s * 0.4, x + s * 0.3, y - s * 0.4, x, y - s * 0.7);


  rect(x - s * 0.1, y - s * 0.2, s * 0.2, s * 0.2);


  rect(x + s * 0.05, y - s * 0.3, s * 0.15, s * 0.15);
} function drawCloud(x, y, s) {ellipse(x, y, s * 0.8, s * 0.5);ellipse(x + s * 0.4, y, s * 0.6, s * 0.4);
  ellipse(x - s * 0.4, y, s * 0.6, s * 0.4);
} function drawFlower(x, y, s) {rect(x - s * 0.02, y - s * 0.2, s * 0.04, s * 0.4);

  ellipse(x, y - s * 0.3, s * 0.2, s * 0.2);
  ellipse(x + s * 0.15, y - s * 0.25, s * 0.2, s * 0.2);
  ellipse(x - s * 0.15, y - s * 0.25, s * 0.2, s * 0.2);
  ellipse(x + s * 0.1, y - s * 0.35, s * 0.2, s * 0.2);
  ellipse(x - s * 0.1, y - s * 0.35, s * 0.2, s * 0.2);


  fill(255, 200, 0);
  ellipse(x, y - s * 0.3, s * 0.1, s * 0.1);
  noFill();
} function drawBook(x, y, s) {rect(x - s * 0.2, y - s * 0.3, s * 0.4, s * 0.6);

  rect(x - s * 0.2, y - s * 0.3, s * 0.05, s * 0.6);


  line(x - s * 0.15, y - s * 0.3, x - s * 0.15, y + s * 0.3);
  line(x + s * 0.15, y - s * 0.3, x + s * 0.15, y + s * 0.3);
} function drawWatch(x, y, s) {ellipse(x, y, s * 0.8, s * 0.8);

  line(x, y, x + s * 0.2, y - s * 0.2);
  line(x, y, x + s * 0.3, y + s * 0.1);
} function drawLaptop(x, y, s) {rect(x - s * 0.3, y - s * 0.2, s * 0.6, s * 0.4);

  rect(x - s * 0.25, y + s * 0.25, s * 0.5, s * 0.1);
} function drawLightbulb(x, y, s) {ellipse(x, y - s * 0.2, s * 0.4, s * 0.6);

  rect(x - s * 0.1, y + s * 0.1, s * 0.2, s * 0.1);
} function drawGlobe(x, y, s) {ellipse(x, y, s * 0.8, s * 0.8);

  rect(x - s * 0.05, y + s * 0.4, s * 0.1, s * 0.2);
} function drawAfrica(x, y, s) {beginShape();vertex(x - s * 0.3, y + s * 0.4);
  vertex(x - s * 0.2, y - s * 0.3);
  vertex(x + s * 0.2, y - s * 0.4);
  vertex(x + s * 0.3, y + s * 0.2);
  vertex(x, y + s * 0.5);
  endShape(CLOSE);
} function drawCamera(x, y, s) {rect(x - s * 0.2, y - s * 0.15, s * 0.4, s * 0.3);

  ellipse(x, y, s * 0.3, s * 0.3);


  rect(x + s * 0.1, y - s * 0.2, s * 0.1, s * 0.1);
} function drawRocket(x, y, s) {rect(x - s * 0.05, y - s * 0.4, s * 0.1, s * 0.8);

  triangle(x - s * 0.1, y - s * 0.4, x + s * 0.1, y - s * 0.4, x, y - s * 0.6);


  triangle(x - s * 0.1, y + s * 0.4, x - s * 0.2, y + s * 0.2, x - s * 0.05, y + s * 0.2);
  triangle(x + s * 0.1, y + s * 0.4, x + s * 0.2, y + s * 0.2, x + s * 0.05, y + s * 0.2);


  triangle(x - s * 0.05, y + s * 0.4, x + s * 0.05, y + s * 0.4, x, y + s * 0.6);
} function drawUmbrella(x, y, s) {arc(x, y - s * 0.2, s * 0.6, s * 0.6, PI, TWO_PI);

  line(x, y, x, y + s * 0.4);
} function drawCup(x, y, s) {rect(x - s * 0.15, y - s * 0.2, s * 0.3, s * 0.4);

  arc(x + s * 0.2, y, s * 0.1, s * 0.2, HALF_PI, PI + HALF_PI);
} function drawBicycle(x, y, s) {ellipse(x - s * 0.2, y, s * 0.3, s * 0.3);ellipse(x + s * 0.2, y, s * 0.3, s * 0.3);


  line(x - s * 0.2, y, x + s * 0.2, y);
  line(x, y - s * 0.3, x + s * 0.2, y);
  line(x, y - s * 0.3, x - s * 0.2, y);
} function drawClock(x, y, s) {ellipse(x, y, s * 0.6, s * 0.6);

  line(x, y, x + s * 0.1, y - s * 0.2);
  line(x, y, x + s * 0.2, y + s * 0.1);
} function drawPencil(x, y, s) {rect(x - s * 0.05, y - s * 0.3, s * 0.1, s * 0.6);

  triangle(x - s * 0.05, y - s * 0.3, x + s * 0.05, y - s * 0.3, x, y - s * 0.5);
} function drawBalloon(x, y, s) {ellipse(x, y - s * 0.3, s * 0.4, s * 0.6);

  line(x, y, x, y + s * 0.4);
} function drawSun(x, y, s) {ellipse(x, y, s * 0.5, s * 0.5);

  for (let i = 0; i < 8; i++) {
    let angle = TWO_PI / 8 * i;
    let x1 = x + cos(angle) * s * 0.3;
    let y1 = y + sin(angle) * s * 0.3;
    let x2 = x + cos(angle) * s * 0.6;
    let y2 = y + sin(angle) * s * 0.6;
    line(x1, y1, x2, y2);
  }
} function drawMoon(x, y, s) {arc(x, y, s * 0.6, s * 0.6, -HALF_PI, HALF_PI);arc(x + s * 0.1, y, s * 0.6, s * 0.6, HALF_PI, -HALF_PI);
} function drawStar(x, y, s) {beginShape();vertex(x, y - s * 0.4);
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
} function drawHeart(x, y, s) {beginShape();vertex(x, y - s * 0.3);
  bezierVertex(x - s * 0.3, y - s * 0.6, x - s * 0.6, y - s * 0.2, x, y + s * 0.3);
  bezierVertex(x + s * 0.6, y - s * 0.2, x + s * 0.3, y - s * 0.6, x, y - s * 0.3);
  endShape(CLOSE);
} function drawFish(x, y, s) {ellipse(x, y, s * 0.6, s * 0.3);

  triangle(x + s * 0.3, y, x + s * 0.5, y - s * 0.2, x + s * 0.5, y + s * 0.2);


  ellipse(x - s * 0.2, y - s * 0.1, s * 0.05, s * 0.05);
} function drawButterfly(x, y, s) {ellipse(x, y, s * 0.1, s * 0.3);

  beginShape();
  vertex(x - s * 0.2, y - s * 0.1);
  bezierVertex(x - s * 0.4, y - s * 0.2, x - s * 0.4, y + s * 0.1, x - s * 0.2, y + s * 0.2);
  endShape();

  beginShape();
  vertex(x + s * 0.2, y - s * 0.1);
  bezierVertex(x + s * 0.4, y - s * 0.2, x + s * 0.4, y + s * 0.1, x + s * 0.2, y + s * 0.2);
  endShape();
} function drawIceCream(x, y, s) {triangle(x - s * 0.2, y + s * 0.2, x + s * 0.2, y + s * 0.2, x, y + s * 0.6);

  ellipse(x, y, s * 0.4, s * 0.4);
} function drawHat(x, y, s) {ellipse(x, y + s * 0.1, s * 0.6, s * 0.1);

  arc(x, y - s * 0.1, s * 0.4, s * 0.4, PI, TWO_PI);
} function drawMountain(x, y, s) {triangle(x - s * 0.4, y + s * 0.2, x + s * 0.4, y + s * 0.2, x, y - s * 0.4);} function drawBridge(x, y, s) {rect(x - s * 0.3, y - s * 0.1, s * 0.6, s * 0.2);

  arc(x - s * 0.2, y - s * 0.1, s * 0.2, s * 0.2, 0, PI);
  arc(x + s * 0.2, y - s * 0.1, s * 0.2, s * 0.2, 0, PI);
} 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  objects = [];
  populateCanvas();
  redraw();
}