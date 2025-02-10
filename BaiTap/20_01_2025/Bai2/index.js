const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình sever static file
app.use(express.static(path.join(__dirname, 'public')));

// Đọc file Thông tin
const vehiclePlates = JSON.parse(fs.readFileSync(path.join(__dirname, 'VehiclePlates.txt'), 'utf-8'));

// API tên tỉnh thànhthành
app.get('/api/provinces', (req, res) => {
    const provinces = vehiclePlates.map(item => item.city);
    res.json(provinces);
});

// API Biển số xe các tỉnhtỉnh
app.get('/api/plate', (req, res) => {
    const province = req.query.province;
    const found = vehiclePlates.find(item => item.city === province);
    if (found) {
        res.json({ plate: found.plate_no });
    } else {
        res.json({ plate: null });
    }
});

// Khởi tạo server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
