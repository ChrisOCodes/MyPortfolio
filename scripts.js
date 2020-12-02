const canvas = document.getElementById('CanvasBackground');
const context = canvas.getContext("2d");
const tracker = new TrackingPoint(100, 100, 50, 'white', 3, 0);
const numberOfParticles = 200
let particleArray = []

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getScrollPercent = () => {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
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

const animate =() => {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    connect()
    requestAnimationFrame(animate);
}

const updateTracker = () => {
    requestAnimationFrame(updateTracker);
    tracker.update();
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

    
    
    