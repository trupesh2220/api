import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CompanyCard } from "src/sections/companies/company-card";
import { CompaniesSearch } from "src/sections/companies/companies-search";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "src/Model/NewFormForModelPopup";

function Page() {
  const [companies, setCompanies] = useState([]);
  const [updateUrl, setUpdateUrl] = useState(1);
  const [allTypesValue, setAllTypesValue] = useState();
  useEffect(() => {
    mainData();
  }, []);
  useEffect(() => {
    mainData();
  }, [updateUrl]);

  console.log(allTypesValue);

  const mainData = async () => {
    const url = new URL("https://645f54b29d35038e2d210e74.mockapi.io/companies");
    url.searchParams.append("completed", false);
    url.searchParams.append("page", updateUrl);
    url.searchParams.append("limit", 6);

    const res = await fetch (url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    setCompanies(data);
  };
  function handlePagination(event, pageNumber) {
    setUpdateUrl(pageNumber);
  }
  return (
    <>
    
      <Head>
        <title>Companies | Devias Kit</title>
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
                <Typography variant="h4">Companies</Typography>
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
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CompaniesSearch setAllTypesValue={setAllTypesValue} />
            <Grid container spacing={3}>
              {companies
                ?.filter((data) => {
                  if (allTypesValue === undefined) {
                    return data;
                  } else {
                    return data.title.includes(allTypesValue);
                  }
                })
                ?.map((company) => (
                  <Grid xs={12} md={6} lg={4} key={company.id}>
                    <CompanyCard company={company} />
                  </Grid>
                ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={7} size="large" onChange={handlePagination} />
            </Box>
          </Stack>
        </Container>
      </Box>

    </>
  );
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
