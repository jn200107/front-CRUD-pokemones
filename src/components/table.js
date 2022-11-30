import React, { useEffect,useState }   from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert';



const TableDense=()=>{


  //////////////////////////////////////////////////// manera de hacer el metodo get ////////////////////////////////////
  const[data,setData]=useState([])

  let getData=async()=>{
    try {
      const {data: response}=await axios.get('http://localhost:3007/pokemones')
      setData(response)
    } catch(error){
      console.log(error.message)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////manera de hacer el metodo post//////////////////////////////////////////////////////////
      
  //a qui le decimos que en el boton de guardar si esta en falso le metemos con el axios el metodo post con la url luego los objetos que le enviaremos y que seran los que apareceran en la base de datos luego el response lo pasaremos cuando el show form sea true
  const guardar=()=>{
    if (nombre==='' || tipo===''){
      setshowAlert(true)
    }else{
      if (!showForm){
      axios.post('http://localhost:3007/agregar-pokemon',{
        nombre:nombre,
        tipo:tipo
      }).then(response=>{
        setshowForm(true)
        setshowAlert(false)
        getData()
      })
    }}
  }
  
//a qui le decimos que la variable nombre y la variable tipo van a comenzar con un valor de vacio 
  const [nombre,setnombre]=useState('')
  const [tipo,settipo]=useState('')
  

  // a qui le decimos que en los imputs valla  escuchando y valla enviando la informacion nueva a nombre y tipo
  const onchangenombre=(event)=>{
      setnombre(event.target.value)
  }
  const onchangetipo=(event)=>{
     settipo(event.target.value)  
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  


//////////////////////////////////////////////////metodo put////////////////////////////////////////////////////////////////////

  //esta funcion hace que cambie el estado del show form a false y cambie el valor del nombre y del tipo con los rows 
  const editar=((obj)=>{
    setshowForm(false)
    SetMostrarBotonGuardar(false)
    setnombre(obj.nombre)
    settipo(obj.tipo)
    setid(obj.idpokemones)
  })

  const [id,setid]=useState()

  const actualizar=(()=>{
    if(nombre==='' || tipo===''){
      setshowAlert(true)
    }else{
    axios.put(`http://localhost:3007/actualizar-pokemon/${id}`,{
      nombre:nombre,
      tipo:tipo
    }).then(()=>{
      //a qui dice que cuando le demos al boton de actualizar nos muestre la informacion en la tabla y nos muestre la tabla pero que reinicie los valores de los imputs para que no queden ahi pintados 
      setnombre('')
      settipo('')
      setid('')
      setshowForm(true)
      getData()
      setshowAlert(false)
      SetMostrarBotonGuardar(true)
    })}

  })

  const cancelar=(()=>{
  //esto significa que cuando le demos click al boton de cancelar va ha setear o a reiniciar el valor de todos estos a su valor inicial
    setshowForm(true)
    setnombre('')
    settipo('')
    setid('')
    SetMostrarBotonGuardar(true)
    setshowAlert(false)


  })









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //esta parte es para esconder el menu le decimos que el showform comienze con un valor de true y cuando le demos click al boton se ponga en un valor de false 

  // entonces marcamos en la tabla de que cuando show form sea false nos muestre el formulario y cuando sea true nos muestre lo demas
  const[showForm,setshowForm]=useState(true)
  const esconder=()=>{
    setnombre('')
    settipo('')
    setshowForm(false)
  }

  const[mostrarBotonGuardar,SetMostrarBotonGuardar]=useState(true)

  const [showAlert,setshowAlert]=useState(false)




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  
  useEffect(()=>{
    getData()
  },[])
    
  
  return(
    <Box>
      
      {
        !showForm&&
        <Box>
          <Grid container  direction="column" justifyContent="center" alignItems="center"sx={{p:1}}>
            {
              showAlert &&
            <Grid item>
              <Alert severity="warning">debes llenar todos los campos</Alert>
            </Grid>
            }
            <Grid item xs={4} sx={{p:1}} >
              <TextField value={nombre} onChange={onchangenombre} id="outlined-basic" label="nombre" variant="outlined" />
            </Grid>

            <Grid item xs={4} sx={{p:1}}>
              <TextField value={tipo} onChange={onchangetipo} id="outlined-basic" label="tipo" variant="outlined" />
            </Grid>
          </Grid> 


          <Grid container justifyContent={'center'} >
            
              {
                mostrarBotonGuardar?
                <Grid container justifyContent={'center'}>
                  <Grid item sx={{pr:1}} >
                    <Button style={{color:'black',borderColor:'green',}} size='small' onClick={()=>{guardar()}} variant="outlined" color="success">guardar</Button>        
                  </Grid>
                  <Grid item sx={{pl:1}}>
                    <Button style={{color:'black',borderColor:'red',}} size='small' onClick={()=>{cancelar()}} variant="outlined" color="error">cancelar</Button>        
                  </Grid>

                </Grid>
                
                :
                <Grid container justifyContent={'center'}>

                  <Grid item sx={{pr:1}} >
                    <Button style={{color:'black',borderColor:'green',}} size='small' onClick={()=>{actualizar()}} variant="outlined" color="success">actualizar</Button>        
                  </Grid>
                  <Grid item sx={{pl:1}} >
                    <Button style={{color:'black',borderColor:'red',}} size='small' onClick={()=>{cancelar()}} variant="outlined" color="error">cancelar</Button>        
                  </Grid>

                </Grid>
              }


          </Grid>
        </Box>
      }


      {
        showForm&&
        <Grid container>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">

              <TableHead>
                <TableRow>
                  <TableCell><strong>id pokemones</strong></TableCell>
                  <TableCell align="left"><strong>nombre</strong></TableCell>
                  <TableCell align="left"><strong>tipo</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row) => (
                  //a qui le decimos que hacemos una funcion que cuando le demos click reciba la informacion de los row y cambie a false y cambie los valores de nombre y tipo
                  <TableRow onClick={()=>{editar(row)}} key={row.idpokemones} sx={{ border: 0 }}>       
                    <TableCell component="th" scope="row">{row.idpokemones}</TableCell>
                    <TableCell align="left">{row.nombre}</TableCell>
                    <TableCell align="left">{row.tipo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>

          <Grid item sx={{pt:2,margin:'auto'}}>
          <Button onClick={()=>{esconder()}}  variant="contained" color='success'>agregar pokemon</Button>
          </Grid>

        </Grid>

      }
    </Box>
  )    


}

export default TableDense