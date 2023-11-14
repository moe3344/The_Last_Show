from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3
import json
import os
import openai
from get_poly import get_poly, get_id
from upload_to_cloudinary import upload_to_cloudinary
app = Flask(__name__)
CORS(app)  # Allow requests from any domain

from dotenv import load_dotenv
import os
# Load the environment variables from the .env file
load_dotenv()
# Create a DynamoDB client
dynamodb = boto3.client('dynamodb')
# add your create-obituary function here
def handler(event, context):
    print("Hello, i am create-obituary!")

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps('test passed!')
    }



def gpt_obituary(name, birth_year, death_year):
    # Code to create an obituary
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt='write an small obituary consisting about a fictional character named '+str(name)+' who was born on '+str(birth_year)
    +' and '+str(death_year)+' on 2023',
    max_tokens=50,
    temperature=0
    )
    obituary = response.get('choices')[0].get('text')
    return obituary

@app.route('/create-obituary', methods=['POST'])
def create_obituary():
    data = request.get_json()
    name = data.get('name')
    birth_year = data.get('birthYear')
    death_year = data.get('deathYear')
    
    # requesting the obituary image here
    image = data.get('image')

    obituary = gpt_obituary(name, birth_year, death_year)
    # requesting poly
    audio_file = get_poly(obituary)
    # uploading to cloudinary
    urls = upload_to_cloudinary(audio_file, image)
    audio_url = urls[0]
    image_url = urls[1]
    
    # Put the data into the DynamoDB table
    response = dynamodb.put_item(
        TableName='obituaries',
        Item={
            'id': {'S': get_id()},
            'name': {'S': name},
            'birth_year': {'S': birth_year},
            'death_year': {'S': death_year},
            'obituary': {'S': obituary},
            'audio_url': {'S': audio_url},
            'image_url': {'S': image_url}
        }
    )
    
    # Return a success message
    return {
        'statusCode': 200,
        'body': json.dumps('Obituary added to DynamoDB!')
    }

@app.route('/get-all-obituaries', methods=['GET'])
def get_all_obituaries():
    # Scan the DynamoDB table to get all items
    response = dynamodb.scan(
        TableName='obituaries'
    )

    # Extract the items from the response
    items = response.get('Items')

    # Convert the items to a JSON-formatted string
    obituaries = []
    for item in items:
        obituary = {
            'id': item.get('id').get('S'),
            'name': item.get('name').get('S'),
            'birth_year': item.get('birth_year').get('S'),
            'death_year': item.get('death_year').get('S'),
            'obituary': item.get('obituary').get('S'),
            'audio_url': item.get('audio_url').get('S'),
            'image_url': item.get('image_url').get('S')
        }
        obituaries.append(obituary)

    # Return the JSON-formatted string
    return {
        'statusCode': 200,
        'body': json.dumps(obituaries)
    }

if __name__ == '__main__':
    app.run(port=5000)  # Change the port number here if needed
