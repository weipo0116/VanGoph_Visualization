# Van Gogh Interactive Visualization 🎨
An interactive data-driven visualization of Van Gogh's paintings using D3.js and Flask.

This project runs on **Python 3.11.7**. You can install dependencies inside a virtual environment as follows:

## 📦 Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Create / Activate your Python virtual environment
```bash
python -m venv <your-env-name>         # first time only
source <your-env-name>/bin/activate     # On Windows: venv\Scripts\activate
```

### 3. Install required packages
```bash
pip install flask pandas
```


## 🚀 Running the Project
### 1. Make sure your folder structure looks like this:
```graphql
project-root/
├── static/
│   ├── main.js
│   ├── van-gogh-paintings/     # folder containing jpg images
│   └── van_gogh_features.csv   # processed CSV with columns: image_path, x, y, class_name, labels
├── templates/
│   └── index.html              # D3 visualization page
├── plot_umap.py                # Flask server code
```

### 2. Start the Flask server
```bash
python plot_umap.py
```
The app will run at:
📍 http://localhost:5001


## 🧠 About Data

### Dataset: [Van Gogh Paintings]([https://www.kaggle.com/datasets/ipythonx/van-gogh-paintings])

### 整體介面
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/9d68c0fd-e285-475b-9178-72418d014c58" />

### 選取圖片
<img width="670" alt="image" src="https://github.com/user-attachments/assets/71eef70f-bde5-4250-9481-fe21acbd03ec" />



