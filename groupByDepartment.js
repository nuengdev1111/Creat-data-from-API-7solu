const axios = require("axios");

async function groupByDepartment() {
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        // จัดกลุ่มข้อมูลผู้ใช้ตาม department
        const groupedByDepartment = users.reduce((group, user) => {
            const department = user.department || 'No Department';
            if (!group[department]) {
                group[department] = {
                    male: 0,
                    female: 0,
                    ageRange: '',
                    hair: {},
                    addressUser: {}
                };
            }

            // นับเพศ
            if (user.gender === 'male') group[department].male++;
            else if (user.gender === 'female') group[department].female++;

            // จัดการช่วงอายุ
            const age = user.age;
            if (!group[department].ageRange) {
                group[department].ageRange = `${age}-${age}`;
            } else {
                const [min, max] = group[department].ageRange.split('-').map(Number);
                if (age < min) group[department].ageRange = `${age}-${max}`;
                if (age > max) group[department].ageRange = `${min}-${age}`;
            }

            // นับสีผม
            const hairColor = user.hair?.color || 'Unknown';
            group[department].hair[hairColor] = (group[department].hair[hairColor] || 0) + 1;

            // จัดเก็บที่อยู่
            const nameKey = user.firstName + user.lastName;
            group[department].addressUser[nameKey] = user.address?.postalCode || 'Unknown';

            return group;
        }, {});

        console.log(JSON.stringify(groupedByDepartment, null, 2));
        return groupedByDepartment;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

groupByDepartment();
