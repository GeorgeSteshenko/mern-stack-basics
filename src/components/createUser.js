import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
    state = {
        username: ""
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    onSubmit = async e => {
        e.preventDefault();

        const user = {
            username: this.state.username,
       }

        console.log(user);

        try {
            const res = await axios.post("http://localhost:5000/users/add/", user)
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.error(error.response.data);
        }

        this.setState({
            username: ""
        })
    }
    
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;