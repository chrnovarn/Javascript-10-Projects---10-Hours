const quizData = [
    {
        question: 'How old is Florin?',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c'
    },
    {
        question: 'What is the the most programming language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'Javascript',
        correct: 'd'
    },
    {
        question: 'Who is the President of US?',
        a: 'Florin Pop',
        b: 'Donal Trump',
        c: 'Ivan Soldano',
        d: 'Mihai Andrei',
        correct: 'b'
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascade Style Sheet',
        c: 'Jason Onject Notation',
        d: 'Application Programming Interface',
        correct: 'a'
    },
    {
        question: 'What year was Javascript launched?',
        a: '1996',
        b: '2015',
        c: '2005',
        d: 'none of the above',
        correct: 'd'
    }
]

let questionEl, quizEl, initalQuizHtml, submitButtonEL;
let a_text, b_text, c_text, d_text;

let currentQuiz = 0;
let answer = undefined;
let score = 0;

initElementsParams();
loadQuiz();


function loadQuiz(){

    initElementsParams();

    var currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;

    var answers = document.querySelectorAll('.answer');
    
}
function clearQuestion(){
    var answers = document.querySelectorAll('.answer');
    answers.forEach(answerEl => {
        answerEl.checked = false;
    })
}
function resetQuiz(){
    currentQuiz = 0;
    score = 0;
    answer = undefined;
    clearQuestion();
    loadQuiz();
}
function getSelected(){
    const answers = document.querySelectorAll('.answer');
    let answer = undefined;
    answers.forEach(answerEl => {
        if(answerEl.checked)
        {
            answer = answerEl.id;
        }
    })

    return answer;
}
function initElementsParams(){
    questionEl = document.getElementById('question');
    a_text = document.getElementById('a_text');
    b_text = document.getElementById('b_text');
    c_text = document.getElementById('c_text');
    d_text = document.getElementById('d_text');
    quizEl = document.getElementById('quiz');
    initalQuizHtml = undefined;
    submitButtonEL = document.getElementById('submitBtn');

    submitButtonEL.addEventListener("click", () => {

        const answer = getSelected();
    
        if(answer)
        {
            
            if(answer === quizData[currentQuiz].correct)
            {
                score++;
            }
    
            currentQuiz ++;
    
            if(currentQuiz < quizData.length)
            {
                clearQuestion();
                loadQuiz();
            }else{
                initalQuizHtml = quizEl.innerHTML;
                quizEl.innerHTML =`<h2>
                You answered correctly ${score}/${quizData.length} questions
                </h2>
                <button id="startBtn">Start Again</button>`;
                let startBtnEL = document.getElementById('startBtn');
                startBtnEL.addEventListener('click',() => {
                    quizEl.innerHTML = initalQuizHtml;
                    resetQuiz();
                },false)
    
                
            }
        }
    })
}
