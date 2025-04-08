import json
import frappe
from frappe import _
import ast



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
	print(org._liked_by)
	if org._liked_by and org._liked_by != "[]":
		try:
			liked_by = ast.literal_eval(org._liked_by)
			org.liked_by = len(liked_by) if liked_by else 0
		except (ValueError, SyntaxError):
			org.liked_by = 0
	else:
		org.liked_by = 0
	context['org']=org
	context.progress_float=int(((len(org.progress)/7)*100))
	return context