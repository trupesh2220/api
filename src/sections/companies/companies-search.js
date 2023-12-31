import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const CompaniesSearch = ({setAllTypesValue}) => {
  const changeValue =(e)=>{
    setAllTypesValue(e.target.value)
  }
    return (
    <>
      <Card sx={{ p: 2 }}>
        <OutlinedInput
        onChange={changeValue}
          defaultValue="title"
          fullWidth
          placeholder="Search company"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </Card>
    </>
  );
};
