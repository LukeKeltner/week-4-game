$(document).ready(function() 
{
	var fighter1 = new fighter("Pikachu", 1900, 250, 50, 'assets/images/pikachu.jpg', 0, 'lighting')
	var fighter2 = new fighter("Charmander", 1950, 200, 50, 'assets/images/charmander.jpg', 1, 'fire')
	var fighter3 = new fighter("Squirtle", 2000, 150, 50, 'assets/images/squirtle.jpg', 2, 'water')
	var fighter4 = new fighter("Bulbasaur", 2050, 100, 50, 'assets/images/bulbasaur.jpg', 3, 'grass')

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


	function fighter(name, hp, attack, counter, imgsrc, imgclass, type)
	{
		this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.counter = counter;
		this.imgsrc = imgsrc;
		this.imgclass = imgclass;
		this.type = type;
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
		var newCol1 = $("<div class=\"col-md-4 text-center\">")
		var newColAttack = $("<div class=\"col-md-4 text-center\">")
		var newCol2 = $("<div class=\"col-md-4 text-center\">")
		$('.row1').append(newCol1)
		$('.row1').append(newColAttack)
		$('.row1').append(newCol2)

		var newDiv1 = $(fighterDiv(usersFighter, usersFighter.imgclass))
		newDiv1.attr("class", "fighterDiv usersFighter")
		newCol1.html(newDiv1)

		var attackButton = $('#attack')
		newColAttack.append(attackButton)
		attackButton.show()


		var newDiv2 = $("<div>")
		newDiv2.attr("class", "fighterDiv currentEmeny")
		newCol2.html(newDiv2)
	}

	function getCurrentEnemy()
	{
		$('.currentEmeny').append(fighterDiv(currentEmeny, currentEmeny.imgclass))
	}

	function hoverTypesInfo(textClass, imgClass)
	{
		$(textClass).hover(function() 
	    {
		    $(imgClass).show();    
		},

		function()
		{
			$(imgClass).hide();
		});
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
						currentEmeny = enemies[i]
						userNeedsToPickEnemy = false;
						enemies.splice(i, 1);
						getCurrentEnemy()
						populateEnemies('.row2', enemies, true)
						instructions.html('Fight '+currentEmeny.name+'!')
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
			usersFighter.hp = usersFighter.hp - currentEmeny.counter;
			currentEmeny.hp = currentEmeny.hp - usersFighter.attack
			usersFighter.attack = usersFighter.attack + 12;
			var updateUser = fighterDiv(usersFighter, usersFighter.imgclass)
			updateUser.attr("class", "fighterDiv usersFighter")
			$('.usersFighter').html(updateUser)
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
	    $(this).css("border", "4px solid black");
    });

    $(".head").hover(function() 
    {
	    $(".typesRow").show();    
	},

	function()
	{
		$(".typesRow").hide();
	});

	hoverTypesInfo('.electric', '.typeImgElectric')
	hoverTypesInfo('.fire', '.typeImgFire')
	hoverTypesInfo('.water', '.typeImgWater')
	hoverTypesInfo('.grass', '.typeImgGrass')

});

