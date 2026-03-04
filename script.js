// student list
let students = ["Rahul", "Priya", "Aman", "Neha", "Arjun"];

// load students in table
function loadStudents(){

let table = document.getElementById("studentTable");
table.innerHTML="";

students.forEach(student => {

let row = `
<tr>
<td>${student}</td>
<td><input type="checkbox" id="${student}"></td>
</tr>
`;

table.innerHTML += row;

});

}

loadStudents();


// save attendance
function saveAttendance(){

let date = document.getElementById("date").value;

if(date==""){
alert("Please select a date");
return;
}

let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

attendance[date] = {};

students.forEach(student => {

let present = document.getElementById(student).checked;

attendance[date][student] = present ? "Present" : "Absent";

});

localStorage.setItem("attendance", JSON.stringify(attendance));

alert("Attendance Saved!");

}


// calculate percentage
function calculateAttendance(){

let attendance = JSON.parse(localStorage.getItem("attendance"));

if(!attendance){
alert("No attendance records found");
return;
}

let totalDays = Object.keys(attendance).length;

let resultHTML = "";

students.forEach(student => {

let presentCount = 0;

for(let date in attendance){

if(attendance[date][student] == "Present"){
presentCount++;
}

}

let percentage = ((presentCount/totalDays)*100).toFixed(2);

resultHTML += `<p>${student} : ${percentage}%</p>`;

});

document.getElementById("result").innerHTML = resultHTML;

}