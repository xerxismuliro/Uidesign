document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    setupSearchFunctionality();
    setupIndexedDB().then(db => {
        setupSectionNavigation(db);
        setupAddEventForm(db);
        displayMonthsWithEvents(db);
    });
});

function initializeCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let month = 0; month < 12; month++) {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';
        const monthName = new Date(currentYear, month).toLocaleString('default', { month: 'long' });
        monthDiv.innerHTML = `<h3>${monthName}</h3>`;

        const daysDiv = document.createElement('div');
        daysDiv.className = 'days';

        const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            dayDiv.dataset.date = `${currentYear}-${month + 1}-${day}`;

            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendarDiv.appendChild(monthDiv);
    }

    // Function to highlight the current day
    function highlightCurrentDay() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();

        document.querySelectorAll('.day').forEach(dayDiv => {
            const [year, month, day] = dayDiv.dataset.date.split('-').map(Number);
            if (month - 1 === currentMonth && day === currentDay) {
                dayDiv.classList.add('current-day');
            } else {
                dayDiv.classList.remove('current-day');
            }
        });
    }

    // Initial highlight
    highlightCurrentDay();

    // Check and update the highlight every minute
    setInterval(highlightCurrentDay, 60000);
}

function setupSearchFunctionality() {
    const searchBox = document.getElementById('searchBox');
    const terminalTodoTableBody = document.getElementById('terminalTodoTableBody');
    const browserTodoTableBody = document.getElementById('browserTodoTableBody');

    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();

        const filterRows = (tableBody) => {
            const rows = tableBody.getElementsByTagName('tr');
            Array.from(rows).forEach(row => {
                const eventDate = row.getElementsByClassName('todo-date')[0].textContent.toLowerCase();
                const eventTime = row.getElementsByClassName('todo-time')[0].textContent.toLowerCase();
                const eventItem = row.getElementsByClassName('todo-item')[0].textContent.toLowerCase();

                if (eventDate.includes(searchTerm) || eventTime.includes(searchTerm) || eventItem.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        };

        filterRows(terminalTodoTableBody);
        filterRows(browserTodoTableBody);
    });
}

function setupIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('todoDB', 1);

        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
            reject(event.target.errorCode);
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            loadBrowserEvents(db); // Load events after successful connection
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('events', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('date', 'date', { unique: false });
            objectStore.createIndex('time', 'time', { unique: false });
            objectStore.createIndex('description', 'description', { unique: false });
            objectStore.createIndex('timeCreated', 'timeCreated', { unique: false });
        };
    });
}

function setupAddEventForm(db) {
    const addEventForm = document.getElementById('addEventForm');
    addEventForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addEventToIndexedDB(db);
    });
}

function addEventToIndexedDB(db) {
    const newEvent = {
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        description: document.getElementById('eventDescription').value,
        timeCreated: new Date().toISOString() // Add time created
    };

    const transaction = db.transaction(['events'], 'readwrite');
    const objectStore = transaction.objectStore('events');
    const request = objectStore.add(newEvent);

    request.onsuccess = () => {
        console.log('Event added to the database');
        document.getElementById('addEventForm').reset();
        alert('Event added successfully!');
        loadBrowserEvents(db); // Reload events after adding a new one
        displayMonthsWithEvents(db); // Update months with events
    };

    request.onerror = (event) => {
        console.error('Error adding event:', event.target.errorCode);
    };
}

function loadBrowserEvents(db) {
    const transaction = db.transaction(['events'], 'readonly');
    const objectStore = transaction.objectStore('events');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        const events = event.target.result;
        const tableBody = document.getElementById('browserTodoTableBody');
        tableBody.innerHTML = '';
        events.forEach(event => {
            const row = document.createElement('tr');
            const formattedTimeCreated = new Date(event.timeCreated).toLocaleString(); // Format the time created
            const formattedEventTime = new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Format the event time
            row.innerHTML = `<td class="todo-date">${event.date}</td><td class="todo-time">${formattedEventTime}</td><td class="todo-item">${event.description}</td><td class="time-created">${formattedTimeCreated}</td>`;
            tableBody.appendChild(row);
        });
    };

    request.onerror = (event) => {
        console.error('Error loading browser events:', event.target.errorCode);
    };
}

function setupSectionNavigation(db) {
    const sections = document.querySelectorAll('.left-apps .section > div, .allINtopBar > div');
    const contentDivs = document.querySelectorAll('.middleDiv .contentDiv');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            const targetId = section.getAttribute('data-target');
            contentDivs.forEach(div => {
                if (div.id === targetId) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            });

            if (targetId === 'terminalEventsContent') {
                loadTerminalEvents();
            } else if (targetId === 'browserEventsContent') {
                loadBrowserEvents(db);
            }
        });
    });
}



