import pandas as pd

storeName = []
mealName = []
calories = []
price = []
lineCount = 1

f = open("RawDataBobEvans.txt", "r")
Lines = f.readlines()
for line in Lines:

    # parse the mean name and add into meanName, and generate storeName
    if lineCount % 2 == 1:
        storeName.append("BobEvan's")
        mealName.append(line)
    
    # parsed calories and price and add into calories and price
    elif lineCount % 2 == 0:
        line = line.split(" ")
        calories.append(line[2])
        price.append(line[1])
    lineCount += 1

f.close()

print("mealName Length: ", len(mealName))
print("calories Length: ", len(calories))
print("price Length: ", len(price))

df = pd.DataFrame([storeName, mealName, calories, price]).T
df.to_excel(excel_writer = "ExcelBobEvans.xlsx")