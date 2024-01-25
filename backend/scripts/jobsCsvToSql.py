#!/usr/bin/env python3
import pandas as pd
import numpy as np
import pymysql

user = 'ringo_ff14'
pw = 'ff14Pswd!'
table_name = 'jobs'

# MySQL Connection Configuration
connection = pymysql.connect(host='localhost', user=user, password=pw, database='ff14')
cursor = connection.cursor()

dropFKeyConstraintSql = "ALTER TABLE %s DROP FOREIGN KEY %s" % ( "abilities", "abilities_ibfk_1" );
cursor.execute(dropFKeyConstraintSql)

# Truncate the table
truncate_sql = "TRUNCATE TABLE %s" % table_name
cursor.execute(truncate_sql)

# Read CSV and Insert Data
csv_filename = '../data/ff14_jobs.csv'
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

dropFKeyConstraintSql = "ALTER TABLE %s ADD CONSTRAINT %s FOREIGN KEY (job_id) REFERENCES jobs(id)" % ( "abilities", "abilities_ibfk_1" );
cursor.execute(dropFKeyConstraintSql)

# Commit changes and close connections
connection.commit()
cursor.close()
connection.close()

