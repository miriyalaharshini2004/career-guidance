// Career Guidance App Logic
import { firebaseConfig } from './firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const collegeSignupForm = document.getElementById('college-signup-form');
if (collegeSignupForm) {
    collegeSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const collegename = document.getElementById('collegename').value;
        const location = document.getElementById('location').value;
        const career = document.getElementById('career').value;
        const description = document.getElementById('description').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User created:', user);

                // Add college to Firestore
                addDoc(collection(db, "colleges"), {
                    name: collegename,
                    email: email,
                    uid: user.uid,
                    location: location,
                    career: career,
                    description: description
                })
                .then(() => {
                    alert('College sign up successful!');
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    alert(`Error: ${error.message}`);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign up error:', errorCode, errorMessage);
                alert(`Error: ${errorMessage}`);
            });
    });
}

const scoreSpan = document.getElementById('score');
if (scoreSpan) {
    const score = localStorage.getItem('testScore');
    scoreSpan.textContent = score;
}

const collegeListContainer = document.querySelector('.college-list');
if (collegeListContainer) {
    const recommendedCareer = localStorage.getItem('recommendedCareer');

    let q;
    if (recommendedCareer) {
        q = query(collection(db, "colleges"), where("career", "==", recommendedCareer));
    } else {
        q = query(collection(db, "colleges"));
    }

    getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const college = doc.data();
                const collegeItem = document.createElement('div');
                collegeItem.classList.add('college-item');
                collegeItem.innerHTML = `
                    <a href="college-details.html?id=${doc.id}">
                        <h3>${college.name}</h3>
                        <p>${college.location}</p>
                    </a>
                `;
                collegeListContainer.appendChild(collegeItem);
            });
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        });
}

const testContainer = document.querySelector('.test-container');
if (testContainer) {
    const questions = [
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Jupiter", "Saturn", "Earth"],
            answer: "Jupiter"
        }
    ];

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="options">
                ${q.options.map(option => `<div class="option"><input type="radio" name="question${index}" value="${option}"> ${option}</div>`).join('')}
            </div>
        `;
        testContainer.appendChild(questionDiv);
    });

    const submitTestButton = document.getElementById('submit-test');
    submitTestButton.addEventListener('click', () => {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        localStorage.setItem('testScore', score);
        window.location.href = "test-completion.html";
    });
}

const collegeRegistrationForm = document.getElementById('college-registration-form');
if (collegeRegistrationForm) {
    collegeRegistrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const collegeId = urlParams.get('id');

        const studentname = document.getElementById('studentname').value;
        const studentemail = document.getElementById('studentemail').value;
        const studentphone = document.getElementById('studentphone').value;

        addDoc(collection(db, "registrations"), {
            collegeId: collegeId,
            studentName: studentname,
            studentEmail: studentemail,
            studentPhone: studentphone
        })
        .then(() => {
            alert('Registration successful!');
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert(`Error: ${error.message}`);
        });
    });
}

const collegeDetailsContainer = document.querySelector('.college-details');
if (collegeDetailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const collegeId = urlParams.get('id');

    const docRef = doc(db, "colleges", collegeId);
    getDoc(docRef)
        .then((doc) => {
            if (doc.exists()) {
                const college = doc.data();
                collegeDetailsContainer.innerHTML = `
                    <h2>${college.name}</h2>
                    <p><strong>Location:</strong> ${college.location}</p>
                    <p><strong>Career:</strong> ${college.career}</p>
                    <p><strong>Description:</strong> ${college.description}</p>
                    <a href="college-registration.html?id=${doc.id}" class="btn">Register Now</a>
                `;
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });
}

const locationButtons = document.querySelectorAll('.location-btn');
if (locationButtons) {
    locationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLocation = button.textContent;
            localStorage.setItem('selectedLocation', selectedLocation);
            window.location.href = "college-list.html";
        });
    });
}

const careerButtons = document.querySelectorAll('.career-btn');
if (careerButtons) {
    careerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCareer = button.textContent;
            localStorage.setItem('selectedCareer', selectedCareer);
            window.location.href = "location-selection.html";
        });
    });
}

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User created:', user);

                // Add student to Firestore
                addDoc(collection(db, "students"), {
                    name: fullname,
                    email: email,
                    uid: user.uid
                })
                .then(() => {
                    alert('Sign up successful!');
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    alert(`Error: ${error.message}`);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Sign up error:', errorCode, errorMessage);
                alert(`Error: ${errorMessage}`);
            });
    });
}

const studentDetailsContainer = document.querySelector('.student-details');
if (studentDetailsContainer) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const q = query(collection(db, "students"), where("uid", "==", user.uid));

        getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const studentDoc = querySnapshot.docs[0];
                    const student = studentDoc.data();
                    studentDetailsContainer.innerHTML = `
                        <p><strong>Name:</strong> ${student.name}</p>
                        <p><strong>Email:</strong> ${student.email}</p>
                    `;
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('User logged in:', user);
                window.location.href = "career-selection.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorCode, errorMessage);
                if (errorCode === 'auth/invalid-credential') {
                    alert('Invalid email or password. Please try again.');
                } else {
                    alert(`Error: ${errorMessage}`);
                }
            });
    });
}