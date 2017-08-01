function fighter(name, attack, defend, counter)
{
	this.name = name;
	this.attack = attack;
	this.defend = defend;
	this.counter = counter;
}

function populateEnemies(row, array, nameOfClass)
{
	var colWidth = 12/array.length; 

	$(row).html("");

	for (var i=0; i<array.length; i++)
	{
		colWidth = 12/array.length
		colString = "col-md-"+colWidth
		colClass = "class = \""+colString+" text-center\""
		divString = "<div "+colClass+">"
		console.log(divString)
		var newCol = $(divString)
		var newDiv = $("<div>"+array[i].name+"</div>")
		newDiv.attr("class", nameOfClass+i)
		$(row).append(newCol);
		$(newCol).html(newDiv);
	}
}

function clearRow(row)
{
	$(row).html("");
}

var fighter1 = new fighter("Jack", 100, 200, 50)
var fighter2 = new fighter("Randy", 100, 200, 50)
var fighter3 = new fighter("William", 100, 200, 50)
var fighter4 = new fighter("Michael", 100, 200, 50)

var userNeedsToPickFighter = true;
var userNeedsToPickEnemy = true;
var usersFighter;
var enemy;
var enemies = []

enemies.push(fighter1)
enemies.push(fighter2)
enemies.push(fighter3)
enemies.push(fighter4)

populateEnemies(".row1", enemies, 'fighter')

$('.row1').on('click', function()
{
	if (userNeedsToPickFighter)
	{
		var clicked = event.srcElement.className

		for (var i=0; i<enemies.length; i++)
		{
			if (clicked === "fighter"+i)
			{
				usersFighter = enemies[i];
				userNeedsToPickFighter = false;
				enemies.splice(i, 1);
				console.log("The User has chosen "+usersFighter.name)
				console.log("The User's enemies are...")
				console.log(enemies)

				clearRow('.row1')
				var newCol = $("<div class=\"col-md-12 text-center\">")
				$('.row1').append(newCol)

				var newDiv = $("<div>"+usersFighter.name+"</div>")
				newDiv.attr("class", "usersFighter")
				newCol.html(newDiv)

			}
		}

/*		for (var i=0; i<enemies.length; i++)
		{
			var newCol = $("<div class=\"col-md-4 text-center\">")
			$('.row2').append(newCol)

			var newDiv = $("<div>"+enemies[i].name+"</div>")
			newDiv.attr("class", "enemy"+i)
			newCol.html(newDiv)
		}*/

		populateEnemies('.row2', enemies, 'enemy')
	}
})

$('.row2').on('click', function()
{
	if (userNeedsToPickEnemy)
	{
		var clicked = event.srcElement.className

		for (var i=0; i<enemies.length; i++)
		{
			if (clicked === "enemy"+i)
			{
				enemy = enemies[i]
				userNeedsToPickEnemy = false;
				enemies.splice(i, 1);
				console.log("The User has chosen "+enemy.name)
				console.log("The User's enemies to fight after are...")
				console.log(enemies)

				var newCol1 = $("<div class=\"col-md-6 text-center\">")
				var newCol2 = $("<div class=\"col-md-6 text-center\">")
				$('.row1').html(newCol1)
				$('.row1').append(newCol2)

				var newDiv1 = $("<div>"+usersFighter.name+"</div>")
				newDiv1.attr("class", "usersFighter")
				newCol1.html(newDiv1)

				var newDiv2 = $("<div>"+enemy.name+"</div>")
				newDiv2.attr("class", "currentEmeny")
				newCol2.html(newDiv2)

			}
		}

		for (var i=0; i<enemies.length; i++)
		{
			var newCol = $("<div class=\"col-md-4 text-center\">")
			$('.row2').append(newCol)

			var newDiv = $("<div>"+enemies[i].name+"</div>")
			newDiv.attr("class", "enemy"+i)
			newCol.html(newDiv)
		}
	}
})

