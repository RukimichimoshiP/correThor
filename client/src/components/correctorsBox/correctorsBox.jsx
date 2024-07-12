import React, { useEffect } from "react";
import { useToken } from "../../contexts/tokenContext";
import { useCorrectorId } from '../../contexts/correctorIdContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogTitle from '@mui/material/DialogTitle';
import { getAllCorrectors, createNewCorrector, editCorrector, deleteCorrector } from "../../utils/fetchAPI";

const CorrectorsBox = () => {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loadingDialog, setLoadingDialog] = React.useState(false);
    const [statusResponse, setStatusResponse] = React.useState(null);
    const [dialog, setDialog] = React.useState(false);
    const [dialogEdit, setDialogEdit] = React.useState(false);
    const [dialogDelete, setDialogDelete] = React.useState(false);
    const [valueCorrector, setValueCorrector] = React.useState('');
    const [valueCorrectorEdit, setValueCorrectorEdit] = React.useState('');
    const [newCorrector, setNewCorrector] = React.useState('');

    const { token } = useToken();
    const { setCorrectorId } = useCorrectorId();

    async function getCorrectors(){
        const response = await getAllCorrectors(token);
        setStatusResponse(response.data);
    }

    useEffect( () => {
        getCorrectors();
        setLoading(false);
    }, []);

    async function handleSave(){
        setLoadingDialog(true);
        setError(null);

        const response = await createNewCorrector(token, newCorrector);
        if(response.success){
            setError(null);
            
            const newCorrector = response.data;
            setValueCorrector(newCorrector.id);
            setCorrectorId(newCorrector.id);
            setDialog(false);
            setNewCorrector('');
            getCorrectors();
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
    }

    const handleChange = (event) => {
        setValueCorrector(event.target.value);
        setCorrectorId(event.target.value);
      };

      const handleClickOpen = () => {
        setDialog(true);
      };
    
      const handleClose = () => {
        setDialog(false);
        setNewCorrector('');
        setError(null);
      };

      const handleSaveEdit = async () => {
        setLoadingDialog(true);
        setError(null);

        const response = await editCorrector(token, valueCorrector, valueCorrectorEdit);
        if(response.success){
            setError(null);

            setDialogEdit(false);
            setCorrectorId(valueCorrector);
            setValueCorrectorEdit('');
            getCorrectors();
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
      }

      const handleClickOpenEdit = () => {
        setDialogEdit(true);
        const selectedCorrector = statusResponse.find(corrector => corrector.id === valueCorrector);
        if(selectedCorrector){
            setValueCorrectorEdit(selectedCorrector.name);
        }
      };
    
      const handleCloseEdit = () => {
        setDialogEdit(false);
        setError(null);
      };

      const handleDelete = async () => {
        setLoadingDialog(true);
        console.log(valueCorrector)
        const response = await deleteCorrector(token, valueCorrector);

        if(response.success){
            setError(null);

            setDialogDelete(false);
            setValueCorrector('');
            setCorrectorId();
            getCorrectors();
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
      }

      const handleClickOpenDelete = () => {
        setDialogDelete(true);
        const selectedCorrector = statusResponse.find(corrector => corrector.id === valueCorrector);
        if(selectedCorrector){
            setValueCorrectorEdit(selectedCorrector.name);
        }
      };
    
      const handleCloseDelete = () => {
        setDialogDelete(false);
        setError(null);
      };

    return(
        <Card sx={{ 
            minWidth: 275, 
            padding: '20px 20px 0 20px'
            }}>
            <Typography variant="h5" component="div" gutterBottom>
                Corretores
            </Typography>
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
        }}>

        {loading ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            :
            <>
                <Button variant="contained" disableElevation sx={{padding: '10px 10px', minWidth: '200px', maxWidth: '.4'}} onClick={handleClickOpen}>
                <AddIcon sx={{marginRight: '10px', color: 'gray'}}/> NOVO CORRETOR
                </Button>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <FormControl variant="filled" sx={{ m: 1, width: 300, maxWidth: 350 }}>
                        <InputLabel id="demo-simple-select-filled-label">Corretor(a)</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={valueCorrector}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>Selecione um(a) corretor(a)</em>
                        </MenuItem>
                        {statusResponse && 
                            statusResponse.map(corrector => (
                            <MenuItem value={corrector.id} >{corrector.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    {valueCorrector !== '' ?
                        <>
                            <Button variant="outlined" startIcon={<EditIcon />} sx={{ m: 1, width: 300, maxWidth: 350 }} onClick={handleClickOpenEdit}>
                                EDITAR CORRETOR
                            </Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} color='error' sx={{ m: 1, width: 300, maxWidth: 350 }} onClick={handleClickOpenDelete}>
                                DELETAR CORRETOR
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="outlined" startIcon={<EditIcon />} sx={{ m: 1, width: 300, maxWidth: 350 }} disabled>
                                EDITAR CORRETOR
                            </Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ m: 1, width: 300, maxWidth: 350 }} disabled>
                                DELETAR CORRETOR
                            </Button>
                        </>
                    }

                </Stack>
        </>
        }

            <Dialog open={dialog} onClose={handleClose} fullWidth>
                    <DialogTitle>Adicionar corretor</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="Name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newCorrector}
                            onChange={(e) => setNewCorrector(e.target.value)}
                        />
                        {error && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">
                                    <AlertTitle>Erro de submissão</AlertTitle>
                                    {error}
                                </Alert>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {loadingDialog ? (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Button onClick={handleClose}>Cancelar</Button>
                                <Button variant="contained" type="submit" onClick={handleSave}>Salvar</Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

                <Dialog open={dialogEdit} onClose={handleCloseEdit} fullWidth>
                    <DialogTitle>Editar corretor</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="Name"
                            label="Name"
                            type="text"
                            fullWidth
                            defaultValue={valueCorrectorEdit}
                            variant="standard"
                            onChange={(e) => setValueCorrectorEdit(e.target.value)}
                        />
                        {error && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">
                                    <AlertTitle>Erro de submissão</AlertTitle>
                                    {error}
                                </Alert>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        {loading ? (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Button onClick={handleCloseEdit}>Cancelar</Button>
                                <Button variant="contained" type="submit" onClick={handleSaveEdit}>Salvar</Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={dialogDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Deletar Corretor"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta ação é irreversivel
                    </DialogContentText>
                    </DialogContent>
                    {error && 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">
                            <AlertTitle>Erro de submissão</AlertTitle>
                            {error}
                        </Alert>
                        </Stack>
                    }
                    <DialogActions>
                        {loadingDialog ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            <>
                            <Button onClick={handleCloseDelete}>Cancelar</Button>
                            <Button variant="contained" color="error" onClick={handleDelete} autoFocus>
                                Confimar
                            </Button>
                            </>
                        }
                    </DialogActions>
                </Dialog>

        </CardContent>
      </Card>
    );
}

export default CorrectorsBox;