
//#region Math

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    toString() {
        return '(' + this.x.toString() + ',' + this.y.toString() + ')'
    }

    toFixed(n) {
        return '(' + this.x.toFixed(n) + ',' + this.y.toFixed(n) + ')'
    }

    toPrecision(n) {
        return '(' + this.x.toPrecision(n) + ',' + this.y.toPrecision(n) + ')'
    }

    toStringP() {
        return '(' + this.mag().toString() + ',' + this.phase().toString() + ')'
    }

    toFixedP(n) {
        return '(' + this.mag().toFixed(n) + ',' + this.phase().toFixed(n) + ')'
    }

    toPrecisionP(n) {
        return '(' + this.mag().toPrecision(n) + ',' + this.phase().toPrecision(n) + ')'
    }

    // Polar forms
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    phase() {
        return Math.atan2(this.y, this.x);
    }

    fromPolar(mag, phase) {
        this.x = mag * Math.cos(phase);
        this.y = mag * Math.sin(phase);
        return this;
    }
    static fromPolar(mag, phase) {
        return new Vector2(mag * Math.cos(phase), mag * Math.sin(phase));
    }

    // Distance
    dist(v) {
        var x = v.x - this.x,
            y = v.y - this.y;
        return Math.sqrt(x * x + y * y);
    }
    static dist(v1, v2) {
        var x = v2.x - v1.x,
            y = v2.y - v1.y;
        return Math.sqrt(x * x + y * y);
    }

    // Angle
    ang(v) {
        var x = v.x - this.x,
            y = v.y - this.y;
        return Math.atan2(y, x);
    }
    static ang(v1, v2) {
        var x = v2.x - v1.x,
            y = v2.y - v1.y;
        return Math.atan2(y, x);
    }

    // Clone
    c() {
        return new Vector2(this.x, this.y);
    }
    static c(v) {
        return new Vector2(v.x, v.y);
    }


    // Scalar mult
    smult(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    static smult(v, s) {
        return new Vector2(v.x * s, v.y * s);
    }


    // Scalar division
    sdiv(s) {
        this.x /= s;
        this.y /= s;
        return this;
    }
    static sdiv(v, s) {
        return new Vector2(v.x / s, v.y / s);
    }


    // Scalar addition 
    sadd(s) {
        this.x += s;
        this.y += s;
        return this;
    }
    static sadd(v, s) {
        return new Vector2(v.x + s, v.y + s);
    }


    // Set
    set(x, y) {
        if (y === undefined
            && x.x !== undefined
            && x.y !== undefined) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
        return this;
    }

    sset(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    vset(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }


    // Negate
    neg() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    static neg(v) {
        return new Vector2(-v.x, -v.y);
    }


    // Addition
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }


    // Subtraction
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    static sub(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }


    // Vector elementwise multiplication
    vmult(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    static vmult(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    // Dot product
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }


    // Complex division
    cdiv(v) {
        var den = v.x * v.x + v.y * v.y,
            x = this.x * v.x + this.y * v.y,
            y = this.y * v.x + this.x * v.y;
        this.x = x / den;
        this.y = y / den;
        return this;
    }

    static cdiv(v1, v2) {
        var den = v2.x * v2.x + v2.y * v2.y,
            x = v1.x * v2.x + v1.y * v2.y,
            y = v1.y * v2.x + v1.x * v2.y;
        return new Vector2(x / den, y / den);
    }

    // Rotate
    rot(ang) {
        var c = Math.cos(ang),
            s = Math.sin(ang);
        this.x = this.x * c - y * s;
        this.y = this.x * s + this.y * c;
        return this;
    }
    static rot(v, ang) {
        var c = Math.cos(ang),
            s = Math.sin(ang);
        return new Vector2(v.x * c - y * s, v.x * s + v.y * c);
    }

    // Rotate 90 deg
    rot90() {
        var t = this.y;
        this.y = this.x;
        this.x = -this.y;
        return this;
    }
    static rot90(v) {
        return new Vector2(-v.y, v.x);
    }

    // Rotate 270 deg
    rot270() {
        var t = this.y;
        this.y = -this.x;
        this.x = this.y;
        return this;
    }
    static rot270(v) {
        return new Vector2(v.y, -v.x);
    }

    // Rotate 180 deg
    rot180() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    static rot180(v) {
        return new Vector2(-v.x, -v.y);
    }

    // Normal values
    zero() {
        this.x = 0;
        this.y = 0;
        return this;
    }
    static zero() {
        return new Vector2(0, 0);
    }

    one() {
        this.x = 1;
        this.y = 0;
        return this;
    }
    static one() {
        return new Vector2(1, 0);
    }

    ones() {
        this.x = 1;
        this.y = 1;
        return this;
    }
    static ones() {
        return new Vector2(1, 1);
    }

    /** First argument should be a function, rest is a list of vectors that will be fed */
    lambda(fn, scalars, ...vectors) {
        var vx = vectors.map(x => x.x);
        var vy = vectors.map(x => x.y);
        this.vset(fn(scalars, vx), fn(scalars, vy));
        return this;
    }

    /** Sums all vectors by some scalar (aV0 + bV1 + cV2 +...).
     * First argument will be the weight of <this>
    */
    weightSum() {
        var x = 0,
            y = 0,
            vec = this;
        for (var i = 0, l = arguments.length; i < l; ++i) {
            if (i % 2 === 0) { // Supposed to be scalar
                x += vec.x * arguments[i];
                y += vec.y * arguments[i];
            } else {
                vec = arguments[i];
            }
        }
        return this.sset(x, y);
    }

    /** Sums a bunch of vectors. */
    sum() {
        var x = 0,
            y = 0;
        for (var i = 0, l = arguments.length; i < l; ++i) {
            x += vec.x * arguments[i].x;
            y += vec.y * arguments[i].y;
        }
        return this.sset(x, y);
    }

    /** Creates an array of zero vectors... Useful as temporal vectors */
    static createArray(n) {
        return new Array(n).fill(0).map(Vector2.zero);
    }
}





//#endregion


//#region Basic logic
class Rectangle {
    constructor(left, top, width, height, color = 'white') {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.center = new Vector2(0.5 * (this.left + this.right), 0.5 * (this.top + this.bottom));
        this.color = color;
    }

    set(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.center.set(0.5 * (this.left + this.right), 0.5 * (this.top + this.bottom));
    }

    setCenter(x, y, width, height) {
        this.center.set(x, y);
        this.width = width || this.width;
        this.height = height || this.height;
        this.left = x - this.width * 0.5;
        this.top = y - this.height * 0.5;
        this.right = x + this.width * 0.5;
        this.bottom = y + this.height * 0.5;
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

    /** Checks if this rect is visible from within r (viewbox) */
    canDraw(r) {
        return !r || (
            this.left < r.right && this.right > r.left &&
            this.bottom > r.top && this.top < r.bottom);
    }

    /** Checks if the point is inside */
    pointInside(x, y) {
        return this.left <= x && x <= this.right
            && this.top <= y && y <= this.bottom;
    }

    draw(ctx, viewbox) {
        if (!this.canDraw(viewbox))
            return
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.width, this.height);
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

        this.xView = this.followed.pos.x - this.wView / 2;
        this.yView = this.followed.pos.y - this.hView / 2;

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
    }

    applyT(ctx) {
        ctx.scale(this.scale, this.scale);
        ctx.translate(-this.xView, -this.yView);
    }

    setScale(s) {
        // Calculate limit
        var l = Math.min(this.wViewReal, this.hViewReal),
            wl = Math.min(this.worldRect.width, this.worldRect.height);
        if (l / s > wl) {
            s = l / wl;
        } else if (s > 16) {
            s = 16;
        }

        this.scale = s;
    }
}


class Player {
    moveByAccel = true;
    params = {
        b: 1,
        m: 1,
    }
    tmp = Vector2.createArray(5);
    constructor(x, y) {
        // (x, y) = center of object
        // ATTENTION:
        // it represents the player position on the world(room), not the canvas position
        this.pos = new Vector2();
        this.dx = new Vector2();
        this.accel = new Vector2();

        // move speed in pixels per second
        this.speed = 1000;

        // render properties
        this.rect = new Rectangle(this.pos.y - 20, this.pos.y - 20, 40, 40, 'pink');
    }

    update(dt, app) {
        // parameter step is the time between frames ( in seconds )
        var controls = app.controls,
            { speed, pos, dx, accel, params, tmp } = this;

        if (this.moveByAccel) {
            let { b, m } = params;


            if (controls.shift) {
                speed *= 2;
                b /= 3;
            }
            if (controls.space) b *= 5 * m;

            accel.weightSum(0, dx, -b).sdiv(m);
            if (controls.left)
                accel.x -= speed;
            if (controls.up)
                accel.y -= speed;
            if (controls.right)
                accel.x += speed;
            if (controls.down)
                accel.y += speed;


            dx.add(tmp[0].set(accel).smult(dt));
            pos.add(tmp[0].set(dx).smult(dt));

        } else {
            // REGULAR MOVEMENT
            // check controls and move the player accordingly
            if (controls.shift) speed *= 2;
            if (controls.space) speed /= 2;

            dx.zero();
            if (controls.left)
                dx.x -= speed;
            if (controls.up)
                dx.y -= speed;
            if (controls.right)
                dx.x += speed;
            if (controls.down)
                dx.y += speed;

            pos.add(tmp[0].set(dx).smult(dt));

            // don't let player leaves the world's boundary
            if (pos.x - this.width / 2 < app.room.left) {
                pos.x = app.room.left + pos.width / 2;
            }
            if (pos.y - this.height / 2 < app.room.top) {
                pos.y = app.room.top + pos.height / 2;
            }
            if (pos.x + this.width / 2 > app.room.right) {
                pos.x = app.room.right - pos.width / 2;
            }
            if (pos.y + this.height / 2 > app.room.bottom) {
                pos.y = app.room.bottom - pos.height / 2;
            }
        }
        showLog('PLAYER:'
            + '\n  pos: ' + this.pos.toFixed(2)
            + '\n  speed: ' + this.dx.toFixedP(2) + ' px/ms'
            + '\n  accel: ' + this.accel.toFixedP(2) + ' px/ms^2\n  ');

        this.rect.setCenter(pos.x, pos.y);
    }

    draw(ctx) {
        this.rect.draw(ctx);
    }
}

//#endregion


//#region Maps
class MapStars {
    constructor(rectangle) {
        this.viewbox = rectangle;
        this.stars = [];
        this.testRect = new Rectangle(0, 0, 0, 0);
        this.image = null;
        this.scaleThreshold = 0.08;
    }

    generate(n = 1000) {
        let star = null;
        for (let i = 0; i < n; ++i) {
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
        // Measure star density
        var density = 1e6 * this.stars.length / (this.viewbox.width * this.viewbox.height);
        console.log(density);

        this.generateImage(1 / 15);
    }

    generateImage(scale) {
        var ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.viewbox.width * scale;
        ctx.canvas.height = this.viewbox.height * scale;
        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(-this.viewbox.left, -this.viewbox.top);
        for (let star of this.stars) {
            ctx.beginPath();
            ctx.fillStyle = star[3];
            ctx.arc(star[0], star[1], star[2], 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore();

        // store the generate map as this image texture
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL('image/jpeg', 0.5);

        // clear context
        ctx = null;
    }

    draw(ctx, camera) {

        showLog('MAP (Stars): ')
        if (camera.scale > this.scaleThreshold) {
            var tt = this.testRect,
                counter = 0,
                angle = Math.PI * 2;
            for (let star of this.stars) {
                ctx.beginPath();
                tt.set(star[0], star[1], star[2], star[2]);
                if (tt.canDraw(camera.viewboxRect)) {
                    ctx.fillStyle = star[3];
                    ctx.arc(star[0], star[1], star[2], 0, angle);
                    ctx.fill();
                    ++counter;
                }
                ctx.closePath();
            }
            showLog('  density: ' + (1e6 * counter / (camera.viewboxRect.width * camera.viewboxRect.height)).toFixed(2) + ' stars/MP')
        } else {
            showLog('  bitmap')
            ctx.drawImage(this.image,
                0, 0, this.image.width, this.image.height,
                this.viewbox.left, this.viewbox.top, this.viewbox.width, this.viewbox.height);
        }

    }
}
//#endregion


//#region Perfomance metrics

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

//#endregion


class Spring {
    constructor(base, restPos, initialPos, initialV, k = 7, m = 1, b = 0, g = 0) {
        this.base = base;
        this.x_rest = restPos;
        this.dx = initialV;
        this.pos = initialPos;
        this.prevPos = initialPos.c();

        this.k = k;
        this.m = m;
        this.b = b;
        this.g = new Vector2(0, g);

        this.mouseVelocityScale = 1;
        this.mouseVelocityState = {
            x: new PerfomanceMetric(10),
            y: new PerfomanceMetric(10),
        };

        this.accel = Vector2.zero();
        this.tmp = Vector2.createArray(6);

        this.baseRect = new Rectangle(base.x - 20, base.y - 20, 40, 40, 'cyan');
        this.modelRect = new Rectangle(this.pos.x - 20, this.pos.y - 20, 40, 40, 'red');

    }

    update(dt) {
        let { tmp, x, x_rest, dx, accel, b, k, m, g, pos, prevPos, base } = this;
        // tmp[1].set(dx).smult(-b); // -bx'
        // tmp[2].set(x).sub(x_rest).smult(-k);  // -kx
        // accel.set(tmp[1].add(tmp[2])).sdiv(m).add(g);
        accel.weightSum(0, dx, -b, pos, -k, x_rest, k).sdiv(m).add(g);

        dx.add(tmp[0].set(this.accel).smult(dt));
        prevPos.set(pos);
        pos.add(tmp[0].set(this.dx).smult(dt));

        this.modelRect.setCenter(pos.x, pos.y, 20 + 30 * m, 20 + 30 * m);
        this.baseRect.setCenter(base.x, base.y, 50 + 20 * b, 50 + 20 * b);
    }

    updateMouse(dt, mouse) {
        let { dx, pos, prevPos, base, mouseVelocityState, mouseVelocityScale } = this;

        //prevPos.set(pos);
        pos.set(mouse);

        mouseVelocityState.x.add(mouseVelocityScale * (pos.x - prevPos.x) / dt)
        mouseVelocityState.y.add(mouseVelocityScale * (pos.y - prevPos.y) / dt)

        dx.set(mouseVelocityState.x.value, mouseVelocityState.y.value);

        this.modelRect.setCenter(pos.x, pos.y);
        this.baseRect.setCenter(base.x, base.y);
        showLog('SELECTED:\ndx: ' + dx.toFixedP(2)
            + '\npos: ' + pos.toFixedP(2)
            + '\nprevPos: ' + prevPos.toFixed(2)
            + '\nk: ' + this.k.toFixed(2) + ' m: ' + this.m.toFixed(2) + ' b: ' + this.b.toFixed(2));

    }

    draw(ctx, viewbox = null) {
        this.drawSpring(ctx, viewbox);
        this.baseRect.draw(ctx, viewbox);
        this.modelRect.draw(ctx, viewbox);
    }

    drawSpring(ctx, viewbox) {

        var { tmp, k, m, b, baseRect, modelRect } = this,
            loadPos = modelRect.center,
            basePos = baseRect.center,
            coilNum = ~~(k),
            coilWidth = m * 20,
            coil = tmp[0].vset(loadPos).sub(basePos),
            coilLen = coil.mag(),
            coilRot = coil.phase(),
            coilStart = tmp[1],
            coilEnd = tmp[2],
            coilCenter = tmp[3],
            coilSegment = tmp[4];


        ctx.strokeStyle = 'white';
        ctx.lineWidth = 7 + 5 * b;

        // "Red coils" (longer)
        for (var i = 0; i < coilNum; ++i) {
            coilStart.vset(coil).smult(Math.max((i - 1 / coilNum) / coilNum, 0)).add(basePos);
            coilEnd.vset(coil).smult(Math.min((i + 1 + 1 / coilNum) / coilNum, 1)).add(basePos);
            coilSegment.vset(coilEnd).sub(coilStart);
            coilCenter.vset(coilSegment).smult(0.5).add(coilStart);

            ctx.beginPath();
            ctx.ellipse(coilCenter.x, coilCenter.y, // Center radius
                coilSegment.mag() / 2, coilWidth, // radiusX && radiusY
                coilRot, // rotation
                0, Math.PI, // start & end angle
                false);
            ctx.stroke();


            if (i < coilLen - 1) {
                coilStart.vset(coilEnd);
                coilEnd.vset(coil).smult((i + 1 - 1 / coilNum) / coilNum, 1).add(basePos);
                coilSegment.vset(coilEnd).sub(coilStart);
                coilCenter.vset(coilSegment).smult(0.5).add(coilStart);

                ctx.beginPath();
                ctx.ellipse(coilCenter.x, coilCenter.y, // Center radius
                    coilSegment.mag() / 2, coilWidth, // radiusX && radiusY
                    coilRot, // rotation
                    Math.PI, 0, // start & end angle
                    false);
                ctx.stroke();
            }
        }


    }
}

function createSlider(label = '', range = [0, 1], step = 0.01, value = 0.5, oninput = null, appendTo = null) {
    var nodes = {
        container: document.createElement('div'),
        label: document.createElement('label'),
        input: document.createElement('input'),
        value: document.createElement('span'),
    };
    nodes.container.appendChild(nodes.label);
    nodes.container.appendChild(nodes.input);
    nodes.container.appendChild(nodes.value);
    nodes.label.textContent = label;

    var i = nodes.input;
    i.type = 'range';
    i.min = range[0];
    i.max = range[1];
    i.step = step;
    i.value = value;
    i.addEventListener('input', oninput);

    var updateFn = (e) => nodes.value.textContent = e.target.value;
    i.addEventListener('input', updateFn);
    updateFn({ target: nodes.input });

    if (appendTo)
        appendTo.appendChild(nodes.container);

    return nodes;
}


//#region App
class App {
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    debugInfoNode = document.createElement('div');
    fpsNode = document.createElement('div');

    FPS = null;
    INTERVAL = null;
    STEP = null;
    MAXSTEP = 1 / 20;

    controls = {
        left: false,
        up: false,
        right: false,
        down: false,
        shift: false,
        ctrl: false,
        alt: false,
        space: false,
        mouse: {
            hold: false,
            holding: [],
            screen: new Vector2(),
            pos: new Vector2(),
            update: () => {
                var m = this.controls.mouse;
                m.pos.set(
                    m.screen.x / this.camera.scale + this.camera.xView,
                    m.screen.y / this.camera.scale + this.camera.yView
                );
                return m.pos;
            }
        }
    }

    room = new Rectangle(-25e3, -25e3, 50e3, 50e3);
    map = new MapStars(this.room);

    constructor(mainNode, controlsNode) {
        // Setup nodes
        this.node = mainNode;
        this.controlsNode = controlsNode;
        this.node.appendChild(this.canvas);
        this.controlsNode.appendChild(this.debugInfoNode);
        this.controlsNode.appendChild(this.fpsNode);
        this.fpsNode.classList.add('pre-wrap', 'margin-top');
        this.controlsNode.classList.add('pre-wrap');
        window.showLog = (s) => this.showLog(s);

        // Setup canvas & base FPS
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setFPS(50);

        this.map.generate(1000);


        // Set the right viewbox size for the camera
        var vWidth = Math.min(this.room.width, this.canvas.width);
        var vHeight = Math.min(this.room.height, this.canvas.height);

        // Setup player
        this.player = new Player(0, 0);
        this.player.speed = 2000;
        let rn = (variance = 1, mean = 0) => 2 * variance * (Math.random() - 0.5) + mean;
        let ri = (n2 = 1, n1 = 0) => (n2 - n1) * Math.random() + n1;
        this.springs = new Array(60).fill(0).map(() => {
            let base = new Vector2(rn(25000), rn(25000)),
                restPos = base.c().add(new Vector2(0, ri(5000))),
                initialPos = new Vector2(rn(25000), rn(25000)),
                initialV = new Vector2(rn(200), rn(200)),
                k = ri(50, 5),
                m = ri(5, 1 / 10),
                b = ri(10, 0.5),
                g = 9.8;

            return new Spring(base, restPos, initialPos, initialV, k, m, b, g);
        });
        // this.springs = [new Spring(
        //     new Vector2(0, 0),
        //     new Vector2(100, 0),
        //     new Vector2(100, 0),
        //     new Vector2(0, 0),
        //     7, 2, 0, 0)];


        // Setup camera
        this.camera = new Camera(0, 0,
            vWidth, vHeight,
            this.room.width, this.room.height);
        this.camera.follow(this.player, this.room.width, this.room.height);


        window.addEventListener("keydown", (e) => {
            if (e.key !== 'F12') e.preventDefault();
            this.controls.ctrl = e.ctrlKey;
            this.controls.shift = e.shiftKey;
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
                case 'alt':
                    this.controls.alt = true;
                    break;
                case ' ':
                    this.controls.space = true;
                    break;

            }
        }, false);

        window.addEventListener("keyup", (e) => {
            if (e.key !== 'F12') e.preventDefault();
            e.preventDefault();
            this.controls.ctrl = e.ctrlKey;
            this.controls.shift = e.shiftKey;
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
                case 'alt':
                    this.controls.alt = false;
                    break;
                case ' ':
                    this.controls.space = false;
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
            this.camera.setScale(this.camera.scale *= 1.1 ** (e.deltaY / 50));
            this.camera.update();
            this.controls.mouse.update();
            if (this.runningId == -1)
                this.draw();
        }, { passive: false })

        // Detect resize and adjust canvas to it
        window.addEventListener('resize', (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.camera.update();
            this.controls.mouse.update();
            if (this.runningId == -1)
                this.draw();
        })

        // Allow clicking!
        this.canvas.addEventListener('mousemove', (e) => {
            this.controls.mouse.screen.set(e.offsetX, e.offsetY);
            this.controls.mouse.update();
            if (this.runningId == -1) {
                this.clearLog();
                this.showLog('Mouse: ' + this.controls.mouse.pos.toFixed(2));
            }
        });
        this.canvas.addEventListener('mousedown', (e) => {
            this.controls.mouse.hold = true;
            this.controls.mouse.screen.set(e.offsetX, e.offsetY);
            var p = this.controls.mouse.update();
            for (let spring of this.springs)
                if (spring.modelRect.pointInside(p.x, p.y))
                    this.controls.mouse.holding.push(spring);

        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.controls.mouse.hold = false;
            this.controls.mouse.screen.set(e.offsetX, e.offsetY);
            this.controls.mouse.update();
            this.controls.mouse.holding = [];
        });
    }

    setFPS(n) {
        this.FPS = n;
        this.INTERVAL = 1000 / this.FPS; // milliseconds
        this.STEP = this.INTERVAL / 1000 // seconds
    }

    update(dt) {
        if (dt === undefined || dt > this.MAXSTEP) dt = this.MAXSTEP;
        if (this.controls.alt) dt /= 8;
        this.metrics.dt.add(dt);
        this.metrics.update.start();

        this.player.update(dt, this);
        this.camera.update(this.canvas.width, this.canvas.height);
        this.controls.mouse.update();

        this.springs.forEach(x => x.update(dt));
        this.controls.mouse.holding.forEach(x => x.updateMouse(dt, this.controls.mouse.pos));

        this.metrics.update.end();
    }

    draw() {
        this.metrics.draw.start();
        var ctx = this.context;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        this.camera.applyT(ctx);
        this.map.draw(ctx, this.camera);

        this.player.draw(ctx, this.camera);
        this.springs.forEach(x => x.draw(ctx, this.camera.viewboxRect));

        ctx.restore();
        this.metrics.draw.end();
    }

    lastTimestamp = 0;
    gameloop(timestamp = 0) {
        var dt = timestamp - this.lastTimestamp;
        this.clearLog();
        this.update(dt / 1e3);
        this.draw();
        this.updateFPSCounter(dt);
        this.lastTimestamp = timestamp;
    }

    gameloopRef = (x) => {
        // Reset ref ID
        this.runningId = -1;
        this.play();
        // Actually do gameloop   
        this.gameloop(x);
    }

    showLog(str) {
        var e = this.debugInfoNode;
        e.textContent += str + '\n';
    }

    clearLog() {
        var e = this.debugInfoNode;
        e.textContent = '';
    }


    metrics = {
        update: new PerfomanceMetric(100),
        draw: new PerfomanceMetric(20),
        dt: new PerfomanceMetric(20),
        fps: new PerfomanceMetric(20, 1e3 / 60),
    }

    updateFPSCounter(n) {
        var fps = this.metrics.fps.add(n);
        var draw = this.metrics.draw.value;
        var update = this.metrics.update.value;
        var dt = this.metrics.dt.value;

        this.fpsNode.textContent = `Fps = ${(1000 / fps).toFixed(3)}; `
            + `\nDraw time = ${~~(1000 * draw)}us (${(100 * draw / fps).toFixed(3)}% frame time); `
            + `\nUpdate = ${~~(1000 * update)}us (${(100 * update / fps).toFixed(3)}% frame time); `
            + `\n1/dt = ${(1 / dt).toFixed(3)} Hz; `
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

//#endregion App

//#region Load stuff
function onWindowLoad() {
    window.app = new App(document.getElementById('main'), document.getElementById('controls'));
    window.app.play();
}

function onWindowUnload() {

}

window.addEventListener('load', onWindowLoad);

window.addEventListener('beforeunload', onWindowUnload);

//#endregion