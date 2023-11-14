# add your get-obituaries function here
def handler(event, context):
    print("Hello, i am get-obituaries!")
    # return sample response
    return {
        "statusCode": 200,
        "body": "Hello, i am get-obituaries!"
    }


def lambda_handler(event, context):
    return handler(event, context)
