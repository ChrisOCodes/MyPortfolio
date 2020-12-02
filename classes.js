class TrackingPoint{
    constructor(x, y, radius, color, speed){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
  
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }
  
    draw(context){
        context.beginPath();
        context.strokeStyle = 'rgba(0,0,0,0)';
        context.lineWidth = 5;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath()
    }
  
    update(){
        context.clearRect(0,0, canvas.width, canvas.height);
  
        this.draw(context);
  
        if ((this.x + this.radius) > canvas.width){
            this.dx = -this.dx;
        }
        
        if ((this.x + this.radius) < 0){
            this.dx = -this.dx;
        }
        
        if ((this.y + this.radius) < 0){
            this.dy = -this.dy;
        }
        
        if ((this.y + this.radius) > canvas.height){
            this.dy = -this.dy;
        }
  
        this.x += this.dx;
        this.y += this.dy;
    }
  }

  class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }
    update() {

        let percent = getScrollPercent()
        if(percent > 25){
            this.weight = 20;
        }

        this.size -= 0.1;
        if (this.size < 0) {
            this.x = tracker.x + (Math.random() * 250 - 10);
            this.y = tracker.y + (Math.random() * 250 - 10);
            this.size = (Math.random() * 15) + 5;
            this.weight = 0;
        }

        this.y += this.weight;
        
        if (this.y > canvas.height - this.size) {
            this.weight *= -0.4;
        }
    }
}