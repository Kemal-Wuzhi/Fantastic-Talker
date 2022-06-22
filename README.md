# Fantastic-Talker

此專案為參考線上英語教學平台 Amazing Talker 所建立的線上英語教學平台，提供： 1.使用者瀏覽教師資訊 2.使用者預約教師課程 3.教師撰寫課程相關介紹 4.課程預約 連結至 google calendar
等功能。

專案技術主要為：Node.js, Express, bcryptjs, passport, MySQL, Sequelize, JWT, Google calendar api,

## 使用流程

#### 複製專案到本機

```
git clone https://github.com/Kemal-Wuzhi/Fantastic-Talker
```

#### 進入專案資料夾

```
cd Fantastic-Talker
```

#### 安裝相關套件

```
npm install
```

#### 環境設定

依照 .env.example 中資訊範例新增一個名稱為 .env 的檔案

```
JWT_SECRET=
refresh_token=
ClientId=
ClientSecret=
CREDENTIALS=
CALENDAR_ID=
IMGUR_CLIENT_ID=
```

#### 資料庫

1. 設定 MySQL 連線資訊: 在 ./config/config.json，請確保 MySQL Server 帳號密碼與 username、password 一致

```
  {
  "development": {
    "username": "root",
    "password": "password",
    "database": "fantastic_talker_workspace",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "dialectOptions": "useUTC:false",
    "timezone": "+8:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "fantastic_talker_workspace_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

2. 登入 MySQL Workbench 後，在 SQL File 輸入並執行

```
create database fantastic_talker_workspace
create database fantastic_talker_workspace_test
```

3. 建立資料庫 table，在終端機輸入

```
npx sequelize db:migrate
```

4. 建立種子資料

```
npx sequelize db:seed:all
```

#### 啟動本地端伺服器

需先安裝 [nodemon](https://www.npmjs.com/package/nodemon)

```
npm run dev
```

#### 成功執行

```
Example app listening on port <PORT>
```

#### 測試帳號

```
* 後台 admin
email: admin@example.com
password: 12345678
```

```
* 一般使用者
email: user1@example.com
password: 12345678
```

```
* 老師
email: teacher@example.com
password: 12345678
```

## 環境建置

- [Node.js](https://nodejs.org/)(v16.13.0)
- [Express](https://expressjs.com/)
- [MySQL](https://downloads.mysql.com/archives/installer/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (v8.0.27)
- [sequelize](https://sequelize.org/)
- [sequelize-cli](https://github.com/sequelize/cli)
- .env

## 相關資訊

[API 文件](https://hackmd.io/Nvudq7N3Tne_8L-58PEfAg?view)
