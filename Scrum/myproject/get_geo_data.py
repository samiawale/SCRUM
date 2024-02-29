import os
import geopandas as gpd
from loguru import logger   

file_name = 'geo_data.geojson'

if os.path.exists(file_name):
    gdf = gpd.read_file(file_name)

    data = []
    data = gdf[['Gattung','pflanzjahr','gebiet','strasse']]
    data['Lat'] = gdf.geometry.y
    data['Long'] = gdf.geometry.x
    
  

    GeoData.objects.create(Gattung='asdfasdf', pflanzjahr='asdfasdf', gebiet='asdfasd', strasse='asdfasdf', lat='asdf', long='tes')
    # for index, row in data.iterrows():
        
        # GeoData.objects.create(
        #     Gattung = row['Gattung'],
        #     pflanzjahr = row['pflanzjahr'],
        #     gebiet = row['gebiet'],
        #     strasse = row['strasse'],
        #     lat = row['Lat'],
        #     long = row['Long']
        # )

        # print(f" test {row['pflanzjahr']}")  # Access each row here
        
     

    # print(data)
    
else:
    print("File does not exist in the current directory.")



