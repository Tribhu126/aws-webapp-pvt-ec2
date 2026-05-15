const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;


// =========================
// Helper Function
// =========================
async function getMetadata(path) {

    try {

        const response = await axios.get(
            `http://169.254.169.254/latest/meta-data/${path}`,
            {
                timeout: 1000
            }
        );

        return response.data;

    } catch (err) {

        console.error(`Metadata error (${path}):`, err.message);

        return "Unavailable";
    }
}


// =========================
// Main Route
// =========================
app.get("/", async (req, res) => {

    const instanceId = await getMetadata("instance-id");

    const availabilityZone = await getMetadata(
        "placement/availability-zone"
    );

    const hostname = await getMetadata("hostname");

    res.send(`

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AWS Scalable Web Application</title>

<style>

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0f172a;
    color: #e2e8f0;

    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 100vh;

    padding: 20px;

    box-sizing: border-box;
}

.container {

    width: 100%;
    max-width: 900px;

    background: #1e293b;

    border-radius: 18px;

    padding: 40px;

    box-shadow:
        0 15px 40px rgba(0,0,0,0.35);
}

h1 {
    margin-top: 0;

    font-size: 2.3rem;

    background:
        linear-gradient(90deg, #38bdf8, #6366f1);

    -webkit-background-clip: text;

    color: transparent;
}

.subtitle {
    color: #cbd5e1;
    line-height: 1.7;
    margin-bottom: 30px;
}

.grid {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(240px, 1fr));

    gap: 20px;
}

.card {

    background: #020617;

    border-radius: 14px;

    padding: 20px;

    border:
        1px solid rgba(255,255,255,0.06);
}

.card h2 {
    margin-top: 0;
    color: #38bdf8;
    font-size: 1.05rem;
}

.value {
    font-size: 1rem;
    line-height: 1.6;
    word-break: break-word;
}

.architecture {
    margin-top: 35px;
}

.architecture ul {
    line-height: 1.9;
    padding-left: 20px;
}

.footer {
    margin-top: 35px;
    color: #94a3b8;
    font-size: 0.95rem;
}

.badge {
    display: inline-block;

    margin-top: 10px;

    padding: 8px 12px;

    border-radius: 999px;

    background: rgba(56,189,248,0.12);

    color: #7dd3fc;

    font-size: 0.9rem;
}

@media (max-width: 768px) {

    .container {
        padding: 28px;
    }

    h1 {
        font-size: 1.9rem;
        line-height: 1.2;
    }
}

</style>
</head>

<body>

<div class="container">

    <h1>AWS Scalable Web Application</h1>

    <p class="subtitle">
        Highly available AWS infrastructure running behind an
        Application Load Balancer using Auto Scaling Groups,
        private EC2 instances, NAT Gateway, and immutable deployment concepts.
    </p>

    <div class="grid">

        <div class="card">
            <h2>Instance ID</h2>
            <div class="value">${instanceId}</div>
        </div>

        <div class="card">
            <h2>Availability Zone</h2>
            <div class="value">${availabilityZone}</div>
        </div>

        <div class="card">
            <h2>Hostname</h2>
            <div class="value">${hostname}</div>
        </div>

        <div class="card">
            <h2>Deployment Model</h2>
            <div class="value">
                Immutable / Stateless Infrastructure
            </div>
        </div>

    </div>

    <div class="architecture">

        <h2>Architecture Components</h2>

        <ul>
            <li>Application Load Balancer</li>
            <li>Auto Scaling Group</li>
            <li>Private EC2 Instances</li>
            <li>NAT Gateway</li>
            <li>Systems Manager</li>
            <li>CloudWatch Scaling Policies</li>
        </ul>

        <div class="badge">
            Auto Scaling Enabled
        </div>

    </div>

    <div class="footer">

        This project focuses on scalable AWS infrastructure,
        immutable deployment concepts, and cloud architecture patterns.

    </div>

</div>

</body>
</html>

    `);
});


// =========================
// Start Server
// =========================
app.listen(PORT, () => {

    console.log(`Application running on port ${PORT}`);
});