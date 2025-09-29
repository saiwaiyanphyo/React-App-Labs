const rootURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='
const api_key = '6MTFPQN7B4UZA7J0'; // Insert your API key here

export default function fetchStockData(code: string): Promise<any> { // Assuming the JSON structure is unknown, use 'any'
  const url = `${rootURL}${code}&apikey=${api_key}`;

  return fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      // console.log(text);
      const json = JSON.parse(text);
      // console.log(json);
      return json;
    });
}