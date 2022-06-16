frappe.ui.form.on('Sales Invoice', {
	refresh(frm) {
		frm.add_custom_button(__("VEP Plans"), function(){
			if (typeof cur_frm.doc.customer === 'undefined' || cur_frm.doc.customer === null)
				return;

		   setTimeout(() => {
		       let found = false;
               window.uu = (p) => {
                    frappe.confirm(
                        __('Apply this corporate plan?'),
                        function(){
                            frappe.db.insert({
                                doctype: 'Visioncare Plan Usage',
                                member: cur_frm.doc.customer,
                                subscription_plan: p,
                                usage_date: cur_frm.doc.usage_date
                                
                            }).then(doc => {
                                console.log(doc);
                            });
                            $(".modal").modal("hide");
                        },
                        function(){
                            //show_alert('Thanks for continue here!');
                        }
                    );
                };
		       frappe.call({
		          "method": 'optic_store.api.vision_care_plan.query_visioncare_usage',
		          "args": {
		              doctype: "Visioncare Plan Usage",
		              txt: '',
		              searchfield: "",
		              start: 0,
		              page_len: 10,
		              filters: {'plan_member':cur_frm.doc.customer},
		          },
		          "callback": function(response) {
		              let subs = response.message.map( (r) => {
		                  let b=1;
		                  return(
		              `<tr>
		                <td>${r[0]}</td>
		                <td>${r[2]}</td>
		                <td>${r[3]}</td>
		                <td>${(r[4]==="Not Used") ? `<button type='button' id='useplan' onclick= \"window.uu(\'${r[0]}\')\">Use</button>` : r[4]}</td>
		                </tr>`);
		              }
		              );
		                    if (subs && !found) {
		                     found = true;
		                     //console.log(subs);
		                     let template=
		                     `<div class="table-responsive">
		                        <table class="table table-hover">
		                            <thead class="thead-light">
		                                <tr>
		                                    <th scope="col">Subscription Name</th>
		                                    <th scope="col">Company Name</th>
		                                    <th scope="col">Plan Name</th>
		                                    <th scope="col">Usage Date & Time</th>
		                                </tr>
		                            </thead>
		                            <tbody>
		                                {{sub}}
		                            </tbody>
		                        </table>
		                     </div>`;
		                     let a = new frappe.ui.Dialog ({
                    		        title: __('Subscribed VEP Plans'),
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

