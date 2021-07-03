import React, { useState, useEffect, useRef } from 'react';
import { Button, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/postAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles'
import FormInput from '../FormInput/FormInput';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: [''], selectedFile: '' });
    const inputRefs = useRef([React.createRef()])

    // @ts-ignore
    const post = useSelector((state) => currentId ? state.postReducer.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    let emptyInput = false

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields();
        if (emptyInput) { return }
        else {
            (currentId) ? dispatch(updatePost(currentId, postData)) : dispatch(createPost(postData));
            clear();
        }
    }

    const validateFields = () => {
        for (let [key, value] of Object.entries(inputRefs.current)) {
            if (inputRefs.current[key].value === '') {
                emptyInput = true;
                toast.error(`Please complete ${inputRefs.current[key].name} field`, { position: toast.POSITION.BOTTOM_CENTER });
            }
        }
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ creator: '', title: '', message: '', tags: [''], selectedFile: '' });
    }

    return (
        <Paper className={ classes.paper }>
            <form autoComplete="off" noValidate className={ `${classes.root} ${classes.form}` } onSubmit={ handleSubmit }>
                <FormInput name="creator" label="Creator" value={ postData.creator } inputRefs={ inputRefs } index={ 0 }
                    onChange={ ((e) => { setPostData({ ...postData, creator: e.target.value });; }) } />

                <FormInput name="title" label="Title" value={ postData.title } inputRefs={ inputRefs } index={ 1 }
                    onChange={ ((e) => { setPostData({ ...postData, title: e.target.value }); }) } />

                <FormInput name="message" label="Message" value={ postData.message } inputRefs={ inputRefs } index={ 2 }

                    onChange={ ((e) => { setPostData({ ...postData, message: e.target.value }); }) } />

                <FormInput name="tags" label="Tags" value={ postData.tags } inputRefs={ inputRefs } index={ 3 }

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