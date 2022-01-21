import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
class EditStudent extends Component {
    state = {
        prenom: '',
        nom: '',
        cours: '',
        email: '',
        telephone: '',

    }
   
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    async componentDidMount() {
    
        const res = await axios.get('http://localhost:8000/api/detail-student/2');
        console.log(res);
        if (res.data.status === 200) {
            console.log(res.data.student);
            this.setState({
                prenom: res.data.student.prenom,
                nom: res.data.student.nom,
                cours: res.data.student.cours,
                email: res.data.student.email,
                telephone: res.data.student.telephone,
            })
        }
    }
    
    editStudent = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:8000/api/edit-student', this.state);
        if (res.data.status === 200) {
            console.log(res.data.message);
            this.setState({
                prenom: '',
                nom: '',
                cours: '',
                email: '',
                telephone: '',
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="card-header">
                            <h4>
                                Modifier un étudiant
                                <Link to={'/'} className="btn btn-primary bt-sm float-end">
                                    Afficher la liste des étudiants
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.editStudent}>
                                <div className="form-group mb-3">
                                    <label>Prenom</label>
                                    <input type="text" name="prenom" onChange={this.handleInput} value={this.state.prenom} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Nom</label>
                                    <input type="text" name="nom" onChange={this.handleInput} value={this.state.nom} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Cours</label>
                                    <input type="text" name="cours" onChange={this.handleInput} value={this.state.cours} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Téléphone</label>
                                    <input type="text" name="telephone" onChange={this.handleInput} value={this.state.telephone} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-primary">
                                        Modifier
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(EditStudent);
