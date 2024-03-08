const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
    }
    draw(){
        ctx.moveTo(this.position.x + 30, this.position.y);
        ctx.lineTo(this.position.x-10, this.position.y-10);
        ctx.lineTo(this.position.x-10, this.position.y+10);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
    update(){
        this.draw();
        this.position.x += this.position.velocity.x;
        this.position.y += this.position.velocity.y;
    }
};


const player = new Player({
    position:{x: canvas.width/2, y: canvas.height/2}, 
    velocity:{x: 0, y: 0}
});

player.draw();

const keys = {
    W:{
        pressed: false
    },
    A:{
        pressed: false
    },
    S:{
        pressed: false
    },
    D:{
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();

    if(keys.W.pressed) player.velocity.x = 1
}

window.addEventListener('keydown',(event)=>{
    switch (event.code){
        case 'KeyW':
            keys.W.pressed = true
            console.log('w was pressed')
            break
        case 'KeyA':
            keys.A.pressed = true
            console.log('a was pressed')
            break
        case 'KeyS':
            keys.S.pressed = true
            console.log('s was pressed')
            break
        case 'KeyD':
            keys.D.pressed = true
            console.log('d was pressed')
            break
    }
});
