from fastapi import FastAPI
from chatgpt import generate_response
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_response")
async def generate_response_api(prompt: str):
    response = generate_response(prompt)
    return {"response": response}