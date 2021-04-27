
class Rectangle {
    constructor(left, top, width, height) {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    set(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }

    within(r) {
        return (r.left <= this.left &&
            r.right >= this.right &&
            r.top <= this.top &&
            r.bottom >= this.bottom);
    }

    overlaps(r) {
        return (this.left < r.right &&
            r.left < this.right &&
            this.top < r.bottom &&
            r.top < this.bottom);
    }
}

var AXIS = {
    NONE: 1,
    HORIZONTAL: 2,
    VERTICAL: 3,
    BOTH: 4
};

class Camera {
    // distance from followed object to border before camera starts move
    xDeadZone = 0; // min distance to horizontal borders
    yDeadZone = 0; // min distance to vertical borders

    // allow camera to move in vertical and horizontal axis
    axis = AXIS.BOTH;

    // object that should be followed
    followed = null;

    xView = 0;
    yView = 0;
    scale = 1;

    constructor(xView, yView, viewportWidth, viewportHeight, worldWidth, worldHeight) {
        // position of camera (left-top coordinate)
        this.xView = xView || 0;
        this.yView = yView || 0;

        // viewport dimensions
        this.wViewReal = viewportWidth;
        this.hViewReal = viewportHeight;
        this.wView = viewportWidth;
        this.hView = viewportHeight;

        // allow camera to move in vertical and horizontal axis
        this.axis = AXIS.BOTH;

        // object that should be followed
        this.followed = null;

        // rectangle that represents the viewport
        this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

        // rectangle that represents the world's boundary (room's boundary)
        this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
    }

    follow(obj, xDeadZone, yDeadZone) {
        this.followed = obj;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    update(realWidth = null, realHeight = null) {
        // if (this.followed !== null) {
        //     if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
        //         // moves camera on horizontal axis based on followed object position
        //         if (this.followed.x - this.xView + this.xDeadZone > this.wView)
        //             this.xView = this.followed.x - (this.wView - this.xDeadZone);
        //         else if (this.followed.x - this.xDeadZone < this.xView)
        //             this.xView = this.followed.x - this.xDeadZone;
        //     }
        //     if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
        //         // moves camera on vertical axis based on followed object position
        //         if (this.followed.y - this.yView + this.yDeadZone > this.hView)
        //             this.yView = this.followed.y - (this.hView - this.yDeadZone);
        //         else if (this.followed.y - this.yDeadZone < this.yView)
        //             this.yView = this.followed.y - this.yDeadZone;
        //     }
        // }

        // Update with canvas values
        this.wViewReal = realWidth || this.wViewReal;
        this.hViewReal = realHeight || this.hViewReal;

        this.wView = this.wViewReal / this.scale;
        this.hView = this.hViewReal / this.scale;

        this.xView = this.followed.x - this.wView / 2;
        this.yView = this.followed.y - this.hView / 2;

        // update viewportRect
        this.viewportRect.set(this.xView, this.yView, this.wView, this.hView);

        // don't let camera leaves the world's boundary
        // if (!this.viewportRect.within(this.worldRect)) {
        //     if (this.viewportRect.left < this.worldRect.left)
        //         this.xView = this.worldRect.left;
        //     if (this.viewportRect.top < this.worldRect.top)
        //         this.yView = this.worldRect.top;
        //     if (this.viewportRect.right > this.worldRect.right)
        //         this.xView = this.worldRect.right - this.wView;
        //     if (this.viewportRect.bottom > this.worldRect.bottom)
        //         this.yView = this.worldRect.bottom - this.hView;
        // }



        showLog(
            '\npx: ' + this.followed.x.toFixed(2)
            + '  py: ' + this.followed.y.toFixed(2)
            + '\nx:' + this.xView.toFixed(2)
            + '  y:' + this.yView.toFixed(2)
        );
    }

    applyT(ctx) {
        ctx.scale(this.scale, this.scale);
        ctx.translate(-this.xView, -this.yView);
    }
}


class Player {
    constructor(x, y) {
        // (x, y) = center of object
        // ATTENTION:
        // it represents the player position on the world(room), not the canvas position
        this.x = x;
        this.y = y;

        // move speed in pixels per second
        this.speed = 400;

        // render properties
        this.width = 50;
        this.height = 50;
    }

    update(step, app) {
        // parameter step is the time between frames ( in seconds )
        var controls = app.controls;

        // check controls and move the player accordingly
        if (controls.left)
            this.x -= this.speed * step;
        if (controls.up)
            this.y -= this.speed * step;
        if (controls.right)
            this.x += this.speed * step;
        if (controls.down)
            this.y += this.speed * step;

        // don't let player leaves the world's boundary
        if (this.x - this.width / 2 < app.room.left) {
            this.x = app.room.left + this.width / 2;
        }
        if (this.y - this.height / 2 < app.room.top) {
            this.y = app.room.top + this.height / 2;
        }
        if (this.x + this.width / 2 > app.room.right) {
            this.x = app.room.right - this.width / 2;
        }
        if (this.y + this.height / 2 > app.room.bottom) {
            this.y = app.room.bottom - this.height / 2;
        }
    }

    draw(ctx) {
        // draw a simple rectangle shape as our player model
        ctx.fillStyle = "red";
        // before draw we need to convert player world's position to canvas position			
        ctx.fillRect(
            (this.x - this.width / 2),
            (this.y - this.height / 2),
            this.width, this.height);
    }
}


class MapTiles {
    constructor(rectangle) {
        // map dimensions
        this.rect = rectangle;

        // map texture
        this.image = null;
    }

