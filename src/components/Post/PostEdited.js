import React, { useState, useEffect } from "react";
import ReactEmoji from 'react-emoji';

import FirebaseService from '../../services/firebase.service';
import { getPassedTime } from "../../utils/spUtils";
const PostEdited = ({ post }) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (post?.image !== "NONE") {
            let imageString = post.image;
            let imagesArr = imageString.split("|");

            let preProcessArr = imagesArr.filter(image => image);
            preProcessArr.forEach(imageFileName => {
                getImageFromFirebase(imageFileName);
            });
        }

        return () => {
            setImages([]);
        };
    }, []);

    const getImageFromFirebase = async (image) => {
        FirebaseService.getImageUrlFromFirebase(image)
            .then((url) => {
                setImages(prev => [...prev, url])
            });
    }

    return (
        <div>
            <h5 className="mb-0 mt-1">{ getPassedTime(new Date(post.editedDate)) }</h5>
            <div style={{ backgroundColor: "#E5E7EB" }}>
                <div className="p-2 d-flex align-items-center">
                    <img 
                        src={post.user.profile.avatar}
                        className="rounded-circle"
                        style={{height: "50px"}}
                    />
                    <div>{ post.user.profile.firstName } { post.user.profile.lastName }</div>
                </div>
                <div className="p-2">
                    { ReactEmoji.emojify(post.content) }
                </div>
                <div>
                    { post?.image !== "NONE" ? 
                        (
                            images.length === 1 ?
                                <img 
                                    className="img-fluid" 
                                    src={ images[0] }
                                /> : 
                            images.map((image, index) => <img 
                                src={image}
                                key={index}
                            />)
                        )
                        : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default PostEdited