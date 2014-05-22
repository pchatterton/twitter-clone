$( document ).ready(function() {
	var clickAvailable = true;

	$('#tweet-controls').hide();
	$('.stats').hide();
	$('.reply').hide();
	$('.favorited-retweet').find('.action-retweet').hide();
	$('.favorited-retweet').find('.action-favorite').hide();

	//Step 2 Focusin textarea
	$(".tweet-compose").on('focusin', function() {
		
		$(this).css("height","5em");
		$(this).attr("placeholder","")
		$('#tweet-controls').show();
		var numChars = countChars();
		tweetControls(numChars);

	});

	//Step 2 Focusout textarea
	$(".tweet-compose").on('focusout', function() {
		
		var numChars = countChars();
		if(numChars === 140){
			
			$(this).css("height","2.5em");
			$(this).attr("placeholder","Compose new Tweet...")
			$('#tweet-controls').hide();
		};
	});
	
	//Step 3
	function countChars () {
		var numChars = $('.tweet-compose').val().length;
		numChars = 140-numChars;
		return numChars;
	};

	function tweetControls (numChars) {
		if(numChars === 140 || numChars < 0) {
			$('.button').attr('disabled','disabled');
		}
		else /*if(numChars>=0)*/ {
			$('.button').removeAttr('disabled','disabled');
			if(numChars<=10){
				$('#char-count').css('color', 'red');
			}
			else {
				$('#char-count').css('color', '#999');
			}
		};
	};


	$(".tweet-compose").on('keyup', function() {
		
		var numChars = countChars();
		tweetControls(numChars);
		$('#char-count').text(numChars);

	});

	//Step 5 Create a new tweet

	$('#tweet-controls .button').on('click', function() {

		var tweetAll = $('.tweet:first').clone();
		var avatarSrc = $('#dashboard').find('.avatar').attr('src');
		var tweetFullName = $('#dashboard').find('.content p').text();
		tweetAll.find('.avatar').prop('src', avatarSrc);
		tweetAll.find('.fullname').html(tweetFullName);
		tweetAll.find('.username').html('@pchatterton');
		tweetAll.find('.tweet-text').html($('.tweet-compose').val());
		tweetAll.find('.favorited-retweet').find('.action-retweet').hide();
		tweetAll.find('.favorited-retweet').find('.action-favorite').hide();
		$('#stream').prepend(tweetAll);


		//Create new .tweet div
		/*var newTweet = $('<div>', {class: 'tweet'});
		$('#stream').prepend(newTweet);

		//Create new tweet .content div
		var newTweetContent = $('<div>', {class: 'content'});
		$('#stream').find('.tweet').first().prepend(newTweetContent);

		//Create new tweet img with avatar
		var avatarSrc = $('#dashboard').find('.avatar').attr('src');
		var newTweetAvatar = $('<img>', {class: 'avatar', src: avatarSrc});
		$('#stream').find('.content').first().prepend(newTweetAvatar);

		//Create newTweetfullname
		var tweetFullName = $('#dashboard').find('.content p').text();
		var newTweetFName = $('<strong>', {class: 'fullname'});
		$('#stream').find('.avatar').first().after(newTweetFName);
		$('#stream').find('.fullname').first().text(tweetFullName);

		//Create newTweet username
		var tweetUsername = "@pchatterton";
		var newTweetUsername = $('<span>', {class: 'username'});
		$('#stream').find('.fullname').first().after(newTweetUsername);
		$('#stream').find('.username').first().text(tweetUsername);

		//Add newTweet text
		var tweetText = $('#dashboard').find('.tweet-compose').val();
		var newTweetText = $('<p>', {class: 'tweet-text'});
		$('#stream').find('.username').first().after(newTweetText);
		$('#stream').find('p').first().text(tweetText);

		//Add newTweet tweet-actions
		var tweetActions = $("#stream").find('.tweet-actions').first().clone();
		$('#stream').find('p').first().after(tweetActions);

		//Add newTweet stats
		var tweetStats = $("#stream").find('.stats').first().clone();
		tweetStats.find('p').first().text("0");
		tweetStats.find('.num-favorites').text("0");
		tweetStats.find('img').remove();
		$('#stream').find('.tweet-actions').first().after(tweetStats);*/

	});
	
	//Step 7
	$(document).on('click', '.tweet', function() {
		console.log('tweet is clicked!');
		if(clickAvailable) {
			if($(this).find('.stats').is(":hidden") && $(this).find('.reply').is(":hidden")) {
		    	$(this).find('.stats').slideDown( "slow" );
		    	$(this).find('.reply').slideDown( "slow" );
		 	} 
		 	else {
		    	$(this).find('.stats').slideUp("slow");
		    	$(this).find('.reply').slideUp("slow");
		 	};
		 };
	});

	/*$('.tweet-actions').find('li').on('click', function() {
		clickAvailable = false;
		$(this).closest('.content').find('.action-retweet').show();
	});*/

	$(document).on('click', '.tweet-actions li:nth-child(2)', function() {
		console.log('clicked on action-favorite');
		clickAvailable = false;
		$(this).closest('.content').find('.action-retweet').show();
	});

	$(document).on('click', '.tweet-actions li:nth-child(3)', function() {
		clickAvailable = false;
		$(this).closest('.content').find('.action-favorite').show();
	});

	$(document).on('mouseleave', '.tweet-actions li', function() {
		console.log("leave");
		clickAvailable = true;
	});

	$('.avatar').mouseover(function() {
			var userName = $(this).find('.fullname').text();
			userName = console.log('Username: ' + userName);
			$(this).tooltip(userName)
		});
		//console.log("I hovered over the avatar!");
		//var userName = $(this).closest('.fullname').val();
		//console.log(userName);



});

