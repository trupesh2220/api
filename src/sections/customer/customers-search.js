import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const CustomersSearch = ({ setAllTypesValue }) => {
const changeValue =(e)=>{
setAllTypesValue(e.target.value)
}
  return (
  <>
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        onChange={changeValue}
        fullWidth
        placeholder="Search customer"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 1000 }}
      />
    </Card>
  </>)
};