    generate() {
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.rect.width;
        ctx.canvas.height = this.rect.height;

        var rows = ~~(this.rect.width / 44) + 1;
        var columns = ~~(this.rect.height / 44) + 1;

        function randColor() {

        }

        var color = "red";
        ctx.save();
        ctx.fillStyle = "red";
        for (var x = 0, i = 0; i < rows; x += 44, i++) {
            for (var y = 0, j = 0; j < columns; y += 44, j++) {
                ctx.beginPath();
                ctx.rect(x, y, 40, 40);
                color = 'hsl(' + 360 * Math.random() + ',20%,60%)';
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath();
            }
        }
        ctx.restore();

        // store the generate map as this image texture
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");

        // clear context
        ctx = null;
    }

    draw(ctx) {
        // easiest way: draw the entire map changing only the destination coordinate in canvas
        // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
        // ctx.save();
        // ctx.translate(-camera.xView, -camera.yView); // Handled by App.draw()
        ctx.drawImage(this.image, this.rect.left, this.rect.top);
        // ctx.restore();

    }
}









class App {
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    debugInfoNode = document.createElement('div');
    fpsNode = document.createElement('div');

    FPS = null;
    INTERVAL = null;
    STEP = null;

    controls = {
        left: false,
        up: false,
        right: false,
        down: false,
    }

    room = new Rectangle(-3e3, -3e3, 6e3, 6e3);
    map = new MapTiles(new Rectangle(-3e3, -3e3, 6e3, 6e3));

    constructor(mainNode, controlsNode) {
        this.node = mainNode;
        this.controlsNode = controlsNode;
        this.node.appendChild(this.canvas);
        this.controlsNode.appendChild(this.debugInfoNode);
        this.controlsNode.appendChild(this.fpsNode);
        window.showLog = (s) => this.showLog(s);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setFPS(144);


        // Set the right viewport size for the camera
        var vWidth = Math.min(this.room.width, this.canvas.width);
        var vHeight = Math.min(this.room.height, this.canvas.height);
        // Generate room
        this.map.generate();

        // Setup player
        this.player = new Player(50, 50);
        this.player.speed = 1000;

        // Setup camera
        this.camera = new Camera(0, 0,
            vWidth, vHeight,
            this.room.width, this.room.height);
        this.camera.follow(this.player, this.room.width, this.room.height);


        window.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case 'a':
                    this.controls.left = true;
                    break;
                case 'w':
                    this.controls.up = true;
                    break;
                case 'd':
                    this.controls.right = true;
                    break;
                case 's':
                    this.controls.down = true;
                    break;
            }
        }, false);

        window.addEventListener("keyup", (e) => {
            if (e.key !== 'F12') e.preventDefault();
            e.preventDefault();
            switch (e.key.toLowerCase()) {
                case 'a':
                    this.controls.left = false;
                    break;
                case 'w':
                    this.controls.up = false;
                    break;
                case 'd':
                    this.controls.right = false;
                    break;
                case 's':
                    this.controls.down = false;
                    break;
                case 'p': // key P pauses the game
                    this.togglePause();
                    break;
                case '0':
                    if (e.ctrlKey) this.camera.scale = 1;
                    break;
            }
        }, false);

        window.addEventListener('wheel', (e) => {
            e.preventDefault()
            this.camera.scale *= 1.1 ** (e.deltaY / 50);
        }, { passive: false })

        // Detect resize and adjust canvas to it
        window.addEventListener('resize', (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.draw();
        })
    }

    setFPS(n) {
        this.FPS = n;
        this.INTERVAL = 1000 / this.FPS; // milliseconds
        this.STEP = this.INTERVAL / 1000 // seconds
    }

    update() {
        this.player.update(this.STEP, this);
        this.camera.update(this.canvas.width, this.canvas.height);
    }

    draw() {
        var ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        this.camera.applyT(ctx);

        this.map.draw(ctx, this.camera);
        this.player.draw(ctx, this.camera);

        ctx.restore();
    }

    lastTimestamp = 0;
    gameloop(timestamp = 0) {
        this.update();
        this.draw();
        this.updateTimestamp(1000 / (timestamp - this.lastTimestamp));
        this.lastTimestamp = timestamp;
    }

    gameloopRef = (x) => {
        this.gameloop(x);
        this.runningId = -1;
        this.play();
    }

    showLog(str) {
        var e = this.debugInfoNode;
        while (e.firstChild)
            e.removeChild(e.firstChild);
        for (var x of str.split('\n')) {
            var a = document.createElement('p');
            a.textContent = x;
            e.appendChild(a);
        }
    }

    rollingAvg = new Array(10).fill(0);
    updateTimestamp(n) {
        this.rollingAvg.shift();
        this.rollingAvg.push(n);
        var fps = this.rollingAvg.reduce(function (sum, a) { return sum + a }, 0) / (this.rollingAvg.length || 1);
        this.fpsNode.textContent = 'Fps = ' + fps.toFixed(3);
    }


    // play() {
    //     if (this.runningId == -1) {
    //         this.runningId = setInterval(this.gameloopRef, this.INTERVAL);
    //     }
    // }
    // togglePause() {
    //     if (this.runningId == -1) {
    //         this.play();
    //     } else {
    //         clearInterval(this.runningId);
    //         this.runningId = -1;
    //     }
    // }
    runningId = -1;
    simulationId = -1;
    play() {
        if (this.runningId == -1) {
            this.runningId = window.requestAnimationFrame(this.gameloopRef);
        }
    }
    togglePause() {
        if (this.runningId == -1) {
            this.play();
        } else {
            window.cancelAnimationFrame(this.runningId);
            this.runningId = -1;
        }
    }
}



function onWindowLoad() {
    window.app = new App(document.getElementById('main'), document.getElementById('controls'));
    window.app.play();
}

function onWindowUnload() {

}

window.addEventListener('load', onWindowLoad);

window.addEventListener('beforeunload', onWindowUnload);