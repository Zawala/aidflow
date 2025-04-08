import json

import frappe
from frappe import _
from frappe.utils import flt


no_cache = 1


def get_context(context):
	
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if not frappe.session.user=='Guest' and not frappe.db.exists({"doctype": "Interest", "user": frappe.session.user}):
		frappe.msgprint('Create Interests Profile')
		frappe.local.flags.redirect_location = "/Interests"
		raise frappe.Redirect
	context.csfr_token=frappe.sessions.get_csrf_token()
	context.user=frappe.session.user
	


@frappe.whitelist()
def upload_issue(description,title,thematic,province,otherspecify):
	print(description,title,thematic,province)
	doc=frappe.new_doc("Project")
	doc.province=province
	doc.thermatic_area=thematic
	doc.project_title=title
	doc.project_description=description
	doc.otherspecify=otherspecify
	doc.save(ignore_permissions=True)
	
