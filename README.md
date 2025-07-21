# Photo Gallery

Mimimalist photo gallery web app built with Vue and Amazon S3. All images are uploaded to S3 along with a JSON document detailing their size, date, and other metadata. The front end then accesses this file and uses it as a directory to load the images and render the gallery view. You can see a live version at [photos.prestoncrowe.com](https://photos.prestoncrowe.com).

## Getting Started

You must have AWS credentials in `~/.aws/credentials` in order to connect to S3
as well as an empty bucket to be populated with your images. Create the folder
hierarchy replicated below in `gallery-controller/images`:

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

Run the gallery controller with `python3 controller.py` to upload all your images
to S3 and generate the index file.

Set the INDEX_URL constant in `index.html` to the public URL of this generated index
file (`https://...s3.amazonaws.com/index.json`). 
