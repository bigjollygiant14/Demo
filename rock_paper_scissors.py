# Rock-paper-scissors-lizard-Spock template


# The key idea of this program is to equate the strings
# "rock", "paper", "scissors", "lizard", "Spock" to numbers
# as follows:
#
# 0 - rock
# 1 - Spock
# 2 - paper
# 3 - lizard
# 4 - scissors

# helper functions
import random
def name_to_number(name):
    if name.lower() == "rock":
        return 0
    elif name.lower() == "spock":
        return 1
    elif name.lower() == "paper":
        return 2
    elif name.lower() == "lizard":
        return 3
    elif name.lower() == "scissors":
        return 4
    else: 
        return 5

def number_to_name(number):
    if number == 0:
        return "rock"
    elif number == 1:
        return "spock"
    elif number == 2:
        return "paper"
    elif number == 3:
        return "lizard"
    elif number == 4:
        return "scissors"
    else: 
        return "Error: Number not in proper range"
    

def rpsls(player_choice): 
    print("")
    print("Player chose " + str(player_choice))
    player_number = name_to_number(player_choice)

    comp_number = random.randrange(0,4)
    comp_choice = number_to_name(comp_number)
    print("Computer chose " + comp_choice)

    result = (comp_number - player_number) % 5
    if result == 1 or result == 2:
        print("Computer wins!")
    elif result == 3 or result == 4:
        print("Player wins!")
    elif result == 0:
        print("Draw!")
    else:
        print("Invalid Range")
    
# test your code - THESE CALLS MUST BE PRESENT IN YOUR SUBMITTED CODE
rpsls("rock")
rpsls("Spock")
rpsls("paper")
rpsls("lizard")
rpsls("scissors")

# always remember to check your completed program against the grading rubric