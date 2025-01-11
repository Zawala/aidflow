# Copyright (c) 2025, zawala and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import datetime


class Project(Document):
	pass




@frappe.whitelist()
def publish(name):
    doc=frappe.get_doc("Project",name)
    if not doc.published:
        if not doc.thumbnail:
            frappe.throw('Please Insert thumbnail first')
        doc.published=True
    else:
        doc.published=False
    doc.save(ignore_permissions=True)
    
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
