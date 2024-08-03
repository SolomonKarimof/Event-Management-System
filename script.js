// Sample event data
const events = [
    { id: 1, name: "Web Development Workshop", date: "2024-09-15", description: "Learn the basics of web development with HTML, CSS, and JavaScript. Perfect for beginners!", image: "https://resources.reed.co.uk/courses/coursemedia/372863/22c5e5f2-830f-4a15-b9a1-1be63556332f_cover.webp" },
    { id: 2, name: "AI Conference", date: "2024-10-20", description: "Explore the latest advancements in artificial intelligence and machine learning.", image: "https://tryolabs.imgix.net/assets/blog/machine-learning-deep-learning-conferences/machine-learning-conferences-542593dd92.png?auto=format&fit=max&w=3840" },
    { id: 3, name: "Music Festival", date: "2024-11-05", description: "Enjoy live performances from top artists across various genres. A weekend full of music and fun!", image: "https://c7.alamy.com/comp/CX63D0/stage-at-a-summer-music-festival-CX63D0.jpg" },
    { id: 4, name: "Startup Pitch Competition", date: "2024-12-01", description: "Present your innovative ideas to investors and win funding for your startup.", image: "https://www.pitchskills.com/wp-content/uploads/2017/12/Best-Pitch-Competitions-1080x628.jpg" },
    { id: 5, name: "Photography Workshop", date: "2025-01-10", description: "Improve your photography skills with hands-on tutorials from professional photographers.", image: "https://photocontestdeadlines.com/wp-content/uploads/2018/08/Top-100-Photography-Award.png" },
    { id: 6, name: "Fitness Bootcamp", date: "2025-02-15", description: "Get in shape with our intensive fitness program led by certified trainers.", image: "https://img.freepik.com/free-photo/sport-lifestyle-fitness-male-training_1139-724.jpg?size=626&ext=jpg" }
];

// DOM elements
const homeSection = document.getElementById('home');
const eventsSection = document.getElementById('events');
const myEventsSection = document.getElementById('my-events');
const eventList = document.getElementById('event-list');
const registeredEvents = document.getElementById('registered-events');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');
const modalActionBtn = document.getElementById('modal-action-btn');
const closeModal = document.getElementsByClassName('close')[0];

// Navigation
document.getElementById('home-link').addEventListener('click', showHome);
document.getElementById('events-link').addEventListener('click', showEvents);
document.getElementById('my-events-link').addEventListener('click', showMyEvents);
document.getElementById('explore-events-btn').addEventListener('click', showEvents);

function showHome() {
    setActiveSection(homeSection);
    setActiveLink('home-link');
}

function showEvents() {
    setActiveSection(eventsSection);
    setActiveLink('events-link');
}

function showMyEvents() {
    setActiveSection(myEventsSection);
    setActiveLink('my-events-link');
}

function setActiveSection(section) {
    homeSection.classList.remove('active');
    eventsSection.classList.remove('active');
    myEventsSection.classList.remove('active');
    section.classList.add('active');
}

function setActiveLink(linkId) {
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.getElementById(linkId).classList.add('active');
}

// Display events
function displayEvents() {
    eventList.innerHTML = '';
    events.forEach(event => {
        const eventCard = createEventCard(event, 'Register');
        eventList.appendChild(eventCard);
    });
}

function createEventCard(event, buttonText) {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
        <img src="${event.image}" alt="${event.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <button onclick="openEventModal(${event.id}, '${buttonText}')">${buttonText}</button>
    `;
    return card;
}

// Event registration
let registeredEventIds = [];

function registerEvent(eventId) {
    if (!registeredEventIds.includes(eventId)) {
        registeredEventIds.push(eventId);
        updateRegisteredEvents();
        alert('You have successfully registered for the event!');
    } else {
        alert('You are already registered for this event.');
    }
}

function updateRegisteredEvents() {
    registeredEvents.innerHTML = '';
    registeredEventIds.forEach(id => {
        const event = events.find(e => e.id === id);
        if (event) {
            const eventCard = createEventCard(event, 'Unregister');
            registeredEvents.appendChild(eventCard);
        }
    });
}

function cancelRegistration(eventId) {
    registeredEventIds = registeredEventIds.filter(id => id !== eventId);
    updateRegisteredEvents();
    alert('Your registration has been cancelled.');
}

// Modal functions
function openEventModal(eventId, action) {
    const event = events.find(e => e.id === eventId);
    modalTitle.textContent = event.name;
    modalDate.textContent = `Date: ${event.date}`;
    modalDescription.textContent = event.description;
    modalActionBtn.textContent = action;
    modalActionBtn.onclick = () => {
        if (action === 'Register') {
            registerEvent(eventId);
        } else {
            cancelRegistration(eventId);
        }
        closeEventModal();
    };
    modal.style.display = 'block';
}

function closeEventModal() {
    modal.style.display = 'none';
}

closeModal.onclick = closeEventModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeEventModal();
    }
}

// Initialize the application
displayEvents();
showHome();