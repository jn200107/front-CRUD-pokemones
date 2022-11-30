import { Grid } from '@mui/material'
import Table from './components/table'
import Box from '@mui/material/Box';










const App=()=>{
  return(
    <Box sx={{p:2,height:1000,backgroundColor:'#D4D4D4'}}>

      <Grid container justifyContent={'center'} >
        <Table></Table>
      </Grid>    


    </Box>
  
  )
}

export default App
