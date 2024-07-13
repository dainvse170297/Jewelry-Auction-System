import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Grid } from '@mui/material';
import { getLotsBySessionId } from '../../services/apiService';
const AuctionSessionDetail = ({ auctionSessionId }) => {

    const [lotsInSession, setLotsInSession] = useState([]);

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
                                        Number of attendee: {lot.numberOfRegister}
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
        </>
    )
}

export default AuctionSessionDetail