frappe.ui.form.on('Customer',  {
	refresh: function(frm) {
	    frm.add_custom_button(__("VEP Plans"), function() {
	        setTimeout(() => {
	           let found = false;
	           frappe.call({   
            "method": 'optic_store.api.vision_care_plan.query_visioncare_usage',
            "args": {
                doctype: "Visioncare Plan Usage",
                txt: '',
                searchfield: "",
                start: 0,
                page_len: 10,
                filters: {'plan_member' : cur_frm.doc.name},
                //'fieldname': ['plan_name']            
            },
            "callback": function(response) {
                let subs = response.message.map( (r) => 
                `<tr>
                    <td>${r[0]}</td>
                    <td>${r[2]}</td>
                    <td>${r[1]}</td>
                    <td>${r[4]}</td>
                <tr>`
                );
                    if (subs && !found) {
                    found = true;
                    let template=
                    `<div class="table-responsive">
                        <table class="table table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">${__('Subscription Name')}</th>
                                        <th scope="col">${__('Company Name')}</th>
                                        <th scope="col">${__('Plan Name')}</th>
                                        <th scope="col">${__('Usage Date & Time')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {{sub}}
                                </tbody>
                        </table>
                    </div>`
                    let a = new frappe.ui.Dialog ({
                    		        title: __('Currently Subscribed Plans'),
                    		        fields: [
                    		                    {
                    		                        label: __('Currently Subscribed Plans'),
                    		                        fieldname: 'plans_subscribed_html',
                    		                        fieldtype: 'HTML',
                    		                    }
                    		                ],
                    		    });
                    $(a.fields_dict.plans_subscribed_html.wrapper).html(frappe.render(template, {sub:subs.join(' ')}));
		    a.$wrapper.find('.modal-dialog').css("max-width", "50%");
                    a.show();
                    }
            },
            "error": function(err) {
            }
        }); 
	        },500);
	    });
	}
});

