export const RX_PARAMS_SPEC_DIST = ['sph', 'cyl', 'axis', 'va'];
export const RX_PARAMS_CONT_DIST = [...RX_PARAMS_SPEC_DIST, 'bc', 'dia'];
export const RX_PARAMS_SPEC_READ = RX_PARAMS_SPEC_DIST.map(
  params => `${params}_reading`
);
export const RX_PARAMS_CONT_READ = RX_PARAMS_CONT_DIST.map(
  params => `${params}_reading`
);
export const RX_PARAMS_OTHER = ['pd', 'prism', 'iop', 'pd_near'];

export function get_all_rx_params() {
  const params = [
    ...RX_PARAMS_CONT_DIST,
    ...RX_PARAMS_CONT_READ,
    ...RX_PARAMS_OTHER,
    'add', 'add_va'
  ];
  return ['right', 'left']
    .map(side => params.map(param => `${param}_${side}`))
    .flat();
}

export function get_signed_fields() {
  const params = ['sph', 'cyl'];
  return ['right', 'left']
    .map(side =>
      [...params, ...params.map(p => `${p}_reading`), 'add'].map(
        p => `${p}_${side}`
      )
    )
    .flat();
}

export function get_prec2_fields() {
  const params = ['bc', 'dia', 'iop'];
  return ['right', 'left']
    .map(side =>
      [...params, ...params.map(p => `${p}_reading`)].map(p => `${p}_${side}`)
    )
    .flat();
}

export const SR_PARAMS_SPEC_DIST = ['sr_sph', 'sr_cyl', 'sr_axis', 'sr_va'];
export const SR_PARAMS_CONT_DIST = [...SR_PARAMS_SPEC_DIST, 'sr_bc', 'sr_dia'];
export const SR_PARAMS_OTHER = ['sr_pd', 'sr_prism', 'sr_iop'];

export function get_sr_all_params() {
  const params = [
    ...SR_PARAMS_CONT_DIST,
    ...SR_PARAMS_OTHER,
    'sr_add', 'sr_add_va'
  ];
  return ['right', 'left']
    .map(side => params.map(param => `${param}_${side}`))
    .flat();
}

export function get_sr_signed_fields() {
  const params = ['sr_sph', 'sr_cyl'];
  return ['right', 'left']
    .map(side =>
      [...params, 'sr_add'].map(
        p => `${p}_${side}`
      )
    )
    .flat();
}

export function get_sr_prec2_fields() {
  const params = ['sr_bc', 'sr_dia', 'sr_iop'];
  return ['right', 'left']
    .map(side =>
      [...params].map(p => `${p}_${side}`)
    )
    .flat();
}