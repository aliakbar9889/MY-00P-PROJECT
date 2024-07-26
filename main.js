import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    enroll_course(courses) {
        this.courses.push(courses);
    }
    view_balance() {
        console.log(`BALANCE FOR ${this.name} : $${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} FEES PAID SUCCESSFULLY FOR ${this.name}`);
    }
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`NAME : ${this.name}`);
        console.log(`COURSES : ${this.courses}`);
        console.log(`BALANCE : $${this.balance}`);
    }
}
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`STUDENT : ${name} ADDED SUCCESSFULLY. STUDENT ID : ${student.id}`);
    }
    enroll_students(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} : ADDED IN ${course} SUCCESSFULLY `);
        }
    }
    view_student_balance(STUDENT_ID) {
        let student = this.find_student(STUDENT_ID);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("STUDENT NOT FOUND PLEASE, ENTER THE CORRECT STUDENT ID");
        }
    }
    pay_student_fees(STUDENT_ID, amount) {
        let student = this.find_student(STUDENT_ID);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("STUDENT NOT FOUND PLEASE, ENTER THE CORRECT STUDENT ID");
        }
    }
    show_student_status(STUDENT_ID) {
        let student = this.find_student(STUDENT_ID);
        if (student) {
            student.show_status();
        }
    }
    find_student(STUDENT_ID) {
        return this.students.find(std => std.id === STUDENT_ID);
    }
}
async function main() {
    console.log(chalk.yellowBright("WELCOME TO A.A - STUDENT MANAGEMENT SYSTEM"));
    console.log("================================================================");
    let Student_managers = new student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "SELECT AN OPTION",
                choices: ["ADD STUDENT", "ENROLL STUDENT", "VIEW BALANCE", "PAY FEES", "SHOW STATUS", "EXIT"]
            }
        ]);
        console.log(Student_managers);
        switch (choice.choices) {
            case "ADD STUDENT":
                let user_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "ENTER A STUDENT NAME"
                    }
                ]);
                Student_managers.add_student(user_input.name);
                break;
            case "ENROLL STUDENT":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: "ENTER A STUDENT ID "
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "ENTER A COURSE NAME"
                    }
                ]);
                Student_managers.enroll_students(enroll_input.studentid, enroll_input.course);
                break;
            case "VIEW BALANCE":
                let balance_input = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: "ENTER A STUDENT ID "
                    }
                ]);
                Student_managers.view_student_balance(balance_input.studentid);
                break;
            case "PAY FEES":
                let fees_input = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: "ENTER A STUDENT ID "
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "ENTER THE AMOUNT TO PAY"
                    }
                ]);
                Student_managers.pay_student_fees(fees_input.studentid, fees_input.amount);
                break;
            case "SHOW STATUS":
                let status_input = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: "ENTER A STUDENT ID "
                    },
                ]);
                Student_managers.show_student_status(status_input.studentid);
                break;
            case "EXIT":
                console.log("THANKS FOR VISITING A.A STUDENT MANAGEMENT SYSTEM");
                process.exit();
        }
    }
}
main();
