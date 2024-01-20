#!/usr/bin/env python3
import pandas as pd
import numpy as np
import pymysql

user = 'ringo_ff14'
pw = 'ff14Pswd!'
table_name = 'ff14_abilities'

# MySQL Connection Configuration
connection = pymysql.connect(host='localhost', user=user, password=pw, database='ff14')
cursor = connection.cursor()

# Truncate the table
truncate_sql = "TRUNCATE TABLE %s" % table_name
cursor.execute(truncate_sql)

# Read CSV and Insert Data
csv_filename = 'ff14_abilities.csv'
df = pd.read_csv(csv_filename)

df.replace({np.nan: None}, inplace=True)

# Get column names from the CSV file
columns = list(df.columns)

# Generate the INSERT SQL command dynamically
insert_sql = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', '.join(['%s']*len(columns))})"

# Insert data into the MySQL table
for index, row in df.iterrows():
    values = tuple(row[columns])
    cursor.execute(insert_sql, values)

# Commit changes and close connections
connection.commit()
cursor.close()
connection.close()

