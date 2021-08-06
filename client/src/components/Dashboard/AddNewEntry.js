import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Form, FormField, FormGroup, Rating, Grid, Segment, TextArea } from 'semantic-ui-react'
import {RiUserLocationLine} from 'react-icons/ri';
import ImageUploading from 'react-images-uploading';


const AddNewEntryForm = () => {
   
    const [title] = useState('');
    const [place] = useState('');
    const [date] = useState('');
    const [description] = useState('');
    // const [rating] = useState('');

    
    const [images, setImages] = useState('');
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };




return (
    <>
    <Grid fluid textAlign='center'>
        <Grid.Column style={{ maxWidth: 450, padding: '50px'}}>
          <Header as='h2' color='black' textAlign='center'>
              <RiUserLocationLine/>Your new entry!

          </Header>
        <Segment stacked>
            <Form>
                <FormField>
                    <label htmlFor="tile">Title</label>
                    <input 
                        type="text" 
                        autoComplete="off" 
                        placeholder="Title"
                        name="title"
                        value={title}
                        // onChange={e => {setName(e.target.value)}}
                    />
                </FormField>
                
                <FormField>
                    <label htmlFor="place">Place</label>
                    <input 
                        type="text" 
                        autoComplete="off" 
                        placeholder="Place"
                        name="place"
                        value={place}
                    />
                </FormField>
            
                <FormField>
                    <label htmlFor="date">Date</label>
                    <input 
                        type="text" 
                        autoComplete="off" 
                        placeholder="date"
                        name="date"
                        value={date}
                    />
                </FormField>

                <FormField>
                    <label htmlFor="description">Description</label>
                    <TextArea 
                        type="text" 
                        autoComplete="off" 
                        placeholder="description"
                        name="description"
                        value={description}
                    />
                </FormField>
                <FormGroup>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <Button color='yellow'
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Click or Drop here
                        </Button>
                        &nbsp;
                        <Button color='teal' onClick={onImageRemoveAll}>Remove all images</Button>
                        {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>Update</button>
                            <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </ImageUploading>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="rating">Rating?</label>
                    <Rating icon='heart' name='rating' defaultRating={1} maxRating={5} />
                </FormGroup>
            </Form>
        </Segment>
        <Modal.Actions>
            <Button color='yellow'>
                <Icon name='checkmark' /> Create entry
            </Button>
            <Button color='teal' >
                Cancel
            </Button>
        </Modal.Actions>
    </Grid.Column>
    </Grid>


    </>
    )
};

export default AddNewEntryForm;
