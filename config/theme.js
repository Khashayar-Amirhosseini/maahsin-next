import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const primary="#1c2d15f2";
const secondary="#f3b40d";
const warning="#ffc260";
const success="#3dc4a0";
const info="#9013fe"

const lightenRate=7.5;
const darkenRate=15;

const theme = createTheme({
direction:'rtl',
palette: {
   primary: {
      main: primary,
      
   },
   secondary: {
     main: secondary,
   },
   error: {
   main: red.A400,
   },
   
   
},


typography:{
   fontFamily:'BYekan'
}

  


});
export default theme;