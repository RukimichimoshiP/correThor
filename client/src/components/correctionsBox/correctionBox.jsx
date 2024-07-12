import { useCorrectorId } from '../../contexts/correctorIdContext';
import { useToken } from "../../contexts/tokenContext";
import DataTable from 'react-data-table-component';
import { Alert, AlertTitle, Box, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from "react";
import { createCorrection, deleteCorrection, editCorrection, getCorrectionsByCorrector } from '../../utils/fetchAPI';

const defaultStyle = {
    headRow: {
        style: {
            fontWeight: 'bolder',
            marginBottom: '25px'
        }
    },
    rows: {
        style: {
            '&:hover': {
                backgroundColor: 'lightgray'
            }
        }
    }
}

const CorrectionBox = () => {
    const { correctorId } = useCorrectorId();

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loadingDialog, setLoadingDialog] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);
    const [dialogEdit, setDialogEdit] = React.useState(false);
    const [dialogRemove, setDialogRemove] = React.useState(false);
    const [statusData, setStatusData] = React.useState([]);
    const [selectCorrector, setSelectCorrector] = React.useState();

    const [idCorrection, setIdCorrection] = React.useState();
    const [clas, setclas] = React.useState(null);
    const [module, setModule] = React.useState(null);
    const [meeting, setMeeting] = React.useState(null);
    const [student, setStudent] = React.useState(null);

    const { token } = useToken();

    async function handleEdit(){
        const correction = {class: clas, module: module, meeting: meeting, student: student};

        setLoadingDialog(true);
        const response = await editCorrection(token, idCorrection, correction);
        if(response.success){
            setError(null);
            
            getCorrections();
            setDialogEdit(false);

            setclas(null);
            setModule(null);
            setMeeting(null);
            setStudent(null);
            setIdCorrection(null);
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
    }

    const handleClickOpenEdit = (row) => {
        setDialogEdit(true);
        setclas(row.class === '' ? null : row.class);
        setModule(row.module === '' ? null : row.module);
        setMeeting(row.meeting === '' ? null : row.meeting);
        setStudent(row.student === '' ? null : row.student);
        setIdCorrection(row.id);
    };
    
    const handleCloseEdit = () => {
        setDialogEdit(false);
        setclas(null);
        setModule(null);
        setMeeting(null);
        setStudent(null);
        setIdCorrection(null);
        setError(null);
    };

    async function handleRemove(){
        setLoadingDialog(true);
        const response = await deleteCorrection(token, idCorrection);
        if(response.success){
            setError(null);
            
            getCorrections();
            setDialogRemove(false);

            setIdCorrection(null);
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
    }

    const handleClickOpenRemove = (id) => {
        setDialogRemove(true);
        setIdCorrection(id);
    };

    const handleCloseRemove = () => {
        setDialogRemove(false);
        setIdCorrection(null);
    };

    const columns = [
        {
            name: 'Turma',
            selector: row => row.class,
        },
        {
            name: 'Módulo',
            selector: row => row.module,
        },
        {
            name: 'Aula',
            selector: row => row.meeting,
        },
        {
            name: 'Aluno(a)',
            selector: row => row.student,
        },
        {
            name: 'Ações',
            cell: row => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleClickOpenEdit(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleClickOpenRemove(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    async function getCorrections(){
        const response = await getCorrectionsByCorrector(token, correctorId);

        if(response.success){
            if(response.data.length <= 0){
                setSelectCorrector('Este corretor não tem correções');
            }else{
                const data = []
                setStatusData([]);
                response.data.map(item => {
                    data.push({
                        id: item.id,
                        class: item.class,
                        module: item.module,
                        meeting: item.meeting,
                        student: item.student
                    })
                    setStatusData(data);
                })
            }
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }
    }

    useEffect(() => {
        if(!correctorId){
            setSelectCorrector('Selecione um corretor para ver as correções');
        }else{
            setStatusData();
            setLoading(true);
            setError(null);
            getCorrections();
            setLoading(false);
        }
    }, [correctorId])

    async function handleSave(){
        const correction = {correctorid: correctorId, class: clas, module: module, meeting: meeting, student: student};

        const response = await createCorrection(token, correction);
        if(response.success){
            setError(null);
            
            getCorrections();
            setDialog(false);

            setclas(null);
            setModule(null);
            setMeeting(null);
            setStudent(null);
        }else{
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }

        setLoadingDialog(false);
    }

    const handleClickOpen = () => {
    setDialog(true);
    };

    const handleClose = () => {
    setDialog(false);
    setclas(null);
    setModule(null);
    setMeeting(null);
    setStudent(null);
    setError(null);
    };
    
    return(
        <Card sx={{ 
            minWidth: 275, 
            padding: '20px 20px 0 20px'
            }}>
            <Typography variant="h5" component="div" gutterBottom>
                Correções
            </Typography>
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
        }}>
            {correctorId && !error ? 
                <Button variant="contained" disableElevation sx={{padding: '10px 10px', minWidth: '150px', maxWidth: '.4'}} onClick={handleClickOpen}>
                <AddIcon sx={{marginRight: '10px', color: 'gray'}}/> NOVA CORREÇÃO
                </Button>
                :
                <Button variant="contained" disableElevation sx={{padding: '10px 10px', minWidth: '150px', maxWidth: '.4'}} disabled>
                <AddIcon sx={{marginRight: '10px', color: 'gray'}}/> NOVA CORREÇÃO
                </Button>
            }

            <DataTable
			columns={columns}
            progressPending={loading}
			data={statusData}
            persistTableHead
            noDataComponent={!error ? 
                selectCorrector
                :
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Erro de dados</AlertTitle>
                        {error}
                    </Alert>
                </Stack>
            }
			customStyles={defaultStyle}
		    />

            <Dialog open={dialog} onClose={handleClose} fullWidth>
                <DialogTitle>Adicionar Correção</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="class"
                        name="Turma"
                        label="Turma"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clas}
                        onChange={(e) => setclas(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="module"
                        name="Módulo"
                        label="Módulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="meeting"
                        name="Aula"
                        label="Aula"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={meeting}
                        onChange={(e) => setMeeting(e.target.value)}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="student"
                        name="Aluno(a)"
                        label="Aluno(a)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
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
                <DialogTitle>Editar Correção</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="class"
                        name="Turma"
                        label="Turma"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={clas}
                        onChange={(e) => setclas(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="module"
                        name="Módulo"
                        label="Módulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="meeting"
                        name="Aula"
                        label="Aula"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={meeting}
                        onChange={(e) => setMeeting(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="student"
                        name="Aluno(a)"
                        label="Aluno(a)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
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
                            <Button onClick={handleCloseEdit}>Cancelar</Button>
                            <Button variant="contained" type="submit" onClick={handleEdit}>Salvar</Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>

            <Dialog
                    open={dialogRemove}
                    onClose={handleCloseRemove}
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
                            <AlertTitle>Erro ao deletar</AlertTitle>
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
                            <Button onClick={handleCloseRemove}>Cancelar</Button>
                            <Button variant="contained" color="error" onClick={handleRemove} autoFocus>
                                Confimar
                            </Button>
                            </>
                        }
                    </DialogActions>
                </Dialog>
        </CardContent>
      </Card>
    )
}

export default CorrectionBox;