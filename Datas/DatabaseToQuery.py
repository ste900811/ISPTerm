# import pandas lib as pd
import pandas as pd
import numpy as np

# read by default 1st sheet of an excel file
df = pd.read_excel('./DatabaseList.xlsx')

array = df.to_numpy().tolist()

f = open("./DatabaseQuery/createFavoriteMeal.sql", "w")
f.write("INSERT INTO FavoriteMeal (mealID, restaurant, mealName, calories, price)\nVALUES\n")

for row in array:
    print(row)
    # row = row.replace("'", "\"").replace("'", "''")
    # f.write("(" + str(row[0]) + ", '" + str(row[1]) + "', '" + str(row[2]) + "', " + str(row[3]) + ", " +  "),\n")
f.close()
