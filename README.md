# capitals-of-the-world
## OSM powered tool for extracting and visualizing road and building data for all capitals of the world

![Capitals of the world](https://raw.githubusercontent.com/sebastian-meier/capitals-of-the-world/master/thumb.png)

git submodule add https://github.com/mledoze/countries ./mledoze_countries

./data/countries.json was taken from mledoze_countries and used to generate ./data/countries.csv, using ./data-handling/countries.js (this means if you want to modify countries.json you can use the cca3)
CSV was send through the georeferencing engine of Mapzen to find the centroid of each captial, some returned errors and were georeferenced manually using the Google georeferencing system. 
./data/countries_short.csv is a slightly more compact version, have in mind that latitude and longitude were rounded to four digits.

The script ./data-handling/index.js was used to download highways [way["highway"]'+bbox+';>;] and buildings [way["building"]'+bbox+';>;] for each capital from openstreetmap. The data is stored in ./data/building/... and ./data/highway/... The size of the rectangle is defined through "buffer = {lat:0.03, lng:0.09}".

The images are generated through the scripts in folder ./rendering/. ./rendering/render.html creates images with streets or buildings depending on the value of the variable type (building/highway). ./rendering/full_render.html renders images with streets and buildings. You need to run the scripts on your local server as the script needs to make ajax calls as well as php to save the images. For some reason saving image data from canvas creates pngs that are bigger in size than they should be, so there is a small script ./rendering/reduce.html which simply stores the pngs as proper pngs (i have tried figuring out why this png bug happens, but no success so far).

![In one gif around the world](https://raw.githubusercontent.com/sebastian-meier/capitals-of-the-world/master/thumb.gif)