//Electric Type = 0
//Fire Type = 1
//Water Type = 2
//Grass Type = 3






$(document).ready(function() 
{
	var fighter1 = new fighter("Pikachu", 2000, 100, 50, 'assets/images/pikachu.jpg', 0, 0, 2, [3])
	var fighter2 = new fighter("Charmander", 2000, 100, 50, 'assets/images/charmander.jpg', 1, 1, 3 , [2])
	var fighter3 = new fighter("Squirtle", 2400, 100, 50, 'assets/images/squirtle.jpg', 2, 2, 1, [0, 3])
	var fighter4 = new fighter("Bulbasaur", 1800, 100, 50, 'assets/images/bulbasaur.jpg', 3, 3, 2 , [1])

	var userNeedsToPickFighter = true;
	var userNeedsToPickEnemy = true;
	var usersFighter;
	var currentEnemy;
	var enemies = [];

	var instructions = $('.instructions');

	enemies.push(fighter1)
	enemies.push(fighter2)
	enemies.push(fighter3)
	enemies.push(fighter4)

	var userMaxHP;
	var currentEnemyMaxHP;

	var typeButtonClicked = false;

	var newColAttack;
	var userHealthBar = $('#userHealthBar');
	var currentEnemyHealthBar = $('#currentEnemyHealthBar');

	function fighter(name, hp, attack, counter, imgsrc, imgclass, type, strongAgainst, weakAgainst)
	{
		this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.counter = counter;
		this.imgsrc = imgsrc;
		this.imgclass = imgclass;
		this.type = type;
		this.strongAgainst = strongAgainst;
		this.weakAgainst = weakAgainst;
	}

	function fighterDiv(fighter, x)
	{
		var div = $('<div>')
		var name = $('<p>'+fighter.name+'</p>')
		var img = $('<img src=\"'+fighter.imgsrc+'\" style=\"width:180px;\"/>')
		var hp = $('<p>hp: '+fighter.hp.toFixed(2)+'</p>')

		div.append(name)
		div.append(img)
		div.append(hp)

		fighter.imgclass = x
		img.attr("class", fighter.imgclass)
		div.attr("class", "fighterDiv")

		return div;
	}

	function populateEnemies(row, array, condition)
	{
		if (!condition)
		{
			var colWidth = 12/(array.length); 
			clearRow(row)

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

		else
		{	
			clearRow(row)
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

	function clearRow(row)
	{
		$(row).empty();
	}

	function placeUser()
	{
		clearRow('.row1')
		var newCol1 = $("<div class=\"col-md-4 text-center\">")
		newColAttack = $("<div class=\"col-md-4 text-center\">")
		var newCol2 = $("<div class=\"col-md-4 text-center\">")
		$('.row1').append(newCol1)
		$('.row1').append(newColAttack)
		$('.row1').append(newCol2)

		var newDiv1 = $(fighterDiv(usersFighter, usersFighter.imgclass))
		newDiv1.attr("class", "fighterDiv usersFighter")
		newCol1.html(newDiv1)

		userHealthBar.attr('max', usersFighter.hp)
		userHealthBar.attr('value', usersFighter.hp)
		userHealthBar.show()
		userMaxHP = usersFighter.hp;

		var attackButton = $('#attack')
		newColAttack.append(attackButton)
		attackButton.show()

		var attackResult = $('<h2>')
		attackResult.attr('class', 'attackResult')
		newColAttack.append(attackResult)

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

	function getCurrentEnemy()
	{
		var enemyFighterDiv = fighterDiv(currentEnemy, currentEnemy.imgclass)
		$('.currentEnemy').append(enemyFighterDiv)
		$(enemyFighterDiv).attr("class", "fighterDiv currentEnemy")
		currentEnemyHealthBar.attr('max', currentEnemy.hp)
		currentEnemyHealthBar.attr('value', currentEnemy.hp)
		currentEnemyHealthBar.show()
		currentEnemyMaxHP = currentEnemy.hp;
	}

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

	populateEnemies(".row1", enemies)

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
						instructions.html('Pick a Pokemon to Fight!')
					}
				}
			}
		}
	})

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
				clearRow('.fightEnemies')
				clearRow('.row2')
			}
		}
	});

	$('#attack').on('click', function()
	{
		if (!userNeedsToPickEnemy)
		{
			var attackHappened = false;

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

			if (!attackHappened)
			{
				normalAttack()
			}

			userHealthBar.attr('value', usersFighter.hp)
			currentEnemyHealthBar.attr('value', currentEnemy.hp)

			if (usersFighter.hp/userMaxHP <= 0.5)
			{
				userHealthBar.css('background', 'yellow');
			}

			var updateUser = fighterDiv(usersFighter, usersFighter.imgclass)
			updateUser.attr("class", "fighterDiv usersFighter")

			var enemyFighterDiv = fighterDiv(currentEnemy, currentEnemy.imgclass)
			enemyFighterDiv.attr("class", "fighterDiv currentEnemy")
			$('.usersFighter').html(updateUser)
			$('.currentEnemy').html(enemyFighterDiv)

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
				clearRow('.attackResult')
				clearRow('.currentEnemy');
				

				if(enemies.length === 0)
				{
					clearRow('.youlose');
					clearRow(newColAttack);
					instructions.html("You've Won!")
				}
			}

			if (usersFighter.hp <= 0)
			{
				clearRow(newColAttack);
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

/*    $(".head").hover(function() 
    {
	    $(".typesRow").slideDown();    
	},

		function()
		{
			$(".typesRow").slideUp();
		}
	);*/

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

