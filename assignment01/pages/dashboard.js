import { useEffect, useState } from 'react'
import useSWR from "swr";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { fetcher } from "utils/fetcher";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Pair } from '../components/Pair';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { margin } from '@mui/system';


export default function Dashboard() {

  const [currency, setCurrency] = useState('USD');  


  
  // const [data, setData] = useState("")
  const [rate, setRate] = useState("");
  const [open, setOpen] = useState(true);

  const { data, error } = useSWR(
    "https://api.exchangerate.host/symbols",
    fetcher, { suspense: true },

  );



  async function fetchData(currency) {
    const url = `https://api.exchangerate.host/latest?base=${currency}`;
    const response = await fetch(url);
    if(!response.ok){
      return <Alert severity="error">Failed</Alert>;
    }

    const rateData = await response.json();
    //console.log(data.hits);
    setRate(rateData)
  

  }

  const handleChange = (event) => {

    setCurrency(event.target.value);
    console.log(event.target.value)
    console.log(currency)

    
    fetchData(event.target.value ?? 'EUR')
    console.log(rate.rates)
    window.localStorage.setItem('base', event.target.value);

  };


  useEffect(() => {

    setCurrency(window.localStorage.getItem('base'));  
    fetchData(window.localStorage.getItem('base'))


  }, []);



  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!data) return <Alert severity="info">Loading...</Alert>;

  // if (pairError) return <Alert severity="error">{error.message}</Alert>;
  // if (!pairData) return <Alert severity="info">Loading...</Alert>;

  const styling = {
    container: {
      padding: 3
    }
  }

  return (
    <>
        <Collapse in={open}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Success!
          </Alert>
        </Collapse>

        <div>
          <Box sx={{m:3}}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">Base Currency</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={currency?? 'USD'}
              label="Base Currency"
              onChange={handleChange}
            >
              {Object.values(data?.symbols).map((symbol) => (
                <MenuItem value={symbol.code} key={symbol.code}>
                  {symbol.code}
                </MenuItem>
              ))}

            </Select>

          </FormControl>
          <Grid sx={styling.container} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {rate.rates && Object.entries(rate?.rates)?.map((r, i) => (
              <Grid item xs={2} key={i}>
                <Pair base={currency} pair={r}>
                </Pair>
              </Grid>

            ))}
          </Grid>
          </Box>
        </div>
    </>

  )


}
