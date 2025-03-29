# Copyright (c) 2025, zawala and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import datetime


class Project(Document):
    def before_save(self):
        print(self.priority)





@frappe.whitelist()
def publish(name):
    doc=frappe.get_doc("Project",name)
    doc.priority=analyze_importance(doc.project_description)
    if not doc.published:
        if not doc.thumbnail:
            frappe.throw('Please Insert thumbnail first')
        doc.published=True
    else:
        doc.published=False
    doc.save(ignore_permissions=True)



def analyze_importance(text):
    import spacy
    from textblob import TextBlob
    nlp = spacy.load("en_core_web_sm")

    doc = nlp(text)
    entities = [ent.text for ent in doc.ents]  # Extract entities
    sentiment = TextBlob(text).sentiment.polarity  # -1 (negative) to +1 (positive)
    
    # Weighted score (customize based on your needs)
    importance = len(entities) * 0.3 + abs(sentiment) * 0.7
    return importance

text = "Flooding in Nairobi has displaced 1000 people."
print(analyze_importance(text)) 
@frappe.whitelist()
def update_progress(name,stage,comment):
    print(name,stage,comment)
    if not (frappe.db.exists("Progress",{'parent':name, 'stage':stage})):
        doc=frappe.get_doc("Project",name)
        doc.append('progress', {'date': frappe.utils.nowdate(),'stage': stage, 'comments': comment ,
                                        })
        doc.save(ignore_permissions=True)

    else:
        frappe.throw("Duplicate Stage In Progress Table")
    

@frappe.whitelist()
def remove_progress(name,stage):
    doc=frappe.get_doc("Progress",{'parent':name, 'stage':stage})
    doc.delete(ignore_permissions=True)    
