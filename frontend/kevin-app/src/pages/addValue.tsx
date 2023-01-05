import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';
// import TextField from '../components/addUserComponent';
// import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import AddUserComponent from '../components/addUserComponent';
import ShowUser from '../components/showUser';



export default function BasicSelect() {
  const [selectItem, setselectItem] = React.useState('');
  //const [name, setName] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setselectItem(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: ""
    }
  });


  return (
    <Grid>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectItem}
            label="Select"
            onChange={handleChange}
          //   MenuProps={{
          //     anchorOrigin: {
          //       vertical: "bottom",
          //       horizontal: "left"
          //     }
          // }}
          >
            <MenuItem value={'1'}>Add user</MenuItem>
            <MenuItem value={'2'}>Show users</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectItem === '1' && <AddUserComponent />}
      {selectItem === '2' && <ShowUser />}
    </Grid>
  );
}
