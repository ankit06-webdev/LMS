// Global variable to store selected values
let selectedBranch = "";
let selectedSemester = "";
let selectedSubject = "";

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initFormListeners();
});

function initFormListeners() {
  const branchSelect = document.getElementById("branch");
  const semesterSelect = document.getElementById("semester");
  const subjectSelect = document.getElementById("subject");
  const getNotesBtn = document.getElementById("getNotesBtn");

  branchSelect.addEventListener("change", () => {
    selectedBranch = branchSelect.value;
    console.log("Selected Branch:", selectedBranch);
    updateSubjectOptions();
  });

  semesterSelect.addEventListener("change", () => {
    selectedSemester = semesterSelect.value;
    console.log("Selected Semester:", selectedSemester);
    updateSubjectOptions();
  });

  subjectSelect.addEventListener("change", () => {
    selectedSubject = subjectSelect.value;
    console.log("Selected Subject:", selectedSubject);
  });

  getNotesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedSubject) {
      displaySubjectResources(selectedSubject);
    } else {
      alert("Please select a subject.");
    }
  });
}

function updateSubjectOptions() {
  const subjectSelect = document.getElementById("subject");
  subjectSelect.innerHTML = '<option selected disabled value="">Choose...</option>';

  if (!selectedBranch || !selectedSemester) return;

  const subjectMap = {
    "Computer Science": {
      "1st": ["Data Structures", "Operating Systems"],
      "2nd": ["Data Structures", "Operating Systems"],
      "3rd": ["Data Structures", "Operating Systems"],
      "4th": ["Data Structures", "Operating Systems"],
      "5th": ["Microprocessors & Microcontrollers", "Java Programming", "Computer Graphics", "Mobile Computing", "E-Commerce"],
      "6th": ["Network Security", "Industrial Engineering & Management", "Software Engineering & Tools", "Cloud Computing", "Internet Of Things"]
    },
    "Electrical": {
      "5th": ["Power Systems", "Control Systems"],
      "6th": ["Electrical Machines", "Microcontrollers"]
    },
    "Mechanical": {
      "5th": ["Fluid Mechanics", "Thermodynamics"],
      "6th": ["Machine Design", "Heat Transfer"]
    }
    // Add more branches and semesters as needed
  };

  const subjects = subjectMap[selectedBranch]?.[selectedSemester] || [];

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });
}

function getSelectedBranch() {
  return selectedBranch;
}

// You can call this wherever needed later in your code
// Example:
// console.log("Accessing Branch Later:", getSelectedBranch());
// function submit() {
//   const btn = document.querySelector(".btn");
//   console.log(btn);
  
//   btn.addEventListener("click", ()=>{
//     // let path = 



//   });
// }
// submit();





// Function to display resources section based on subject
function displaySubjectResources(subject) {
  const container = document.getElementById("subjectResources");
  if (!container) return;

  // Example data mapping for demonstration
  const resourceMap = {
    "Data Structures": {
      notes: "cse.pdf",
      syllabus: "cse.pdf",
      pyqs: "cse.pdf"
    },
    "Operating Systems": {
      notes: "notes/os.pdf",
      syllabus: "syllabus/os.pdf",
      pyqs: "pyqs/os.pdf"
    },
    "Computer Networks": {
      notes: "notes/cn.pdf",
      syllabus: "syllabus/cn.pdf",
      pyqs: "pyqs/cn.pdf"
    }
    // Add more subjects and paths as needed
  };

  const resources = resourceMap[subject];

  if (!resources) {
    container.innerHTML = "<p>No resources available for this subject.</p>";
    return;
  }

  container.innerHTML = `
    <h4 class="mt-5">${subject}</h4>
    <table class="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Type</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Notes</td>
          <td><a href="${resources.notes}" target="_blank">Download</a></td>
        </tr>
        <tr>
          <td>Syllabus</td>
          <td><a href="${resources.syllabus}" target="_blank">Download</a></td>
        </tr>
        <tr>
          <td>PYQs</td>
          <td><a href="${resources.pyqs}" target="_blank">Download</a></td>
        </tr>
      </tbody>
    </table>
  `;
}