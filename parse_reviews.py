import csv
import json

reviews = []
with open('C:/Users/LeGion/Documents/Khyontek AI/Programme Feedback - Khyontek AI.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        if len(row) < 13: continue
        
        # skip header
        if not row[8].isdigit(): continue
        
        name_full = row[1].strip()
        parts = name_full.split()
        if len(parts) >= 2:
            name = f"{parts[0][0].upper()}. {' '.join(parts[1:]).title()}"
        elif len(parts) == 1:
            name = f"{parts[0].title()}"
        else:
            name = "Anonymous"
            
        rating = int(row[8])
        text = row[12].strip()
        
        if len(text) < 10: continue
        
        reviews.append({
            "id": str(i),
            "name": name,
            "rating": rating,
            "text": text,
            "createdAt": "2026-06-03T16:57:06.286Z"
        })

with open('data/reviews.json', 'w', encoding='utf-8') as f:
    json.dump(reviews, f, indent=2)