function loadTerminalEvents() {
    // Implement the function to load terminal events if needed
}

function displayMonthsWithEvents(db) {
    const monthsWithEventsDiv = document.getElementById('MonthsWthEvents-leftDiv');
    if (!monthsWithEventsDiv) {
        console.error('Element with id "MonthsWthEvents-leftDiv" not found.');
        return;
    }
    monthsWithEventsDiv.innerHTML = ''; // Clear previous content

    const indexedDBMonthsSet = new Set();
    const terminalMonthsSet = new Set();

    // Load events from IndexedDB
    const transaction = db.transaction(['events'], 'readonly');
    const objectStore = transaction.objectStore('events');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        const events = event.target.result;
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const monthName = eventDate.toLocaleString('default', { month: 'long' });
            indexedDBMonthsSet.add(monthName);
        });

        // Load events from terminal
        const terminalEvents = getTerminalEvents();
        terminalEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const monthName = eventDate.toLocaleString('default', { month: 'long' });
            terminalMonthsSet.add(monthName);
        });

        // Create divs for IndexedDB months
        const indexedDBMonthsDiv = document.createElement('div');
        indexedDBMonthsDiv.className = 'indexedDBMonths';
        indexedDBMonthsDiv.innerHTML = '<p class="pfortemOrBr">Browser Months Events</p>';
        indexedDBMonthsSet.forEach(month => {
            const monthDiv = document.createElement('div');
            monthDiv.innerHTML = `<i class="fas fa-calendar-alt"></i> <span>${month}</span>`;
            indexedDBMonthsDiv.appendChild(monthDiv);
        });

        // Create divs for Terminal months
        const terminalMonthsDiv = document.createElement('div');
        terminalMonthsDiv.className = 'terminalMonths';
        terminalMonthsDiv.innerHTML = '<p class="pfortemOrBr">Terminal Months Events</p>';
        terminalMonthsSet.forEach(month => {
            const monthDiv = document.createElement('div');
            monthDiv.innerHTML = `<i class="fas fa-calendar-alt"></i> <span>${month}</span>`;
            terminalMonthsDiv.appendChild(monthDiv);
        });

        // Append both divs to the main container
        monthsWithEventsDiv.appendChild(indexedDBMonthsDiv);
        // monthsWithEventsDiv.appendChild(terminalMonthsDiv);
    };

    request.onerror = (event) => {
        console.error('Error loading events:', event.target.errorCode);
    };
}

function getTerminalEvents() {
    const terminalEventsContentDiv = document.querySelector('#terminalEventsContent tbody');
    const rows = terminalEventsContentDiv.querySelectorAll('tr');
    const events = [];

    rows.forEach(row => {
        const dateCell = row.querySelector('.todo-date');
        if (dateCell) {
            const eventDate = dateCell.textContent.trim();
            events.push({ date: eventDate });
        }
    });

    return events;
}













// function initializeCalendar() {
//     const calendarDiv = document.getElementById('calendar');
//     const currentDate = new Date();
//     const currentYear = currentDate.getFullYear();

//     for (let month = 0; month < 12; month++) {
//         const monthDiv = document.createElement('div');
//         monthDiv.className = 'month';
//         const monthName = new Date(currentYear, month).toLocaleString('default', { month: 'long' });
//         monthDiv.innerHTML = `<h3>${monthName}</h3>`;

//         const daysDiv = document.createElement('div');
//         daysDiv.className = 'days';

//         const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
//         for (let day = 1; day <= daysInMonth; day++) {
//             const dayDiv = document.createElement('div');
//             dayDiv.className = 'day';
//             dayDiv.textContent = day;
//             dayDiv.dataset.date = `${currentYear}-${month + 1}-${day}`;

//             daysDiv.appendChild(dayDiv);
//         }

//         monthDiv.appendChild(daysDiv);
//         calendarDiv.appendChild(monthDiv);
//     }

//     // Function to highlight the current day
//     function highlightCurrentDay() {
//         const currentDate = new Date();
//         const currentMonth = currentDate.getMonth();
//         const currentDay = currentDate.getDate();

//         document.querySelectorAll('.day').forEach(dayDiv => {
//             const [year, month, day] = dayDiv.dataset.date.split('-').map(Number);
//             if (month - 1 === currentMonth && day === currentDay) {
//                 dayDiv.classList.add('current-day');
//             } else {
//                 dayDiv.classList.remove('current-day');
//             }
//         });
//     }

//     // Initial highlight
//     highlightCurrentDay();

//     // Check and update the highlight every minute
//     setInterval(highlightCurrentDay, 60000);
// }

