const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.rotation = 0;
    }
    draw(){
        ctx.save();
        ctx.rotate(this.rotation);
        ctx.translate(-this.position.x, -this.position.y);

        ctx.beginPath();
        ctx.moveTo(this.position.x + 30, this.position.y);
        ctx.lineTo(this.position.x-10, this.position.y-10);
        ctx.lineTo(this.position.x-10, this.position.y+10);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.restore();
    }
    update(){
        this.draw();
        this.position.x += this.position.velocity.x;
        this.position.y += this.position.velocity.y;
    }
};

//add projectiles


const player = new Player({
    position:{x: canvas.width/2, y: canvas.height/2}, 
    velocity:{x: 0, y: 0}
});

player.draw();

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();

    player.velocity.x = 0;

    if(keys.w.pressed) player.velocity.x = 1;

    if (keys.d.pressed)player.rotation += 0.01
}

window.addEventListener('keydown',(event)=>{
    switch (event.code){
        case 'KeyW':
            keys.w.pressed = true;
            console.log('w was pressed');
            break
        case 'KeyA':
            keys.a.pressed = true;
            console.log('a was pressed');
            break
        case 'KeyS':
            keys.s.pressed = true;
            console.log('s was pressed');
            break
        case 'KeyD':
            keys.d.pressed = true;
            console.log('d was pressed');
            break
    }
});

window.addEventListener('keyup',(event)=>{
    switch (event.code){
        case 'KeyW':
            keys.w.pressed = false
            console.log('w was pressed')
            break
        case 'KeyA':
            keys.a.pressed = false
            console.log('a was pressed')
            break
        case 'KeyS':
            keys.s.pressed = false
            console.log('s was pressed')
            break
        case 'KeyD':
            keys.d.pressed = false
            console.log('d was pressed')
            break
    }
});
