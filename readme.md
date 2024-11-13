# RadarAtlas Chrome Extension
This project started in October 2020 and has been iterated on many times. At the time of writing in November, 2024, there was strong interest from the developer to open source the project to focus on other things. The purpose of this readme is to explain some of the files and how they work together. 

## Installation
* Clone this repo locally
* Navigate to Chrome's extensions manager at `chrome://extensions`
* Ensure Developer Mode is enabled by toggling it in the top right
* Click `Load Unpacked` and in the modal that appears, navigate to wherever you cloned the repo to and click Select
* Note that this will likely work in Firefox (locally) as well, but the extension was difficult to publish there for widespread distribution.

## RadarAtlas Features
* RadarAtlas dashboard appears on right side of the UI on ADSB tracking websites
* Nested in the dashboard are a variety of "interesting" filter buttons, user-set "favorites", zoom to airport, and reverse registration tools
* Clicking on an aircraft in the map will display ownership/registration data (where available) to the left of the map


## Files Included in this repo
* Manifest.json - this is a required file for all chrome extensions. This project is already running manifest v3 so no additional setup will be needed with the upcoming required transition from manifest v2 to v3
* jquery-3.7.0.min.js - the entire extension runs/fires with help from this file
* byICAO.js - this file is for the "zoom to airport" feature. When a user enters an airport ICAO code, the map will zoom to the lat/long listed in that file
* airplanes.js - this file is the nuts and bolts of looking for registered owners in the "database". It also contains logic for displaying the google link to perform a web search for that particular NNumber. 
* interesting.js - this file is the home of the interesting filters. This is the culmination of years of research into who owns which plane and then adding it to a filter. Note that there are more categories than are displayed in the Dashboard. While I may have removed buttons over time, I never scrubbed the data from the file. For example the Oil/Gas companies data still exists in that file despite the button not being displayed in the Dashboard. 
* interestingList.js - this is a newer file in the hierarchy. After removing FAA NAARMO data/logic in 2024, this file was added so that logic could look here before looking in other the other "database" below:
* openSkyList.js - this is that other database. These are huge files and have always been included/uploaded as part of the package to the chrome web store. The original source of this data is Opensky-network (https://opensky-network.org/datasets/metadata/). I tried to update the data a few times per year. 
* lookupByReg.js - this is a short file that allows the user to convert a registration number to an ICAO hex. This is really more of a URL manipulator than logic. 
* userFavorites.js - this is the supporting file for the User Favorites feature in the dashboard. All the favorites are stored to Local Storage and are viewable on the map with a single click. 
* styles.css - CSS for the extension. Note that over the course of 4 years of development, I added a bunch of styles for different features but I didn't do a great job of going back through to remove unused styles. 
