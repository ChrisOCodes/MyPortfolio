const getScrollPercent = () => {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}


const canvas = document.getElementById('CanvasBackground');
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
  
  const trackerPos = {
      x: null,
      y: null
  }

  setInterval(function(){
      trackerPos.x = tracker.x
      trackerPos.y = tracker.y
  })
  
  
  let updateTracker = () => {
      requestAnimationFrame(updateTracker);
      tracker.update();
    }
    
    let tracker = new TrackingPoint(100, 100, 50, 'white', 3, 0);
    let particleArray = []
    let numberOfParticles = 200


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
    
    const animate =() => {
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
        connect()
        requestAnimationFrame(animate);
    }
    
    const connect = () => {
        let opacityValue =1;
        for(let a = 0; a < particleArray.length; a++){
            for(let b = a; b < particleArray.length; b++){
                let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x)) 
                + 
                ((particleArray[a].y - particleArray[b].y) *
                (particleArray[a].y - particleArray[b].y))
                
                if(distance < 3800){
                    opacityValue = 1 - (distance/10000)
                    context.strokeStyle = 'rgba(0,0,0,' + opacityValue +')'
                    context.beginPath()
                    context.lineWidth = 1;
                    context.moveTo(particleArray[a].x, particleArray[a].y)
                    context.lineTo(particleArray[b].x, particleArray[b].y)
                    context.stroke()
                }
            }
        }
    }
    
    const init = () => {
        particleArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            let x = (Math.random() + 10) * canvas.width;
            let y = Math.random() * canvas.height;
            let size = (Math.random() * 15) + 5;
            let color = 'black';
            let weight = 1;
            particleArray.push(new Particle(x, y, size, color, weight));
        }
    }
    
  
    
    tracker.draw(context)
    
    updateTracker()
    init();
    animate(); 

    
    
    