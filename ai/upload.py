import boto3


def upload_s3(file_path, bucket_name, object_name):
    s3 = boto3.client("s3")
    file = open(file_path, "rb")

    try:
        s3.upload_file(file, bucket_name, object_name)
        print("File uploaded successfully to S3")
    except Exception as e:
        print(f"Error uploading file to S3: {str(e)}")
        return True
