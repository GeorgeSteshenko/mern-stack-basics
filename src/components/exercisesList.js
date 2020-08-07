import React, { Component } from "react";
import axios from "axios"
import Exercise from "./exercise";

class ExercisesList extends Component {
    state = {
        exercises: []
    }

    async componentDidMount() {
        try {
            const res = await axios.get("http://localhost:5000/exercises/")
            const data = res.data;
            console.log(data);

            this.setState({
                exercises: data
            })
        } catch (error) {
            console.error(error.response.data);
        }
    }

    deleteExercise = async id => {
        try {
            const res = await axios.get("http://localhost:5000/exercises/" + id);
            const data = res.data;
            console.log(data);

            this.setState({
                exercises: this.state.exercises.filter(item => item._id !== id)
            })
        } catch (error) {
            console.error(error.response.data);
        }
    }
    
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.exercises.map(exercise => {
                        return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
                    }) }
                </tbody>
                </table>
            </div>
        )
    }
}

export default ExercisesList;