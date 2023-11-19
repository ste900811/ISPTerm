# import pandas lib as pd
import pandas as pd
import numpy as np

# read by default 1st sheet of an excel file
df = pd.read_excel('./DatabaseList.xlsx')

array = df.to_numpy().tolist()

f = open("./DatabaseQuery/createFavoriteMeal.sql", "w")
f.write("CREATE TABLE favoriteMeal (\n")
f.write("\trestaurant varchar(20),\n")
f.write("\tmealName varchar(100),\n")
f.write("\tcalories int,\n")
f.write("\tprice float,\n")
f.write("\tPRIMARY KEY (restaurant, mealName)\n")
f.write(");\n\n")

f.write("INSERT INTO FavoriteMeal (restaurant, mealName, calories, price)\nVALUES\n")

for index, row in enumerate(array):
  temp = "( "
  for column in row:
    if type(column) == str:
      column = column.replace("\n","")
      temp += "\"" + column + "\" , "
    else:
      temp += str(column) + " , "
  temp = temp[:-3] + " ),\n"
  f.write(temp)
f.close()
