let min = 1;
let max = 100;
let perfectOnly = false;

let graph;
let graphOptions = {
    showCurrentTime: false,
    showMajorLabels: false,
    moveable: false,
    zoomable: false,
    sort: false,
    sampling: false,
    start: min - 1,
    end: max + 1,
    drawPoints: {
        enabled: true,
        size: 4,
        style: 'circle'
    },
    style: 'points',
    dataAxis: {
        left: {
            title: {
                text: 'SoF(x) / x'
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    graph = new vis.Graph2d(document.getElementById('vis'), [], graphOptions);
    updatePoints();
});

function perfectness(num) {
    return sumOfFactors(num) / num;
}

function sumOfFactors(num) {
    let sum = 1;

    let half = Math.floor(num / 2);
    for (let i = 2; i <= half; i++) {
        if (num % i === 0) {
            sum += i;
        }
    }

    return sum + num;
}

function setGraphStyle() {
    let style = document.getElementById('graphStyle').value;

    switch (style) {
        case 'line':
            graphOptions.style = 'line';
            graphOptions.drawPoints.enabled = false;
            break;
        case 'points':
            graphOptions.style = 'points';
            graphOptions.drawPoints.enabled = true;
            break;
        case 'both':
            graphOptions.style = 'line';
            graphOptions.drawPoints.enabled = true;
            break;
        default:
            console.error(`Unknown graph style: ${style}.`);
            break;
    }

    graph.setOptions(graphOptions);
}

function updatePoints() {
    let newMin = parseInt(document.getElementById('minNumber').value);
    let newMax = parseInt(document.getElementById('maxNumber').value);

    // TODO: Optimize this.
    min = newMin;
    max = newMax;

    let points = [];
    for (let i = min; i <= max; i++) {
        let p = perfectness(i);
        if (!perfectOnly || p % 1 === 0) {
            points.push({
                x: i,
                y: p
            });
        }
    }
    graph.setItems(points);

    graphOptions.start = min - 1;
    graphOptions.end = max + 1;
    graph.setOptions(graphOptions);
}

function setPerfectOnly() {
    perfectOnly = document.getElementById('perfectOnly').checked;
    updatePoints();
}
