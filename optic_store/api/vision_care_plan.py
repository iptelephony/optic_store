# -*- coding: utf-8 -*-
# Copyright (c) 2022,Jireh Group 
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.desk.reportview import get_filters_cond
from toolz import compose


@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def query_visioncare_plans(doctype, txt, searchfield, start, page_len, filters):
    query = """
        SELECT b.name, b.company_name, b.plan_name
        FROM `tabVisioncare Plan Member` JOIN `tabVisioncare Plan Subscription` b on `tabVisioncare Plan Member`.parent = b.name
        WHERE
            b.docstatus = 0
            {fcond}
        ORDER BY
            IF(LOCATE(%(_txt)s, b.name), LOCATE(%(_txt)s, b.name), 99999),
            b.valid_through DESC
        LIMIT %(start)s, %(page_len)s            
    """.format(
        key=searchfield, fcond=get_filters_cond('Visioncare Plan Member', filters, [])
    )
    return frappe.db.sql(query, 
        values={
            "txt": "%%%s%%" % txt,
            "_txt": txt.replace("%", ""),
            "start": start,
            "page_len": page_len,
        },
    )





@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def query_visioncare_usage(doctype, txt, searchfield, start, page_len, filters):
    query = """
        SELECT b.name, b.plan_name, b.company_name, IFNULL(s.name, "Not Used"), IFNULL(s.usage_date, "Not Used")
        FROM `tabVisioncare Plan Member` 
        LEFT JOIN `tabVisioncare Plan Subscription` b
        ON `tabVisioncare Plan Member`.parent = b.name
        LEFT JOIN `tabVisioncare Plan Usage` s
        ON s.subscription_plan = b.name
        WHERE 
            b.docstatus = 0
            {fcond}
        ORDER BY
            IF(LOCATE(%(_txt)s, b.name), LOCATE(%(_txt)s, b.name), 99999),
            b.valid_through DESC
        LIMIT %(start)s, %(page_len)s
    """.format(
        key=searchfield, fcond=get_filters_cond('Visioncare Plan Member', filters, [])
    )

    print(query)
    return frappe.db.sql(query,
        values={
            "txt": "%%%s%%" % txt,
            "_txt": txt.replace("%", ""),
            "start": start,
            "page_len": page_len,
        },
    )

