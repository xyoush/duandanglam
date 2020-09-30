import Grid from '@material-ui/core/Grid';
import { Add, Delete, Edit } from '@material-ui/icons';
import MaterialTable from "material-table";
import React, { useState } from 'react';

function Quanlykhachhang() {
  const [data, setData] = useState([
    {index: '1', id: 'PK01238', email: 'hodinhan10@gmail.com', password: '123456789', birthYear:'2000', status:1,position:1 },
  ]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = React.createRef();
  const [filtering, setFiltering] = React.useState(false);
  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable
            title="Quản lý nhân viên"
            columns={[
              {
                title: 'STT', align: 'left', field: 'index', width: "1%", sorting: false,
                render: rowData => rowData.tableData.id + 1
              },
              {title: 'MSNV', field: 'id', align: 'left', width: "1%", disableClick: 'false'},
              {title: 'Email', field: 'email', align: 'left',},
              {title: 'Mật khẩu', field: 'password', align: 'left',},
              {title: 'Họ và tên', field: 'name', align: 'left', initialEditValue: 'nhập tên bạn ơi',},
              {title: 'Năm sinh', field: 'birthYear', type: 'numeric', align: 'left',},
              {title: 'Trạng thái', field: 'status',
                lookup: { 1: 'Hoạt động', 2: 'Không hoạt động' }, align: 'left',
              },
              {title: 'Chức vụ', field: 'position',
                lookup: { 1: 'Quản trị', 2: 'Quản lý', 3: 'Nhân viên', 4: 'công tác viên' },
                align: 'left',}
            ]}
            data={[
              {index: '1', id: 'PK01238', email: 'hodinhan10@gmail.com', password: '123456789', birthYear:'2000', status:1,position:1 },
              {index: '2', id: 'PK01177', email: 'manhcdpk01177@gmail.com', password: '741258963', birthYear:'2000', status:1,position:1 },
              {index: '3', id: 'PK01284', email: 'hunglnt@gmail.com', password: '369852147', birthYear:'2000', status:1,position:1 },

          ]}
            tableRef={tableRef}
            onRowClick={(evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            }
            options={{
              headerStyle: {
                // backgroundColor: "blue",
                color: 'red'
              },
              rowStyle: rowData => ({
                backgroundColor:
                  selectedRow === rowData.tableData.id ? "#EEE" : "#FFF"
              }),
              filtering,
              exportButton: true,
              selection: true,
              actionsColumnIndex: -1, // dịch chuyển Action sang bên phải
            }}
            icons={{
              Add: () => <Add />,
              Edit: () => <Edit />
            }}
            actions={[
              {
                icon: () => <Delete />,
                isFreeAction: false,
                tooltip: "Xóa nhiều hàng",
              },
              {
                icon: 'filter_list',
                tooltip: 'Bộ lọc',
                isFreeAction: true,
                onClick: () => setFiltering(currentFilter => !currentFilter)
              }
            ]}// reject
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
                    resolve();
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    resolve()
                  }, 1000)
                }),
            }}
            localization={{// thay đổi tên khi rơ chuột vào và tên các thuộc tính
              body: {
                emptyDataSourceMessage: "Không có dòng nào để hiển thị",
                addTooltip: 'Thêm',
                deleteTooltip: 'Xóa',
                editTooltip: 'Chỉnh sửa',
                filterRow: {
                  filterTooltip: 'bộ lọc'
                },
                editRow: {
                  deleteText: 'Bạn có muốn xóa dòng này không?',
                  cancelTooltip: 'Hủy bỏ',
                  saveTooltip: 'Lưu lại'
                }
              },
              grouping: {
                placeholder: "Kéo tiền đề ...",
                groupedBy: 'Nhóm theo:'
              },
              header: {
                actions: 'Cộng cụ'
              },
              pagination: {
                labelDisplayedRows: '{from}-{to} của {count}',
                labelRowsSelect: 'Dòng',
                labelRowsPerPage: 'dòng mỗi trang:',
                firstAriaLabel: 'Trang đầu tiên',
                firstTooltip: 'Trang đầu tiên',
                previousAriaLabel: 'Trang trước',
                previousTooltip: 'Trang trước',
                nextAriaLabel: 'Trang tiếp theo',
                nextTooltip: 'Trang tiếp theo',
                lastAriaLabel: 'Trang cuối',
                lastTooltip: 'Trang cuối'
              },
              toolbar: {
                addRemoveColumns: 'Thêm hoặc xóa cột',
                nRowsSelected: '{0} dòng đã chọn',
                showColumnsTitle: 'Xem các cột',
                showColumnsAriaLabel: 'Xem các cột',
                exportTitle: 'Xuất file',
                exportAriaLabel: 'Xuất file',
                exportName: 'đây là gì',
                searchTooltip: 'Tìm kiếm',
                searchPlaceholder: 'Tìm kiếm',
                exportCSVName: "Xuất file Excel",
                exportPDFName: "Xuất file PDF",
              }
            }
          }
          />
        </Grid>
      </Grid>
    </div>
  )
}
export default Quanlykhachhang;