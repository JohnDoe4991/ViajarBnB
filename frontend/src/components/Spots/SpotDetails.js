// import React, { useEffect, useState, } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDetailsThunk } from "../../store/spots";
// import { getAllReviewsThunk } from "../../store/reviews";
// import OpenModalButton from "../OpenModalButton/index"
// import "./Spots.css/SpotDetails.css"
// import CreateReviewModal from "../Reviews/CreateReviewModal";
// import { useModal } from "../../context/Modal";
// import DeleteReview from "../Reviews/DeleteReview";


// export default function SpotDetails() {
//     const { spotId } = useParams();
//     const [reloadPage, setReloadPage] = useState(false);
//     const [loading, setLoading] = useState(true);

//     const dispatch = useDispatch()
//     const thisSpot = useSelector((state) => state.spots.singleSpot ? state.spots.singleSpot : null);
//     const thisReview = useSelector((state) => state.reviews.reviews.spot ? state.reviews.reviews.spot : null);
//     const sessionUser = useSelector((state) => state.session.user);


//     useEffect(() => {
//         dispatch(getDetailsThunk(spotId));
//         dispatch(getAllReviewsThunk(spotId)).finally(() => setLoading(false))
//     }, [dispatch, spotId, reloadPage]);


//     const isUserTalking = sessionUser
//         ? Object.values(thisReview).find(reviewsArray =>
//             Object.values(reviewsArray).find(review => review.userId === sessionUser.id)
//         )
//         : {};


//     if (!thisSpot) {
//         return null;
//     }


//     if (!thisSpot.id) {
//         return null;
//     }

//     const fixDate = (dateString) => {
//         const date = new Date(dateString);
//         const formatter = new Intl.DateTimeFormat("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric"
//         });
//         return formatter.format(date);
//     };



//     return (
//         <>
//             <div className="detail-container">
//                 <div className="name-city">
//                     <h1>{thisSpot.name}</h1>
//                     <h2>{thisSpot.city}, {thisSpot.state}, {thisSpot.country}</h2>
//                 </div>
//                 <div className="photos">
//                     <div className="preview">
//                         <img className="annoying-photos" src={thisSpot.SpotImages[0]?.url} alt={thisSpot.name} />
//                     </div>
//                     <div className="four-guys">
//                         {thisSpot.SpotImages?.slice(1, 5).map((image, index) => (
//                             <div className="other-photos" key={index}>
//                                 <img className="annoying-photos" src={image.url} alt={`Image ${index + 1}`} />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="footer">
//                     <div className="hosted-by">
//                         <h3>Hosted by {thisSpot.User && thisSpot.User.firstName}{" "}{thisSpot.User && thisSpot.User.lastName}</h3>
//                         <p>{thisSpot.description}</p>
//                     </div>
//                     <div className="pay-me-container">
//                         <div className="rating-reviews">
//                             <p className="price-p-tag">
//                                 <span className="spot-price">${thisSpot.price} {" "} </span>night
//                             </p>
//                             {thisSpot.avgStarRating > 0 && <p className="rating">★{thisSpot.avgStarRating.toFixed(1)}</p>}
//                             {!thisSpot.avgStarRating && <p className="new">★New</p>}
//                             {thisSpot.numReviews !== undefined && thisSpot.numReviews === 1 && (<h3>· {"    "} {thisSpot.numReviews} {"    "}Review</h3>)}
//                             {thisSpot && thisSpot.numReviews > 1 && <h3>· {"    "} {thisSpot.numReviews} {"    "}Reviews</h3>}
//                         </div>
//                         <button className="reserve-button" type="button" onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
//                     </div>
//                 </div>
//                 <hr></hr>
//                 <h4><div className="rating-reviews-two">
//                     {thisSpot.avgStarRating > 0 && <p className="rating-two">★{thisSpot.avgStarRating.toFixed(1)}</p>}
//                     {!thisSpot.avgStarRating && <p className="new-two">★New</p>}
//                     {thisSpot && thisSpot.numReviews !== undefined && thisSpot.numReviews > 1 && <h3>· {"    "} {thisSpot.numReviews} {"    "}Reviews</h3>}
//                 </div></h4>
//                 {(!isUserTalking) && (thisSpot.User.id !== sessionUser.id) && <div className="create-Review">
//                     <OpenModalButton
//                         buttonText="Post Your Review"
//                         modalComponent={<CreateReviewModal
//                             spotId={thisSpot.id}
//                             setReloadPage={setReloadPage}
//                         />} />
//                 </div>}
//                 {thisReview.Reviews && thisReview.Reviews.length >= 1 ? ((thisReview.Reviews.slice().reverse().map((review, index) => (
//                     <div className="bottom-reviews">
//                         <div key={index} className="bottom-reviews-bunch">
//                             <h3>{review.User.firstName}</h3>
//                             <p className="datedate"> {fixDate(review.createdAt)} </p>
//                         </div>
//                         <p className="pushin-p"> "{review.review}" </p>
//                         {review.userId === (sessionUser ? sessionUser.id : null) && <OpenModalButton buttonText="Delete" modalComponent={<DeleteReview reviewId={review.id} spotId={thisSpot.id} setReloadPage={setReloadPage} />} />}
//                     </div>
//                 )))) : (<div className="be-the-first"> Be the first to post a review! </div>)}
//             </div>
//         </>
//     );
// };

