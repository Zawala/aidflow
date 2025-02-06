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
	if not frappe.session.user=='Guest' and not frappe.db.exists({"doctype": "Interest", "user": frappe.session.user}):
		frappe.msgprint('Create Interests Profile')
		frappe.local.flags.redirect_location = "/Interests"
		raise frappe.Redirect
	context.csfr_token=frappe.sessions.get_csrf_token()
	# # all these keys exist in form_dict
	if not (set(expected_keys) - set(list(frappe.form_dict))):
		for key in expected_keys:
			context[key] = frappe.form_dict[key]
		context.user=frappe.session.user
	

@frappe.whitelist(allow_guest=True)
def custom_search(number=0,search=None, thematic_area=None, registration_type=None, province=None):
	print(search)
	length=int(number)+9
	posts=frappe.db.get_all('Project',
						or_filters={
								 "thermatic_area": ["like", "%{0}%".format(thematic_area)],
								 "province": ["like", "%{0}%".format(province)]
								 },
						filters={
							# "published": 1,
							"project_title": ["like", "%{0}%".format(search)],
			  					},	
						 fields=['Name','project_title', 'project_description', 'thermatic_area', 'thumbnail','_liked_by'],
						     as_list=True,
							   start=number,
								 page_length=length)	
	return posts
