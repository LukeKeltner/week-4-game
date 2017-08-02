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
	var enemies = []

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
		var hp = $('<p>'+fighter.hp+'</p>')

		div.append(name)
		div.append(img)
		div.append(hp)

		fighter.imgclass = x
		img.attr("class", fighter.imgclass)
		div.attr("class", "fighterDiv")

		return div;
	}

	function populateEnemies(row, array)
	{
		var colWidth = 12/array.length; 

		clearRow(row)

		for (var i=0; i<array.length; i++)
		{
			colWidth = 12/array.length
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
/*	for (var i=0; i<enemies.length; i++)
	{
		console.log(enemies[i].name+" imgclass is "+enemies[i].imgclass)
		enemies[i].imgclass = i;
		console.log(enemies[i].name+" imgclass is "+enemies[i].imgclass)
	}*/

	$('.row1').on('click', function()
	{
		if (userNeedsToPickFighter)
		{
			var clicked = event.srcElement.className
			console.log(event)
			console.log(event.srcElement.className)

			for (var i=0; i<enemies.length; i++)
			{
				//if (clicked === "fighterDiv fighterDiv"+i)
				console.log('clicked = '+clicked+" and i = "+i)
				if (clicked == i)
				{
					usersFighter = enemies[i];
					userNeedsToPickFighter = false;
					enemies.splice(i, 1);
					console.log("The User has chosen "+usersFighter.name)
					console.log("The User's enemies are...")
					console.log(enemies)
					placeUser();
					populateEnemies('.row2', enemies)
				}
			}
		}
	})

	$('.row2').on('click', function()
	{
		if (userNeedsToPickEnemy)
		{
			for (var i=0; i<enemies.length; i++)
			{
				$()
			}

			var clicked = event.srcElement.className

			for (var i=0; i<enemies.length; i++)
			{
				if (clicked == i)
				{
					currentEmeny = enemies[i]
					userNeedsToPickEnemy = false;
					enemies.splice(i, 1);
					console.log("The User has chosen "+currentEmeny.name+" has the enemy")
					console.log("The User's enemies to fight after are...")
					console.log(enemies)

					getCurrentEnemy()

					populateEnemies('.row2', enemies)

				}
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

			if (currentEmeny.hp <= 0)
			{
				userNeedsToPickEnemy = true;
				clearRow('.currentEmeny');

				if(enemies.length === 0)
				{
					clearRow('.youlose');
					$('.youlose').append('YOU WIN!')
				}
			}

			if (usersFighter.hp <= 0)
			{
				clearRow('.youlose');
				$('.youlose').append('YOU LOSE!')
			}
		}
	});

});

