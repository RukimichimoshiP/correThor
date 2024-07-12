import React from "react";
import { useToken } from "../../contexts/tokenContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { adminLogin } from "../../utils/fetchAPI";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FormLogin = () => {
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [statusResponse, setStatusResponse] = React.useState(false);
    const [inputToken, setInputToken] = React.useState('');

    const { token, setToken } = useToken();

    async function requestLogin(){
        setLoading(true);

        const response = await adminLogin(inputToken);
        if(!response.success){
            setError(JSON.stringify({error: response.error, message: response.messages}));
        }else{
            setError(null);
            setToken(response.data.token);
            setStatusResponse(response.data);
        }

        setLoading(false);
    }

    return(
        <Card sx={{ 
            minWidth: 275, 
            padding: '20px'
            }}>
            <Typography variant="h5" component="div" gutterBottom>
                Admin
            </Typography>
        <CardContent sx={{
            display: 'flex',
            gap: '20px'
        }}>

        {token ? 
            <div>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Item sx={{display: 'flex', gap: 1, alignItems: 'center', background: 'lightgray'}}><AccountCircleIcon />{statusResponse.name}</Item>
                <Button variant="contained" onClick={() => {
                    setToken(null);
                    setStatusResponse(null);
                    setInputToken(null);
                    }} sx={{display: 'flex', gap: 1, alignItems: 'center', color: 'blue', background: 'white'}}><SettingsIcon /> TOKEN</Button>
            </Stack>
            </div>
            :
            <>
                <TextField id="outlined-basic" label="Token" variant="outlined" size="small" type="password" onChange={(e) => setInputToken(e.target.value)}/>
                {!loading ? 
                <Button variant="contained" onClick={requestLogin}><CheckIcon sx={{marginRight: 1}}></CheckIcon> Validar </Button> 
                : 
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
            </>
        }
          
        </CardContent>
        {error ? 
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Não foi possivel fazer o login</AlertTitle>
                    <title>O erro original foi:</title>
                    {error}
                </Alert>
            </Stack>
            :
            <></>
        }
      </Card>
    );
}

export default FormLogin