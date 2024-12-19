# LineBotWithCopilotAgent

**LineBotWithCopilotAgent** is a project that integrates **Line Messaging API** with **Copilot Studio** to create a system that can interact with users through the Line chat platform. It uses AI from Copilot to assist in answering questions and providing various services.

## Features

- **Line Bot**: Can receive and send messages with users via the Line chat.
- **Copilot Agent**: Uses Copilot Studio to generate automated responses and assist users.
- **Message Sending**: Supports sending messages from users to Copilot and receiving AI-generated responses.

## Setup and Usage

### Project Setup Steps

1. **Install dependencies**:
   First, navigate to the project folder that you just cloned and run the following command to install all dependencies:
   ```bash
   cd LineBotWithCopilotAgent
   npm install
   ```

   This command will install the packages listed in the `package.json` file, including:

   - `@line/bot-sdk`: For connecting with the Line Messaging API
   - `axios`: For making HTTP requests
   - `body-parser`: For parsing the HTTP request body
   - `dotenv`: For managing environment variables
   - `express`: For creating a web server

2. **Set up `.env` file**:
   This project uses a `.env` file to store important information such as `ENDPOINT_URL`, `LINE_CHANNEL_SECRET`, and `LINE_CHANNEL_ACCESS_TOKEN`. Create a `.env` file in the root directory of your project and add the following variables:
   ```
   PORT=your_port
   ENDPOINT_URL=your_direct_line_endpoint_url
   LINE_CHANNEL_SECRET=your_line_channel_secret
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   ```

3. **Run the server**:
   After setting up everything, start the server by running:
   ```bash
   npm start
   ```

   The server will start running at `http://localhost:3000` or the port you have configured.

### List of Dependencies

- `@line/bot-sdk`: Used for connecting with the Line Messaging API
- `axios`: Used for making HTTP requests to the Copilot API
- `body-parser`: Used for parsing HTTP request bodies
- `dotenv`: Used for managing environment variables (.env)
- `express`: Used for creating a web server in Node.js

### Development and Testing

To test or further develop the project, follow these steps:
- Use `npm test` to run tests for the project
- Test by sending requests using Postman or another tool of your choice to test the API

## Customization

You can customize the settings and how the project connects to **Copilot Studio** or the **Line Messaging API** by editing the **.env** file or the related code handling the API connections.

## Suggestions

If you encounter any issues or have suggestions, please open an issue in the repository or send feedback.

#
#


# LineBotWithCopilotAgent

**LineBotWithCopilotAgent** เป็นโปรเจคที่ใช้ **Line Messaging API** ร่วมกับ **Copilot Studio** เพื่อสร้างระบบที่สามารถโต้ตอบกับผู้ใช้ผ่านทางแชทใน Line โดยใช้ AI จาก Copilot ในการช่วยตอบคำถามและให้บริการต่างๆ

## คุณสมบัติ

- **Line Bot**: สามารถรับและส่งข้อความกับผู้ใช้ผ่านแชทใน Line
- **Copilot Agent**: ใช้ Copilot Studio ในการสร้างคำตอบอัตโนมัติและการช่วยเหลือผู้ใช้
- **การส่งข้อความ**: รองรับการส่งข้อความจากผู้ใช้ไปยัง Copilot และรับคำตอบจาก AI

## การตั้งค่าและการใช้งาน

### ขั้นตอนการตั้งค่าโปรเจค

1. **ติดตั้ง dependencies**:
   ก่อนอื่นให้ไปที่โฟลเดอร์โปรเจคที่คุณเพิ่ง clone มา และรันคำสั่งนี้เพื่อทำการติดตั้ง dependencies ทั้งหมด:
   ```bash
   cd LineBotWithCopilotAgent
   npm install
   ```

   คำสั่งนี้จะติดตั้งแพ็กเกจที่ระบุในไฟล์ `package.json` ซึ่งรวมถึง:

   - `@line/bot-sdk`: สำหรับเชื่อมต่อกับ Line Messaging API
   - `axios`: สำหรับการส่ง HTTP requests
   - `body-parser`: สำหรับการ解析ข้อมูลใน HTTP request body
   - `dotenv`: สำหรับจัดการค่าตัวแปรสภาพแวดล้อม
   - `express`: สำหรับสร้างเว็บเซิร์ฟเวอร์

2. **ตั้งค่า .env**:
   ในโปรเจคนี้จะมีการใช้ไฟล์ `.env` สำหรับเก็บข้อมูลสำคัญ เช่น `ENDPOINT_URL`, `LINE_CHANNEL_SECRET`, และ `LINE_CHANNEL_ACCESS_TOKEN`. สร้างไฟล์ `.env` ที่โฟลเดอร์ root ของโปรเจคและเพิ่มค่าเหล่านี้:
   ```
   PORT=your_port
   ENDPOINT_URL=your_direct_line_endpoint_url
   LINE_CHANNEL_SECRET=your_line_channel_secret
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   ```

3. **รันเซิร์ฟเวอร์**:
   หลังจากตั้งค่าทุกอย่างเสร็จเรียบร้อยแล้ว ให้รันเซิร์ฟเวอร์:
   ```bash
   npm start
   ```

   เซิร์ฟเวอร์จะเริ่มทำงานที่ `http://localhost:3000` หรือ port ที่ได้กำหนด.


### รายการ dependencies

- `@line/bot-sdk`: ใช้สำหรับการเชื่อมต่อกับ Line Messaging API
- `axios`: ใช้สำหรับการทำ HTTP requests ไปยัง Copilot API
- `body-parser`: ใช้สำหรับ parsing request body ของ HTTP request
- `dotenv`: ใช้สำหรับจัดการค่าตัวแปรสภาพแวดล้อม (.env)
- `express`: ใช้สำหรับการสร้างเว็บเซิร์ฟเวอร์ใน Node.js

### การพัฒนาและการทดสอบ

หากต้องการทดสอบหรือพัฒนาเพิ่มเติม สามารถทำได้ตามขั้นตอนเหล่านี้:
- ใช้ `npm test` ในการทดสอบโปรเจค
- ทดสอบด้วยการส่งคำขอผ่าน Postman หรือเครื่องมือที่คุณสะดวกในการทดสอบ API

## การปรับแต่ง

คุณสามารถปรับแต่งการตั้งค่าและวิธีการเชื่อมต่อกับ **Copilot Studio** หรือ **Line Messaging API** โดยการแก้ไขไฟล์ **.env** หรือในโค้ดที่เกี่ยวข้องกับการเชื่อมต่อกับ API

## ข้อเสนอแนะ

หากพบปัญหาหรือข้อเสนอแนะใด ๆ สามารถเปิด issue ใน repository หรือส่งคำติชมมาได้
