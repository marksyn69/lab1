# 🧰 REST API Helpdesk (Express.js, без бази даних)

Навчальний проєкт REST API helpdesk-системи на Node.js + Express без використання бази даних.
API підтримує реєстрацію, авторизацію користувачів, створення заявок (тикетів), коментарі та базові перевірки безпеки.

## 🚀 Вимоги

Перед початком переконайтесь, що у вас встановлено:

- **Node.js** v18 або новіше
- **npm** (йде разом із Node.js)
- Будь-який текстовий редактор (наприклад, VS Code)
- PowerShell або термінал (Windows/Linux/macOS)

## 📁 Створення проєкту

У терміналі введіть команди:
```bash
mkdir express-helpdesk-no-db
cd express-helpdesk-no-db
npm init -y
```

Встановіть необхідні залежності:
```bash
npm install express cors helmet dotenv express-rate-limit bcryptjs jsonwebtoken express-validator morgan nanoid
npm install -D eslint
```

## ⚙️ Налаштування скриптів

Відкрийте файл `package.json` і замініть розділ `"scripts"` на:
```json
"scripts": {
  "dev": "node --watch src/index.js",
  "start": "node src/index.js"
}
```

## 🏗️ Запуск проєкту

Перейдіть у папку з проєктом (якщо ще не там):
```bash
cd express-helpdesk-no-db
```

Встановіть залежності:
```bash
npm install
```

Запустіть сервер у режимі розробки:
```bash
npm run dev
```

або у звичайному режимі:
```bash
npm start
```

Після запуску в консолі з'явиться повідомлення:
```
API listening on http://localhost:3000
```

## 🧪 Перевірка роботи API

### PowerShell

⚠️ Команди нижче виконуються у PowerShell. Якщо ви користуєтесь Linux або macOS, використовуйте `curl`.

#### Перевірка стану API
```powershell
Invoke-WebRequest -Uri http://localhost:3000/health -UseBasicParsing
```

Очікувана відповідь:
```json
{ "status": "ok" }
```

#### Реєстрація нового користувача
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/auth/register" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body (@{ email="user1@example.com"; password="password123" } | ConvertTo-Json)
```

#### Авторизація (логін)
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body (@{email = "user1@example.com"; password = "password123" } | ConvertTo-Json)

$TOKEN = $response.data.access_token
echo $TOKEN
```

#### Створення тикета
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/tickets" `
  -Method Post `
  -Headers @{
      "Content-Type" = "application/json"
      "Authorization" = "Bearer $TOKEN"
  } `
  -Body '{"title":"Проблема з входом","description":"Не можу зайти","priority":"high"}'
```

#### Перегляд списку тикетів
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/tickets" `
  -Headers @{ "Authorization" = "Bearer $TOKEN" }
```

## 🛡️ Перевірка безпеки

### ✅ IDOR (несанкціонований доступ)

Зареєструйте другого користувача:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/auth/register" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body (@{ email="user2@example.com"; password="password123" } | ConvertTo-Json)
```

Увійдіть під новим користувачем і отримайте токен.

Спробуйте переглянути тикет іншого користувача:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/tickets/{id_чужого_тикета}" `
  -Headers @{ "Authorization" = "Bearer $TOKEN" }
```

**Очікувано:** помилка `403 Forbidden` або `404 Not Found`.

### ✅ Rate Limit (захист від спаму)

Надішліть понад 20 запитів на логін за хвилину:
```powershell
for ($i=0; $i -lt 25; $i++) {
  Invoke-RestMethod -Uri "http://localhost:3000/auth/login" `
    -Method Post `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body (@{ email="user1@example.com"; password="password123" } | ConvertTo-Json)
}
```

**Очікувано:** після ~20 запитів отримаєте помилку `429 Too Many Requests`.

### ✅ Mass Assignment (захист від підміни ролей)
```powershell
$body = @{
    email    = "user3@example.com"
    password = "password123"
    role     = "ADMIN"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/auth/register" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body $body
```

**Очікувано:** користувач буде створений із роллю `USER`, не `ADMIN`.

## 👩‍💻 Облікові записи за замовчуванням

| Роль             | Email                | Пароль     |
|------------------|----------------------|------------|
| Адміністратор    | admin@example.com    | admin1234  |

## 📄 Корисна інформація

- `JWT_SECRET` та інші параметри безпеки зберігаються у `.env`
- Дані зберігаються у пам'яті, тому після перезапуску серверу вони очищуються