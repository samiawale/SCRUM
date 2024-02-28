import os
import geopandas as gpd

file_name = 'geo_data.geojson'

if os.path.exists(file_name):
    gdf = gpd.read_file(file_name)

    data = gdf[['Gattung','pflanzjahr','gebiet','strasse']]
    data['Lat'] = gdf.geometry.y
    data['Long'] = gdf.geometry.x
    


    print(data)
    
else:
    print("File does not exist in the current directory.")



