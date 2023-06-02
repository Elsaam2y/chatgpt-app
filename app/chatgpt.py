import os
from typing import List
import openai
import argparse
import re
from dotenv import load_dotenv
import time

start_time = time.time()

# Specify the path to the .env file
dotenv_path = "../.env"


# Load environment variables from the specified .env file
load_dotenv(dotenv_path)
# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True, help='Input sentence')
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    generate_response(user_input)

def generate_response(prompt: str) -> str:
    print("Generating response")
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[
        {"role": "user", "content": prompt}
    ]
    )

    # Extract output message.
    output_message: str = response["choices"][0]["message"]["content"]
    print(f"output_message: {output_message}")
    return response

if __name__ == "__main__":
    main()
    end_time = time.time()
    elapsed_time = end_time - start_time

    print(f"Elapsed time: {elapsed_time} seconds")

