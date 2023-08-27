import { csrfFetch } from "./csrf";



//types

const GET_ALL_REVIEWS = "reviews/GET_REVIEWS"


//action creator

const actionGetReview = (reviews) => ({ type: GET_ALL_REVIEWS, reviews });


//Thunks

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)


    if (res.ok) {
        const Reviews = await res.json(); // { Spots: [] }
        // do the thing with this data
        dispatch(actionGetReview((Reviews)));

        return Reviews;
    } else {
        const errors = await res.json();
        return errors;
    }
};


// normalizeArr


//Reducer

const initialState = { allSpots: {}, singleSpot: {}, reviews: { spot: {}, user: {} }, isLoading: true };

export default function reviewReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS:
            newState = { ...state, reviews: { spot: {}, user: {} }  }
            newState.reviews.spot = action.reviews
            return newState;
        default:
            return state;
    }
}
