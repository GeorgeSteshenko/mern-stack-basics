import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateExercise extends Component {
    state = {
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    }

    async componentDidMount() {
        // this.setState({
        //     users: ["test user"],
        //     username: "test user"
        // })

        try {
            const res = await axios.get("http://localhost:5000/users/")
            const data = res.data;
            console.log(data);

            this.setState({
                users: data.map(user => user.username),
                username: data[0].username
            })
        } catch (error) {
            console.error(error.response.data);
        }
    }

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        });
    }
    onChangeDuration = e => {
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate = date => {
        this.setState({
            date
        });
    }

    onSubmit = async e => {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        try {
            const res = await axios.post("http://localhost:5000/exercises/add/", exercise)
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.error(error.response.data);
        }

        window.location = "/";
    }

    render() {
        return (
            <div><h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map((user) => {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}

export default CreateExercise;