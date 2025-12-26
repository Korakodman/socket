import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// เมื่อเชื่อมต่อสำเร็จ log socket.id หรือ ผู้ใช้งานคนนั้น
io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  // เมื่อมีคนเข้ามาให้ log ชื่อคนนั้นว่าเข้าร่วมแล้ว
  socket.on("join", (username) => {
    socket.username = username;
    io.emit("system", `${username} joined`);
  });
// เมื่อมีการส่ง อีเว้นชื่อ send-message รับ พารามีตเตอร์ text แล้วส่งกลับไปเป็น receive-message ตามด้วย object 
  socket.on("send-message", (text) => {
    io.emit("receive-message", {
      id: Date.now(),
      user: socket.username || "Unknow",
      text,
      time: new Date().toLocaleString("th-TH"),
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
});
