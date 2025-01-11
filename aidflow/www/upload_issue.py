import json

import frappe
from frappe import _
from frappe.utils import flt
import datetime


no_cache = 1
expected_keys = (
	"query",
)


def get_context(context):
	context.no_cache = 1
	context.csfr_token=frappe.sessions.get_csrf_token()
	context.user=frappe.session.user
	print(context)
	


@frappe.whitelist()
def upload_issue(description,title,thematic,province):
	print(description,title,thematic,province)
	doc=frappe.new_doc("Project")
	doc.province=province
	doc.thermatic_area=thematic
	doc.project_title=title
	doc.project_description=description
	doc.save(ignore_permissions=True)
	
