from fastapi import FastAPI
from app.routers import tasks

app = FastAPI(title="Todo API", version="1.0.0")

app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "Todo API работает!"}
