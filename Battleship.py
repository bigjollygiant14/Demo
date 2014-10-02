###imports###
import random

###functions###
def print_board(board):
	for row in board:
		print(" ".join(row))
#switch loop for letter to int conversion
def convert_letter(x):
	x = x.lower()
	return {
		'a': 1,
		'b': 2,
		'c': 3,
		'd': 4,
		'e': 5,
		'f': 6,
		'g': 7,
		'h': 8,
		'i': 9,
		'j': 10,
		}.get(x, 11)    # 9 is default if x not found

#guess logic
def guess(row,col,board,all_ship_coords):
	if ship_location(row,col,all_ship_coords) == True:
		change_marker(row,col,board,"Hit")
		print(">>> Hit! <<<")
		check_if_sunk(row,col,all_ship_coords)
		return all_ship_coords
	else:
		change_marker(row,col,board,"Miss")
		print(">> Miss <<")
		return all_ship_coords
#guess helper functions
def ship_location(row,col,all_ship_coords):
	marker = False
	for ship in all_ship_coords:
		for coordinates in ship[1]:
			if coordinates[0] == row and coordinates[1] == col:
				marker = True
	return marker
def already_guessed(row,col,board):
	if board[row][col] == "O" or board[row][col] == "X":
		return True
	else:
		return False
def change_marker(row,col,board,gtype):
	if gtype == "Miss":
		board[row][col] = "O"
	elif gtype == "Hit":
		board[row][col] = "X"
	else:
		print("Error!")
	return board
def check_if_sunk(row,col,all_ship_coords):
	for ship in all_ship_coords:
		current_ship = ship[0]
		number_sunk = 0
		percent_sunk = 0
		for coordinates in ship[1]:
			if coordinates[0] == row and coordinates[1] == col:
				coordinates[2] = True
			if coordinates[2] == True:
				number_sunk += 1
			percent_sunk = (number_sunk/current_ship) * 100
			if percent_sunk == 100:
				ship[2] = True
				print(">>> SUNK SHIP! <<<")
	return all_ship_coords
def check_if_win(all_ship_coords):
	win_count = 0
	for ship in all_ship_coords:
		if ship[2] == True:
			win_count += 1
	if win_count != 5:
		return False
	else:
		return True

#main game drive loop
def game_driver(board,ships):
	current_turn = 0
	print("Welcome to Battleship!")
	print_board(board)

	while current_turn < 101:
		print("Turn number %s" % str(current_turn + 1))
		guess_col = input("Guess a column letter: ")
		guess_row = input("Guess a row number: ")

		print("")
		print("")

		#convert string to number, get only first string, make sure it is string
		temp_str = list(guess_col)[0]
		if type(temp_str) is str:
			guess_col = convert_letter(temp_str)

		#print result of guess
		if int(guess_row) > 10 or int(guess_col) > 10:
			print("Shot is off map!")
		elif already_guessed(int(guess_row),int(guess_col),board) == True:
			print("Already guessed these coordinates!")
		else:
			ships = guess(int(guess_row),int(guess_col),board,ships)
			current_turn += 1

		if check_if_win(all_ship_coords) == True:
			print("You Win!")
			break

		print("")
		print("")

		#show board update
		print_board(board)

#starting coords for ships
def place_ship(ship):
	ship_info = []
	ship_info.append(ship)

	coord_list = []
	first_coord = [random.randint(1,10),random.randint(1,10),False]
	coord_list.append(first_coord)
	
	hori_or_vert = random.randint(0,1)
	#up/down
	if hori_or_vert == 1:
		up_or_down = random.randint(0,1)
		#up
		if up_or_down == 1:
			i = 0
			coord_place_holder = [first_coord[0],first_coord[1]]
			while i < (ship - 1):
				coord_list.append([coord_place_holder[0],(coord_place_holder[1] - 1),False])
				coord_place_holder = [coord_place_holder[0],(coord_place_holder[1] - 1)]
				i += 1
		#down
		else:
			i = 0
			coord_place_holder = [first_coord[0],first_coord[1]]
			while i < (ship - 1):
				coord_list.append([coord_place_holder[0],(coord_place_holder[1] + 1),False])
				coord_place_holder = [coord_place_holder[0],(coord_place_holder[1] + 1)]
				i += 1
	#left/right
	else:
		left_or_right = random.randint(0,1)
		#left
		if left_or_right == 1:
			i = 0
			coord_place_holder = [first_coord[0],first_coord[1]]
			while i < (ship - 1):
				coord_list.append([(coord_place_holder[0] - 1),coord_place_holder[1],False])
				coord_place_holder = [(coord_place_holder[0] - 1),coord_place_holder[1]]
				i += 1
		#right
		else:
			i = 0
			coord_place_holder = [first_coord[0],first_coord[1]]
			while i < (ship - 1):
				coord_list.append([(coord_place_holder[0] + 1),coord_place_holder[1],False])
				coord_place_holder = [(coord_place_holder[0] + 1),coord_place_holder[1]]
				i += 1
	
	#return coords
	ship_info.append(coord_list)
	ship_info.append(False)
	return ship_info

def check_bounds(ship):
	for coordinates in ship[1]:
		if coordinates[0] > 10 or coordinates[1] > 10:
			return False
		if coordinates[0] < 1 or coordinates[1] < 1:
			return False

###variables###
#boards
red_board = []
red_board.append(["  ","A","B","C","D","E","F","G","H","I","J"])
for i in range(9):
	#append 10 rows of 10
	red_board.append([" " + str(i + 1)," "," "," "," "," "," "," "," "," "," "])
red_board.append([str(10)," "," "," "," "," "," "," "," "," "," "])

#ships
ships = [5,4,3,3,2]
#place ships
#[ship size,[[row, column][row, column]],sunk status]
red_ships = []
for ship in ships:
	red_ships.append(place_ship(ship))


#check for possible overlaps with side and other ships
def check_overlap(red_ships):
	true_count1 = 0
	coord_list = []
	while true_count1 != 5:
		for ship in red_ships:
			if check_bounds(ship) == False:
				ship_in_error = ship[0]
				red_ships.remove(ship)
				red_ships.append(place_ship(ship_in_error))
			else:
				coord_list.append(ship[1])
				true_count1 += 1
	return True

#initialize game
def init(red_ships,red_board):
	if check_overlap(red_ships) == True:
		print(red_ships)
		game_driver(red_board,red_ships)
init(red_ships,red_board)
