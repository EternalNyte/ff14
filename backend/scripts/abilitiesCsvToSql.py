#!/usr/bin/env python3
import pandas as pd
import numpy as np
import pymysql

user = 'ringo_ff14'
pw = 'ff14Pswd!'
table_name = 'abilities'

# MySQL Connection Configuration
connection = pymysql.connect(host='localhost', user=user, password=pw, database='ff14')
cursor = connection.cursor()

# Truncate the table
truncate_sql = "TRUNCATE TABLE %s" % table_name
cursor.execute(truncate_sql)

# Read CSV and Insert Data
csv_filename = '../data/ff14_abilities.csv'
df = pd.read_csv(csv_filename)

df.replace({np.nan: None}, inplace=True)

# Query the related table for foreign key values
def get_foreign_key_value(entry):
    # Customize the query based on your actual table structure
    query = f"SELECT id FROM jobs WHERE short_name = '{entry}'"
    cursor.execute(query)
    result = cursor.fetchone()
    return result[0] if result else None

# Replace entries in the DataFrame with foreign key values
df['job_id'] = df['Job'].apply(get_foreign_key_value)
del df['Job']

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

