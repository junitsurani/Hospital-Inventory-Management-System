import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    GridToolbarContainer,
    gridFilteredSortedRowIdsSelector,
    useGridApiContext,
} from "@mui/x-data-grid";

function MUIDataGrid(props) {
    function DataGridToolBar() {
        let apiRef = useGridApiContext();
        useEffect(() => {
            if (props.setApiRef) props.setApiRef(apiRef);
        }, []);
        return <GridToolbarContainer></GridToolbarContainer>;
    }

    return (
        <div className="h-auto w-[100%]">
            <DataGrid
                autoHeight
                rows={props.rows}
                columns={props.columns}
                slots={{ toolbar: DataGridToolBar }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 100 },
                    },
                }}
                pageSizeOptions={[25, 50, 100]}
            />
        </div>
    );
}

export default MUIDataGrid;
