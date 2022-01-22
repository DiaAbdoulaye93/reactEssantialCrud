import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
class Addstudent extends Component {
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
    saveStudent = async (e)=>{
       e.preventDefault(); 
       const res=await axios.post('http://localhost:8000/api/add-student', this.state);
       if(res.data.status === 200)
       {
            swal({
                title: "Super",
                text: res.data.message,
                icon: "success",
                button: 'OK'
            })
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
                    <div className="col-md-6">

                        <div className="card-header">
                            <h4>
                                Ajouter un étudiant
                                <Link to={'/'} className="btn btn-primary bt-sm float-end">
                                    Liste des étidiants
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.saveStudent}>
                                <div className="form-group mb-3">
                                    <label>Prenom</label>
                                    <input type="text" name="prenom" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Nom</label>
                                    <input type="text" name="nom" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Cours</label>
                                    <input type="text" name="cours" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                </div>  <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Téléphone</label>
                                    <input type="text" name="telephone" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <button className="btn btn-primary">
                                        Ajouter un etudiant
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
export default Addstudent 