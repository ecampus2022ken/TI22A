const spreadsheetBaseURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSF9TWkmTXExnVqMZdYWpinAIFXsj0FMPymhk6rMhh64uFxmZm-uVwFY90G3HFupRcwT2ofw9s76Ike/pubhtml";
const sheetGID = "1956106230"; // Ganti sesuai sheet yang diinginkan
const selectedColumns = [1, 4, 2, 3, 5]; // Indeks kolom yang ingin ditampilkan (mulai dari 0)

async function fetchSpreadsheet() {
    try {
        const cacheBuster = new Date().getTime(); // Tambahkan timestamp untuk menghindari cache
        const response = await fetch(`${spreadsheetBaseURL}?nocache=${cacheBuster}`);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const table = doc.querySelector("table");

        if (!table) {
            console.error("Tabel tidak ditemukan!");
            return;
        }

        const dataContainer = document.getElementById("uas-container"); //harus disamakan dengan container pada html
        dataContainer.innerHTML = ""; // Bersihkan container sebelum menambahkan data baru
        const rows = table.querySelectorAll("tr");

        rows.forEach((row, rowIndex) => {
            if (rowIndex < 3) return; // Sembunyikan 2 baris pertama
            let cells = row.querySelectorAll("td");
            let card = document.createElement("div");
            card.classList.add("card");

            selectedColumns.forEach(index => {
                if (cells[index]) {
                    let p = document.createElement("p");
                    p.innerHTML = cells[index].innerHTML;
                    card.appendChild(p);
                }
            });
            dataContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

fetchSpreadsheet();
