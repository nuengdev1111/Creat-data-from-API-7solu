const axios = require("axios");

// ฟังก์ชันเพื่อจัดกลุ่มข้อมูลผู้ใช้ตาม department
async function groupByDepartment() {
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // สร้าง object สำหรับเก็บข้อมูลจัดกลุ่ม
        const groupedByDepartment = users.reduce((group, user) => {
            const { department } = user;
            group[department] = group[department] || [];
            group[department].push(user);
            return group;
        }, {});

        console.log(groupedByDepartment);
        return groupedByDepartment;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

groupByDepartment();  // รันฟังก์ชันเพื่อทดสอบ
