# 22IT242_GK

Sinh viên: 22IT242 — Hoàng Minh Quý

Ứng dụng: My Tasks (Next.js + Ionic React + Capacitor)

I. Yêu cầu hệ thống
- Node.js 20+ và npm
- Android Studio (cho Android) / Xcode 16+ (cho iOS)

II. Cài đặt
```powershell
Set-Location D:\22IT242_GK\my-tasks
npm install
```

III. Chạy trên Web (Dev)
```powershell
npm run dev
```
Mở trình duyệt: http://localhost:3000

- Nếu cổng 3000 bận:
```powershell
npm run dev -- -p 3001
```
Mở: http://localhost:3001

IV. Build Static (cho Capacitor)
```powershell
npm run build
```
Kết quả static sẽ nằm trong thư mục `out` (theo `next.config.mjs` với `output: 'export'`).

V. Đồng bộ sang dự án native
```powershell
npm run cap:sync
```

VI. Mở dự án native
```powershell
npm run cap:open:android   # mở Android Studio
npm run cap:open:ios       # mở Xcode
```

Ghi chú:
- Cấu hình Capacitor: `my-tasks/capacitor.config.ts` (`webDir: 'out'`).
- UI sử dụng Ionic React; dữ liệu lưu cục bộ bằng `@capacitor/preferences`.
- Khi đổi UI/logic, hãy `npm run build` rồi `npm run cap:sync` trước khi mở Android/iOS.