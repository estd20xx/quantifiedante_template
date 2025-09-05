// export function backendurl(date) {
//     return 'http://127.0.0.1:8000/'
// }
// export function frontendurl(date) {
//   return "http://127.0.0.1:3000/"
// }

// Testing main Blocked

// export function backendurl(date) {
//   return "https://qa-staging-api.quantifiedante.com/"
// }

// export function frontendurl(date) {
//   return "https://dashboard-staging.quantifiedante.com"
// }

// export function websiteurl(date) {
//   return "https://staging.quantifiedante.com/"
// }

// =============================For Production===================================

export function backendurl() {
  // const data = import.meta.env.REACT_APP_BACKENDURL
  const data = import.meta.env.VITE_APP_BACKENDURL

  return data
}

export function frontendurl() {
  // const data = import.meta.env.REACT_APP_FRONTENDURL
  const data = import.meta.env.VITE_APP_FRONTENDURL

  return data
}

export function websiteurl() {
  // const data = import.meta.env.REACT_APP_WEBSITEURL
  const data = import.meta.env.VITE_APP_WEBSITEURL

  return data
}
export function adminURL() {
  // const data = import.meta.env.REACT_APP_WEBSITEURL
  const data = import.meta.env.VITE_APP_ADMINPANEL

  return data
}

// =======================================================================================

// sudo systemctl restart quantifiedante
// sudo systemctl reload nginx
// sudo systemctl restart nginx
// sudo systemctl enable celery
// sudo systemctl restart celery
// sudo systemctl restart celery_beat

// ZrYF3afLWzOgW7rRmOQsIxC5XS8PPaJhm1fZTHXq5GzN
// 3YBbz_3_Pfv5oALBcu2iIKO7vSm6fCA
