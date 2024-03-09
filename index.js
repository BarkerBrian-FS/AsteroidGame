const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//set canvas to screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//create player
class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.rotation = 0;
    }
    //draw ship
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
class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
    };
    //draw circular projectiles and update 
    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    };
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};

//set player position to middle of screen 
const player = new Player({
    position:{x: canvas.width/2, y: canvas.height/2}, 
    velocity:{x: 0, y: 0}
});

player.draw();

//set keys for controls
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
};

//set speed an rotation to player
const SPEED = 3;
const ROTATIONAL_SPEED = 0.05;
const FRICTION = 0.97;
const PROJECTILE_SPEED = 3;

const projectiles = [];

//add animation function to continuously create player ship 
function animate(){
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.update();

    player.velocity.x = 0;

    if(keys.w.pressed) player.velocity.x = 1;

    if (keys.d.pressed)player.rotation += 0.01;
};




//add event for key down controls
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

//add event for keyup controls
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
