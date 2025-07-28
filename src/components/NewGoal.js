import React, { useState } from "react";



const NewGoal = (props) => {
    const [enteredText, setEnteredtext] = useState('')
    const addcoursehandler = (event) => {
        event.preventDefault();

        const data =
        {
            id: Math.random().toString(),
            text: enteredText
        }

        // console.log(data)
        props.addonGoals(data)
        setEnteredtext('')

    }

    const updateValue = (e) => {
        setEnteredtext(e.target.value)
    }
    return (

        <>
            <form onSubmit={addcoursehandler}>
                <input type="text" value={enteredText} onChange={updateValue} />
                <button type="submit">Add goal</button>
            </form>
        </>
    )
}

export default NewGoal;