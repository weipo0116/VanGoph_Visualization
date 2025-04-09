from flask import Flask, jsonify, render_template
import pandas as pd
import os

app = Flask(__name__, static_folder="static", static_url_path="/static")

@app.route('/get_van_gogh_data', methods=['GET'])
def get_van_gogh_data():
    csv_path = os.path.join(app.static_folder, "van_gogh_features.csv")
    df = pd.read_csv(csv_path)
    
    # 將圖片路徑轉換為前端可訪問的 URL
    df['image_url'] = df['image_path'].apply(lambda p: f"/static/van-gogh-paintings/{p.split('van-gogh-paintings/')[-1]}")
    
    # 選擇前端需要的欄位
    data = df[['image_url', 'x', 'y', 'class_name', 'labels']].to_dict(orient='records')
    return jsonify(data)

@app.route('/')
def index():
    return render_template('index.html')  # 渲染 templates/index.html

if __name__ == '__main__':
    app.run(debug=True, port=5001)