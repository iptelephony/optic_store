import Vue from 'vue/dist/vue.js';

import PrescriptionForm from '../components/PrescriptionForm.vue';
import { get_all_rx_params } from '../utils/constants';
import { format } from '../utils/format';

function enable_sph_reading(side) {
  const field = `sph_reading_${side}`;
  return function(frm) {
    frm.toggle_enable(field, frm.doc[`add_type_${side}`] === '');
  };
}

function handle_add_sph(side) {
  const field = `sph_reading_${side}`;
  return function(frm) {
    const fval =
      parseFloat(frm.doc[`sph_${side}`] || 0) +
      parseFloat(frm.doc[`add_${side}`] || 0);
    frm.set_value(field, format(field, fval));
  };
}

function toggle_detail_entry(frm, state) {
  frm.toggle_display('details_simple_sec', !state);
  frm.toggle_display(['details_sec', 'pd_sec', 'prism_sec', 'iop_sec'], state);
}

function calc_total_pd(frm) {
  const { pd_right = 0, pd_left = 0 } = frm.doc;
  frm.set_value('pd_total', parseFloat(pd_right) + parseFloat(pd_left));
}

function update_fields(frm) {
  function scrub(field, value) {
    if (['sph', 'cyl', 'add'].find(p => field.includes(p))) {
      return /^(\+|-)?\d*\.?\d{0,2}$/.test(value) ? value : frm.doc[field];
    }
    // if (field.includes('axis')) {
    //   return value < 0 ? 0 : Math.min(value, 180);
    // }
    if (field.includes('va')) {
      return /^\d*\/?\d*$/.test(value) ? value : frm.doc[field];
    }
    return value;
  }
  return function(field, value) {
    const scrubbed = scrub(field, value);
    console.log(scrubbed);
    frm.set_value(field, scrubbed);
    return scrubbed;
  };
}

function blur_fields(frm) {
  return function(field, value) {
    if (field.includes('sph') || field.includes('add')) {
      // considers cases where the user might just enter '+' or '-', hence the + '.0'
      const fval = parseFloat((value || '') + '.0');
      frm.set_value(field, format(field, fval));
    }
    if (field.includes('cyl')) {
      const fval = Math.round(parseFloat((value || '') + '.0') * 4) / 4;
      frm.set_value(field, format(field, fval));
    }
  };
}

function render_detail_vue(frm) {
  const { $wrapper } = frm.get_field('details_html');
  $wrapper.empty();
  if (frm.doc.__islocal) {
    // this makes the below fields reactive in vue
    frm.doc = Object.assign(
      frm.doc,
      get_all_rx_params().reduce(
        (a, x) => Object.assign(a, { [x]: undefined }),
        {}
      ),
      { pd_total: undefined }
    );
  }
  return new Vue({
    el: $wrapper.html('<div />').children()[0],
    data: { doc: frm.doc },
    render: function(h) {
      return h(PrescriptionForm, {
        props: {
          doc: this.doc,
          update: update_fields(frm),
          fields: frm.fields_dict,
          blur: blur_fields(frm),
        },
      });
    },
  });
}

function setup_route_back(frm) {
  if (frappe._from_link && frappe._from_link.frm) {
    const { doctype, docname } = frappe._from_link.frm;
    // disable native route back for save events. will handle submits by own
    frappe._from_link.frm = null;
    return ['Form', doctype, docname];
  }
  return null;
}

function set_expiry_date(frm) {
  frm.set_value(
    'expiry_date',
    frappe.datetime.add_months(frm.doc.test_date, 6)
  );
}

export default {
  setup: async function(frm) {
    const { message: settings = {} } = await frappe.db.get_value(
      'Optical Store Settings',
      null,
      'prescription_entry'
    );
    toggle_detail_entry(frm, settings.prescription_entry === 'ERPNext');
  },
  onload: function(frm) {
    enable_sph_reading(frm);
    frm.detail_vue = render_detail_vue(frm);
    frm.route_back = setup_route_back(frm);
  },
  refresh: function(frm) {
    frm.detail_vue.doc = frm.doc;
    if (frm.doc.__islocal) {
      set_expiry_date(frm);
    }
  },
  test_date: set_expiry_date,
  on_submit: async function(frm) {
    if (frm.route_back) {
      await frappe.set_route(frm.route_back);
      if (frappe._from_link_scrollY) {
        frappe.utils.scroll_to(frappe._from_link_scrollY);
      }
    }
  },
  sph_right: handle_add_sph('right'),
  sph_left: handle_add_sph('left'),
  add_right: function(frm) {
    handle_add_sph('right')(frm);
    frm.set_value('add_left', frm.doc.add_right);
  },
  add_left: handle_add_sph('left'),
  add_type_right: function(frm) {
    enable_sph_reading('right')(frm);
    frm.set_value('add_type_left', frm.doc.add_type_right);
  },
  add_type_left: enable_sph_reading('left'),
  pd_right: calc_total_pd,
  pd_left: calc_total_pd,
};
