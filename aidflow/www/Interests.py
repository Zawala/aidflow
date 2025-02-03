import json

import frappe
from frappe import _
from frappe.utils import flt
import datetime


no_cache = 1
expected_keys = (
    "user",
    "hiv",
    "malaria",
    "tb",
    "ovc",
    "key_population",
    "lgbtiq",
    "emergencies",
    "mental_health",
    "climate_change",
    "economic_empowerment",
    "youth",
    "food_security",
    "ncds",
    "gender",
    "health_related_research",
    "health_information_systems",
    "health_advocacy",
    "disability",
    "drugs_and_substance_abuse",
    "srhr",
    "martenal_health",
    "women_rights",
    "child_rights"
)


def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
          
	context.csfr_token=frappe.sessions.get_csrf_token()
	if frappe.db.exists({"doctype": "Interest", "user": frappe.session.user}):
		frappe.local.flags.redirect_location = "/landing"
		raise frappe.Redirect
		
@frappe.whitelist()
def upload_interests():
    if frappe.request.method == 'POST':
        data = {}
        try:
            print(frappe.form_dict)
            for key in list(frappe.form_dict.keys()):
                if key in expected_keys:
                    data[key] = bool(frappe.form_dict[key])
            
            # Add the current user to the data
            data['user'] = frappe.session.user

            print("Parsed JSON Data:", data)

            # Create a new Interest document
            doc = frappe.get_doc({
                "doctype": "Interest",  # Specify the doctype
                **data  # Unpack the data dictionary as keyword arguments
            })
            doc.insert(ignore_permissions=True)  # Save the document

            return "Data received and saved successfully"
        except Exception as e:
            frappe.log_error(frappe.get_traceback(), "Interest Upload Error")
            frappe.throw(f"An error occurred: {str(e)}")

    else:
        return "Only POST requests are allowed"