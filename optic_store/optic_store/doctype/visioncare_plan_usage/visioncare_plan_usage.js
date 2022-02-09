// Copyright (c) 2021, 9T9IT and contributors
// For license information, please see license.txt


frappe.ui.form.on('Visioncare Plan Usage', {
	setup: function(frm) {
		frm.set_query('subscription_plan', function() {
		return {
        		query: 'optic_store.api.vision_care_plan.query_visioncare_plans',
			filters: { 'plan_member' : frm.doc.member }
      };
    });
	}
	// refresh: function(frm) {

	// }
});

