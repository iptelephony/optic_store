// Copyright (c) 2021, 9T9IT and contributors
// For license information, please see license.txt

frappe.ui.form.on('Visioncare Plan Subscription', {
		setup: function(frm) {
		frm.set_query("customer", function() {
			return {
				filters: [
					["Customer","customer_type", "in", ["Company"]]
				]
			}
		});
		frm.set_query("vision_careplan", function() {
			return {
				filters: [
					["Visioncare Plan","disabled", "=", "0"]
				]
			}
		});
	},
	refresh: function(frm) {
		frm.fields_dict['members'].grid.get_field('plan_member').get_query = function(doc, cdt, cdn) {
        		return {
            			filters:[
                			['customer_type', '=', 'Individual']
            			]
        		}
    		}

	},
	valid_from: function(frm) {
		console.log(frm.doc.vision_careplan);
		frappe.db.get_value("Visioncare Plan", {"name": frm.doc.vision_careplan}, "plan_period", function(value) {
			var last_day =frappe.datetime.add_days(frappe.datetime.add_months(frm.doc.valid_from, value.valid_period),-1);
			frm.set_value("valid_through", last_day);
        	});
	}

});

function check(frm, cdt, cdn) {
	var rows = frm.doc.members.length;
	var max_rows = frm.doc.max_members;
	if (rows > max_rows) {
		msgprint('You can only add up to ' + max_rows + ' members');
		frm.doc.members.splice(max_rows,)
		frm.refresh_field('members')
	}
}

frappe.ui.form.on('Vision Care Plan Member', {
	members_add: check
});
