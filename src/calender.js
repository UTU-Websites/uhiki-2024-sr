document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonth = document.getElementById('calendar-month');
    const calendarDate = document.getElementById('calendar-date');
    const calendarEvent = document.getElementById('calendar-event');
    const calendarPicture = document.getElementById('calendar-picture');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    const events = {
        // Add more events here
        '2024-08-10': [
            { time: '10:00 AM', event: 'Meeting with client' },
            { time: '02:00 PM', event: 'Project Review' }
        ],
        '2024-08-15': [
            { time: '09:00 AM', event: 'Project deadline' }
        ],
        '2024-08-20': [
            { time: '09:00 AM', event: 'Project deadline' }
        ],
    };

    let currentDate = new Date();

    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarGrid.innerHTML = ''; // Clear the grid

        // Add day headers
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar__day';
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        });

        // Create empty divs for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'calendar__number';
            calendarGrid.appendChild(emptyDiv);
        }

        // Add the actual days
        for (let i = 1; i <= lastDate; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'calendar__number';
            dateDiv.textContent = i;
            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            dateDiv.addEventListener('click', () => updateEventDetails(fullDate));

            if (events[fullDate]) {
                dateDiv.classList.add('calendar__number--event'); // Highlight days with events
            }
            
            if (i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                dateDiv.classList.add('calendar__number--current');
                updateEventDetails(fullDate);
            }

            calendarGrid.appendChild(dateDiv);
        }
    }

    function updateEventDetails(fullDate) {
        const eventDetails = events[fullDate];
        if (eventDetails) {
            calendarDate.textContent = `${new Date(fullDate).getDate()}, ${new Date(fullDate).toLocaleString('default', { weekday: 'long' })}`;
            calendarEvent.innerHTML = '';

            eventDetails.forEach((event, index) => {
                const eventItem = document.createElement('p');
                const eventTime = document.createElement('strong');
                eventTime.textContent = `${event.time}: `;
                eventItem.appendChild(eventTime);
                eventItem.appendChild(document.createTextNode(event.event));

                // Cross out past events
                if (new Date(fullDate).getTime() < new Date().setHours(0, 0, 0, 0)) {
                    eventItem.style.textDecoration = 'line-through';
                }

                calendarEvent.appendChild(eventItem);
            });

            calendarPicture.style.backgroundImage = 'url("https://via.placeholder.com/300x200.png?text=Event+Day")';
        } else {
            calendarDate.textContent = `${new Date(fullDate).getDate()}, ${new Date(fullDate).toLocaleString('default', { weekday: 'long' })}`;
            calendarEvent.textContent = 'No events today. Coming soon on the next date.';
            calendarPicture.style.backgroundImage = 'url("https://images.unsplash.com/photo-1516912481808-3406841bd33c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=183f2924ba5a8429441804609b2d4f61")';
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Initialize the calendar
    updateCalendar();
});
