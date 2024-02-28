import os
import geopandas as gpd

file_name = 'geo_data.geojson'

if os.path.exists(file_name):
    gdf = gpd.read_file(file_name)

    print("File loaded successfully.")
    print(gdf.loc[0,'geometry'])
else:
    print("File does not exist in the current directory.")



