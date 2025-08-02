export const fetchDataAndSaveToLocalStorage = (url, method, localStorageName) => {
    return fetch(url, { method })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка получения данных');
        }
        return response.json();
      })
      .then(data => {
        localStorage.setItem(localStorageName, JSON.stringify(data));
        console.log(`Данные успешно сохранены в localStorage с именем "${localStorageName}"`);
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  };