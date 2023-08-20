import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import { Link } from "react-router-dom";
import './GetAllSpots.css'


export default function GetAllSpots() {

    const allSpotz = useSelector((state) => state.spots.allSpots);
    const allSpotzArr = Object.values(allSpotz);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    console.log("spotzzz", allSpotzArr)


    return (
        <>
            <div className="spots-main-container">
                {allSpotzArr && allSpotzArr.map((spot) => (
                    <Link
                        to={`/spots/${spot.id}`}
                        style={{ textDecoration: "none", color: "var(--black)" }}
                    >
                        <div className="spot-container" title={spot.name}>
                            <img
                                src={spot.previewImage}
                                className="spot-img"
                                alt={spot.name}
                            />
                            <div className="spot-info-flex">

                                <div className="spot-city-state-rating">
                                    <p>{`${spot.city}, ${spot.state}`}</p>
                                    <p className="night-price">
                                        <span className="price">${spot.price}</span> <span className="night-text">night</span>
                                    </p>
                                </div>
                                {spot.avgRating > 0 && <p className="rating">⭐️{spot.avgRating.toFixed(1)}</p>}
                                {!spot.avgRating && <p className="new">⭐️New</p>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
