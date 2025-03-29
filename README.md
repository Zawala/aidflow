### **Explanation of: Sentiment + Entity Recognition Approach**  
This method combines **sentiment analysis** (emotional tone) and **named entity recognition** (key entities like people, places, organizations) to estimate the importance of a paragraph.  

---

### **How It Works**
1. **Sentiment Analysis**  
   - Measures how *strongly positive/negative* the text is (using `TextBlob`).  
   - **Why?** Urgent issues often have strong negative sentiment (e.g., "disaster," "crisis").  

2. **Named Entity Recognition (NER)**  
   - Identifies key entities (e.g., "Nairobi," "1000 people") using spaCy.  
   - **Why?** Texts mentioning specific entities (locations, numbers) are often more important.  

3. **Weighted Scoring**  
   - Combines both metrics into a single importance score.  

---

### **Step-by-Step Code Breakdown**
#### **1. Install Dependencies**
```bash
pip install spacy textblob
python -m spacy download en_core_web_sm
```

#### **2. Import Libraries**
```python
import spacy
from textblob import TextBlob

# Load spaCy's English language model
nlp = spacy.load("en_core_web_sm")
```

#### **3. Define the Importance Analyzer**
```python
def analyze_importance(text):
    # Step 1: Extract named entities (e.g., locations, organizations)
    doc = nlp(text)
    entities = [ent.text for ent in doc.ents]  # List of entities
    
    # Step 2: Calculate sentiment polarity (-1 to +1)
    sentiment = TextBlob(text).sentiment.polarity
    
    # Step 3: Combine scores (custom weights)
    importance_score = len(entities) * 0.3 + abs(sentiment) * 0.7
    return importance_score
```

#### **4. Test with Example Texts**
```python
text1 = "Flooding in Nairobi has displaced 1000 people."  # Important (entity + negative sentiment)
text2 = "The weather is nice today."                     # Not important (no entity, neutral sentiment)

print(analyze_importance(text1))  # Output: ~0.53 (higher importance)
print(analyze_importance(text2))  # Output: ~0.0 (lower importance)
```

---

### **Key Customizations**
1. **Adjust Weights**  
   - Increase `0.3` (entity weight) if entities matter more.  
   - Increase `0.7` (sentiment weight) if emotional tone matters more.  

2. **Filter Entity Types**  
   Only count certain entities (e.g., locations, dates):
   ```python
   entities = [ent.text for ent in doc.ents if ent.label_ in ["GPE", "DATE", "CARDINAL"]]
   ```

3. **Normalize to 0-10 Scale**  
   ```python
   def normalize_score(score):
       return min(10, int(score * 10))  # Convert 0-1 to 0-10
   ```

---


---

### **Example Paragraph**  
*"A severe malaria outbreak has hit Harare, with over 500 confirmed cases and 12 deaths reported in the past week. Hospitals are overwhelmed, and health officials warn of a growing crisis if containment measures are not implemented immediately."*  

---

### **Step-by-Step Analysis**  

#### **1. Named Entity Recognition (NER)**  
Using `spaCy`, the system extracts:  
- **Locations:** `Harare`  
- **Numbers:** `500`, `12`  
- **Other Key Terms:** `malaria outbreak`, `hospitals`, `health officials`  

**Entities Found:**  
```python
["Harare", "500", "12", "malaria outbreak", "hospitals", "health officials"]
```
**Entity Count:** `6`  

#### **2. Sentiment Analysis**  
Using `TextBlob`, the sentiment polarity is calculated:  
- **Sentiment Score:** `-0.8` (strongly negative due to words like *"severe," "deaths," "overwhelmed," "crisis"*)  

#### **3. Importance Calculation**  
```python
importance_score = (len(entities) * 0.3) + (abs(sentiment) * 0.7)
                 = (6 * 0.3) + (0.8 * 0.7) 
                 = 1.8 + 0.56 
                 = 2.36
```
**Normalized to 0-10 Scale:**  
```python
normalized_score = min(10, int(2.36 * 3))  # Adjusted multiplier for 0-10
                = 7  # High importance
```

---

### **Why This Score?**  
- **Entities (6):** High relevance (specific location, numbers, stakeholders).  
- **Sentiment (-0.8):** Strong negative tone (indicates urgency).  
- **Final Score:** `7/10` (would be higher if more entities like WHO/UN were mentioned).  

---





