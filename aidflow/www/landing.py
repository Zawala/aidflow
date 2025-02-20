import json

import frappe
from frappe import _
from frappe.utils import flt



no_cache = 1

def get_context(context):
	
	if not frappe.session.user=='Guest' and not frappe.db.exists({"doctype": "Interest", "user": frappe.session.user}):
		frappe.msgprint('Create Interests Profile')
		frappe.local.flags.redirect_location = "/Interests"
		raise frappe.Redirect
	context.posts=custom_search()
	


def custom_search(start=0, page_length=3):
    ammended_posts=[]
    posts = frappe.db.get_all('Project',
                             fields=['Name', 'project_title', 'project_description', 'thermatic_area', 'thumbnail', '_liked_by'],
                             order_by='count(_liked_by) DESC',
                             limit_page_length=page_length,
                             as_list=True,
                             start=start)
    for post in posts:
        post=list(post)
        if post[5]:  # Check if _liked_by is not empty
            try:
                post[5] = len(json.loads(post[5])) # Convert JSON string to a list
            except json.JSONDecodeError:
                post[5] = 0  # If parsing fails, set it to an empty list
        else:
            post[5] = 0  # If _liked_by is empty, set it to an empty list
        ammended_posts.append(post)
    

    return ammended_posts
