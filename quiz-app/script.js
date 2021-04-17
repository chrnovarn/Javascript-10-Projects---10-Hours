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

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitButtonEL = document.getElementById('submitBtn');
let currentQuiz = 0;
let answer = undefined;
let score = 0;
loadQuiz();

function loadQuiz(){
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;

    const answers = document.querySelectorAll('.answer');
    
}
function clearQuestion(){
    const answers = document.querySelectorAll('.answer');
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
            
            alert("You finish! Get yourself an Orange Lemonade<br> Your score is: "+score);

            resetQuiz();
        }
    }
   
    
})



//summitQuestion(x);

function summitQuestion(x){
    
}