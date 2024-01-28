import pymysql
import pandas as pd
import numpy as np

user = 'ringo_ff14'
pw = 'ff14Pswd!'

def connect():
  try:
    # MySQL Connection Configuration
    connection = pymysql.connect(host='localhost', user=user, password=pw, database='ff14')
    return connection
  except mysql.connector.Error as err:
    print(f"Error: {err}")

# Commit changes and close connections
def commit_and_close_connection(connection):
  connection.commit()
  connection.cursor().close()
  connection.close()

def clear_table(table_name, connection):
  truncate_sql = "TRUNCATE TABLE %s" % table_name
  connection.cursor().execute(truncate_sql)

def csv_to_df(csv_filename):
  df = pd.read_csv(csv_filename)

  # default values of missing entries are None
  df.replace({np.nan: None}, inplace=True)
  return df

def insert_df_into_table(df, table_name, connection):
  col_names = list(df.columns)

  # generate insert command based on column names
  insert_sql = f"INSERT INTO {table_name} ({', '.join(col_names)}) VALUES ({', '.join(['%s']*len(col_names))})"

  cursor = connection.cursor()
  # Insert data into the MySQL table
  for index, row in df.iterrows():
    values = tuple(row[col_names])
    cursor.execute(insert_sql, values)

