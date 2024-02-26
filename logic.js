
let CountSpan = document.querySelector(".count span")
let Spans = document.querySelector(".bullets .spans")
let QuestionArea = document.querySelector(".quiz-area")
let AnswerArea = document.querySelector(".answers-area")
let submitbutton = document.querySelector(".submit-button")
let results = document.querySelector(".results")
let countdownElement = document.querySelector(".countdown");

let Currentindex = 0;
let TheRightAnswerss = 0;
let countdownInterval;


function GetQuestion() {
    let MyRequest = new XMLHttpRequest();

    MyRequest.open("Get", "Question.json", true);
    MyRequest.send();

    MyRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            let QuestionObj = JSON.parse(this.responseText);

            let counter = QuestionObj.length;
            Counter(counter + 1);

            Question(counter - 1, QuestionObj[Currentindex])
            countdown(60, counter);

            submitbutton.onclick = () => {
                // Get The Answer
                let TheRightAnswer = QuestionObj[Currentindex].right_answer;

                // increase index
                Currentindex++;

                CheckAnswer(TheRightAnswer, counter)




                QuestionArea.innerHTML = '';
                AnswerArea.innerHTML = '';
                Question(counter, QuestionObj[Currentindex])
                BulletsMove(counter + 1)



                // Start CountDown
                clearInterval(countdownInterval);
                countdown(60, counter);


            }
        }
    }

}


GetQuestion();






function Counter(number) {
    CountSpan.innerHTML = number - 1;

    for (let i = 0; i < number; i++) {

        let NewBullet = document.createElement('span');

        if (i === 0) {
            NewBullet.className = "on";
            i++;
        }
        Spans.appendChild(NewBullet);

    }
}


function Question(count, question) {
    if (Currentindex < count) {
        let Q = document.createElement('h2');
        let QText = document.createTextNode(question.title);

        Q.appendChild(QText);
        QuestionArea.appendChild(Q)



        for (let i = 1; i <= 4; i++) {

            let Main = document.createElement("div");
            Main.className = "answer";
            AnswerArea.appendChild(Main)

            let input = document.createElement("input")
            input.type = "radio";
            input.name = "q";
            input.id = `answer_${i}`;
            input.dataset.answer = question[`answer_${i}`];



            let label = document.createElement("label");
            label.htmlFor = `answer_${i}`;
            label.innerText = question[`answer_${i}`];



            Main.appendChild(input);
            Main.appendChild(label);
        }
    }

}


function CheckAnswer(Ranswer, count) {

    let answers = document.getElementsByName("q");
    let TheChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            TheChoosenAnswer = answers[i].dataset.answer;
        }
    }
    if (TheChoosenAnswer === Ranswer) {
        TheRightAnswerss++;


    }
    if (Currentindex === count) {
        results.innerHTML = ` ${TheRightAnswerss} From ${count}`;
    }
}



function BulletsMove() {
    let bullets = document.querySelectorAll(".bullets .spans span");
    let ArraysForBullets = Array.from(bullets);

    ArraysForBullets.forEach((span, count) => {
        if (Currentindex === count) {
            span.classList.toggle("on")

        } else {
            span.classList.remove("on");
        }
    })
}


function countdown(duration, count) {
    if (Currentindex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countdownInterval);
                submitbutton.click();
            }
        }, 1000);
    }
}