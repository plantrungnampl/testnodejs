const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Test API')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.json());
let users = [
    {
        id: 1, name: "Nguyen van Nam", email: "nguyenvannam1234@gmail.com"
    },
    {
        id: 2, name: "An Trung Nam", email: "Antrungnam1234@gmail.com"
    },
    {
        id: 3, name: "Pham thi ngan", email: "phamthingan@gmail.com"
    },
    {
        id: 4, name: "Nguyen phuong anh", email: "Nguyenphuonganh@gmail.com"
    }
]
app.get('/users', (req, res) => {
    res.json(users)
})


app.post('/users', (req, res) => {
    const addUsers = req.body;
    const duplicated = users.find(item => item.email === addUsers.email)
    if (duplicated) {
        return res.status(409).json({ error: 'email này đã được sử dụng' });
    }
    users.push(addUsers);

    res.status(201).json(addUsers);
});

app.use((req, res) => {
    res.status(404).json({ error: "Đã có lỗi gì đó" });
});

app.use((err, res) => {
    res.status(500).json({ error: 'Lỗi máy chủ' });
});