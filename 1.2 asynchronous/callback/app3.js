let students = [
    { name: "John", grade: 100, school: "East" },
    { name: "Mike", grade: 80, school: "East" },
    { name: "Sally", grade: 90, school: "West" },
    { name: "Bob", grade: 70, school: "East" },
    { name: "Mary", grade: 95, school: "West" }
]

let processStudents = function (students, callback) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].school.toLowerCase() === "east") {
            if (typeof callback === "function") {
                setTimeout(callback,0, students[i]);
            }
        }
    }
}

processStudents(students, function (obj) {
    if (obj.grade >= 80) {
        console.log(obj.name + " is in the East");
    }
})

let determineTotal = function () {
    var total = 0
    var count = 0;

    processStudents(students, function (obj) {
        total += obj.grade;
        count++;
    })
    console.log("Total score: " + total + " - Total count = " + count);
}
determineTotal();



