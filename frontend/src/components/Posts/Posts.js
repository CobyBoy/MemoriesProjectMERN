import React, { useEffect, useState } from 'react';
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux';
import {Grid, CircularProgress, Typography } from '@material-ui/core';

const Posts = ({ setCurrentId}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 20000);
        return () => clearTimeout(timer);
    }, [loading]);

    // @ts-ignore
    const posts = useSelector((state) => state.postReducer);

    return (
        <>
            { !posts.length && loading ? <CircularProgress className={ classes.actionDiv }/> : !posts.length && !loading  ? <Typography className={classes.actionDiv}>No posts to show</Typography>:
                <Grid className={ classes.mainContainer } container alignItems="stretch" spacing={ 3 }>
                    { posts.map((post) => (
                        <Grid item key={ post._id } xs={ 12 } sm={ 6 }>
                            <Post post={ post } key={ post._id } setCurrentId={ setCurrentId }/>
                        </Grid>
                    )) }
                </Grid>
            }
        </>
    );
}

export default Posts;