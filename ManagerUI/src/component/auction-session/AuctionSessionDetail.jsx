import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid, Modal, Box, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { getLotsBySessionId } from '../../services/apiService';
import { RemoveRedEye } from '@mui/icons-material';
import MembersInLot from './MembersInLot';
const AuctionSessionDetail = ({ auctionSessionId }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [lotsInSession, setLotsInSession] = useState([]);

    const [lotId, setLotId] = useState(null);

    const [open, setOpen] = useState(false);
    const handleShowAttendee = (lotId) => {
        setLotId(lotId);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getLotsInSession = async () => {
            try {
                const response = await getLotsBySessionId(auctionSessionId);
                setLotsInSession(response);
            } catch (error) {
                console.log("error", error);
            }
        }
        getLotsInSession();
    }, [])

    return (
        <>
            {lotsInSession.length === 0 && <Typography variant="h6" color="text.primary">No lot in this session</Typography>}
            {lotsInSession.map((lot, index) => (
                <div className="mt-3" key={index}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <Grid container>
                            <Grid item xs={2}>
                                <CardMedia
                                    component="img"
                                    image={lot.productImages[0]?.imageUrl}
                                    alt="placeholder image"
                                    sx={{ height: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {lot.productName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {lot.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Number of attendee: {lot.numberOfRegister} <Button variant="text" color="primary" size='small' onClick={() => handleShowAttendee(lot.id)}><RemoveRedEye /></Button>
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Start Price: ${lot.startPrice}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Buy Now Price: ${lot.buyNowPrice}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            ))}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Attendees
                    </Typography>
                    <MembersInLot lotId={lotId} />
                </Box>
            </Modal>
        </>
    )
}

export default AuctionSessionDetail