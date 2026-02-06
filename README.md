# Full-Stack Task Manager App (Flutter & Node.js)

This project is a comprehensive Task Management system built as part of a technical assessment. It features a cross-platform Flutter application and a robust Node.js/Express backend.

## 🚀 Features

### Frontend (Flutter)
- **Authentication**: Secure Login and Registration with JWT.
- **Token Management**: Secure storage using `flutter_secure_storage` and auto-token refresh using Dio Interceptors (handles 401 Unauthorized errors).
- **Task Dashboard**: Efficient task rendering with `ListView.builder` and Pull-to-refresh functionality.
- **CRUD Operations**: Full Add, Edit, Delete, and Toggle status capabilities.
- **Search & Filter**: Real-time task searching and status-based filtering (All/Pending/Completed).
- **State Management**: Implemented using the `Provider` package for a reactive UI.

### Backend (Node.js)
- **RESTful APIs**: Built with Express.js.
- **Database**: PostgreSQL/MySQL managed via Prisma ORM.
- **Security**: JWT-based authentication with Access and Refresh tokens.

---

## 🛠️ Tech Stack
- **Mobile**: Flutter, Provider, Dio, Flutter Secure Storage.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: Supabase/PostgreSQL.

---

## ⚙️ Setup & Installation

### 1. Backend Setup
1. Navigate to the `Backend` folder.
2. Run `npm install` to install dependencies.
3. Set up your `.env` file with your database URL and JWT secrets.
4. Run `npx prisma db push` to sync the schema.
5. Start the server: `npm run dev`.

### 2. Frontend Setup (Flutter)
1. Navigate to the `Assessment` folder.
2. Run `flutter pub get`.
3. **Important**: Update the `baseUrl` in `lib/services/api_service.dart` to your laptop's Local IP address (e.g., `http://10.0.2.2:5000/api`). #Current ip address
4. Connect your device and run: `flutter run`.

---

## 📱 Build APK
To generate the release build for testing:
```bash
flutter build apk --release
