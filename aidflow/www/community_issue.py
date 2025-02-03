import json
import frappe
from frappe import _



no_cache = 1
expected_keys = (
	"name",
)


def get_context(context):
	context.no_cache = 1
	# # all these keys exist in form_dict
	if not (set(expected_keys) - set(list(frappe.form_dict))):
		for key in expected_keys:
			context[key] = frappe.form_dict[key]
		print(context['name'])
		context=setup_context(context)
	else:
		frappe.redirect_to_message(
			_("Some information is missing"),
			_("Looks like someone sent you to an incomplete URL. Please ask them to look into it."),
		)
		frappe.local.flags.redirect_location = frappe.local.response.location
		raise frappe.Redirect
	
def setup_context(context):
	org=frappe.get_doc('Project', context['name'])
	context['org']=org
	print(org.name)
	return context