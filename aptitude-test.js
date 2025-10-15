const questions = [
    {
        question: "Which of the following activities do you enjoy the most?",
        options: [
            { text: "Solving puzzles and brain teasers", career: "Engineering" },
            { text: "Helping and caring for others", career: "Medicine" },
            { text: "Creating art or music", career: "Arts" },
            { text: "Working with numbers and data", career: "Finance" }
        ]
    },
    {
        question: "What type of work environment do you prefer?",
        options: [
            { text: "A fast-paced, collaborative office", career: "Business" },
            { text: "A quiet, independent setting", career: "Research" },
            { text: "A hands-on, practical workshop", career: "Technology" },
            { text: "Outdoors and in nature", career: "Environmental Science" }
        ]
    },
    {
        question: "Which subject did you excel at in school?",
        options: [
            { text: "Math and Science", career: "Engineering" },
            { text: "English and History", career: "Law" },
            { text: "Art and Music", career: "Arts" },
            { text: "Physical Education", career: "Sports" }
        ]
    },
    {
        question: "What are you passionate about?",
        options: [
            { text: "Technology and innovation", career: "Technology" },
            { text: "Social justice and equality", career: "Law" },
            { text: "Health and wellness", career: "Medicine" },
            { text: "Creative expression", career: "Arts" }
        ]
    },
    {
        question: "How do you approach problem-solving?",
        options: [
            { text: "Logically and systematically", career: "Engineering", weight: 1.5 },
            { text: "Intuitively and creatively", career: "Arts", weight: 1.5 },
            { text: "Collaboratively and with empathy", career: "Business", weight: 1.2 },
            { text: "Analytically and with data", career: "Finance", weight: 1.2 }
        ]
    },
    {
        question: "What is your ideal work-life balance?",
        options: [
            { text: "A predictable 9-to-5 schedule", career: "Government", weight: 1.2 },
            { text: "Flexible hours and remote work options", career: "Technology", weight: 1.5 },
            { text: "Long hours with high potential for reward", career: "Finance", weight: 1.5 },
            { text: "Project-based work with varying intensity", career: "Arts", weight: 1.2 }
        ]
    },
    {
        question: "What are your long-term career goals?",
        options: [
            { text: "To become an expert in a specific field", career: "Research", weight: 1.5 },
            { text: "To lead and inspire a team", career: "Business", weight: 1.5 },
            { text: "To make a positive impact on society", career: "Non-Profit", weight: 1.2 },
            { text: "To achieve financial independence", career: "Finance", weight: 1.2 }
        ]
    },
    {
        question: "What motivates you the most?",
        options: [
            { text: "Solving complex challenges", career: "Engineering", weight: 1.5 },
            { text: "Helping others and making a difference", career: "Medicine", weight: 1.5 },
            { text: "Financial incentives and recognition", career: "Finance", weight: 1.2 },
            { text: "Creative freedom and self-expression", career: "Arts", weight: 1.2 }
        ]
    }
];

const careerScores = {
    "Engineering": 0,
    "Medicine": 0,
    "Arts": 0,
    "Finance": 0,
    "Business": 0,
    "Research": 0,
    "Technology": 0,
    "Environmental Science": 0,
    "Law": 0,
    "Sports": 0,
    "Government": 0,
    "Non-Profit": 0
};

document.addEventListener('DOMContentLoaded', () => {
    const testContainer = document.getElementById('aptitude-test-container');
    const submitButton = document.getElementById('submit-aptitude-test');
    const progressBar = document.getElementById('progress-bar');

    if (testContainer) {
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            q.options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${index}`;
                input.value = option.career;
                input.addEventListener('change', () => {
                    updateProgressBar();
                });
                label.appendChild(input);
                label.appendChild(document.createTextNode(option.text));
                questionElement.appendChild(label);
            });

            testContainer.appendChild(questionElement);
        });
    }

    function updateProgressBar() {
        const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
        const totalQuestions = questions.length;
        const progress = (answeredQuestions / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }

    if (submitButton) {
        submitButton.addEventListener('click', () => {
            // Reset scores
            for (const career in careerScores) {
                careerScores[career] = 0;
            }

            // Calculate scores
            questions.forEach((q, index) => {
                const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
                if (selectedOption) {
                    const selectedCareer = selectedOption.value;
                    const selectedWeight = q.options.find(opt => opt.career === selectedCareer).weight || 1;
                    careerScores[selectedCareer] += selectedWeight;
                }
            });

            // Determine the highest score
            let recommendedCareer = "";
            let maxScore = 0;
            for (const career in careerScores) {
                if (careerScores[career] > maxScore) {
                    maxScore = careerScores[career];
                    recommendedCareer = career;
                }
            }

            localStorage.setItem('recommendedCareer', recommendedCareer);

            // Display the recommendation
            const resultContainer = document.getElementById('aptitude-test-result');
            if (resultContainer) {
                if (recommendedCareer) {
                    resultContainer.innerHTML = `<p>Based on your answers, a career in <strong>${recommendedCareer}</strong> might be a good fit for you!</p>`;
                } else {
                    resultContainer.innerHTML = `<p>Please answer all the questions to get a recommendation.</p>`;
                }
            }
        });
    }
});