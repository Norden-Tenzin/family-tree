from json import JSONDecodeError
import json
from venv import create
from numbers_parser import Document
import pandas as pd
import uuid

def read_json():
    with open('family-tree.json') as json_file:
        try:
            data = json.load(json_file)
            return data
        except JSONDecodeError:
            return None

def write_json(data):
    json_string = json.dumps(data, indent=2, sort_keys=True, default=str)
    with open('../data/family-tree.json', 'w') as outfile:
        outfile.write(json_string) 

def main():
    doc = Document("../data/family.numbers")
    sheets = doc.sheets
    tables = sheets[0].tables
    data = tables[0].rows(values_only=True)
    df = pd.DataFrame(data[1:], columns=data[0])
    data = []
    for index, row in df.iterrows():
        if row["middle_name"] != None:
            name = str(row["first_name"]) + " " + str(row["middle_name"]) + " " + str(row["last_name"])
        else:
            name = str(row["first_name"]) + " " + str(row["last_name"])

        new_data = {   
            "id": row["Id"],
            "name": name,
            "gender": row["gender"],
            "born": row["born"],
            "died": row["died"],
            "children": json.loads(row["children"]),
            "spouses": json.loads(row["spouses"]),
            "siblings": json.loads(row["siblings"]),
            "parents": json.loads(row["parents"]),
        }
        data.append(new_data)
    write_json(data) 
    
if __name__ == "__main__":
    main()