import React from 'react';
import { TableWithoutPagination } from '@ek-components/Table/TableWithoutPagination';
import { Button } from '@ek-components';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'course', headerName: 'Course' },
  { field: 'action', headerName: 'Action' },
];

export const StudentList = () => {
  const getStudentData = async () => {
    const students = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        course: 'MEAN',
      },
      {
        id: 2,
        name: 'Alice Smith',
        email: 'alice@example.com',
        course: 'MERN',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        course: 'HTML & CSS',
      },
    ];

    const studentsWithAction = students.map((student) => ({
      ...student,
      action: (
        <Button variant='contained' onClick={() => viewStudent(student)}>
          View Student
        </Button>
      ),
    }));
    return studentsWithAction;
  };

  const viewStudent = (student: any) => {
    console.log('Viewing student:', student);
  };

  return (
    <TableWithoutPagination columns={columns} getDataFn={getStudentData} />
  );
};
