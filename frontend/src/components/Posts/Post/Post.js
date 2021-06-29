import React from 'react';
import { Typography, Card, CardActions, CardContent, Button, CardMedia } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/postAction';

const Post = ({ post: { creator, title, tags, message, createdAt, selectedFile, likeCount, _id }, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <>
            <Card className={classes.card}>
                <CardMedia className={ classes.media } image={ selectedFile } title={ title }/>
                <div className={ classes.overlay }>
                    <Typography variant="h6">{ creator }</Typography>
                    <Typography variant="body2">{ moment(createdAt).fromNow() }</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={ { color: 'white' } } size="small" onClick={ () => { setCurrentId(_id) } }>
                        <MoreHorizIcon fontSize="default"/>
                    </Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{ tags.map((tag) => (`#${tag} `)) }</Typography>
                </div>
                <Typography variant="h5" gutterBottom>{ title }</Typography>
                <CardContent>
                    <Typography className={ classes.title } variant="body2" color="textSecondary" component="p">{ message }</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={ () => {dispatch(likePost(_id))} }>
                        <ThumbUpAltIcon fontSize="small" />
                        Like {likeCount}
                    </Button>
                    <Button size="small" color="primary" onClick={ () => {dispatch(deletePost(_id)) } }>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default Post;