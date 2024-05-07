import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hairColor: string;
  department: string;
  address: {
    postalCode: string;
  };
}

export async function groupByDepartment(): Promise<any> {
  const response = await axios.get('https://dummyjson.com/users');
  const users: User[] = response.data.users;

  // การทำ grouping และการประมวลผลข้อมูล
  // รายละเอียดการทำงานจะถูกเพิ่มในขั้นตอนนี้
}
