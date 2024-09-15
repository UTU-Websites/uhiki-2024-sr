document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

document.addEventListener("DOMContentLoaded", function() {
    var toggleButtons = document.querySelectorAll(".toggleMatukio");
  
    toggleButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        var packageCosts = document.querySelector(".matukio-aya");
        var textElement = this.querySelector(".text");
  
        if (packageCosts.style.maxHeight === "0px" || packageCosts.style.maxHeight === "") {
          // Show the section with a smooth transition
          packageCosts.style.maxHeight = packageCosts.scrollHeight + "px";
          textElement.textContent = "Hide All Events"; // Only change the button text
        } else {
          // Hide the section
          packageCosts.style.maxHeight = "0";
          textElement.textContent = "Show All Events"; // Only change the button text
        }
      });
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
        // Add your events here with custom background images
        '2024-09-10': {
            events: [
                { time: '10:00 AM', event: 'Meeting with client' },
                { time: '02:00 PM', event: 'Project Review' }
            ],
            image: 'images/couple-8342763_1920.jpg' // Custom background image for this day
        },
        '2024-09-11': {
            events: [
                { time: '10:00 AM', event: 'Meeting with client' },
                { time: '02:00 PM', event: 'Project Review' }
            ],
            image: 'images/black-and-white-2590810_1920.jpg' // Custom background image for this day
        },
        '2024-09-14': {
            events: [
                { time: '09:00 AM', event: 'Wedding Day' }
            ],
            image: 'images/wedding-rings-1284225.jpg' // Custom background image for this day
        },
        // Add more events with custom images as needed
    };

    const defaultImage = 'images/ai-generated-8678444.jpg'; // Default background image

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
                if (events[fullDate]) {
                    dateDiv.classList.add('calendar__number--current-event');
                }
                updateEventDetails(fullDate);
            }

            calendarGrid.appendChild(dateDiv);
        }

        // Check for events in the next and previous months
        checkForEventsInAdjacentMonths();
    }

    function updateEventDetails(fullDate) {
        const eventDetails = events[fullDate];
        if (eventDetails) {
            calendarDate.textContent = `${new Date(fullDate).getDate()}, ${new Date(fullDate).toLocaleString('default', { weekday: 'long' })}`;
            calendarEvent.innerHTML = '';

            eventDetails.events.forEach(event => {
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

            // Set the custom background image for the event day
            calendarPicture.style.backgroundImage = `url('${eventDetails.image}')`;
        } else {
            calendarDate.textContent = `${new Date(fullDate).getDate()}, ${new Date(fullDate).toLocaleString('default', { weekday: 'long' })}`;
            calendarEvent.textContent = 'No events today.';
            calendarPicture.style.backgroundImage = `url('${defaultImage}')`;
        }
    }

    function checkForEventsInAdjacentMonths() {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        let hasNextMonthEvents = false;
        let hasPrevMonthEvents = false;

        // Check for events in the next month
        Object.keys(events).forEach(eventDate => {
            const eventDateObj = new Date(eventDate);
            if (
                eventDateObj.getFullYear() === nextMonth.getFullYear() &&
                eventDateObj.getMonth() === nextMonth.getMonth()
            ) {
                hasNextMonthEvents = true;
            }
            if (
                eventDateObj.getFullYear() === prevMonth.getFullYear() &&
                eventDateObj.getMonth() === prevMonth.getMonth()
            ) {
                hasPrevMonthEvents = true;
            }
        });

        if (hasNextMonthEvents) {
            nextMonthButton.classList.add('calendar__button--events-next');
        } else {
            nextMonthButton.classList.remove('calendar__button--events-next');
        }

        if (hasPrevMonthEvents) {
            prevMonthButton.classList.add('calendar__button--events-prev');
        } else {
            prevMonthButton.classList.remove('calendar__button--events-prev');
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
