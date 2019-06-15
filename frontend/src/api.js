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
  return axios.post(API_URL, serialize(fractal));
}

/**
 * Retrieve a single fractal.
 * @param {string} key
 * @returns {Promise}
 */
export function get(key) {
  const endpoint = url.resolve(API_URL, key);
  return axios.get(endpoint, {
    transformResponse: data => {
      return deserialize(JSON.parse(data));
    }
  });
}

/**
 * Retrieve all fractals (paginated).
 * @returns {Promise}
 */
export async function list(sort, offset, limit = 6) {
  return axios.get(API_URL, {
    params: { sort, offset, limit },
    transformResponse: data => {
      const json = JSON.parse(data);
      return { ...json, items: json.items.map(deserialize) };
    }
  });
}

function serialize(fractal) {
  return { ...fractal, body: JSON.stringify(fractal.body) };
}

function deserialize(fractal) {
  return { ...fractal, body: JSON.parse(fractal.body) };
}
