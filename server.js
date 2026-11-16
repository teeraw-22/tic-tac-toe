const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// เสิร์ฟไฟล์ Static จากโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));

// Health Check Endpoint สำหรับทำ Uptime / Readiness Probe
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(PORT, () => {
    console.log(`Tic Tac Toe app is running on port ${PORT}`);
});

