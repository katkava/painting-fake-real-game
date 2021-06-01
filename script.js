const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener('click', ()=> {
 currentQuestionIndex++
 setNextQuestion()
})

function startGame() {
//starting game onclick event 

startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion() {
//this will load next set of paintings
resetState()
showQuestion(shuffledQuestions[currentQuestionIndex])
//this is a function showQuestion() which will take our currentQuestion at the current question index 
}

function showQuestion(question) {
   //question here is the question object
   questionElement.innerText = question.question
   question.answers.forEach(answer => {
    const button = document.createElement('button') 
    button.src = answer.imgUrl
    button.innerHTML=""
    button.classList.add('btn') 
    if(answer.correct) {
     button.dataset.correct = answer.correct
     //only setting this if the button is correct
    }
    button.addEventListener('click', selectAnswer) 
    answerButtonsElement.appendChild(button)
   })
}

function resetState() {
 clearStatusClass(document.body)
 nextButton.classList.add('hide')
 while (answerButtonsElement.firstChild) {
  answerButtonsElement.removeChild(answerButtonsElement.firstChild)
 }
}

function selectAnswer(e) {
 //takes event in as a parameter
 const selectedButton = e.target
 const correct = selectedButton.dataset.correct
 setStatusClass(document.body, correct)
 Array.from(answerButtonsElement.children).forEach(button => {
  setStatusClass(button, button.dataset.correct)
 })
 if (shuffledQuestions.length > currentQuestionIndex + 1)
 {
  nextButton.classList.remove('hide')
 } else {
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
 }
}

function setStatusClass(element, correct) {
 clearStatusClass(element) 
 if (correct) {
  element.classList.add('correct')
 } else {
    element.classList.add('wrong')
   }
  }

  function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  }
//array of questions, which has objects 
const questions = [
 {

question: "Which is fake?",
answers: [ 
 {imgUrl: 'https://www.flickr.com/photos/193127869@N02/51216715590/in/dateposted-public/', correct: true},
 {imgUrl: 'https://www.flickr.com/photos/193127869@N02/51215647736/in/dateposted-public/', correct: false}
]
 }, 
 {
question: "Which is fake?",
answers: [ 
 {imgUrl: "https://www.flickr.com/photos/193127869@N02/51214928522/in/dateposted-public/", correct: true},
 {imgUrl: "https://www.flickr.com/photos/193127869@N02/51214928502/in/dateposted-public/", correct: false}
]
 }, 
 {
 question: "Which is fake?",
answers: [ 
 {imgUrl: "https://www.flickr.com/photos/193127869@N02/51215855543/in/dateposted-public/", correct: true},
 {imgUrl: 'https://www.flickr.com/photos/193127869@N02/51215855533/in/dateposted-public/', correct: false}
]
 }
]

