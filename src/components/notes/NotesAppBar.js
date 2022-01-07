import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { startSaveNote, startUploadingImage } from '../../actions/notes';


export const NotesAppBar = () => {

    const { active } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const dateNote = moment(active.date).format('DD MMMM YYYY');

    const handleSave = () => {
        dispatch( startSaveNote(active) );
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if(file) {
            dispatch( startUploadingImage(file) );
        }
    };

    return (
        <div className='notes__appbar'>
            <span>{ dateNote }</span>

            <input
                id='fileSelector'
                type='file'
                name='file'
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className='btn'
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button
                    className='btn'
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
