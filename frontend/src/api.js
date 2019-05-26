import url from 'url';
import axios from 'axios';

export const API_URL = 'https://api.fractal.parts/fractals/';

/**
 * Publish a new fractal.
 * @param {string} title
 * @param {Template} template
 * @returns {Promise}
 */
export function create(title, template) {
  const { parent, children } = template;
  return axios.post(API_URL, { title, body: { parent, children } });
}

/**
 * Retrieve a single fractal.
 * @param {string} key
 * @returns {Promise}
 */
export function get(key) {
  const endpoint = url.resolve(API_URL, key);
  return axios.get(endpoint);
}

/**
 * Retrieve all fractals (paginated).
 * @returns {Promise}
 */
export function list(sort, offset, limit = 6) {
  return axios.get(API_URL, { params: { sort, offset, limit } });
}
