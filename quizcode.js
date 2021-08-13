(function(){
//HTML buttons onclick functions assignment:
document.getElementById("addQuestionButton").onclick = startAddingQuestion
document.getElementById("startQuizButton").onclick = startQuiz

//Default questions

let quiz = [
  {
    question: "Укажите столицы государств",
    answersOptions: [
      "Витебск",
      "Минск",
      "Москва",
      "Токио"
    ],
    rightAnswers: "234",
    userAnswers: [],
    finalUserAnswers: ""
  },
  {
    question: "Укажите города-миллионники",
    answersOptions: [
      "Нью-Йорк",
      "Пинск",
      "Рига",
      "Женева"
    ],
    rightAnswers: "1",
    userAnswers: [],
    finalUserAnswers: ""
  },
  {
    question: "Укажите города Европы",
    answersOptions: [
      "Москва",
      "Вильнюс",
      "Минск",
      "Мадрид"
    ],
    rightAnswers: "1234",
    userAnswers: [],
    finalUserAnswers: ""
  },   
  {
    question: "Выберите страны, которые омываются морями",
    answersOptions: [
      "Латвия",
      "Литва",
      "Япония",
      "Судан"
    ],
    rightAnswers: "1234",
    userAnswers: [],
    finalUserAnswers: ""
  }
]

//Quiz

function startQuiz() {
document.getElementById("main").className = "reflect_main"
document.querySelector("h1").innerHTML = "<h1>Удачи!!!</h1>"
document.querySelector("h1").style.fontSize="150%"
document.querySelector("h2").innerHTML = ""
  startQuizButton.disabled = true
  addQuestionButton.disabled = true
  document.body.style.background = "Cornsilk"
  for(i = 0; i < quiz.length; i++) {
    reflectQuestions()
    for(j = 0; j < quiz[i].answersOptions.length; j++) {
      reflectAnswerOptions()
    }
  }
  createCheckButton()
}

function reflectQuestions() {
  let questionText = document.createElement("label")
  questionText.textContent = `${i + 1}. ${quiz[i].question}`
  questionText.style.fontFamily = "Brush Script MT, Brush Script Std, cursive"
  questionText.style.fontWeight = "bold"
  questionText.style.fontSize = "120%"
  let br = document.createElement("br")
  let br2 = document.createElement("br") 
  document.getElementById("main").append(br, questionText, br2)
}

//Questions answers options reflection
function reflectAnswerOptions() {
  let checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.id = `${i}${j}`
  checkbox.value = j + 1
  checkbox.onclick = receiveUsersAnswers
  let questionAnswerOptions = document.createElement("label")
  questionAnswerOptions.textContent = quiz[i].answersOptions[j]
  questionAnswerOptions.style.fontFamily = "Brush Script MT, Brush Script Std, cursive"
  questionAnswerOptions.style.fontSize = "120%"
  let br = document.createElement("br")
  document.getElementById("main").append(checkbox, questionAnswerOptions, br)
}

function receiveUsersAnswers() {
  for(i = 0; i < quiz.length; i++) {
    let arr = []
    for(j = 0; j < quiz[i].answersOptions.length; j++) {
      let checkBox = document.getElementById(`${i}${j}`)
      if(checkBox.checked) {
        arr.push(checkBox.value)
      }
    }
    quiz[i].userAnswers = arr.sort()
    quiz[i].finalUserAnswers = quiz[i].userAnswers.join("")   
  }
}

function createCheckButton() {
  let button = document.createElement("button")
  button.type = "button"
  button.textContent = "Отправить"
  button.className = "checkButton"
  let br = document.createElement("br")
  document.getElementById("main").append(br, button)
  button.onclick = showQuizResults
}

function showQuizResults() {
  checkIfUserAnswered() ? alert("Все вопросы должны иметь хотя бы один выбранный вариант ответа. Проверьте правильность заполнения") :
  checkUserResults()
}

function checkUserResults() {
 let wrangAnswerdQuestions = ""
 let numberOfWrangAnswers = 0
 for(i = 0; i < quiz.length; i++) {
    if(quiz[i].finalUserAnswers !== quiz[i].rightAnswers) {
      wrangAnswerdQuestions = `${wrangAnswerdQuestions}${i + 1}. ${quiz[i].question} \n`
      numberOfWrangAnswers = numberOfWrangAnswers + 1
    }
  }
  if(wrangAnswerdQuestions) {
    alert(`Вы неправильно ответили на вопросы:\n\n${wrangAnswerdQuestions}\n\nВаш результат ${quiz.length - numberOfWrangAnswers} из ${quiz.length}`)
  } else {
    alert(`Все ответы верные! Вы молодец!\nВаш результат ${quiz.length} из ${quiz.length}`)
  }
} 

function checkIfUserAnswered() {
  let userAnswers = 0
  for(i = 0; i < quiz.length; i++) {
    quiz[i].finalUserAnswers == "" ? userAnswers += 1: userAnswers
  }
  return userAnswers
}

//Add questions by user

let newUserQuestion = {
  question: "",
  answersOptions: [],
  rightAnswers: "",
  userAnswers: [],
  finalUserAnswers: ""
}

function startAddingQuestion() {
let userQuestionName = createUserQuestionName()
if(userQuestionName) {
  newUserQuestion.question = userQuestionName} else return
let userQuestionOptions = createUserQuestionOptions()
if(userQuestionOptions) {
  newUserQuestion.answersOptions = userQuestionOptions} else return
let userQuestionAnswers = createUserQuestionAnswers()
if(userQuestionAnswers) {
  newUserQuestion.rightAnswers = userQuestionAnswers} else return
  quiz.push(newUserQuestion)
}


function createUserQuestionName() {
  let userQuestionName = prompt("Введите текст вопроса")
  if(userQuestionName == "" || userQuestionName == null) {
    userQuestionName = null
    alert("Вы не ввели текст вопроса. Побробуйте добавить вопрос заново")
  }
    return userQuestionName
}

function createUserQuestionOptions() {
  let userQuestionOptionsArr = []
  for(i = 0; i < 4; i++) {
  let userQuestionOptions = prompt(`Введите текст ${i + 1} варианта ответа`)
  if(userQuestionOptions == "" || userQuestionOptions == null) {
    userQuestionOptionsArr = null
    alert(`Вы не ввели текст ${i + 1} варианта ответа. Побробуйте добавить вопрос заново`)
    break
  } else {
    userQuestionOptionsArr.push(userQuestionOptions)
  }
  }
  return userQuestionOptionsArr
}

function createUserQuestionAnswers() {
let userQuestionAnswers = prompt("Введите номера правильных ответов от 1 до 4 через запятую")
if(!checkUserAnswersOne(userQuestionAnswers)) {
  return null
} else {
  return userQuestionAnswers = userQuestionAnswers.split(" ").join("").split(",").sort().join("")
  }
}

//Проверка вводимые пользователем правильные ответы на пустые значения
function checkUserAnswersOne(userQuestionAnswers) {
  if(userQuestionAnswers == "" || userQuestionAnswers == null) {
    alert("Вы не ввели правильные варианты ответов. Попробуйте добавить вопрос заново")
  return null
  } else return checkUserAnswersTwo(userQuestionAnswers)
}

//Проверка на уникальность введенных цифр, на значения - целевые цифры от 1 до 4
function checkUserAnswersTwo(userQuestionAnswers) {
  userQuestionAnswers = userQuestionAnswers.split("").join("").split(",").sort()
  let possibleOptions = ["1","2","3","4"]
  for(i = 0; i < userQuestionAnswers.length; i++) {
    if(userQuestionAnswers[i] == userQuestionAnswers[i + 1] || possibleOptions.indexOf(userQuestionAnswers[i]) == -1) {
      alert("Поле может содержать только уникальные цифры 1,2,3,4, разделенные запятой. Попробуйте добавить вопрос заново")
      return null
    }
  }
return userQuestionAnswers
}
})()