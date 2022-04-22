
import Counter from "./models/counterModel.js";
import Feedback from "./models/feedbackModel.js";
import Platform from "./models/platformModel.js";
import Question from "./models/questionModel.js";
import Quiz from "./models/quizModel.js";
import RecentQuiz from "./models/recentQuizModel.js";
import User from "./models/userModel.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require("fs");
var counterJSON = "";
var feedbackJSON = "";
var platformJSON = "";
var questionJSON = "";
var quizJSON = "";
var recentquizmodelJSON = "";
var userJSON = "";



//check functions

async function checkCounterExist() {
    var boolVal = false;
    await Counter.count(function (err, count) {
        if (!err && count === 0) {
            updateCounterJSON();
        } 
    }).clone();
    
}
async function checkFeedbackExist() {
    await Feedback.count(function (err, count) {
        if (!err && count === 0) {
            updateFeedbackJSON()
        } 
    }).clone();
}
async function checkPlatformExist() {
    await Platform.count(function (err, count) {
        if (!err && count === 0) {
            updatePlatformJSON();
        } 
    }).clone();
}
async function checkQuestionExist() {
    await Question.count(function (err, count) {
        if (!err && count === 0) {
            updateQuestionJSON();
        } 
    }).clone();
}
async function checkQuizExist() {
    await Quiz.count(function (err, count) {
        if (!err && count === 0) {
            updateQuizJSON();
        } 
    }).clone();
}
async function checkRecentQuizExist() {
    await RecentQuiz.count(function (err, count) {
        if (!err && count === 0) {
            updateRecentQuizJSON();
        } 
    }).clone();
}
async function checkUserExist() {
    await User.count(function (err, count) {
        if (!err && count === 0) {
            updateUserJSON();
        } 
    }).clone();
}


//counter
async function deleteCounter() {
    return Counter.deleteMany({});
}

async function writeCounterJSON() {
    var counters = await Counter.find({});
    await Counter.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/counters.json", JSON.stringify(counters), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function saveCounterJSON() {
    var counters = await Counter.find({});
    fs.writeFile("./collections/counters.json", JSON.stringify(counters), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}



async function updateCounterJSON() {

    fs.readFile("./collections/counters.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            questionJSON = JSON.parse(jsonString);
            console.log("counterJSON is:", counterJSON); // => "Counter"
            await deleteCounter();
            Counter.insertMany(questionJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading counters:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

//feedback
async function deleteFeedback() {
    return Feedback.deleteMany({});
}

async function writeFeedbackJSON() {

    var feedbacks = await Feedback.find({});
    await Feedback.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/feedbacks.json", JSON.stringify(feedbacks), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function saveFeedbackJSON() {
    var feedbacks = await Feedback.find({});
    fs.writeFile("./collections/feedbacks.json", JSON.stringify(feedbacks), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updateFeedbackJSON() {
    fs.readFile("./collections/feedbacks.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            feedbackJSON = JSON.parse(jsonString);
            console.log("feedbackJSON is:", feedbackJSON); // => "feedback"
            await deleteFeedback();
            Feedback.insertMany(feedbackJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading feedbacks:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}
//platform
async function deletePlatform() {
    return Platform.deleteMany({});
}

async function writePlatformJSON() {

    var platforms = await Platform.find({});
    await Platform.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/platforms.json", JSON.stringify(platforms), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function savePlatformJSON() {
    var platforms = await Platform.find({});
    fs.writeFile("./collections/platforms.json", JSON.stringify(platforms), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updatePlatformJSON() {

    fs.readFile("./collections/platforms.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            platformJSON = JSON.parse(jsonString);
            console.log("platformJSON is:", platformJSON); // => "platform"
            await deletePlatform();
            Platform.insertMany(platformJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading platforms:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

//quiz
async function deleteQuiz() {
    return Quiz.deleteMany({});
}

async function writeQuizJSON() {

    var quizzes = await Quiz.find({});
    await Quiz.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/quizzes.json", JSON.stringify(quizzes), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function saveQuizJSON() {
    var quizzes = await Quiz.find({});
    fs.writeFile("./collections/quizzes.json", JSON.stringify(quizzes), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updateQuizJSON() {
    fs.readFile("./collections/quizzes.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            quizJSON = JSON.parse(jsonString);
            console.log("quizJSON is:", quizJSON); // => "quiz"
            await deleteQuiz();
        Quiz.insertMany(quizJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading quizzes:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

//question
async function deleteQuestion() {
    return Question.deleteMany({});
}

async function writeQuestionJSON() {

    var questions = await Question.find({});
    await Question.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/questions.json", JSON.stringify(questions), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function saveQuestionJSON() {
    var questions = await Question.find({});
    fs.writeFile("./collections/questions.json", JSON.stringify(questions), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updateQuestionJSON() {

    fs.readFile("./collections/questions.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            questionJSON = JSON.parse(jsonString);
            console.log("questionJSON is:", questionJSON); // => "Customer address is: Infinity Loop Drive"
            await deleteQuestion();
            Question.insertMany(questionJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading questions:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });

}

//recentquiz
async function deleteRecentQuiz() {
    return RecentQuiz.deleteMany({});
}

async function writeRecentQuizJSON() {

    var recentquizmodels = await RecentQuiz.find({});
    await RecentQuiz.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile(
                "./collections/recentquizmodels.json",
                JSON.stringify(recentquizmodels),
                function (err) {
                    if (err) throw err;
                    console.log("complete");
                }
            );
        }
    }).clone();
    
}

async function saveRecentQuizJSON() {
    var recentquizmodels = await RecentQuiz.find({});
    fs.writeFile("./collections/recentquizmodels.json", JSON.stringify(recentquizmodels), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updateRecentQuizJSON() {
    fs.readFile("./collections/recentquizmodels.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            recentquizmodelJSON = JSON.parse(jsonString);
            console.log("recentquizmodelJSON is:", recentquizmodelJSON); // => "platform"
            await deleteRecentQuiz();
            RecentQuiz.insertMany(recentquizmodelJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading recentquizmodels:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

//user
async function deleteUser() {
    return User.deleteMany({});
}

async function writeUserJSON() {

    var users = await User.find({});
    await User.count(function (err, count) {
        if (!err && count != 0) {
            fs.writeFile("./collections/users.json", JSON.stringify(users), function (err) {
                if (err) throw err;
                console.log("complete");
            });
        }
    }).clone();
    
}

async function saveUserJSON() {
    var users = await User.find({});
    fs.writeFile("./collections/users.json", JSON.stringify(users), function (err) {
        if (err) throw err;
        console.log("complete");
    });
}

async function updateUserJSON() {
    fs.readFile("./collections/users.json", "utf8", async (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            userJSON = JSON.parse(jsonString);
            console.log("userJSON is:", userJSON); // => "user"
            await deleteUser();
            User.insertMany(userJSON, function (err, result) {
                if (err) {
                    console.log("There was an error uploading users:", err);
                } else {
                }
            });
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

export async function uploadJSON() {
    checkCounterExist();
    checkQuestionExist();
    checkFeedbackExist();
    checkPlatformExist();
    checkQuizExist();
    checkRecentQuizExist();
    checkUserExist();
}

export async function saveJSON(){
    saveCounterJSON();
    saveFeedbackJSON();
    savePlatformJSON();
    saveQuestionJSON();
    saveQuizJSON();
    saveRecentQuizJSON();
    saveUserJSON();
}

export async function writeJSON(){
    writeCounterJSON();
    writeFeedbackJSON();
    writePlatformJSON();
    writeQuestionJSON();
    writeQuizJSON();
    writeRecentQuizJSON();
    writeUserJSON();
}