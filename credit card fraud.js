document.addEventListener("DOMContentLoaded", function () {
    // Live fraud count update simulation
    let fraudCountElement = document.getElementById("fraudCount");
    let fraudCount = parseInt(fraudCountElement.innerText.replace(/,/g, ""));
    setInterval(() => {
        fraudCount += Math.floor(Math.random() * 10) + 1; // Random increase
        fraudCountElement.innerText = fraudCount.toLocaleString();
    }, 3000);

    // Fraud Risk Analysis
    document.getElementById("fraudForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let amount = document.getElementById("amount").value;
        let location = document.getElementById("location").value;
        let merchant = document.getElementById("merchant").value;
        
        let riskScore = Math.floor(Math.random() * 100) + 1; // Generate a random risk score
        let resultElement = document.getElementById("result");
        resultElement.innerHTML = `<p>Risk Score: <strong>${riskScore}%</strong> - ${riskScore > 75 ? "High Fraud Risk! ⚠️" : "Low Fraud Risk ✅"}</p>`;
    });

    // Fraud Chart Initialization (Mock Chart.js Usage)
    let ctx = document.getElementById("fraudChart").getContext("2d");
    let fraudChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Fraud Cases",
                data: [20, 45, 30, 60, 50, 80, 90],
                backgroundColor: "rgba(0, 195, 255, 0.2)",
                borderColor: "#00c3ff",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
