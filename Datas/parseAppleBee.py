# Apple bee block web scrapying, so copy image into text file and process it

import pandas as pd

storeName = []
mealName = []
calories = []
price = []
lineCount = 1

f = open("RawDataAppleBee.txt", "r")
Lines = f.readlines()
for line in Lines:

    # parse the mean name and add into meanName, and generate storeName
    if lineCount % 8 == 3:
        storeName.append("Applebee's")
        mealName.append(line[:-1])
    
    # parsed calories and price and add into calories and price
    elif lineCount % 8 == 4:
        line = line.split(" Cals$")
        calories.append(line[0])
        price.append(line[1])
    lineCount += 1
f.close()

print("mealName Length: ", len(mealName))
print("calories Length: ", len(calories))
print("price Length: ", len(price))

df = pd.DataFrame([storeName, mealName, calories, price]).T
df.to_excel(excel_writer = "ExcelAppleBee.xlsx")
