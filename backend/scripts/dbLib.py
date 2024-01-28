import pymysql
import pandas as pd
import numpy as np

user = 'ringo_ff14'
pw = 'ff14Pswd!'

class Database:
  def __init__(self):
    self.connection = None

  def connect(self):
    try:
      # MySQL Connection Configuration
      self.connection = pymysql.connect(host='localhost', user=user,
                                        password=pw, database='ff14')
      return self.connection
    except pymysql.Error as err:
      print(f"Error: {err}")

  # Commit changes and close connections
  def commit_and_close_connection(self):
    self.connection.commit()
    self.connection.cursor().close()
    self.connection.close()

  def clear_table(self, table_name):
    truncate_sql = "TRUNCATE TABLE %s" % table_name
    self.connection.cursor().execute(truncate_sql)

  def insert_df_into_table(self, df, table_name):
    col_names = list(df.columns)

    # generate insert command based on column names
    insert_sql = f"INSERT INTO {table_name} ({', '.join(col_names)}) VALUES ({', '.join(['%s']*len(col_names))})"

    cursor = self.connection.cursor()
    # Insert data into the MySQL table
    for index, row in df.iterrows():
      values = tuple(row[col_names])
      cursor.execute(insert_sql, values)

def csv_to_df(csv_filename):
  df = pd.read_csv(csv_filename)

  # default values of missing entries are None
  df.replace({np.nan: None}, inplace=True)
  return df


