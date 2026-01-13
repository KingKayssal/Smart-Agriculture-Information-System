export const validate = {
  required: (v) => v !== undefined && v !== null && String(v).trim().length > 0,
  email: (v) => /.+@.+\..+/.test(String(v).trim()),
  minLength: (v, n) => String(v).length >= n,
}
