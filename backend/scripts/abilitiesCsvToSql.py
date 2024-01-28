#!/usr/bin/env python3
import db

table_name = 'abilities'

connection = db.connect()
cursor = connection.cursor()

db.clear_table(table_name, connection)

csv_filename = '../data/ff14_abilities.csv'
df = db.csv_to_df( csv_filename )

def job_name_to_id(entry):
    query = f"SELECT id FROM jobs WHERE short_name = '{entry}'"
    cursor.execute(query)
    result = cursor.fetchone()
    return result[0] if result else None

# replace job names with ids
df['job_id'] = df['Job'].apply(job_name_to_id)
del df['Job']

db.insert_df_into_table(df, table_name, connection)

db.commit_and_close_connection(connection)

