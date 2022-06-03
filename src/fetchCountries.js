export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    const params = `?fields=name,capital,population,flags,languages`;
    
    return fetch(`${url}${name}${params}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json()
    });
}