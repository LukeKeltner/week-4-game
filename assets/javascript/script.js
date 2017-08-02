$(document).ready(function() 
{
	var fighter1 = new fighter("Pikachu", 1000, 100, 200, 50, 'assets/images/pikachu.jpg', 0)
	var fighter2 = new fighter("Charmander", 2000, 100, 200, 50, 'assets/images/charmander.jpg', 1)
	var fighter3 = new fighter("Squirtle", 1500, 100, 200, 50, 'assets/images/squirtle.jpg', 2)
	var fighter4 = new fighter("Bulbasaur", 500, 100, 200, 50, 'assets/images/bulbasaur.jpg', 3)

	var userNeedsToPickFighter = true;
	var userNeedsToPickEnemy = true;
	var usersFighter;
	var currentEmeny;
	var enemies = [];

	var instructions = $('.instructions');

	enemies.push(fighter1)
	enemies.push(fighter2)
	enemies.push(fighter3)
	enemies.push(fighter4)


	function fighter(name, hp, attack, defend, counter, imgsrc, imgclass)
	{
		this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.defend = defend;
		this.counter = counter;
		this.imgsrc = imgsrc;
		this.imgclass = imgclass;
	}

	function fighterDiv(fighter, x)
	{
		var div = $('<div>')
		var name = $('<p>'+fighter.name+'</p>')
		var img = $('<img src=\"'+fighter.imgsrc+'\" style=\"width:180px;\"/>')
		var hp = $('<p>hp: '+fighter.hp+'</p>')

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

	function placeUser(fighter)
	{
		clearRow('.row1')
		var newCol1 = $("<div class=\"col-md-6 text-center\">")
		var newCol2 = $("<div class=\"col-md-6 text-center\">")
		$('.row1').append(newCol1)
		$('.row1').append(newCol2)

		var newDiv1 = $(fighterDiv(usersFighter, usersFighter.imgclass))
		newDiv1.attr("class", "fighterDiv usersFighter")
		newCol1.html(newDiv1)

		var newDiv2 = $("<div>")
		newDiv2.attr("class", "fighterDiv currentEmeny")
		newCol2.html(newDiv2)
	}

	function getCurrentEnemy()
	{
		$('.currentEmeny').append(fighterDiv(currentEmeny, currentEmeny.imgclass))
	}


	populateEnemies(".row1", enemies)

	$('.row1').on('click', function()
	{
		if (userNeedsToPickFighter)
		{
			var clicked = event.srcElement.className
			console.log(event)
			console.log(event.srcElement.className)

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
	})

	$('.row2').on('click', function()
	{
		if (userNeedsToPickEnemy)
		{
			var clicked = event.srcElement.className

			for (var i=0; i<enemies.length; i++)
			{
				if (clicked == i)
				{
					currentEmeny = enemies[i]
					userNeedsToPickEnemy = false;
					enemies.splice(i, 1);
					getCurrentEnemy()
					populateEnemies('.row2', enemies, true)
					instructions.html('Fight '+currentEmeny.name+'!')
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
			usersFighter.hp = usersFighter.hp - currentEmeny.counter;
			currentEmeny.hp = currentEmeny.hp - usersFighter.attack
			usersFighter.attack = usersFighter.attack + 12;
			$('.usersFighter').html(fighterDiv(usersFighter, usersFighter.imgclass))
			$('.currentEmeny').html(fighterDiv(currentEmeny, currentEmeny.imgclass))

			if (currentEmeny.hp <= 0 && usersFighter.hp >0)
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
				clearRow('.currentEmeny');
				

				if(enemies.length === 0)
				{
					clearRow('.youlose');
					instructions.html("You've Won!")
				}
			}

			if (usersFighter.hp <= 0)
			{
				clearRow('.youlose');
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
	    $(this).css("border", "4px solid purple");
    });

});

