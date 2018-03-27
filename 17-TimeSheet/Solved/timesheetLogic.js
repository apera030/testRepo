/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  // apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  // authDomain: "time-sheet-55009.firebaseapp.com",
  // databaseURL: "https://time-sheet-55009.firebaseio.com",
  // storageBucket: "time-sheet-55009.appspot.com"
  apiKey: "AIzaSyALixaz3CcbTix4zuY9pVtlJfb9zKfZ1oU",
  authDomain: "ap-gtcbc.firebaseapp.com",
  databaseURL: "https://ap-gtcbc.firebaseio.com",
  projectId: "ap-gtcbc",
  storageBucket: "ap-gtcbc.appspot.com",
  messagingSenderId: "531683095752"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    trainName: trainName,
    role: empRole,
    start: empStart,
    rate: empRate
  };

  // Uploads employee data to the database
  database.ref("/trainData").push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Alert
  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref("/trainData").on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
