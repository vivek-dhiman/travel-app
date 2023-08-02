import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

let AddTimeSlot = () => {
    let [localTimeSlot, setTimeSlot] = useState({
        travelAgentID: "",
        timeSlot: "",
    });

    let navigate = useNavigate();
    let [user, setUser] = useState({});
    let [timeSlots, setPosts] = useState({});
    //   let [loading,setLoading] = useState(true);
    let [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem("devroom")) {
            navigate("/users/login");
        }
        setLoggedIn(true);
    }, []);


    const getUser = async () => {
        let { data } = await axios.get("/api/users/me", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("devroom")}`,
            },
        });
        setUser(data.user);
        //  console.log(data.user);
    };

    const getTimeSlots = async () => {
        let { data } = await axios.get("/api/posts/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("devroom")}`,
            },
        });
        setPosts(data.timeSlots);
        // console.log(data.posts);
        //   setLoading(false);
    };


    useEffect(() => {
        if (loggedIn) {
            getUser().then(() => {
                getTimeSlots();
            });
        }
    }, [loggedIn]);

    let updateInput = (e) => {
        setTimeSlot({
            ...localTimeSlot,
            [e.target.name]: e.target.value,
        });
    };

    let submitTimeSlot = async (e) => {
        e.preventDefault();
        if (localTimeSlot.text.trim() !== "") {
            const { data } = await axios.post("/api/posts/", localTimeSlot, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("devroom")}`,
                },
            })
            Swal.fire("Time Slot added successfully", "", "success");
            console.log(user);
            getTimeSlots();
        }

        setTimeSlot({
            travelAgentID: "",
            timeSlot: "",
        });
    };

    return (
        <React.Fragment>

            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">Add time slots here!</p>
                            <p>
                                Post your achievements, suceess and needs and share with other
                                developers!
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {(Object.keys(user).length > 0) && (
                            <div className="col-md-8">
                                <form onSubmit={submitTimeSlot}>
                                    <div className="input-group mb-2">
                                        <input type="datetime-local" name="timeSlot" value="" />
                                    </div>
                                    <div>
                                        <input
                                            type="submit"
                                            className="btn btn-teal btn-sm"
                                            value="Post"
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
export default AddTimeSlot;
