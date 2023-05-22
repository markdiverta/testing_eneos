export default function ({ route, redirect, params }) {
  const path = route.path;
  const hash = route.hash;
  const query = route.query;
  if (path.slice(-1) !== '/' && path !== '/404') {
    if (hash) {
      redirect(301, path + '/' + hash);
    } else if (Object.keys(query).length) {
      const keys = Object.keys(query);
      const queries = [];
      for (const key of keys) {
        queries.push(`${key}=${query[key]}`);
      }
      redirect(301, `${path}/?${queries.join('&')}`);
    } else if (
      !route.path.match(/\.[a-z0-9]+$/i) && // Matches file extensions (e.g. .html, .css, .js)
      !route.fullPath.includes('?')
    ) {
      redirect(301, `${path}/`);
    }
  }
}
