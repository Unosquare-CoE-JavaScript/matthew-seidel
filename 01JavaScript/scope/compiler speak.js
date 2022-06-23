var students = [
    { id: 1, name: "bruce", age: 40 },
    { id: 2, name: "zoidberg", age: 22 },
    { id: 3, name: "alex", age: 22 },
    { id: 4, name: "daniel", age: 30 }
];

function getStudentName(studentID) {
    for (let student of students) {
        if (student.id === studentID) {
            return student.name;
        }
    }
}

var nextStudent = getStudentName(2);

console.log(nextStudent);
//zoidberg