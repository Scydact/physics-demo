
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

    constructor(xView, yView, viewboxWidth, viewboxHeight, worldWidth, worldHeight) {
        // position of camera (left-top coordinate)
        this.xView = xView || 0;
        this.yView = yView || 0;

        // viewbox dimensions
        this.wViewReal = viewboxWidth;
        this.hViewReal = viewboxHeight;
        this.wView = viewboxWidth;
        this.hView = viewboxHeight;

        // allow camera to move in vertical and horizontal axis
        this.axis = AXIS.BOTH;

        // object that should be followed
        this.followed = null;

        // rectangle that represents the viewbox
        this.viewboxRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

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

        // update viewboxRect
        this.viewboxRect.set(this.xView, this.yView, this.wView, this.hView);

        // don't let camera leaves the world's boundary
        // if (!this.viewboxRect.within(this.worldRect)) {
        //     if (this.viewboxRect.left < this.worldRect.left)
        //         this.xView = this.worldRect.left;
        //     if (this.viewboxRect.top < this.worldRect.top)
        //         this.yView = this.worldRect.top;
        //     if (this.viewboxRect.right > this.worldRect.right)
        //         this.xView = this.worldRect.right - this.wView;
        //     if (this.viewboxRect.bottom > this.worldRect.bottom)
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

    canDraw(rect) {
        return this.viewboxRect.overlaps(rect)
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
        ctx.fillStyle = 'red';
        // before draw we need to convert player world's position to canvas position			
        ctx.fillRect(
            (this.x - this.width / 2),
            (this.y - this.height / 2),
            this.width, this.height);
    }
}

// For testing
class MapTiles {
    constructor(rectangle) {
        // map dimensions
        this.viewbox = rectangle;

        // map texture
        this.image = null;
    }

    generate() {
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.viewbox.width;
        ctx.canvas.height = this.viewbox.height;

        var rows = ~~(this.viewbox.width / 44) + 1;
        var columns = ~~(this.viewbox.height / 44) + 1;

        function randColor() {

        }

        var color = "red";
        ctx.save();
        ctx.fillStyle = "red";
        for (var x = 0, i = 0; i < rows; x += 44, i++) {
            for (var y = 0, j = 0; j < columns; y += 44, j++) {
                ctx.beginPath();
                ctx.rect(x, y, 40, 40);
                color = 'hsl(' + 360 * Math.random() + ',50%,15%)';
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
        ctx.drawImage(this.image, this.viewbox.left, this.viewbox.top);
        // ctx.restore();

    }
}


class MapStars {
    constructor(rectangle) {
        this.viewbox = rectangle;
        this.stars = [];
        this.testRect = new Rectangle(0, 0, 0, 0);
    }

    generate() {
        let star = null;
        for (let i = 0; i < 1000; ++i) {
            star = [
                Math.random() * this.viewbox.width + this.viewbox.left, // X
                Math.random() * this.viewbox.height + this.viewbox.top, // Y
                Math.random() * 9 + 1, // Radius
                `hsl(${~~(220 * Math.random() + 190)},`
                + `${~~(70 * Math.random())}%,`
                + `${~~(35 * Math.random() + 65)}%)`, // Color
            ];
            this.stars.push(star);
        }
    }

    draw(ctx, camera) {
        var tt = this.testRect,
            angle = Math.PI * 2;
        for (let star of this.stars) {
            ctx.beginPath();
            tt.set(star[0], star[1], star[2], star[2]);
            if (camera.canDraw(tt)) {
                ctx.fillStyle = star[3];
                ctx.arc(star[0], star[1], star[2], 0, angle);
                ctx.fill();
            }
            ctx.closePath();
        }

    }
}

class PerfomanceMetric {
    _startT = 0;
    value = 0;
    constructor(bufferSize = 5, bufferStartValue = 0) {
        this.bufferSize = bufferSize;
        this.value = bufferStartValue;
    }

    start() {
        return this._startT = performance.now();
    }
    end() {
        var t = performance.now() - this._startT;
        this.value += (t - this.value) / this.bufferSize;
        return t;
    }
    add(t) {
        return this.value += (t - this.value) / this.bufferSize;
    }
}

class PerfomanceMetricBuffer {
    startT = 0;
    value = 0;
    constructor(bufferSize = 5, bufferStartValue = 0) {
        this.bufferSize = bufferSize;
        this.value = bufferStartValue;
        this.buffer = new Array(bufferSize).fill(bufferStartValue);
    }

    start() {
        return this.startT = performance.now();
    }
    end() {
        var t = performance.now() - this.startT;
        var old = this.buffer.shift();
        this.buffer.push(t);
        this.value += (t - old) / this.bufferSize;
        return t;
    }
    add(t) {
        var old = this.buffer.shift();
        this.buffer.push(t);
        return this.value += (t - old) / this.bufferSize;
    }
    recalculate() {
        let sum = 0;
        for (let i = 0; i < this.bufferSize; ++i)
            sum += this.buffer[i];
        return this.value = sum / this.bufferSize;
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
    map = new MapStars(new Rectangle(-3e3, -3e3, 6e3, 6e3));

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


        // Set the right viewbox size for the camera
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


    metrics = {
        draw: new PerfomanceMetric(20),
        fps: new PerfomanceMetric(20, 1e3 / 60),
    }
    draw() {
        this.metrics.draw.start();
        var ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        this.camera.applyT(ctx);

        this.map.draw(ctx, this.camera);
        this.player.draw(ctx, this.camera);

        ctx.restore();
        this.metrics.draw.end();
    }

    lastTimestamp = 0;
    gameloop(timestamp = 0) {
        this.update();
        this.draw();
        this.updateFPSCounter(timestamp - this.lastTimestamp)
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
            var a = document.createElement('div');
            a.textContent = x;
            e.appendChild(a);
        }
    }

    updateFPSCounter(n) {
        var fps = this.metrics.fps.add(n);
        var draw = this.metrics.draw.value;

        this.fpsNode.textContent = `Fps = ${(1000 / fps).toFixed(3)}; Draw time = ${~~(1000 * draw)}us (${(100 * draw / fps).toFixed(3)}% frame time)`;
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