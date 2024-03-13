let adminDOM = document.querySelector(".__admin");
let submitForm = document.forms['add-question'];

const timer = () => {
  let timer = document.getElementById("timer");
  let time = 5000;
  timer.innerHTML = time;

  let interval = setInterval(() => {
    time -= 4;
    if (time <= 0) {
      clearInterval(interval); // Stop the timer when time reaches zero or less
      timer.innerHTML = "Time's up!";
    } else {
      timer.innerHTML = time + "ms";
    }
  }, 1);
};

const activateTooltip = () => {
  let tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};

const getContestantsData = () => {
  let datas = [
    {
      fname: "John",
      lname: "Doe",
      Year: "1st",
      status: "active",
      average: "20/30",
    },
    {
      fname: "Been",
      lname: "Teen",
      Year: "1st",
      status: "active",
      average: "19/30",
    },
    {
      fname: "Shinra",
      lname: "Tensie",
      Year: "1st",
      status: "eliminated",
      average: "18/30",
    },
    {
      fname: "John",
      lname: "Doe",
      Year: "1st",
      status: "active",
      average: "20/30",
    },
    {
      fname: "Been",
      lname: "Teen",
      Year: "1st",
      status: "active",
      average: "19/30",
    },
    {
      fname: "Shinra",
      lname: "Tensie",
      Year: "1st",
      status: "eliminated",
      average: "18/30",
    },
    {
      fname: "John",
      lname: "Doe",
      Year: "1st",
      status: "active",
      average: "20/30",
    },
    {
      fname: "Been",
      lname: "Teen",
      Year: "1st",
      status: "active",
      average: "19/30",
    },
    {
      fname: "Shinra",
      lname: "Tensie",
      Year: "1st",
      status: "eliminated",
      average: "18/30",
    },
    {
      fname: "John",
      lname: "Doe",
      Year: "1st",
      status: "active",
      average: "20/30",
    },
    {
      fname: "Been",
      lname: "Teen",
      Year: "1st",
      status: "active",
      average: "19/30",
    },
    {
      fname: "Shinra",
      lname: "Tensie",
      Year: "1st",
      status: "eliminated",
      average: "18/30",
    },
  ];

  return datas;
};

const activateDataTable = () => {
  let datas = getContestantsData();
  const tableBody = document.querySelector("tbody");
  let tr = "";

  let i = 1;

  datas.forEach((data) => {
    let status = `<span class="badge bg-success">${data.status}</span>`;
    if (data.status === "eliminated") {
      status = `<span class="badge bg-danger">${data.status}</span>`;
    }

    tr += `
              <tr>
              <td>${i++}</td>
              <td>${data.fname}${data.lname}</td>
              <td>${data.year}</td>
              <td>${status}</td>
              <td>${data.average}</td>
              </tr>
          `;
  });

  tableBody.innerHTML = tr;

  $("#table").DataTable({
    data: datas.data,
    columns: [
      { data: "#" },
      { data: "Name" },
      { data: "Year" },
      { data: "Status" },
      { data: "Average" },
    ],
    pageLength: 3,
  });
};

const categoriesList = () => {
  const categories = ["Easy", "Medium", "Hard"];
  return categories;
};

const setQuestionList = (data) => {
  let datas = [data]
  return datas
}

const questionsList = () => {
  let questions = {
    id: 1,
    question: "It is called as the brain of computer?",
    choices: [
      "Mother Board",
      "Solid State Drive",
      "Central Processing Unit",
      "Automatic Voltage Regulator",
    ],
    answer: "Central Processing Unit",
    category: 0,
    status: 1
  };
  questions = setQuestionList(questions)
  console.log(questions);
  return questions;
};

const getQuestions = () => {
  let categories = categoriesList();
  const questions = questionsList();
  const questionRow = document.getElementById("questions-row");

  for(let i = 0; i < questions.length; i++) {
    let nextQuestion;
    let col = document.createElement("div");
    col.setAttribute("class", "col-3");
    let categoryStatus = `<span class="badge bg-success">${
      categories[questions[i].category]
    }</span>`;

    if (questions[i].category === 1) {
      categoryStatus = `<span class="badge bg-warning">${
        categories[questions[i].category]
      }</span>`;
    } else if (questions[i].category === 2) {
      categoryStatus = `<span class="badge bg-danger">${
        categories[questions[i].category]
      }</span>`;
    }

    if (i === 0) {
      nextQuestion = '<p class="badge bg-danger">Next Question</p>';
    }else{
      nextQuestion = ''
    }

    if (questions[i].status === 1) {
      col.innerHTML = `
      <div class="card h-100">
          <div class="card-body">
              <div class="d-flex justify-content-between">
                  ${nextQuestion}
                  <p class="text-muted">Category: ${categoryStatus}</p>
              </div>
              <div class="align-self-center">
                <p class="pt-2">${questions[i].question}</p>
              </div>
          </div>
      </div>
      `;
      questionRow.appendChild(col);
    }
  }
};

const hideModal = (id) => {
  const modalId = document.getElementById(id)
  const modal = bootstrap.Modal.getInstance(modalId)
  modal.hide()
}

const addQuestion = (form) => {
  const questionRow = document.getElementById("questions-row");
  const categories = categoriesList();
  
  let questionList = setQuestionList()
  let alert = document.getElementById("alert")
  let datas = [
    form['question'],
    form['A'],
    form['B'],
    form['C'],
    form['D'],
    form['correct'],
    form['category'],
    1
  ]
  
  datas.forEach(data => {
    if (data.value == '') {
      alert.classList.add('alert', 'alert-danger', 'py-1', 'mb-2')
      alert.innerHTML = "All fields are required"
    }
  })

  hideModal("add-question")

  // ADD TO DATABASE
  questionList.push({
    id: 5,
    question: datas[0].value,
    choices: [
      "RAM",
      "CPU",
      "Hard Disk",
      "CD-ROM",
    ],
    answer: "RAM",
    category: 2,
    status: 1
  })

  // CREATE NEW ELEMENT

  const dataCategory = parseInt(datas[6].value)

  let col = document.createElement("div");
  col.setAttribute("class", "col-3");

  let categoryStatus = `<span class="badge bg-success">${
    categories[parseInt(datas[6].value)]
  }</span>`;

  if (dataCategory === 1) {
    categoryStatus = `<span class="badge bg-warning">${
      categories[dataCategory]
    }</span>`;
  } else if (dataCategory === 2) {
    categoryStatus = `<span class="badge bg-danger">${
      categories[dataCategory]
    }</span>`;
  }

  
    col.innerHTML = `
    <div class="card h-100">
          <div class="card-body">
              <div class="d-flex justify-content-between">
                  <p class="text-muted">Category: ${categoryStatus}</p>
              </div>
              <div class="align-self-center">
                <p class="pt-2">${datas[0].value}</p>
              </div>
          </div>
      </div>
    `;
    questionRow.appendChild(col);

    form.reset()
}

if (submitForm) {
  submitForm.onsubmit = () => {
    const form = document.forms['add-question']
    event.preventDefault()
    addQuestion(form)
  }
}

if (adminDOM) {
  adminDOM.onload = () => {
    activateTooltip()
    activateDataTable()
    getQuestions()
  }
}
