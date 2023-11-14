terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  access_key ="AKIAYNDSY63C3JFDGVP3"
  secret_key = "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"
  region = "ca-central-1"
}

# create IAM role for Lambda functions
resource "aws_iam_role" "lambda_execution" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# attach policy to IAM role to allow Lambda to access DynamoDB
resource "aws_iam_policy_attachment" "lambda_dynamodb_policy_attachment" {
  name = "lambda-dynamodb-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  roles      = [aws_iam_role.lambda_execution.name]
}

# create Lambda function to create obituaries
resource "aws_lambda_function" "create_obituary" {
  filename         = "../functions/create-obituary/create-obituary.zip"
  function_name    = "createObituary"
  role             = aws_iam_role.lambda_execution.arn
  handler          = "create-obituary.lambda_handler"
  runtime          = "python3.8"
  timeout          = 10
  memory_size      = 128
  source_code_hash = filebase64sha256("../functions/create-obituary/create-obituary.zip")

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.obituaries.name
    }
  }
}

# create Lambda function to get obituaries
resource "aws_lambda_function" "get_obituaries-30146854" {
  filename         = "../functions/get-obituaries/get-obituaries.zip"
  function_name    = "getObituaries-30146854"
  role             = aws_iam_role.lambda_execution.arn
  handler          = "get-obituaries.lambda_handler"
  runtime          = "python3.8"
  timeout          = 10
  memory_size      = 128
  source_code_hash = filebase64sha256("../functions/get-obituaries/get-obituaries.zip")

  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.obituaries.name
    }
  }
}

resource "aws_dynamodb_table" "obituaries" {
  name           = "obituaries"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  
  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }
  
  attribute {
    name = "date_of_death"
    type = "S"
  }
  
  attribute {
    name = "epitaph"
    type = "S"
  }

  global_secondary_index {
    name               = "name-index"
    hash_key           = "name"
    projection_type    = "ALL"
    write_capacity     = 1
    read_capacity      = 1
  }
  
  global_secondary_index {
    name               = "date_of_death-index"
    hash_key           = "date_of_death"
    projection_type    = "ALL"
    write_capacity     = 1
    read_capacity      = 1
  }

  global_secondary_index {
    name               = "epitaph-index"
    hash_key           = "epitaph"
    projection_type    = "ALL"
    write_capacity     = 1
    read_capacity      = 1
  }
}



output "create_obituary_url" {
  value = aws_lambda_function.create_obituary.invoke_arn
}

output "get_obituaries_url" {
  value = aws_lambda_function.get_obituaries-30146854.invoke_arn
}
