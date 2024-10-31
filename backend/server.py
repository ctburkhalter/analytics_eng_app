from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this to match your React frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint to verify server is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the Analytics Engineering App Backend!"}

# In-memory storage for anchors and users (for demonstration purposes)
anchors = [
    {"id": 1, "name": "Anchor 1", "value": "Value 1"},
    {"id": 2, "name": "Anchor 2", "value": "Value 2"}
]

users = [
    {"id": 1, "name": "User 1", "role": "Admin"},
    {"id": 2, "name": "User 2", "role": "Editor"}
]

# Endpoint to get all anchors
@app.get("/api/anchors")
def get_anchors():
    return {"anchors": anchors}

# Endpoint to create a new anchor
@app.post("/api/anchors")
def create_anchor(name: str = Form(...), value: str = Form(...)):
    new_anchor = {"id": len(anchors) + 1, "name": name, "value": value}
    anchors.append(new_anchor)
    return {"success": True}

# Endpoint to update an existing anchor
@app.put("/api/anchors/{anchor_id}")
def update_anchor(anchor_id: int, name: str = Form(...), value: str = Form(...)):
    for anchor in anchors:
        if anchor["id"] == anchor_id:
            anchor["name"] = name
            anchor["value"] = value
            return {"success": True}
    raise HTTPException(status_code=404, detail="Anchor not found")

# Endpoint to delete an anchor
@app.delete("/api/anchors/{anchor_id}")
def delete_anchor(anchor_id: int):
    for anchor in anchors:
        if anchor["id"] == anchor_id:
            anchors.remove(anchor)
            return {"success": True}
    raise HTTPException(status_code=404, detail="Anchor not found")

# Endpoint to get all users
@app.get("/api/users")
def get_users():
    return {"users": users}

# Endpoint to create a new user
@app.post("/api/users")
def create_user(name: str = Form(...), role: str = Form(...)):
    new_user = {"id": len(users) + 1, "name": name, "role": role}
    users.append(new_user)
    return {"success": True}

# Endpoint to update an existing user
@app.put("/api/users/{user_id}")
def update_user(user_id: int, name: str = Form(...), role: str = Form(...)):
    for user in users:
        if user["id"] == user_id:
            user["name"] = name
            user["role"] = role
            return {"success": True}
    raise HTTPException(status_code=404, detail="User not found")

# Endpoint to delete a user
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    for user in users:
        if user["id"] == user_id:
            users.remove(user)
            return {"success": True}
    raise HTTPException(status_code=404, detail="User not found")

# Endpoint to handle file upload
@app.post("/api/upload")
def upload_file(file: UploadFile = File(...)):
    # Here you can process the uploaded file as needed
    return {"filename": file.filename, "success": True}
