# 🚀 คู่มือเริ่มต้นใช้งาน GameCenter (ภาษาไทย)

## ⚡ เริ่มใช้งานภายใน 5 นาที!

### ขั้นตอนที่ 1: ติดตั้ง
```bash
npm install --legacy-peer-deps
```
รอ 2-5 นาที

### ขั้นตอนที่ 2: รันในเบราว์เซอร์
```bash
npm start
```
เปิดที่ http://localhost:3000

### ขั้นตอนที่ 3: ทดสอบ
1. คลิก Register
2. กรอก:
   - Username: kate (3+ ตัวอักษร)
   - Email: kate@test.com (ต้องมี @)
   - Password: kate12 (6 ตัวพอดี)
   - Confirm: kate12
3. คลิก REGISTER
4. เห็นหน้า Home → สำเร็จ!

---

## 📱 รันบน Android Studio

### ขั้นตอนที่ 1: Build
```bash
npm run build
```

### ขั้นตอนที่ 2: Add Android
```bash
npx cap add android
```

### ขั้นตอนที่ 3: Sync
```bash
npx cap sync android
```

### ขั้นตอนที่ 4: เปิด Android Studio
```bash
npx cap open android
```

### ขั้นตอนที่ 5: รัน
1. รอ Gradle sync เสร็จ
2. คลิก ▶️ (Run)
3. เลือก emulator
4. แอปเปิดบน Android!

---

## ✅ ฟีเจอร์ทั้งหมด

### หน้า Login:
- ✅ Email + Password
- ✅ Validation

### หน้า Register:
- ✅ Username (min 3 ตัว)
- ✅ Email (ต้องถูกต้อง)
- ✅ Password (6 ตัวพอดี)
- ✅ Confirm Password
- ✅ แจ้งเตือนครบ

### หน้า Home:
- ✅ Stats (Games Played, High Score, Win Rate, Streak)
- ✅ Quick Play
- ✅ Tab Navigation

### หน้า Profile:
- ✅ User Info (Avatar, Username, Email)
- ✅ Badges (3 อัน)
- ✅ Achievements (6 อัน)
- ✅ Edit Profile Button
- ✅ Logout Button

### หน้า Edit Profile:
- ✅ เปลี่ยน Username
- ✅ เปลี่ยน Email
- ✅ เปลี่ยน Password (optional)
- ✅ Validation ครบ

### Tab Navigation:
- ✅ Icon เรืองแสงหน้าที่กำลังเปิดอยู่
- ✅ HOME / GAMES / PROFILE

### Logout:
- ✅ กลับหน้า Login
- ✅ ลบข้อมูล session

---

## 🐛 แก้ปัญหา

### ปัญหา: npm install error
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### ปัญหา: port 3000 ถูกใช้
```bash
PORT=3001 npm start
```

### ปัญหา: หน้าจอว่าง
กด Ctrl+Shift+R (Hard refresh)

### ปัญหา: Warning "instance[watchMethodName]"
**ไม่ต้องสนใจ!** แอปทำงานปกติ

---

## 📦 Build APK

ใน Android Studio:
```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

ไฟล์อยู่ที่: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🎯 Validation Rules

| Field | Rule |
|-------|------|
| Username | min 3 ตัว |
| Email | ต้องมี @ และ . |
| Password | 6 ตัวพอดี |
| Confirm | ต้องตรงกับ Password |

---

## 📱 Demo ให้อาจารย์

### บน Browser:
1. npm start
2. Register → Login → Home → Profile → Edit → Logout

### บน Android Studio:
1. npx cap open android
2. คลิก ▶️ Run
3. Demo บน Emulator

---

**พร้อมส่งอาจารย์แล้ว!** 🎉

สร้างโดย: Kate (Person 1)  
ไม่มี Error | ทำงานครบ | พร้อมรันบน Mobile
