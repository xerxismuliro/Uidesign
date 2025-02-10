
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
});

function initializeUI() {
    const body = document.body;

    const flexContainer = createFlexContainer();
    const leftSidebarDiv = createLeftSidebar();
    const middleDiv = createMiddleDiv();
    const rightSidebarDiv = createRightSidebar();

    flexContainer.appendChild(leftSidebarDiv);
    flexContainer.appendChild(middleDiv);
    flexContainer.appendChild(rightSidebarDiv);

    body.appendChild(flexContainer);

    appendTerminalEventsContent();
}

function createFlexContainer() {
    const flexContainer = document.createElement('div');
    flexContainer.className = 'flex-container';
    return flexContainer;
}

function createLeftSidebar() {
    const leftSidebarDiv = document.createElement('div');
    leftSidebarDiv.className = 'leftSidebarDiv';

    const pinAndpinWinparentDiv = document.createElement('div');
    pinAndpinWinparentDiv.id = 'pinAndpinWinparentDiv';

    const searchInput = document.createElement('div');
    searchInput.id = 'searchInput';
    searchInput.innerHTML = '<input type="text" id="searchBox" placeholder="Search an Event">';

    pinAndpinWinparentDiv.appendChild(searchInput);
    leftSidebarDiv.appendChild(pinAndpinWinparentDiv);

    const leftApps = createLeftApps();
    const MonthsWthEvents = createMonthsWthEvents();
    leftSidebarDiv.appendChild(leftApps);
    leftSidebarDiv.appendChild(MonthsWthEvents);

    return leftSidebarDiv;
}


function createMonthsWthEvents() {
    const MonthsWthEvents = document.createElement('div');
    MonthsWthEvents.id = 'MonthsWthEvents-leftDiv'; // Ensure the id is set correctly
    MonthsWthEvents.className = 'MonthsWthEvents-leftDiv';
    return MonthsWthEvents;
}


function createLeftApps() {
    const leftApps = document.createElement('div');
    leftApps.className = 'left-apps';

    const section1 = createSection1();
    const section2 = createSection2();
    const section3 = createSection3();

    leftApps.appendChild(section1);
    leftApps.appendChild(section2);
    leftApps.appendChild(section3);

    return leftApps;
}


function createSection1() {
    const section1 = document.createElement('div');
    section1.className = 'section';
    section1.innerHTML = `
        <div class="settings" data-target="settingsContent">
            <i class="fas fa-cog icon-settings"></i>
            <span>Settings</span>
        </div>
        <div class="upcoming" data-target="upcomingContent">
            <i class="fas fa-calendar-alt icon-upcoming"></i>
            <span>Upcoming</span>
        </div>
        <div class="add-event" data-target="addEventContent">
            <i class="fas fa-plus-circle icon-add-event"></i>
            <span>Add Event</span>
        </div>
    `;
    return section1;
}

function createSection2() {
    const section2 = document.createElement('div');
    section2.className = 'section';
    section2.innerHTML = `
        <div class="calendar-view" data-target="calendarContent">
            <i class="fas fa-calendar icon-calendar-view"></i>
            <span>Calendar</span>
            <div id="miniCalendar"></div>
        </div>
        <div class="statistics" data-target="statisticsContent">
            <i class="fas fa-chart-bar icon-statistics"></i>
            <span>Statistics</span>
        </div>
        <div class="reminders" data-target="remindersContent">
            <i class="fas fa-bell icon-reminders"></i>
            <span>Reminders</span>
        </div>
    `;
    return section2;
}

function createSection3() {
    const section3 = document.createElement('div');
    section3.className = 'section';
    section3.innerHTML = `
        <div class="help-support" data-target="helpSupportContent">
            <i class="fas fa-question-circle icon-help-support"></i>
            <span>Help & Support</span>
        </div>
    `;
    return section3;
}


function createMiddleDiv() {
    const middleDiv = document.createElement('div');
    middleDiv.className = 'middleDiv';

    const savedEventsDataTypes = document.createElement('div');
    savedEventsDataTypes.className = 'savedEventsDataTypes';
    savedEventsDataTypes.innerHTML = `
       <!--  <div id="Events-saved-via-Terminal" data-target="terminalEventsContent">Events saved via Terminal</div> -->
        <div id="Events-saved-via-Browser" data-target="browserEventsContent">View saved Events</div>
        <input type="file" id="fileInput" style="display: none;">
    `;

    middleDiv.appendChild(savedEventsDataTypes);
    middleDiv.innerHTML += createContentDivs();

    return middleDiv;
}

function createContentDivs() {
    return `
        ${createSettingsContent()}
        ${createUpcomingContent()}
        ${createAddEventContent()}
        ${createCalendarContent()}
        ${createStatisticsContent()}
        ${createRemindersContent()}
        ${createHelpSupportContent()}
        ${createTerminalEventsContent()}
        ${createBrowserEventsContent()}
        ${createTodoContent()}
    `;
}

function createSettingsContent() {
    return `
        <div id="settingsContent" class="contentDiv" style="display: none;">
            <h1>Settings</h1>
            <!-- Settings content here -->
        </div>
    `;
}

