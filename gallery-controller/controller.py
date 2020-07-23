# thanks to igracia on stackoverflow for the creation_date function

from PIL import Image
import os
import platform
from datetime import datetime
import boto3
from botocore.exceptions import ClientError
import json
import progressbar

BASE_URL = "https://pcrowe-photography.s3.amazonaws.com/"
ROOT_DIR = "./images"
BUCKET = 'pcrowe-photography'
S3_CLIENT = boto3.client('s3')
INDEX_NAME = 'index.json'

def is_image(fp):
    return (fp.endswith('.png') or fp.endswith('.jpg') or
            fp.endswith('.PNG') or fp.endswith('.JPG') or
            fp.endswith('.JPEG') or fp.endswith('.jpeg'))


def main():

    document = []
    print('Uploading all images in root directory "%s" to S3' % ROOT_DIR)
    for subdir, dirs, files in os.walk(ROOT_DIR):
        print('Uploading images all in "%s" to S3' % subdir)
        for file in progressbar.progressbar(files):
            if (not is_image(file)):
                continue
            filepath = os.path.join(subdir, file)
            caption = subdir[len(ROOT_DIR)+1:]
            cd = creation_date(filepath)
            im = Image.open(filepath)
            w, h = im.size
            key = caption + '/' + file

            metadata = {
                'caption': caption,
                'w': w,
                'h': h,
                'date': cd,
                'url': BASE_URL + key
            }
            document.append(metadata)
            # push to s3 here
            try:
                res = S3_CLIENT.upload_file(
                    filepath, BUCKET, key, ExtraArgs={'ACL': 'public-read'})
            except ClientError as e:
                print(e)

    print('Uploading index file %s to S3' % INDEX_NAME)
    S3_CLIENT.put_object(Body=json.dumps(document),
                         Bucket=BUCKET, Key=INDEX_NAME, ACL='public-read')


def creation_date(path_to_file):
    """
    Try to get the date that a file was created, falling back to when it was
    last modified if that isn't possible.
    See http://stackoverflow.com/a/39501288/1709587 for explanation.
    """
    if platform.system() == 'Windows':
        return os.path.getctime(path_to_file)
    else:
        stat = os.stat(path_to_file)
        try:
            return stat.st_birthtime
        except AttributeError:
            # We're probably on Linux. No easy way to get creation dates here,
            # so we'll settle for when its content was last modified.
            return stat.st_mtime


if __name__ == "__main__":
    main()