import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton/index"
import "./Spots.css/SpotDetails.css"
import CreateReviewModal from "../Reviews/CreateReviewModal";
import { useModal } from "../../context/Modal";
import DeleteReview from "../Reviews/DeleteReview";


export default function SpotDetails() {
    const { spotId } = useParams();
    const [reloadPage, setReloadPage] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    const thisSpot = useSelector((state) => state.spots.singleSpot ? state.spots.singleSpot : null);
    const thisReview = useSelector((state) => state.reviews.reviews.spot ? state.reviews.reviews.spot : null);
    const sessionUser = useSelector((state) => state.session.user);

    console.log("ss......", sessionUser)

    useEffect(() => {
        dispatch(getDetailsThunk(spotId));
        dispatch(getAllReviewsThunk(spotId)).finally(() => setLoading(false))
    }, [dispatch, spotId, reloadPage]);


    const isUserTalking = sessionUser
        ? Object.values(thisReview).find(reviewsArray =>
            Object.values(reviewsArray).find(review => review.userId === sessionUser.id)
        )
        : {};


    if (!thisSpot) {
        return null;
    }


    if (!thisSpot.id) {
        return null;
    }

    const fixDate = (dateString) => {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        return formatter.format(date);
    };

    const sortItOut = Array.isArray(thisReview.Reviews) ? [...thisReview.Reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    if (!sortItOut) return null;



    return (
        <>
            <div className="detail-container">
                <div className="name-city">
                    <h1>{thisSpot.name}</h1>
                    <h2>{thisSpot.city}, {thisSpot.state}, {thisSpot.country}</h2>
                </div>
                <div className="photos">
                    <div className="preview">
                        <img className="annoying-photos" src={thisSpot.SpotImages[0]?.url} alt={thisSpot.name} />
                    </div>
                    <div className="four-guys">
                        {thisSpot.SpotImages?.slice(1, 5).map((image, index) => (
                            <div className="other-photos" key={index}>
                                <img className="annoying-photos" src={image.url} alt={`Image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <div className="hosted-by">
                        <h3>Hosted by {thisSpot.User && thisSpot.User.firstName}{" "}{thisSpot.User && thisSpot.User.lastName}</h3>
                        <p>{thisSpot.description}</p>
                    </div>
                    <div className="pay-me-container">
                        <div className="rating-reviews">
                            <p className="price-p-tag">
                                <span className="spot-price">${thisSpot.price} {" "} </span>night
                            </p>
                            {thisSpot.avgStarRating > 0 && <p className="rating">★{thisSpot.avgStarRating.toFixed(1)}</p>}
                            {!thisSpot.avgStarRating && <p className="new">★New</p>}
                            {thisSpot.numReviews !== undefined && thisSpot.numReviews === 1 && (<h3>· {"    "} {thisSpot.numReviews} {"    "}Review</h3>)}
                            {thisSpot && thisSpot.numReviews > 1 && <h3>· {"    "} {thisSpot.numReviews} {"    "}Reviews</h3>}
                        </div>
                        <button className="reserve-button" type="button" onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
                    </div>
                </div>
                <hr></hr>
                <h4><div className="rating-reviews-two">
                    {thisSpot.avgStarRating > 0 && <p className="rating-two">★{thisSpot.avgStarRating.toFixed(1)}</p>}
                    {!thisSpot.avgStarRating && <p className="new-two">★New</p>}
                    {thisSpot.numReviews !== undefined && thisSpot.numReviews === 1 && (<h3>· {"    "} {thisSpot.numReviews} {"    "}Review</h3>)}
                    {thisSpot && thisSpot.numReviews !== undefined && thisSpot.numReviews > 1 && <h3>· {"    "} {thisSpot.numReviews} {"    "}Reviews</h3>}
                </div></h4>
                {(!isUserTalking) && (thisSpot.User.id !== sessionUser.id) && <div className="create-Review">
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<CreateReviewModal
                            spotId={thisSpot.id}
                            setReloadPage={setReloadPage}
                        />} />
                </div>}
                {sortItOut && sortItOut.length >= 1 ? ((sortItOut.map((review, index) => (
                    <div className="bottom-reviews">
                        <div key={index} className="bottom-reviews-bunch">
                            <h3>{review.User.firstName}</h3>
                            <p className="datedate"> {fixDate(review.createdAt)} </p>
                        </div>
                        <p className="pushin-p"> "{review.review}" </p>
                        {review.userId === (sessionUser ? sessionUser.id : null) && <OpenModalButton buttonText="Delete" modalComponent={<DeleteReview reviewId={review.id} spotId={thisSpot.id} setReloadPage={setReloadPage} />} />}
                    </div>
                )))) : (<div className="be-the-first"> Be the first to post a review! </div>)}
            </div>
        </>
    );
};
