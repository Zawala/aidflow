import json

import frappe
from frappe import _
from frappe.utils import flt





def get_context(context):
	context.no_cache = 1
	if not frappe.session.user=='Guest' and not frappe.db.exists({"doctype": "Interest", "user": frappe.session.user}):
		frappe.msgprint('Create Interests Profile')
		frappe.local.flags.redirect_location = "/Interests"
		raise frappe.Redirect