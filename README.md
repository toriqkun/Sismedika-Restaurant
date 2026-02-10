###  Restaurant POS System (Sismedika)

Sistem Point of Sales (POS) Restoran berbasis Laravel 12 (API) dan React.js (Frontend) dengan role Pelayan dan Kasir.
---

### ✨ Fitur Utama
### 👤 Role & Akses

### Pelayan
- Melihat meja
- Membuka order
- Menambahkan menu ke order
- Mengirim pesanan ke dapur (finish order)
### Kasir
- Melihat daftar order
- Melihat detail order (receipt)
- Menutup order (close order)
- Generate receipt PDF
### Tamu / Belum Login
- Hanya dapat melihat daftar meja

---

🪑 Meja

### Status meja:
- available
- occupied
- reserved
- inactive

### Klik meja sesuai role & status

🍔 Menu

### CRUD menu (khusus Pelayan)
### Kategori:
- Makanan
- Minuman
### Upload gambar menu

🧾 Order Flow
```
available → open → finished → closed
```

🧰 Tech Stack
### Backend
- Laravel 12
- MySQL
- Laravel Sanctum
- DomPDF (Receipt)

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

## 🚀 BACKEND SETUP (Laravel 12)
### 1️⃣ Clone Repository Backend
```bash
git clone <repo-backend-url>
cd sismedika
```
### 2️⃣ Install Dependency
```bash
composer install
```
### 3️⃣ Copy Environment File
```bash
cp .env.example .env
```
### 4️⃣ Konfigurasi .env
```env
APP_NAME=Sismedika
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_pos
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
```
### 5️⃣ Generate App Key
```bash
php artisan key:generate
```
### 6️⃣ Jalankan Migration & Seeder
```bash
php artisan migrate:fresh --seed
```

Seeder akan membuat:
- User pelayan
- User kasir
- 24 meja default

### 7️⃣ Storage & Upload
```bash
php artisan storage:link
```

Pastikan folder:
```swift
public/uploads/foods
public/uploads/avatars
```
### 8️⃣ Jalankan Server Backend
```bash
php artisan serve
```

Backend berjalan di:
```bash
http://127.0.0.1:8000
```

## 🚀 FRONTEND SETUP (React + Vite)
### 1️⃣ Masuk Folder Frontend
```bash
cd sismedika-frontend
```
### 2️⃣ Install Dependency
```bash
npm install
```
### 3️⃣ Konfigurasi Axios

📄 src/api/axios.js
```
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```
### 4️⃣ Jalankan Frontend
```bash
npm run dev
```

Frontend berjalan di:
```bash
http://localhost:5173
```

## 🔐 Akun Default (Seeder)
### 👨‍🍳 Pelayan
```makefile
Email: pelayan@mail.com
Password: password
```
### 💰 Kasir
```makefile
Email: kasir@mail.com
Password: password
```

## 📍 Routing Frontend
Path	                        Akses
/	                            Landing Page
/login	                      Login
/tables	                      Semua role & tamu
/pelayan/open/:tableId	      Pelayan
/foods	                      Pelayan
/kasir/orders	                Kasir
/orders/:id	                  Kasir

## 📍 API Endpoint Ringkas
### Auth
- POST /login
- POST /logout
- GET /profile

### Table
- GET /tables
  
### Food
- GET /foods
- POST /foods
- POST /foods/{id}
- DELETE /foods/{id}

### Order
- POST /orders/open
- POST /orders/add-item
- POST /orders/finish
- POST /orders/close
- GET /orders
- GET /orders/{id}
- GET /orders/{id}/receipt

## 🧠 Catatan Penting
- Pelayan tidak bisa menutup order
- Kasir tidak bisa menambah menu
- Order detail hanya bisa diakses kasir
- Meja tidak menyimpan order_id, menggunakan active_order_id dari relasi
