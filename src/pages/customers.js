import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Modal, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import axios from "axios";
import BasicModal from "src/Model/ModelPopup";
import { node } from "prop-types";

const now = new Date();

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [PageValue, setPageVale] = useState();
  const [data, setData] = useState([]);
  const [allTypesValue, setAllTypesValue] = useState("");
  const [showAllDataWithValue, setShowAllDataWithValue] = useState(false);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState();
  const [deleteData, setDeleteData] = useState('')
  const [pageNo, setPageNo] = useState({pageOne:Number,pageSecond:Number})
  useEffect(() => {
    mainData();
    callApi()
  }, []);

  useEffect(() => {
    mainData();
    callApi()
  }, [PageValue, allTypesValue,deleteData]);

 const  mainData = () => {
    if (allTypesValue === "") {
      axios
        .get(`http://localhost:8000/data?&_page=${PageValue}&_limit=${10}`)
        .then((result) => {
          setData(result.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
    axios
      .get(`http://localhost:8000/data?name=${allTypesValue}&_page=${PageValue}&_limit=${10}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
    } 
  };

  const  callApi = () => {
      if (allTypesValue === '') {
        axios
        .get(`http://localhost:8000/data`)
        .then((result) => {
          setPageNo({pageOne:result.data.length});
        })
        .catch((err) => {
          console.error(err);
        });
      }else {
        axios
          .get(`http://localhost:8000/data?name=${allTypesValue}`)
          .then((result) => {
            setPageNo({pageSecond:result.data.length});
          })
          .catch((err) => {
            console.error(err);
          });
        } 
     
  };
  


  function handlePagination(event, pageNumber) {
    setUpdateUrl(pageNumber);
  }

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Customers | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Customers</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>

              <BasicModal />
            </Stack>
            <CustomersSearch setAllTypesValue={setAllTypesValue} />
            <CustomersTable
              //count={data.length}
              items={data}
              allTypesValue={allTypesValue}
              // onDeselectAll={customersSelection.handleDeselectAll}
              // onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              setRowsPerPageOptions={setRowsPerPageOptions}
              setPageVale={setPageVale}
              setDeleteData={setDeleteData}
              pageNo={pageNo}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
