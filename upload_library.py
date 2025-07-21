# S3 Photo Library Controller

# This script uploads a set of images to S3 as well as an index file containing
# metadata about the images (folder name, date, width, height, public URL). The
# expected folder hierarchy is as follows:
#
# ROOT_DIR/
#   - travel photos | 01/01/2005
#       - photo1.png
#       - another_photo.jpg
#   - seattle | 01/01/1970
#       - ...
#   - ...

from PIL import Image
import os
import sys
import platform
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
import json
import progressbar

def main():

    # Parse config file...
    config = parse_config()
    BASE_URL = config['base_url']
    ROOT_DIR =config['root_dir']
    BUCKET = config['bucket']
    INDEX_NAME = config['index_name']
    DATE_FORMAT = config['date_format']
    DELIMITER = config['delmiter']

    # Establish connection to S3
    S3_CLIENT = boto3.client('s3')

    # Lint check folder hierarchy
    validate_formatting(ROOT_DIR, DATE_FORMAT, DELIMITER)

    document = []
    print('[+] Uploading all images in root directory {} to S3' .format(ROOT_DIR))

    for subdir, _, files in os.walk(ROOT_DIR):
        for file in progressbar.progressbar(files):
            if (not is_image(file)):
                continue
            filepath = os.path.join(subdir, file)
            subdir_name = subdir[len(ROOT_DIR)+1:]
            caption = subdir_name
            date = datetime.strptime(subdir_name.split(
                DELIMITER)[1].strip(), DATE_FORMAT)
            im = Image.open(filepath)
            w, h = im.size
            key = caption + '/' + file

            metadata = {
                'caption': caption,
                'w': w,
                'h': h,
                'date': date.strftime(DATE_FORMAT),
                'url': BASE_URL + key
            }
            document.append(metadata)
            upload_image(S3_CLIENT, filepath, BUCKET, key)

    upload_index(S3_CLIENT, document, INDEX_NAME, BUCKET)

def parse_config():
    with open("config.json", 'r') as config:
        return json.load(config)

def is_image(fp):
    return (fp.endswith('.png') or fp.endswith('.jpg') or
            fp.endswith('.PNG') or fp.endswith('.JPG') or
            fp.endswith('.JPEG') or fp.endswith('.jpeg'))

def upload_index(client, doc, index_name, bucket):
    print('[+] Uploading index file {} to S3...'.format(index_name))
    try:
        client.put_object(Body=json.dumps(doc),
                             Bucket=bucket, Key=index_name, ACL='public-read')
        print('[+] Successfully uploaded index file to S3')
    except ClientError as e:
        print("[-] Error uploading index file to S3, please check your connection config")
        sys.exit(e)

def upload_image(client, fp, bucket, key):
    try:
        client.upload_file(fp, bucket, key, ExtraArgs={'ACL': 'public-read'})
    except ClientError as e:
        print("[-] Error uploading images to S3, please check your connection config")
        sys.exit(e)

def validate_formatting(root_dir, date_format, delimiter):
    image_count = 0
    errors = []

    print("[+] Checking format of root directory {}...".format(root_dir))
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if (not is_image(file)):
                continue

            filepath = os.path.join(subdir, file)

            caption = subdir[len(root_dir)+1:]
            date = caption.split('|')

            if len(date) == 1:
                if caption not in errors:
                    errors.append(caption)
                    print(
                        "[-] Incorrect folder name format in directory: {}".format(caption))

                continue
            else:
                try:
                    date = datetime.strptime(date[1].strip(), date_format)
                except:
                    if caption not in errors:
                        errors.append(caption)
                        print(
                            "[-] Incorrect date format in directory: {}".format(caption))
            try:
                Image.open(filepath)
            except:
                print(
                    "[-] Error retrieving width and height from image {}".format(filepath))
                errors.append(filepath)
                continue

            image_count += 1

    err_symbol = '+' if len(errors) == 0 else '-'
    print("[{}] Found {} images with {} errors".format(
        err_symbol, image_count, len(errors)))
    if (len(errors) > 0):
        print(
            "[-] Valid folder names are formatted as: NAME {} {}".format(delimiter, date_format))
        sys.exit("[-] Please fix the formatting errors and try again")

    return True


if __name__ == "__main__":
    main()