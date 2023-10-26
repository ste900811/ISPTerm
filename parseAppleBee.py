# Apple bee block web scrapying, so copy image into text file and process it

mealName = []
calories = []
price = []
lineCount = 1

f = open("DataAppleBee.txt", "r")
Lines = f.readlines()
for line in Lines:
    print("check", line)
    # Where is meal name is
    if lineCount % 8 == 3:
        mealName.append("'" + line[:-1] + "'")
    # where calories and price is
    elif lineCount % 8 == 4:
        line = line.split(" Cals$")
        calories.append(line[0])
        price.append(line[1])
    lineCount += 1
f.close()
# os.remove("temp.txt")
print("mealName Length: ", len(mealName))
print("calories Length: ", len(calories))
print("price Length: ", len(price))

combineArray = []
for i in range(len(mealName)):
    combineArray.append([mealName[i], calories[i], price[i]])