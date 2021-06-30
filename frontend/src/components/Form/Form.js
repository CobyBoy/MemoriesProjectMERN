import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/postAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: [''], selectedFile: '' });
    const [inputError, setInputError] = useState(false)
    // @ts-ignore
    const post = useSelector((state) => currentId ? state.postReducer.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postData.creator === '' || postData.title === '' || postData.selectedFile === '') {
            toast.error("Please complete all fields", { position: toast.POSITION.BOTTOM_CENTER });
            setInputError(true);
            return
        }
        (currentId) ? dispatch(updatePost(currentId, postData)) : dispatch(createPost(postData));
        setInputError(false)
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: [''], selectedFile: '' });
    }

    return (
        <Paper className={ classes.paper }>
            <form autoComplete="off" noValidate className={ `${classes.root} ${classes.form}` } onSubmit={ handleSubmit }>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a memory</Typography>
                <TextField name="creator" variant="outlined" error={ inputError } label="Creator" fullWidth value={ postData.creator }
                    onChange={ ((e) => { setPostData({ ...postData, creator: e.target.value }); e.target.value ? setInputError(false) : setInputError(true); }) } />
                <TextField name="title" variant="outlined" error={ inputError } label="Title" fullWidth value={ postData.title }
                    onChange={ ((e) => { setPostData({ ...postData, title: e.target.value }); e.target.value ? setInputError(false) : setInputError(true) }) } />
                <TextField name="message" variant="outlined" error={ inputError } label="Message" fullWidth value={ postData.message }
                    onChange={ ((e) => { setPostData({ ...postData, message: e.target.value }); e.target.value ? setInputError(false) : setInputError(true) }) } />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={ postData.tags }
                    onChange={ ((e) => setPostData({ ...postData, tags: e.target.value.split(/[\s,]+/) })) } />
                <div className={ classes.fileInput }>
                    <FileBase type="File" multiple={ false } onDone={ ({ base64 }) => { setPostData({ ...postData, selectedFile: base64 }) } } />
                </div>
                <Button className={ classes.buttonSubmit } variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={ clear } fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;