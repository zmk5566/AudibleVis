from fastapi import FastAPI, HTTPException
from typing import List
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(debug=True)
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create a directory to store the CSV files
if not os.path.exists('csv_files'):
    os.makedirs('csv_files')

# Define a function to increment the filename
def get_next_filename(folder_name):
    print(os.listdir(folder_name))
    filenames = [int(f.split('.')[0]) for f in os.listdir(folder_name) if f.endswith('.csv')]
    return max(filenames) + 1 if filenames else 1


def check_folder_exists(folder_name):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

@app.post('/save_csv/{folder_name}')
def save_csv(folder_name: str,json_data: List[dict]):
    # Convert the JSON data to a pandas dataframe
    check_folder_exists(folder_name)

    print(json_data)
    print(get_next_filename(folder_name))
    try:
        df = pd.DataFrame(json_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f'Error converting JSON data to dataframe: {str(e)}')
    
    # Save the dataframe as a CSV file with an incremented filename
    try:
        filename = f'{get_next_filename(folder_name)}.csv'
        filepath = os.path.join(folder_name, filename)
        df.to_csv(filepath, index=False)
        return {'filename': filename, 'filepath': filepath}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error saving dataframe to CSV: {str(e)}')