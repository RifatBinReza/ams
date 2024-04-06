const { models } = require("../models");
const assessmentService = require("../services/assessment");

/**
 * Connect to the database instance
 */
const seedDB = async () => {
  try {
    const users = [
      {
        firstName: "Super",
        lastName: "Admin",
        password: "Admin1234",
        email: "admin@metaschool.so",
        role: "admin",
      },
      {
        firstName: "Student",
        lastName: "One",
        password: "Student1",
        email: "student_user_1@metaschool.so",
        role: "student",
      },
      {
        firstName: "Student",
        lastName: "Two",
        password: "Student2",
        email: "student_user_2@metaschool.so",
        role: "student",
      },
    ];
    
    users.forEach(async (user) => {
      const existingUser = await models.User.findOne({email: user.email});
      if (!existingUser) {
        await models.User.create(user);
      }
    });

    const assessment = {
      "title": "Computer Science",
      "sections": [
        {
          "title": "OOP",
          "questions": [
            {
              "text": "What is OOP",
              "type": "MCQ",
              "options": [
                {
                  "text": "Object Organized Programming",
                  "isCorrect": false,
                },
                {
                  "text": "Object Optional Programming",
                  "isCorrect": false,
                },
                {
                  "text": "Objective Oriented Programming",
                  "isCorrect": true,
                },
                {
                  "text": "Option Oriented Programming",
                  "isCorrect": false,
                }
              ]
            },
            {
              "text": "Select the ones that are part of OOPS concept.",
              "type": "MSQ",
              "options": [
                {
                  "text": "Encapsulation",
                  "isCorrect": true,
                },
                {
                  "text": "Polymorphism",
                  "isCorrect": true,
                },
                {
                  "text": "Exception",
                  "isCorrect": false,
                },
                {
                  "text": "Abstraction",
                  "isCorrect": true,
                }
              ]
            }
          ]
        },
        {
          "title": "Java",
          "questions": [
            {
              "text": "What is the use of final keyword in Java?",
              "type": "MSQ",
              "options": [
                {
                  "text": "When a class is made final, a subclass of it can not be created.",
                  "isCorrect": false,
                },
                {
                  "text": "When a method is final, it can not be overridden.",
                  "isCorrect": false,
                },
                {
                  "text": "When a variable is final, it can be assigned value only once.",
                  "isCorrect": false,
                },
                {
                  "text": "All of the above",
                  "isCorrect": true,
                }
              ]
            },
            {
              "text": "Which of the following is not a Java features?",
              "type": "MCQ",
              "options": [
                {
                  "text": "Dynamic",
                  "isCorrect": false,
                },
                {
                  "text": "Architecture Neutral",
                  "isCorrect": false,
                },
                {
                  "text": "Use of pointers",
                  "isCorrect": true,
                },
                {
                  "text": "Object-oriented",
                  "isCorrect": false,
                }
              ]
            }
          ]
        }
      ]
    }

    await assessmentService.create(assessment);
  } catch (err) {
    console.error(`Seeding Error: ${err.message}`);
    throw err;
  }
};

module.exports = { seedDB };
