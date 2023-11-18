import pandas as pd

storeName = []
mealName = []
calories = []
price = []
lineCount = 1

f = open("RawDataMcDonalds.txt", "r")
Lines = f.readlines()
for line in Lines:
  line = line.replace("\n", "")
  line = line.replace("\t", " ")
  line = line.split(" ")

  if line[-1][0] == "$" and line[-2] != "0" and line[-2] != "":
    print(line)
    storeName.append("McDonald's")
    mealName.append(" ".join(line[:-2]))
    calories.append(line[-2])
    price.append(line[-1][1:])

f.close()

print("mealName Length: ", len(mealName))
print("calories Length: ", len(calories))
print("price Length: ", len(price))

df = pd.DataFrame([storeName, mealName, calories, price]).T
df.to_excel(excel_writer = "ExcelMcDonalds.xlsx")