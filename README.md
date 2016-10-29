# ua-web-challenge-x-semifinal

### To run this piece:
* Run http server in project directory and open index.html

### Making changes
* `npm install` project
* run `gulp` to build dev version / run `gulp dev:prod` to build prod version

### Supported features
* picture add
    * via file upload (jpg, png)
    * via remote url (remove server must have CORS enabled)
    * via gallery
* move image on canvas
    * with mouse click-and-drag
    * with keyboard arrow keys
* rotate image on canvas with rotate control element
* scale / resize with resize control elements
* drawing custom layer via separate canvas
* z-index change (to front, up, down, to back)
* image export (as png)
* layer removal
* layer limit (10)
* supports various screen resolutions (responsive)
