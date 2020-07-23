# Photo Gallery

A simple photo gallery built in react along with a python script to keep track of the images and their metadata. All images in `gallery-controller/images` are uploaded to S3 along with a JSON document detailing their size, date, and other metadata. The front end then accesses this file and uses it as a directory to load the images and render the gallery view.

## Setup
You must have AWS credentials in `~/.aws/credentials` in order to connect to S3
as well as an empty bucket to be populated with your images. Create the folder
hierarchy replicated below in `./images`:

```
ROOT_DIR/
  - travel photos | 01-01-2005
      - photo1.png
      - another_photo.jpg
  - seattle | 01-01-1970
      - ...
  - ...
```

You must also populate `config.json` with details pertaining to your bucket:
```
{
    "base_url": "https://YOUR-BUCKET.s3.amazonaws.com/",
    "root_dir": "./images",
    "bucket": "YOUR_BUCKET",
    "index_name": "index.json",
    "date_format": "%m-%d-%Y",
    "delmiter": "|"
}
```
