document.addEventListener("DOMContentLoaded", () => {
    const tableContainer = document.querySelector("#tanks-container");
    const errorMessage = document.getElementById("error-message");

    // Функция для получения данных с сервера
    async function fetchTankData() {
        try {
            const response = await fetch("http://localhost:3000/home");
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            populateTable(data);
        } catch (error) {
            errorMessage.textContent = `Не удалось загрузить данные: ${error.message}`;
        }
    }

    // Функция для добавления данных в контейнер
    function populateTable(data) {
        // Добавляем заголовки таблицы
        const headers = ["Название танка", "Ширина, мм", "Длина, мм", "Высота, мм", "Скорость, км/ч", "Вооружение"];
        headers.forEach(header => {
            const headerCell = document.createElement("div");
            headerCell.textContent = header;
            headerCell.classList.add("table-cell", "table-header");
            tableContainer.appendChild(headerCell);
        });

        // Добавляем строки данных
        Object.values(data).forEach(tank => {
            const tankData = [tank.name, tank.width, tank.length, tank.height, tank.speed, tank.gun];
            tankData.forEach(cellData => {
                const cell = document.createElement("div");
                cell.textContent = cellData;
                cell.classList.add("table-cell");
                tableContainer.appendChild(cell);
            });
        });
    }

    // Вызов функции для получения данных
    fetchTankData();
});
