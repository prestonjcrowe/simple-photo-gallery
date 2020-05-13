# photo gallery

A simple photo gallery built in react along with a python script to keep track of the images and their metadata. All images in `gallery-controller/images` are uploaded to S3 along with a JSON document detailing their size, date, and other metadata. The front end then accesses this file and uses it as a directory to load the images and render the gallery view.