function createUpcomingContent() {
    return `
        <div id="upcomingContent" class="contentDiv" style="display: none;">
            <h1>Upcoming</h1>
            <!-- Upcoming content here -->
        </div>
    `;
}


function createAddEventContent() {
    return `
        <div id="addEventContent" class="contentDiv" style="display: none;">
            <h1>Add Event</h1>
            <div id="addEventSection">
                <form id="addEventForm">
                    <div class="formGroupParent1">
                        <div class="formGroup1">
                            <label for="eventDate">Event Date:</label>
                            <input type="date" id="eventDate" name="eventDate" required>
                        </div>
                        <div class="formGroup2">
                            <label for="eventTime">Event Time:</label>
                            <input type="time" id="eventTime" name="eventTime" required>
                        </div>
                    </div>
                    <div class="formGroup3">
                        <label for="eventDescription">Event Description:</label>
                        <textarea id="eventDescription" name="eventDescription" required></textarea>
                    </div>
                    <button type="submit">Add Event</button>
                </form>
            </div>
        </div>
    `;
}




function createCalendarContent() {
    return `
        <div id="calendarContent" class="contentDiv" style="display: none;">
            <h1>Calendar</h1>
            <!-- Calendar content here -->
        </div>
    `;
}

function createStatisticsContent() {
    return `
        <div id="statisticsContent" class="contentDiv" style="display: none;">
            <h1>Statistics</h1>
            <!-- Statistics content here -->
        </div>
    `;
}


function createRemindersContent() {
    return `
        <div id="remindersContent" class="contentDiv" style="display: none;">
            <h1>Reminders</h1>
            <!-- Reminders content here -->
        </div>
    `;
}


function createHelpSupportContent() {
    return `
        <div id="helpSupportContent" class="contentDiv" style="display: none;">
            <h1>Help & Support</h1>
            <div id="helpSupportContentDiv">
               <!-- <div id="faqSection">
                    <h2>Frequently Asked Questions</h2>
                    <div id="faqContent">
                    </div>
                </div> -->
                
                <div id="troubleshootingSection">
                    <h2>About the software</h2>
                        <div id="troubleshootingContent">
                        <p>This piece of software has mainly two functionalities which I will share in a second. The entry point to run this software is by navigating to the root directory where you have downloaded or saved this software and run the bash script with <span class="phighlights">./todo.sh</span> after giving it permission on your local machine by typing this <span class="phighlights">chmod +x ./todo.sh</span> in the terminal and hit enter.</p>
                        <br>
                        <p>Once you run the bash script, you will be prompted with a menu to choose from the following options: <span class="phighlights">1. Add a to-do item, 2. View to-do list, 3. Exit.</span> If you love working in the CLI you can directly jump to option 1 or option 2 where you will be prompted to view the to-do list in the browser with a yes or no <span class="phighlights">(y/n)</span>.</p>
                        <br>
                        <p>Of course, no will keep you in the terminal and Yes will open the UI in your default browser. In the browser UI you will be able to do more with an intuitive interface, You can add events directly by clicking the Add Event Plus Button and so on. At the top of the web app you have a topbar with two buttons which when clicked will display events depending on where you created them</p>
                        <br>
                        <p>This will automatically fetch all the required files and extra scripts to construct the HTML document to display the interactive User Interface (UI).</p>
                    </div>
                </div>
                
            </div>
        </div>
    `;
}




function createTerminalEventsContent() {
    return `
        <div id="terminalEventsContent" class="contentDiv" style="display: none;">
            <h4>To-Do List 🕰️ (Terminal)</h4>
            <table class="todo-table">
                <thead>
                    <tr><th>Event Date</th><th>Event Time</th><th>Event</th><th>Time Created</th></tr>
                </thead>
                <tbody id="terminalTodoTableBody">
                    <!-- To-Do items will be inserted here -->
                </tbody>
            </table>
        </div>
    `;
}

function createBrowserEventsContent() {
    return `
        <div id="browserEventsContent" class="contentDiv" style="display: none;">
            <h4>To-Do List 🕰️ (Browser)</h4>
            <table class="todo-table">
                <thead>
                    <tr><th>Event Date</th><th>Event Time</th><th>Event</th><th>Time Created</th></tr>
                </thead>
                <tbody id="browserTodoTableBody">
                    <!-- To-Do items will be inserted here -->
                </tbody>
            </table>
        </div>
    `;
}

function createTodoContent() {
    return `
        <div id="todoContent" class="contentDiv">
            <h1>To-Do List 🕰️</h1>
            <table class="todo-table">
                <thead>
                    <tr><th>Event Date</th><th>Event Time</th><th>Event</th><th>Time Created</th></tr>
                </thead>
                <tbody id="todoTableBody">
                    <!-- To-Do items will be inserted here -->
                </tbody>
            </table>
        </div>
    `;
}



function createRightSidebar() {
    const rightSidebarDiv = document.createElement('div');
    rightSidebarDiv.className = 'rightSidebarDiv';
    rightSidebarDiv.innerHTML = '<div id="calendar"></div>';
    return rightSidebarDiv;
}




function appendTerminalEventsContent() {
    const terminalEventsContentDiv = document.querySelector('#terminalEventsContent tbody');
    const tableRowsHTML = `
       
    `;
    terminalEventsContentDiv.innerHTML += tableRowsHTML;
}







