import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function CustomCard(props) {
    return (
        <Card classes={{ root: `custom-card ${props.glow ? 'glow-box' : ''}` }} 
              onClick={ () => props.handleClick(props) }>
            <CardActionArea>
                <CardMedia component='img'
                           alt='image not found'
                           height='140'
                           image={ props.data[props.imageKey] }
                           title='data image' />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        { props.data[props.headerKey] }
                    </Typography>
                    {/*<Typography component='p'>
                        { props.data[props.contentKey] }
                    </Typography>*/}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CustomCard;