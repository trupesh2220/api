import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    allTypesValue,
    setPageVale,
    setDeleteData,
    pageNo
  } = props;


  const selectedAll = items.length > 0 && selected.length === items.length;
  const selectedSome = selected.length > 0 && selected.length < items.length;

 

  const deleteDataFromList = (data) => {
    axios.delete(`http://localhost:8000/data/${data}`);
    setDeleteData(data)
  };

  const changePagination = (event, pageNumber) => {
    setPageVale(pageNumber);
  };

  return (
    <>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>createdAt</TableCell>
                  <TableCell>edit value</TableCell>
                  <TableCell>delete value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  // ?.filter((data) => {
                  //   if (allTypesValue === undefined) {
                  //     return data;
                  //   } else {
                  //     return data.name.includes(allTypesValue);
                  //   }
                  // })
                  .map((data) => {
                    const isSelected = selected.includes(data.id);
                    // const createdAt = format(data.createdAt, "dd/MM/yyyy");
                    return (
                      <TableRow hover key={data.id} selected={isSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                onSelectOne?.(data.id);
                              } else {
                                onDeselectOne?.(data.id);
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={data.avatar}>{getInitials(data.name)}</Avatar>
                            <Typography variant="subtitle2">{data.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>
                          {data.addressCity}, {data.addressState}, {data.addressCountry}
                        </TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data.createdAt.toString()}</TableCell>
                        <TableCell>
                          <Link href={`/edit/${data.id}`}>Edit</Link>
                        </TableCell>
                        <TableCell>
                          <Button type="button" onClick={() => deleteDataFromList(data.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        {pageNo.pageSecond}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        { <Pagination count={allTypesValue === ""?Math.ceil(pageNo.pageOne/10):Math.ceil(pageNo.pageSecond/10)} onChange={changePagination} color="secondary" hidden={pageNo.pageOne === 0 || pageNo.pageSecond === 0}/>}
        </div>
      </Card>
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
