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

class Projectile {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 5
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.closePath()
    c.fillStyle = 'white'
    c.fill()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

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
    };
};

class Asteroid {
    constructor({ position, velocity, radius }) {
      this.position = position
      this.velocity = velocity
      this.radius = radius
    };
  
    draw() {
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
      c.closePath()
      c.strokeStyle = 'white'
      c.stroke()
    };
  
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    };
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
function animate() {
    const animationId = window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
  
    player.update();
  
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i]
      projectile.update();
  
      // garbage collection for projectiles
      if (
        projectile.position.x + projectile.radius < 0 ||
        projectile.position.x - projectile.radius > canvas.width ||
        projectile.position.y - projectile.radius > canvas.height ||
        projectile.position.y + projectile.radius < 0
      ) {
        projectiles.splice(i, 1);
      };
    };
  
    // asteroid management
    for (let i = asteroids.length - 1; i >= 0; i--) {
      const asteroid = asteroids[i];
      asteroid.update();
  
      if (circleTriangleCollision(asteroid, player.getVertices())) {
        console.log('GAME OVER');
        window.cancelAnimationFrame(animationId);
        clearInterval(intervalId);
      };
  
      // garbage collection for projectiles
      if (
        asteroid.position.x + asteroid.radius < 0 ||
        asteroid.position.x - asteroid.radius > canvas.width ||
        asteroid.position.y - asteroid.radius > canvas.height ||
        asteroid.position.y + asteroid.radius < 0
      ) {
        asteroids.splice(i, 1);
      };
  
      // projectiles
      for (let j = projectiles.length - 1; j >= 0; j--) {
        const projectile = projectiles[j]
  
        if (circleCollision(asteroid, projectile)) {
          asteroids.splice(i, 1)
          projectiles.splice(j, 1)
        };
      };
    };
    //add player rotation to controls
    if (keys.w.pressed) {
      player.velocity.x = Math.cos(player.rotation) * SPEED
      player.velocity.y = Math.sin(player.rotation) * SPEED
    } else if (!keys.w.pressed) {
      player.velocity.x *= FRICTION
      player.velocity.y *= FRICTION
    }
  
    if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
    else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
  }
  
  animate()
  //add keydown events to contols
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW':
        keys.w.pressed = true
        break
      case 'KeyA':
        keys.a.pressed = true
        break
      case 'KeyD':
        keys.d.pressed = true
        break
      case 'Space':
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + Math.cos(player.rotation) * 30,
              y: player.position.y + Math.sin(player.rotation) * 30,
            },
            velocity: {
              x: Math.cos(player.rotation) * PROJECTILE_SPEED,
              y: Math.sin(player.rotation) * PROJECTILE_SPEED,
            },
          })
        )
        break
    };
  });

//add event for keyup controls
window.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW':
        keys.w.pressed = false
        break
      case 'KeyA':
        keys.a.pressed = false
        break
      case 'KeyD':
        keys.d.pressed = false
        break
    };
  });
