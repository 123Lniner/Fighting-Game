// two slashes without any text after it is just a placeholder
// constants
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// game size/resolution
canvas.width = 1024;
canvas.height = 576;
// display
c.fillRect(0, 0, canvas.width, canvas.height);
// gravity
const gravity = 0.2;
// sprites
class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    };
    //
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    };
    // update frames
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // ground
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    };
};
// player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});
// enemy
const enemy = new Sprite({
    position: {
        x: 974,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
});
//
console.log(player);
//
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    }
};
let lastKey;
// animations
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    // default player velocity
    player.velocity.x = 0;
    // movement
    if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -3;
    } else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 3;
    };
    if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft'){
        enemy.velocity.x = -3;
    } else if(keys.ArrowRight.pressed && lastKey === 'ArrowRight'){
        enemy.velocity.x = 3;
    };
};
//
animate();
// movement
window.addEventListener('keydown', (event) => {
    switch(event.key){
        // player movement
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'w':
            player.velocity.y = -10;
            break;
        // enemy movement
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -10;
            break;
    };
});
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
    };
});