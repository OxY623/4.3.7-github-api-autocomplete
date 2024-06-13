//Модуль Search

export default class Search {
    constructor(view) {
        this.view = view;
        this.debouncedSearch = this.debounce(this.searchRepositories.bind(this), 300);
        this.view.input.addEventListener('keyup', this.debouncedSearch);
    }

    async searchRepositories() {
        const query = this.view.input.value.trim();
        if (!query) {
            this.view.displayResults([]);
            return;
        }
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
            if (response.ok) {
                const data = await response.json();
                this.view.displayResults(data.items.slice(0, 5));
            } else {
                throw new Error(`Ошибка ${response.status}`);
            }
        } catch (error) {
            this.view.displayError("Ошибка запроса!!! " + error.message);
        }
    }

    debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}
