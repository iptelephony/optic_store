# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__

app_name = "optic_store"
app_version = __version__
app_title = "Optic Store"
app_publisher = "9T9IT"
app_description = "ERPNext App for Optical Store"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@9t9it.com"
app_license = "MIT"

error_report_email = "support@9t9it.com"

fixtures = [
]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/optic_store/css/optic_store.css"
app_include_js = "/assets/js/optic_store.min.js"

# include js, css files in header of web template
# web_include_css = "/assets/optic_store/css/optic_store.css"
# web_include_js = "/assets/optic_store/js/optic_store.js"

# include js in page
#page_js = {"pos": "public/js/pos.js", "point-of-sale": "public/js/point_of_sale.js"}

doctype_js = { "Sales Invoice" : "public/js/vep_sales_invoice.js", "Customer" : "public/js/vep_customer.js"}

# include js in doctype views
#doctype_js = {
#    "Sales Order": "public/js/transaction_controller.js",
#    "Sales Invoice": "public/js/transaction_controller.js",
#    "Delivery Note": "public/js/transaction_controller.js",
#}
#doctype_list_js = {
#    "Sales Invoice": "public/js/sales_invoice_list.js",
#    "Stock Entry": "public/js/stock_entry_list.js",
#}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "optic_store.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "optic_store.install.before_install"
# after_install = "optic_store.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "optic_store.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

#doc_events = {
#    "Delivery Note": {
#        "validate": "optic_store.doc_events.delivery_note.validate",
#        "on_submit": "optic_store.doc_events.delivery_note.on_submit",
#    },
#    "Purchase Receipt": {
#        "before_save": "optic_store.doc_events.purchase_receipt.before_validate",
#        "validate": "optic_store.doc_events.purchase_receipt.validate",
#        "on_submit": "optic_store.doc_events.purchase_receipt.set_batch_references",
#    },
#    "Sales Order": {
#        "before_naming": "optic_store.doc_events.sales_order.before_naming",
#        "validate": "optic_store.doc_events.sales_order.validate",
#        "before_insert": "optic_store.doc_events.sales_order.before_insert",
#        "before_save": "optic_store.doc_events.sales_order.before_save",
#        "before_submit": "optic_store.doc_events.sales_order.before_submit",
#        "on_update": "optic_store.doc_events.sales_order.on_update",
#        "before_cancel": "optic_store.doc_events.sales_order.before_cancel",
#    },
#    "Customer": {
#        "before_insert": "optic_store.doc_events.customer.before_insert",
#        "before_save": "optic_store.doc_events.customer.before_save",
#    },
#    "Item": {
#        "before_naming": "optic_store.doc_events.item.before_naming",
#        "autoname": "optic_store.doc_events.item.autoname",
#        "validate": "optic_store.doc_events.item.validate",
#        "after_insert": "optic_store.doc_events.item.after_insert",
#        "before_save": "optic_store.doc_events.item.before_save",
#    },
#    "Serial No": {
#        "after_insert": "optic_store.doc_events.serial_no.after_insert",
#        "on_trash": "optic_store.doc_events.serial_no.on_trash",
#    },
#    "Sales Invoice": {
#        "before_naming": "optic_store.doc_events.sales_invoice.before_naming",
#        "validate": "optic_store.doc_events.sales_invoice.validate",
#        "before_insert": "optic_store.doc_events.sales_invoice.before_insert",
#        "before_save": "optic_store.doc_events.sales_invoice.before_save",
#        "before_submit": "optic_store.doc_events.sales_invoice.before_submit",
#        "on_submit": "optic_store.doc_events.sales_invoice.on_submit",
#        "on_update_after_submit": "optic_store.doc_events.sales_invoice.on_update_after_submit",  # noqa
#        "before_cancel": "optic_store.doc_events.sales_invoice.before_cancel",
#        "on_cancel": "optic_store.doc_events.sales_invoice.on_cancel",
#    },
#    "Payment Entry": {
#        "validate": "optic_store.doc_events.payment_entry.validate",
#        "before_insert": "optic_store.doc_events.payment_entry.before_insert",
#        "before_save": "optic_store.doc_events.payment_entry.before_save",
#        "on_submit": "optic_store.doc_events.payment_entry.on_submit",
#        "on_cancel": "optic_store.doc_events.payment_entry.on_cancel",
#    },
#    "Journal Entry": {"on_cancel": "optic_store.doc_events.journal_entry.on_cancel"},
#    "*": {
#        "after_insert": "optic_store.api.sms.process",
#        "on_update": "optic_store.api.sms.process",
#        "on_submit": "optic_store.api.sms.process",
#        "on_update_after_submit": "optic_store.api.sms.process",
#        "on_cancel": "optic_store.api.sms.process",
#    },
#}

# Scheduled Tasks
# ---------------

scheduler_events = {
    # "all": ["optic_store.tasks.all"],
 #   "daily": [
 #       "optic_store.api.gift_card.write_off_expired_gift_cards",
 #       "optic_store.api.email_alerts.process",
 #       "optic_store.api.sales_invoice.write_off_expired_credit_notes",
 #   ],
    # "hourly": ["optic_store.tasks.hourly"],
    # "weekly": ["optic_store.tasks.weekly"],
    # "monthly": ["optic_store.tasks.monthly"],
}

# Testing
# -------

#before_tests = "optic_store.api.install.setup_defaults"

# Overriding Whitelisted Methods
# ------------------------------

override_whitelisted_methods = {
#    "erpnext.accounts.doctype.sales_invoice.pos.get_pos_data": "optic_store.api.pos.get_pos_data",  # noqa
#    "erpnext.accounts.doctype.sales_invoice.pos.make_invoice": "optic_store.api.pos.make_invoice",  # noqa
#    "erpnext.selling.page.point_of_sale.point_of_sale.search_serial_or_batch_or_barcode_number": "optic_store.api.sales_invoice.search_serial_or_batch_or_barcode_number",  # noqa
#    "erpnext.selling.page.point_of_sale.point_of_sale.get_items": "optic_store.api.pos.get_items",  # noqa
#    # TODO: when PR #18111 is merged
#    "erpnext.accounts.doctype.loyalty_program.loyalty_program.get_loyalty_program_details": "optic_store.api.pos.get_loyalty_program_details",  # noqa
#    "erpnext.stock.get_item_details.get_item_details": "optic_store.api.item.get_item_details",  # noqa
}

# Jinja Environment Customizations
# --------------------------------

jenv = {
#    "methods": [
#        "get_optical_items:optic_store.utils.helpers.get_optical_items",
#        "get_amounts:optic_store.utils.helpers.get_amounts",
#        "get_ref_so_date:optic_store.api.sales_invoice.get_ref_so_date",
#        "get_payments:optic_store.api.sales_invoice.get_payments",
#        "get_salary_component_by_type:optic_store.api.leave_application.get_salary_component_by_type",  # noqa
#        "get_leave_balance:optic_store.api.leave_application.get_leave_balance",
#        "get_salary_slips_from_payroll_entry:optic_store.api.salary_slip.get_salary_slip_docs_from_payroll_entry",  # noqa
#        "get_credit_notes:optic_store.api.sales_invoice.get_credit_notes",
#        "get_loyalty_points:optic_store.api.loyalty_program.get_loyalty_points"
#    ]
}
