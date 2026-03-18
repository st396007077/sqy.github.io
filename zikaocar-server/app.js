const express = require('express');
const cors = require('cors');
const app = express();

// ✅ 1. 跨域配置（允许你的GitHub Pages访问）
app.use(cors({
  origin: 'https://st396007077.github.io', // 你的前端域名（固定）
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// ✅ 2. 解析JSON请求体
app.use(express.json());

// ✅ 3. 模拟订单存储（Render 免费版重启后数据会丢失，仅测试用）
let orderList = [];

// ✅ 4. 提交订单接口（和前端对应）
app.post('/api/submitOrder', (req, res) => {
  const { userName, total, carList } = req.body;
  const orderId = 'ORD' + Date.now();
  orderList.push({
    userName,
    total,
    carList,
    orderId,
    createTime: new Date().toLocaleString()
  });
  res.json({
    code: 0,
    msg: '提交成功',
    orderId
  });
});

// ✅ 5. 查询订单接口（和前端对应）
app.get('/api/queryOrder', (req, res) => {
  const { userName } = req.query;
  const result = orderList.filter(item => item.userName === userName);
  res.json({
    code: 0,
    data: result
  });
});

// ✅ 6. 适配 Render 端口（Render 会自动分配端口，不能写死3000）
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`服务启动成功，端口：${port}`);
});