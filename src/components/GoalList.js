import React, { useEffect } from "react";
import '../App.css';


const GoalList = props => {
    console.log(props.goals, 'goalss----------')
    return (
        <>

            <h1>Course</h1>
            <ul className='goal-list'>
                {props.goals.map((item) => {
                    return (
                        <>
                            <li>{item.text}</li> </>
                    )
                })}
            </ul>
        </>

    )
}

export default GoalList;