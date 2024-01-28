#!/usr/bin/env python3
import db

table_name = 'jobs'

connection = db.connect()
cursor = connection.cursor()

# temporarily disable job <-> abilities relationship
drop_fkey_sql = "ALTER TABLE %s DROP FOREIGN KEY %s" % ( "abilities", "abilities_ibfk_1" );
cursor.execute(drop_fkey_sql)

db.clear_table(table_name, connection)

csv_filename = '../data/ff14_jobs.csv'
df = db.csv_to_df(csv_filename)

db.insert_df_into_table(df, table_name, connection)

# add back job <-> abilities relationship
add_fkey_sql = "ALTER TABLE %s ADD CONSTRAINT %s FOREIGN KEY (job_id) REFERENCES jobs(id)" % ( "abilities", "abilities_ibfk_1" );
cursor.execute(add_fkey_sql)

db.commit_and_close_connection( connection )

