# 99Tech Code Challenge #1

Note that if you fork this repository, your responses may be publicly linked to this repo.  
Please submit your application along with the solutions attached or linked.

It is important that you minimally attempt the problems, even if you do not arrive at a working solution.

## Submission

You can either provide a link to an online repository, attach the solution in your application, or whichever method you prefer.
We're cool as long as we can view your solution without any pain.

## 📌 Cài đặt

### 1️⃣ Clone repository:

```bash
git clone https://github.com/Phuc1206/Nguyen-Xuan-Phuc.git
cd Nguyen-Xuan-Phuc
```

### 2️⃣ Cài đặt các phụ thuộc:

```bash
npm install
```

### 3️⃣ Tạo file `.env` và cấu hình thông tin database:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydatabase(thêm url database)
```

## ▶️ Chạy ứng dụng

### 🔧 Chạy ứng dụng trong môi trường phát triển:

```bash
npm run dev
```

### 🚀 Chạy ứng dụng trong môi trường sản xuất:

```bash
npm start
```

## 📡 API Routes

| Method     | Endpoint             | Description                         |
| ---------- | -------------------- | ----------------------------------- |
| **POST**   | `/api/resources`     | Tạo mới resource                    |
| **GET**    | `/api/resources`     | Lấy danh sách resources (có filter) |
| **GET**    | `/api/resources/:id` | Lấy chi tiết resource theo ID       |
| **PUT**    | `/api/resources/:id` | Cập nhật resource theo ID           |
| **DELETE** | `/api/resources/:id` | Xóa resource theo ID                |

## 🛠 Thư viện sử dụng

✅ ExpressJS  
✅ MongoDB  
✅ Mongoose  
✅ TypeScript  
✅ dotenv  
✅ body-parser  
✅ cors  
✅ helmet
