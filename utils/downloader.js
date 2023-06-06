export const downloader = async (url) => {
  const response = await fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
  const jsonData = await response.json();
  return jsonData
}