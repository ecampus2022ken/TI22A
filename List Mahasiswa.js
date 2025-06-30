const spreadsheetBaseURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSF9TWkmTXExnVqMZdYWpinAIFXsj0FMPymhk6rMhh64uFxmZm-uVwFY90G3HFupRcwT2ofw9s76Ike/pubhtml";
const sheetGID = "1761069019"; // Ganti sesuai sheet yang diinginkan
const selectedColumns = [0, 1, 2, 3, 4];

async function fetchSpreadsheet() {
    try {
        const cacheBuster = new Date().getTime(); // Tambahkan timestamp untuk menghindari cache
        const response = await fetch(`${spreadsheetBaseURL}?gid=${sheetGID}&single=true&nocache=${cacheBuster}`);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const table = doc.querySelector("table");

        if (!table) {
            console.error("Tabel tidak ditemukan!");
            return;
        }

        const dataContainer = document.getElementById("mahasiswa-container"); //harus disamakan dengan container pada html
        dataContainer.innerHTML = ""; // Bersihkan container sebelum menambahkan data baru

        const rows = table.querySelectorAll("tr");
        const newTable = document.createElement("table");
        newTable.border = "1";
        newTable.style.borderCollapse = "collapse";
        newTable.style.width = "100%";

        rows.forEach((row, rowIndex) => {
            if (rowIndex < 2) return; // Sembunyikan 2 baris pertama
            const cells = row.querySelectorAll("td");
            const tr = document.createElement("tr");

            selectedColumns.forEach(index => {
                if (cells[index]) {
                    const td = document.createElement("td");
                    td.innerHTML = cells[index].innerHTML;
                    td.style.padding = "8px";
                    td.style.border = "1px solid #ccc";
                    tr.appendChild(td);
                }
            });

            newTable.appendChild(tr);
        });

        dataContainer.appendChild(newTable);

    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

fetchSpreadsheet();