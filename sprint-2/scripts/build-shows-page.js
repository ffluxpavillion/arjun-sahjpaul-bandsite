/* eslint-disable no-undef */
/* eslint-disable func-style */
/* eslint-disable indent */
let authKey;

//<-- Retrieves API Authentication Key -->
const retrieveAuthKey = () => {
  return axios.get('https://project-1-api.herokuapp.com/register')
    .then(response => {
      authKey = response.data.api_key;
    });
};

//<-- Retrieves Shows from API -->
const getShows = () => {
  return axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${authKey}`)
    .then(response => {
      renderComments(response.data);
    });
};

 
//<-- Function To Create Show Cards -->
function createShowTable(showsArray) {
	const cardContainer = document.getElementById('showsCardContainer');
	const card = document.createElement('shows-card');
	card.classList.add('shows-card');
	cardContainer.appendChild(card);

	showsArray.forEach((show) => {
		const showCard = document.createElement('tr');
		card.appendChild(showCard);

		// Display Date Header + Value -->
		const dateHeader = document.createElement('td');
		dateHeader.classList.add('shows__date');
		dateHeader.textContent = 'Date';
		showCard.appendChild(dateHeader);

		const dateText = document.createElement('td');
		dateText.classList.add('shows__date-text');
		dateText.textContent = show.date;
		showCard.appendChild(dateText);

		// Display Venue Header + Value -->
		const venueHeader = document.createElement('td');
		venueHeader.classList.add('shows__venue');
		venueHeader.textContent = 'Venue';
		showCard.appendChild(venueHeader);

		const venueText = document.createElement('td');
		venueText.classList.add('shows__venue-text');
		venueText.textContent = show.venue;
		showCard.appendChild(venueText);

		// Display Location Header + Value -->
		const locationHeader = document.createElement('td');
		locationHeader.classList.add('shows__location');
		locationHeader.textContent = 'Location';
		showCard.appendChild(locationHeader);

		const locationText = document.createElement('td');
		locationText.classList.add('shows__location-text');

		locationText.textContent = show.location;
		showCard.appendChild(locationText);

		// Display the "Buy Tickets" button -->
		const buttonCell = document.createElement('buyTicketsCell');
		const buyTicketsButton = document.createElement('button');
		buttonCell.classList.add('shows-button-cell');
		buyTicketsButton.classList.add('shows-button');

		// Adds Text to Button
		buyTicketsButton.textContent = 'Buy Tickets';

		buttonCell.appendChild(buyTicketsButton);
		showCard.appendChild(buttonCell);

		// Adds Event Listener @ Each Card -->
		showCard.addEventListener('click', () => {
			const allRows = document.querySelectorAll('tr');
			allRows.forEach((r) => r.classList.remove('selected'));
			showCard.classList.add('selected');
		});

		// Adds Hover State  -->
		showCard.addEventListener('mouseover', () => {
			showCard.classList.add('hovered');
		});
		showCard.addEventListener('mouseout', () => {
			showCard.classList.remove('hovered');
		});
	});
}

// Calls The Function with (showsArray)
createShowTable(showsArray);

retrieveAuthKey().then(getShows);