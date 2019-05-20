import axios from 'axios';

const url = 'https://api.fractal.parts/fractals';

/**
 * Publish a new fractal.
 * @param {string} title
 * @param {Template} template
 */
export function create(title, template) {
  const { shapes } = template;
  return axios.post(url, { title, body: { shapes } });
}

export async function get(key) {
  return axios.get(`${url}/${key}`);
}

export async function list() {
  return axios.get(url);
}
