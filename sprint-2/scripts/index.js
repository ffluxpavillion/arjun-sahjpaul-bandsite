/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable func-style */
/* eslint-disable indent */

//<-- Creates Comment Array -->
let comments = [
	{
		userName: 'Connor Walton',
		commentDate: '02/17/2021',
		commentText:
			'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
	},
	{
		userName: 'Emilie Beach',
		commentDate: '01/09/2021',
		commentText:
			'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
	},
	{
		userName: 'Miles Acosta',
		commentDate: '12/20/2020',
		commentText:
			"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
	},
];

//<-- Function To Create Comment Card -->
function createCommentCard(comment) {
	const commentCard = document.createElement('div');
	commentCard.classList.add('comment__card');

	commentCard.innerHTML = `
    <div class="comment__text-wrapper">
      <div class="comment__name">
        <div class="avatar__div"></div>
        <p class="comment__name-txt">${comment.userName}</p>
        <p class="comment__date">${comment.commentDate}</p>
      </div>
      <p class="comment__body-txt">${comment.commentText}</p>
    </div>
  `;

	return commentCard;
}

//<-- Function to Iterate .forEach Array Item + Insert + Append Comment Card -->
function displayComments() {
	const commentContainer = document.querySelector('.comment__card');
	commentContainer.innerHTML = '';

	comments.forEach((comment) => {
		const commentCard = createCommentCard(comment);
		commentContainer.appendChild(commentCard);
	});
}

//<-- Function to Declare New Comment + Fetch Values From User Input -->
function newComment() {
	const userNameInput = document.getElementById('userName').value;
	const commentTextInput = document.getElementById('commentText').value;
	const currentDate = new Date();

	const newComment = {
		userName: userNameInput,
		commentDate: currentDate.toLocaleDateString(),
		commentText: commentTextInput,
	};

	//<-- Adds New Comment At Beginning of Array -->
	comments.unshift(newComment);
	displayComments();
}

//<-- Call  displayComments Function -->
displayComments();
