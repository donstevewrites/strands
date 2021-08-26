window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const productsTable = document.getElementById('productsTable');
    const ordersTable = document.getElementById('ordersTable');
    const customersTable = document.getElementById('customersTable');

    if (productsTable) {
        new simpleDatatables.DataTable(productsTable);
    }
    if (ordersTable) {
        new simpleDatatables.DataTable(ordersTable,{
            searchable: false,
            sortable: false,
            perPageSelect: false,
            fixedHeight: true
        });
    }
    if (customersTable) {
        new simpleDatatables.DataTable(customersTable);
    }
});
