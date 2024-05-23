const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-button");
const spinnerWrapper = document.querySelector(".spinner-wrapper");
const topicValue = document.getElementById("topic-value");
const selectedDisaster = document.getElementById("selected-disaster-wrapper");
const disasterImage = document.getElementById("disaster-image");

function normalizePath(path) {
    return path.replace(/^\/+/, '');
}

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: "Earthquake", img: normalizePath("assets/images/infographic/earthquake.png") },
    { minDegree: 31, maxDegree: 90, value: "Tsunami", img: normalizePath("assets/images/infographic/tsunami.png") },
    { minDegree: 91, maxDegree: 150, value: "Volcanic Eruption", img: normalizePath("assets/images/infographic/volcano.png") },
    { minDegree: 151, maxDegree: 210, value: "Flood", img: normalizePath("assets/images/infographic/floods.png") },
    { minDegree: 211, maxDegree: 270, value: "Landslide", img: normalizePath("assets/images/infographic/landslide.png") },
    { minDegree: 271, maxDegree: 330, value: "Typhoon", img: normalizePath("assets/images/infographic/typhoon.png") },
    { minDegree: 331, maxDegree: 360, value: "Earthquake", img: normalizePath("assets/images/infographic/earthquake.png") }
];

const data = [16, 16, 16, 16, 16, 16];
var pieColors = [
    "#FF481F",
    "#FF6542",
    "#FF481F",
    "#FF6542",
    "#FF481F",
    "#FF6542",
];

let chart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: ["Tsunami", "Earthquake", "Typhoon", "Landslide", "Flood", "Volcanic Eruption"],
        datasets: [
        {
            backgroundColor: pieColors,
            data: data,
        },
        ],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
        tooltip: false,
        legend: {
            display: false,
        },
        datalabels: {
            color: "#000000",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 20 }
        },
        },
    },
});

function valueGenerator(angleValue) {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            applyAnimationOnElement(selectedDisaster, 'animate__fadeIn');
            selectedDisaster.style.display = 'block';
            topicValue.innerHTML = `<p>${i.value}</p>`;
            spinBtn.disabled = false;
            disasterImage.src = i.img;
            break;
        }
    }
};

function closeGuide() {
    selectedDisaster.style.display = 'none';
}

function viewGuide() {
    if (disasterImage.src) {
        window.open(disasterImage.src, '_blank');
    }
}

let count = 0;
let resultValue = 101;

function spinWheel() {
    spinBtn.disabled = true;
    selectedDisaster.style.display = 'none';
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
        chart.options.rotation = chart.options.rotation + resultValue;
        chart.update();
        if (chart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            chart.options.rotation = 0;
        } else if (count > 15 && chart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
            spinBtn.disabled = false;
        }
    }, 10);
}