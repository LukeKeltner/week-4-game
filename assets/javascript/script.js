
$(document).ready(function() 
{
	var fighter1 = new fighter("Pikachu", 2000, 100, 50, 'assets/images/pikachu.jpg', 0, 0, 'Electric', 2, [3])
	var fighter2 = new fighter("Charmander", 2000, 100, 50, 'assets/images/charmander.jpg', 1, 1, 'Fire', 3, [2])
	var fighter3 = new fighter("Squirtle", 2400, 100, 50, 'assets/images/squirtle.jpg', 2, 2, 'Water', 1, [0, 3])
	var fighter4 = new fighter("Bulbasaur", 1800, 100, 50, 'assets/images/bulbasaur.jpg', 3, 3, 'Grass', 2, [1])

	var userNeedsToPickFighter = true;
	var userNeedsToPickEnemy = true;
	var usersFighter;
	var currentEnemy;
	var fighterArray = [];
	var enemies = [];

	var instructions = $('.instructions');

	fighterArray.push(fighter1)
	fighterArray.push(fighter2)
	fighterArray.push(fighter3)
	fighterArray.push(fighter4)

	var userMaxHP;
	var currentEnemyMaxHP;

	var typeButtonClicked = false;
	var revealPokemon = true

	var newColAttack;
	var userHealthBar = $('#userHealthBar');
	var currentEnemyHealthBar = $('#currentEnemyHealthBar');
	var userHealthPercent = $('.user-health-percent');
	var enemyHealthPercent = $('.enemy-health-percent');

	//Putthing the Pokemon in random order
	for (var i=0; i<fighterArray.length; i++)
	{
		var r = Math.floor(Math.random()*fighterArray.length)
		enemies.push(fighterArray[r])
		fighterArray.splice(r, 1)
		i = i - 1
	}

	function fighter(name, hp, attack, counter, imgsrc, imgclass, type, typeName, strongAgainst, weakAgainst)
	{
		this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.counter = counter;
		this.imgsrc = imgsrc;
		this.imgclass = imgclass;
		this.type = type;  //Electric = 0, Fire = 1, Water = 2, Grass = 3
		this.typeName = typeName;
		this.strongAgainst = strongAgainst;
		this.weakAgainst = weakAgainst;
	}

	function changeHealthBarColor()
	{
		if (usersFighter.hp/userMaxHP <= 0.5)
		{
			userHealthBar.css('background-color', 'yellow')
			userHealthBar.css('color', 'black')
		}

		if (currentEnemy.hp/currentEnemyMaxHP <= 0.5)
		{
			 currentEnemyHealthBar.css('background-color', 'yellow')
			 currentEnemyHealthBar.css('color', 'black')
		}

		if (usersFighter.hp/userMaxHP <= 0.25)
		{
			userHealthBar.css('background-color', 'red')
			userHealthBar.css('color', 'white')
		}

		if (currentEnemy.hp/currentEnemyMaxHP <= 0.25)
		{
			 currentEnemyHealthBar.css('background-color', 'red')
			 currentEnemyHealthBar.css('color', 'white')
		}

	}

	//Creating the Fighter Cards
	function fighterDiv(fighter, x)
	{
		var div = $('<div style=\'position:relative\'>')
		var name; 
		var img;
		var hp;

		//If it's the start of the game, the user picks a random Pokeball.
		if (userNeedsToPickFighter)
		{
			img = $('<img src=\"assets/images/pokeball.jpg\" style=\"width:180px;\"/>') 
			name = $('<p>???</p>')
			hp = $('<p>???</p>')

			div.append(name)
			div.append(img)
			div.append(hp)

			fighter.imgclass = x
			img.attr("class", fighter.imgclass)
			div.attr("class", "fighterDiv")

			return div;
		}

		//Reveals the Pokemon by a fading out the Pokeball image
		else if (revealPokemon)
		{
			img = $('<img src=\"'+fighter.imgsrc+'\" style=\"width:180px; z-index:1;\"/>')
			imgBall = $('<img src=\"assets/images/pokeball.jpg\" style=\"width:180px; z-index:2;position:absolute\"/>') 
			name = $('<p>'+fighter.name+'</p>')
			hp = $('<p>hp: '+fighter.hp.toFixed(2)+'</p>')

			revealPokemon = false

			div.append(name)
			div.append(imgBall)
			div.append(img)
			div.append(hp)

			imgBall.fadeOut('slow')
			fighter.imgclass = x
			img.attr("class", fighter.imgclass)
			div.attr("class", "fighterDiv")

			return div;
		}

		else
		{
			img = $('<img src=\"'+fighter.imgsrc+'\" style=\"width:180px;\"/>')
			name = $('<p>'+fighter.name+'</p>')
			hp = $('<p>hp: '+fighter.hp.toFixed(2)+'</p>')

			div.append(name)
			div.append(img)
			div.append(hp)

			fighter.imgclass = x
			img.attr("class", fighter.imgclass)
			div.attr("class", "fighterDiv")

			return div;
		}
	}

	//Populates row2 with all waiting enemies.
	function populateEnemies(row, array, condition)
	{

		//Since the user hasn't picked a fighter yet, we don't add the "Your Enemies" text
		if (!condition)
		{
			clearHTMLElement(row)
			var colWidth = 12/(array.length); 

			for (var i=0; i<array.length; i++)
			{
				colString = "col-md-"+colWidth
				colClass = "class = \""+colString+" text-center\""
				divString = "<div "+colClass+">"
				var newCol = $(divString)
				var newDiv = $(fighterDiv(array[i], i))
				newDiv.attr("class", "fighterDiv fighterDiv"+i)
				$(row).append(newCol);
				$(newCol).html(newDiv);
			}
		}

		//However, once user has picked a fighter, we add one more column than there are enemies for this text.
		else
		{	
			clearHTMLElement(row)
			var colWidth = 12/(array.length+1); 
			var colString = "col-md-"+colWidth
			var colClass = "class = \""+colString+" text-center\""
			var divString = "<div "+colClass+">"

			var firstCol = $(divString)
			var fightEnemies = $('<h2>Your Enemies!</h2>')

			fightEnemies.attr("class", "fightEnemies")

			$(row).append(firstCol);
			$(firstCol).html(fightEnemies);

			for (var i=0; i<array.length; i++)
			{
				var newCol = $(divString)
				var newDiv = $(fighterDiv(array[i], i))
				newDiv.attr("class", "fighterDiv fighterDiv"+i)
				$(row).append(newCol);
				$(newCol).html(newDiv);
			}
		}
	}

	function clearHTMLElement(row)
	{
		$(row).empty();
	}

	//Places the User's fighter in the left of row1
	function placeUser()
	{
		clearHTMLElement('.row1')
		var newCol1 = $("<div class=\"col-md-4 text-center\">")
		newColAttack = $("<div class=\"col-md-4 text-center\">")
		var newCol2 = $("<div class=\"col-md-4 text-center\">")
		$('.row1').append(newCol1)
		$('.row1').append(newColAttack)
		$('.row1').append(newCol2)

		var newDiv1 = $(fighterDiv(usersFighter, usersFighter.imgclass))
		newDiv1.attr("class", "fighterDiv usersFighter")
		newCol1.html(newDiv1)

		//Fills the User's health bar.
		userHealthBar.css('width', '100%')
		userHealthBar.show()
		userMaxHP = usersFighter.hp;
		userHealthPercent.html(100*usersFighter.hp/userMaxHP+'%')
		userHealthPercent.show()

		//Creates the attack button
		var attackButton = $('#attack')
		newColAttack.append(attackButton)
		attackButton.show()

		//This is where it will be said if the attack is effective or not
		var attackResult = $('<h2>')
		attackResult.attr('class', 'attackResult')
		newColAttack.append(attackResult)

		//Display's the fighters' attack multiplier
		var userMultiplier = $('<h2>')
		userMultiplier.attr('class', 'userMultiplier')
		var enemyMultiplier = $('<h2>')
		enemyMultiplier.attr('class', 'enemyMultiplier')

		var newDiv2 = $("<div>")
		newDiv2.attr("class", "fighterDiv currentEnemy")
		newCol2.html(newDiv2)

		var newCon = $('<div>')
		newCon.attr('class', 'container-fluid')

		var newRow = $('<div>')
		newRow.attr('class', 'row')

		var newColNested1 = $("<div class=\"col-md-6 text-center\">")
		var newColNested2 = $("<div class=\"col-md-6 text-center\">")

		newColNested1.append(userMultiplier)
		newColNested2.append(enemyMultiplier)

		newRow.append(newColNested1)
		newRow.append(newColNested2)

		newCon.append(newRow)

		newColAttack.append(newCon)


	}

	//Defines the current enemy and places the fighter card to the right on row1
	function getCurrentEnemy()
	{
		var enemyFighterDiv = fighterDiv(currentEnemy, currentEnemy.imgclass)
		currentEnemyHealthBar.css('background-color', 'green')
		$('.currentEnemy').append(enemyFighterDiv)
		$(enemyFighterDiv).attr("class", "fighterDiv currentEnemy")
		$('.progress-container').show()
		currentEnemyHealthBar.css('width', '100%')
		currentEnemyHealthBar.show()
		currentEnemyMaxHP = currentEnemy.hp;
		enemyHealthPercent.html(100*currentEnemy.hp/currentEnemyMaxHP+'%')
		enemyHealthPercent.show()
	}

	//Fade's in and out the different Pokemon types descriptions.  
	function hoverTypesInfo(textClass, imgClass)
	{
		$(textClass).hover(function() 
	    {
		    $(imgClass).fadeIn();    
		},

		function()
		{
			$(imgClass).hide();
		});
	}

	//Called when a normal attack happens.
	function normalAttack()
	{
		var multiplier1 = Math.random().toFixed(2);
		var multiplier2 = Math.random().toFixed(2);

		usersFighter.hp = usersFighter.hp - multiplier2*currentEnemy.counter;
		currentEnemy.hp = currentEnemy.hp - multiplier1*usersFighter.attack
		usersFighter.attack = usersFighter.attack + 12;
		$('.attackResult').html('Normal Attack!')
		$('.userMultiplier').html(usersFighter.name+" damage x"+multiplier1)
		$('.enemyMultiplier').html(currentEnemy.name+" damage x"+multiplier2)
	}

	//Called when a super effective attack happens.
	function superEffective()
	{
		var multiplier1 = Math.random().toFixed(2);
		var multiplier2 = Math.random().toFixed(2);

		usersFighter.hp = usersFighter.hp - multiplier2*currentEnemy.counter/2;
		currentEnemy.hp = currentEnemy.hp - multiplier1*2*usersFighter.attack
		usersFighter.attack = usersFighter.attack + 24;
		$('.attackResult').html('It\'s Super Effective!')
		$('.userMultiplier').html(usersFighter.name+" damage x"+multiplier1)
		$('.enemyMultiplier').html(currentEnemy.name+" damage x"+multiplier2)
	}

	//Called when a not very effec tive attack happens.
	function notVeryrEffective()
	{
		var multiplier1 = Math.random().toFixed(2);
		var multiplier2 = Math.random().toFixed(2);

		usersFighter.hp = usersFighter.hp - multiplier2*2*currentEnemy.counter;
		currentEnemy.hp = currentEnemy.hp - multiplier1*usersFighter.attack/2
		usersFighter.attack = usersFighter.attack + 6;
		$('.attackResult').html('It\'s Not Very Effective!')
		$('.userMultiplier').html(usersFighter.name+" damage x"+multiplier1)
		$('.enemyMultiplier').html(currentEnemy.name+" damage x"+multiplier2)
	}

	//In itial population of fighters (covered up with Pokeballs)
	populateEnemies(".row1", enemies, false)

	//Figuring out which fighter the user clicked to define their fighter. 
	$('.row1').on('click', function()
	{
		if (userNeedsToPickFighter)
		{
			var clicked = event.srcElement.className
			console.log(event)
			console.log(event.srcElement.tagName)
			console.log(event.srcElement.className)

			if (event.srcElement.tagName === 'IMG')
			{

				for (var i=0; i<enemies.length; i++)
				{
					if (clicked == i)
					{
						usersFighter = enemies[i];
						userNeedsToPickFighter = false;
						enemies.splice(i, 1);
						placeUser();
						populateEnemies('.row2', enemies, true)
						instructions.html('Oh, '+usersFighter.name+': '+usersFighter.typeName+' type! Pick a Pokemon to Fight!')
						$('#type-button').show()
					}
				}
			}
		}
	})

	//Clicking on an enemy to fight.
	$('.row2').on('click', function()
	{
		if (userNeedsToPickEnemy)
		{
			var clicked = event.srcElement.className

			for (var i=0; i<enemies.length; i++)
			{
				if (event.srcElement.tagName === 'IMG')
				{
					if (clicked == i)
					{
						currentEnemy = enemies[i]
						userNeedsToPickEnemy = false;
						enemies.splice(i, 1);
						getCurrentEnemy()
						populateEnemies('.row2', enemies, true)
						instructions.html('Fight '+currentEnemy.name+'!')
					}
				}
			}

			if (enemies.length === 0)
			{
				clearHTMLElement('.fightEnemies')
				clearHTMLElement('.row2')
			}
		}
	});

	//The attack button being clicked. 
	$('#attack').on('click', function()
	{
		if (!userNeedsToPickEnemy)
		{
			var attackHappened = false;

			//Checking to see if the types/strengths/weakness merit a special attack by looping through enemy's weaknesses
			for (var weakness = 0; weakness < currentEnemy.weakAgainst.length; weakness++)
			{	
				if (usersFighter.type === currentEnemy.weakAgainst[weakness])
				{
					superEffective();
					attackHappened = true;
					break;
				}

				else if (usersFighter.weakAgainst[weakness] === currentEnemy.type)
				{
					notVeryrEffective()
					attackHappened = true;
					break;
				}
			}

			if (!attackHappened)
			{
				//Checking to see if the types/strengths/weakness merit a special attack by looping through user's weaknesses
				for (var weakness = 0; weakness < usersFighter.weakAgainst.length; weakness++)
				{
					if (usersFighter.weakAgainst[weakness] === currentEnemy.type)
					{
						notVeryrEffective()
						attackHappened = true;
						break;
					}
				}
			}

			//If attackedHappened is still false from above, it means a normal attack will occur.
			if (!attackHappened)
			{
				normalAttack()
			}

			//Displaying hit points, what type of attack, and health bar stats.
			var userPercent = (100*usersFighter.hp/userMaxHP).toFixed(2)
			var enemyPercent = (100*currentEnemy.hp/currentEnemyMaxHP).toFixed(2)
			console.log(userPercent)
			userHealthBar.css('width', userPercent+'%')
			currentEnemyHealthBar.css('width', enemyPercent+'%')
			userHealthPercent.html(userPercent+'%')
			enemyHealthPercent.html(enemyPercent+'%')

			changeHealthBarColor()

			var updateUser = fighterDiv(usersFighter, usersFighter.imgclass)
			updateUser.attr("class", "fighterDiv usersFighter")

			var enemyFighterDiv = fighterDiv(currentEnemy, currentEnemy.imgclass)
			enemyFighterDiv.attr("class", "fighterDiv currentEnemy")

			$('.usersFighter').html(updateUser)
			$('.currentEnemy').html(enemyFighterDiv)

			//Jumbotron sayings for different situtations
			if (currentEnemy.hp <= 0 && usersFighter.hp >0)
			{
				if (enemies.length === 1)
				{
					instructions.html('All you have is '+enemies[0].name+' left!')
				}

				else
				{
					instructions.html("Pick Another Pokemon to Fight!")
				}

				userNeedsToPickEnemy = true;
				clearHTMLElement('.attackResult')
				clearHTMLElement('.currentEnemy');
				

				if(enemies.length === 0)
				{
					clearHTMLElement(enemyHealthPercent)
					clearHTMLElement('.youlose');
					clearHTMLElement(newColAttack);
					instructions.html("You've Won!")
				}
			}

			if (usersFighter.hp <= 0)
			{
				clearHTMLElement(newColAttack);
				instructions.html("You've Lost!")
			}
		}
	});

	$("img").hover(function()
	{
	    $(this).css("border", "4px solid green");
	}, 

		function()
		{
		    $(this).css("border", "4px solid black");
	    }
	);

	$('#type-button').on('click', function()
	{
		if (!typeButtonClicked)
		{
			$(".typesRow").slideDown();
			typeButtonClicked = true;
		}
		
		else
		{
			$(".typesRow").slideUp();
			typeButtonClicked = false;
		}
	});

	hoverTypesInfo('.electric', '.typeImgElectric')
	hoverTypesInfo('.fire', '.typeImgFire')
	hoverTypesInfo('.water', '.typeImgWater')
	hoverTypesInfo('.grass', '.typeImgGrass')

});

