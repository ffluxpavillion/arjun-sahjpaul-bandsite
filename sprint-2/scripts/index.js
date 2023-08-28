/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable func-style */
/* eslint-disable indent */

let authKey;
const commentsArray = [];

//<-- Retrieves API Authentication Key -->
const retrieveAuthKey = () => {
	return axios
		.get('https://project-1-api.herokuapp.com/register')
		.then((response) => {
			authKey = response.data.api_key;
		});
};

//<-- Retrieves Comments -->
const getComments = () => {
	return axios
		.get(`https://project-1-api.herokuapp.com/comments?api_key=${authKey}`)
		.then((response) => {
			renderComments(response.data);
		});
};

const likeComment = (commentId) => {
	axios
		.put(`https://project-1-api.herokuapp.com/comments/${commentId}/like`)
		.then((response) => {
			const likedComment = commentsArray.find(
				(comment) => comment.id === commentId
			);
			if (likedComment) {
				likedComment.likes++;
				updateLikeCountInDOM(commentId, likedComment.likes);
				console.log('Comment liked:', response.data);
			}
		})
		.catch((error) => {
			console.error('Error liking comment:', error);
		});
};

// <-- Show Like Counts in DOM  -->
const updateLikeCountInDOM = (commentId, likeCount) => {
	const commentCard = document.querySelector(
		`[data-comment-id="${commentId}"]`
	);
	const likeButton = commentCard.querySelector('.like-button');
	likeButton.textContent = `Like (${likeCount})`;
};

// <-- Delete Comments  -->
const deleteComment = (commentId) => {
	axios
		.delete(`https://project-1-api.herokuapp.com/comments/${commentId}`)
		.then((response) => {
			// Remove the deleted comment from commentsArray
			const deletedIndex = commentsArray.findIndex(
				(comment) => comment.id === commentId
			);
			if (deletedIndex !== -1) {
				commentsArray.splice(deletedIndex, 1);
				removeCommentFromDOM(commentId); // Update the DOM
				console.log('Comment deleted:', response.data);
			}
		})
		.catch((error) => {
			console.error('Error deleting comment:', error);
		});
};

// <-- Delete Comment From DOM  -->
const removeCommentFromDOM = (commentId) => {
	const commentCard = document.querySelector(
		`[data-comment-id="${commentId}"]`
	);
	if (commentCard) {
		commentCard.remove();
	}
};

// <-- Update the addLikeButtonListeners Function -->
const addLikeButtonListeners = () => {
	const likeButtons = document.querySelectorAll('.like-button');
	likeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const commentId = button.getAttribute('data-comment-id');
			likeComment(commentId);
		});
	});
};

const addDeleteButtonListeners = () => {
	const deleteButtons = document.querySelectorAll('.delete-button');
	deleteButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const commentId = button.getAttribute('data-comment-id');
			deleteComment(commentId);
		});
	});
};

//<-- Function To Create Comment Card -->
function createCommentCard(comment) {
	const commentCard = document.createElement('div');
	commentCard.classList.add('comment__card');

	const commentTextWrapper = document.createElement('div');
	commentTextWrapper.classList.add('comment__text--wrapper');

	const commentName = document.createElement('div');
	commentName.classList.add('comment__name');

	const avatarDiv = document.createElement('div');
	avatarDiv.classList.add('avatar__div');

	const userAvatar = new Image();
	userAvatar.classList.add('avatar__div');

	userAvatar.setAttribute('style', 'background-color: #E1E1E1;');
	avatarDiv.appendChild(userAvatar);

	const commentNameTxt = document.createElement('p');
	commentNameTxt.classList.add('comment__name-txt');
	commentNameTxt.textContent = comment.name;

	const commentDate = document.createElement('p');
	commentDate.classList.add('comment__date');
	commentDate.textContent = formattedDate(comment.timestamp);

	const commentBodyTxt = document.createElement('p');
	commentBodyTxt.classList.add('comment__body-txt');
	commentBodyTxt.textContent = comment.comment;

	commentName.appendChild(avatarDiv);
	commentName.appendChild(commentNameTxt);
	commentName.appendChild(commentDate);

	commentTextWrapper.appendChild(commentName);
	commentTextWrapper.appendChild(commentBodyTxt);

	commentCard.appendChild(commentTextWrapper);

	//<-- Creates Delete Button  -->
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('delete-button');
	deleteButton.setAttribute('data-comment-id', comment.id); // Assuming `comment.id` is the comment's ID
	commentCard.appendChild(deleteButton);

	return commentCard;
}

//<-- Formatting Date -->
const formattedDate = (timestamp) => {
	const timeNum = Number(timestamp);
	const date = new Date(timeNum);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
};

//<-- Function to Display Comments -->
function displayComments(comment) {
	const commentContainer = document.querySelector('.parent__card');
	const commentCard = createCommentCard(comment);
	commentContainer.prepend(commentCard);
	commentsArray.push(comment);

	let likeButton = document.createElement('button');
	likeButton.textContent = 'Like';
	likeButton.classList.add('like-button');
	likeButton.setAttribute('data-comment-id', comment.id);
	commentCard.appendChild(likeButton);
}

//<-- New Comment Function -->
function newComment() {
	const userNameInput = document.getElementById('userName').value;
	const commentTextInput = document.getElementById('commentText').value;

	const newCommentData = {
		name: userNameInput,
		comment: commentTextInput,
	};

	axios
		.post(
			`https://project-1-api.herokuapp.com/comments?api_key=${authKey}`,
			newCommentData
		)
		.then((response) => {
			//<-- Display New Comment -->
			commentsArray.unshift(response.data);
			displayComments(response.data);

			//<-- Clearing Field Input -->
			document.getElementById('userName').value = '';
			document.getElementById('commentText').value = '';

			//<-- Update Avatar Image for New Comment -->
			const newCommentCard = document.querySelector(
				'.parent__card > .comment__card'
			);
			const newCommentAvatar =
				newCommentCard.querySelector('.avatar__div > img');
			newCommentAvatar.setAttribute('src', './assets/images/Mohan-muruge.jpg');
		})
		.catch((error) => {
			console.error('Error adding new comment:', error);
		});
}

//<-- Renders Comments To Site -->
const renderComments = (comments) => {
	const sortedComments = comments.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});

	sortedComments.forEach((comment) => {
		displayComments(comment);
	});

	addLikeButtonListeners();
	addDeleteButtonListeners();
};

//<-- Fetching Authentication By Calling retrieveAuthKey Function  -->
retrieveAuthKey()
	.then(() => {
		getComments();
	})
	.catch((error) => {
		console.error('Error retrieving authentication key:', error);
	})
	.finally(() => {
		//<-- Log Comments Array After Fetched + Displayed -->
		console.log('All comments:', commentsArray);
	});
