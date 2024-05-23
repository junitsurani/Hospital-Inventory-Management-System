import DataTable from "react-data-table-component";

function DataTable1(props) {
    return (
        <div>
            <DataTable
                columns={props.columns}
                data={props.data}
                pagination
                paginationRowsPerPageOptions={[10, 20, 50, 40, 50, 100]}
            />
        </div>
    );
}

export default DataTable1;
