const cvs = document.querySelector('#c');
const ctx = cvs.getContext('2d');

cvs.width = 1080;
cvs.height = 620;

const CW = cvs.width;
const CH = cvs.height;
const CW2 = CW / 2;
const CH2 = CH / 2;

let angle = 0;

const proj = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

const rotZMat = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0 , 0, 1]
    ];
}

const rotXMat = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0 , Math.sin(angle), Math.cos(angle)]
    ];
}

const rotYMat = (angle) => {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ];
}

function multMat(matrix, vertex) {
    const x = vertex.x;
    const y = vertex.y;
    const z = vertex.z;

    return {
        x: matrix[0][0] * x + matrix[0][1] * y + matrix[0][2] * z,
        y: matrix[1][0] * x + matrix[1][1] * y + matrix[1][2] * z,
        z: matrix[2][0] * x + matrix[2][1] * y + matrix[2][2] * z
    };
}


class Vertex {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const drawVertex = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

const P = []; // vertices, points
const center = new Vertex(CW2, CH2, 0);

const init = () => {
    P[0] = new Vertex(400, 200, -100);
    P[1] = new Vertex(600, 200, -100);
    P[2] = new Vertex(400, 400, -100);
    P[3] = new Vertex(600, 400, -100);
    P[4] = new Vertex(400, 200, 100);
    P[5] = new Vertex(600, 200, 100);
    P[6] = new Vertex(400, 400, 100);
    P[7] = new Vertex(600, 400, 100);
}

const engine = () => {
    angle += 0.02;

    ctx.clearRect(0, 0, cvs.width, cvs.height);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    for (let v of P) {
        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        let rotated = multMat(rotYMat(angle), translated);
        rotated = multMat(rotXMat(angle), rotated);
        rotated = multMat(rotZMat(angle), rotated);
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        let proj2D = multMat(proj, movedBack);
        
        drawVertex(proj2D.x, proj2D.y);
    }

    requestAnimationFrame(engine);
}

init();
engine();
