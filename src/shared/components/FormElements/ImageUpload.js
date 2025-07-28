import React, { useRef, useState, useEffect } from "react";
import './ImageUpload.css';
// import { none } from "ol/centerconstraint";
import Button from "./Button";
const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isvalid, setIsValid] = useState(false);
    const filePickerRef = useRef();



    const pickedHandler = (event) => {
        console.log(event.target)
        let pickedFile;
        let fileIsvalid = isvalid;
        if (event.target.files || event.target.files !== 0) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true)
            fileIsvalid = true;
        } else {
            setIsValid(false);
            fileIsvalid = false;
        }
        props.onInput(props.id, pickedFile, fileIsvalid)
    }
    const pickImagehandler = () => {
        filePickerRef.current.click();
    }

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }, [file])
    return (
        <div className="form-control">


            <input type="file" ref={filePickerRef} style={{ display: 'none' }} id={props.id} accept=".jpg,.jpeg,.png" onChange={pickedHandler} />
            <div className={`image-upload ${props.center && 'center'}`}>

                <div className="image-upload__preview">
                    {previewUrl && <img alt="Preview" src={previewUrl} />}
                    {!previewUrl && <p>Please pick up the image</p>}
                </div>
                <Button type="button" onClick={pickImagehandler}>Pick Image</Button>
            </div>
        </div>
    )
}

export default ImageUpload;