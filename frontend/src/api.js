import url from 'url';
import axios from 'axios';

export const API_URL = 'https://api.fractal.parts/fractals/';

/**
 * Publish a new fractal.
 * @param {string} title
 * @param {Template} template
 * @returns {Promise}
 */
export function create(fractal) {
  const { title, body } = serialize(fractal);
  return axios.post(API_URL, { title, body });
}

/**
 * Retrieve a single fractal.
 * @param {string} key
 * @returns {Promise}
 */
export function get(key) {
  const endpoint = url.resolve(API_URL, key);
  return deserialize(axios.get(endpoint));
}

/**
 * Retrieve all fractals (paginated).
 * @returns {Promise}
 */
export function list(sort, offset, limit = 6) {
  const response = axios.get(API_URL, { params: { sort, offset, limit } });
  return { ...response, items: response.items.map(deserialize) };
}

function serialize(fractal) {
  return { ...fractal, body: JSON.stringify(fractal.body) };
}

function deserialize(fractal) {
  return { ...fractal, body: JSON.parse(fractal.body) };
}
