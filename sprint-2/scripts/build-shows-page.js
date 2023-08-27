/* eslint-disable no-undef */
/* eslint-disable func-style */
/* eslint-disable indent */

let authKey;

// <-- Retrieves API Authentication Key -->
const retrieveAuthKey = () => {
	return axios
		.get('https://project-1-api.herokuapp.com/register')
		.then((response) => {
			authKey = response.data.api_key;
		});
};

// <-- Retrieves Shows from API -->
const getShows = () => {
	return axios
		.get(`https://project-1-api.herokuapp.com/showdates?api_key=${authKey}`)
		.then((response) => {
			renderShows(response.data);
		});
};

// Function to format the date
const formattedDate = (timestamp) =>
	new Date(Number(timestamp))
		.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		})
		.replace(/,/g, '');

// <-- Building Show List -->
const renderShows = (shows) => {
	const showsWrapper = document.querySelector('.shows__wrapper');
	for (let i = 0; i < shows.length; i++) {
		const show = shows[i];

		// Create Post Div & Append To showsWrapper
		let post = document.createElement('div');
		post.classList.add('shows__card');
		showsWrapper.appendChild(post);

		//<--  Creates Elements & Inplements Array Data, Then Appends to Post  -->
		//<--  Display Date Header + Value  -->
		let dateHeader = document.createElement('p');
		dateHeader.classList.add('shows__date');
		dateHeader.textContent = 'DATE';
		post.appendChild(dateHeader);

		let dateText = document.createElement('p');
		dateText.classList.add('shows__date-text');
		dateText.textContent = formattedDate(show.date); // Use the formattedDate function
		post.appendChild(dateText);

		//<--  Display Venue Header + Value  -->
		let venueHeader = document.createElement('p');
		venueHeader.classList.add('shows__venue');
		venueHeader.textContent = 'VENUE';
		post.appendChild(venueHeader);

		let venueText = document.createElement('p');
		venueText.classList.add('shows__venue-text');
		venueText.textContent = show.place;
		post.appendChild(venueText);

		//<--  Display Location Header + Value  -->
		let locationHeader = document.createElement('p');
		locationHeader.classList.add('shows__location');
		locationHeader.textContent = 'LOCATION';
		post.appendChild(locationHeader);

		let locationText = document.createElement('p');
		locationText.classList.add('shows__location-text');
		locationText.textContent = show.location;
		post.appendChild(locationText);

		//<--  Display the "Buy Tickets" Button  -->
		let buttonCell = document.createElement('div');
		let button = document.createElement('button');
		buttonCell.classList.add('shows-button-cell');
		button.classList.add('shows__button');
		button.textContent = 'BUY TICKETS';
		post.appendChild(button);

		// Adds Event Listeners to Each Card -->
		post.addEventListener('click', () => {
			const showList = document.querySelectorAll('.shows__card');
			showList.forEach((show) => show.classList.remove('selected'));
			post.classList.add('selected');
		});

		// Adds Hover State -->
		post.addEventListener('mouseover', () => {
			post.classList.add('hovered');
		});
		post.addEventListener('mouseout', () => {
			post.classList.remove('hovered');
		});
	}
};

retrieveAuthKey().then(getShows);