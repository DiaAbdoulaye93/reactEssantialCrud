import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

class Student extends Component {
    state = {
        students: [],
        loading: true,
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/list-student');
        if (res.data.status === 200) {
            console.log('students', res);
            this.setState({
                students: res.data.students,
                loading: false,
            })
        }
    }
    deletestudent = async (id, e) => {
        e.preventDefault();
        let res2 = '';
        Swal.fire({
            title: 'Voulez vous vraiment supprimer cet étudiant',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirmer',
            denyButtonText: 'Annuler',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.res2 = axios.delete('http://localhost:8000/api/delete-student/' + id);
                if (this.res2) {
                    swal({
                        title: "Super",
                        text: 'tres bien',
                        icon: "success",
                        button: 'OK'
                    })
                }
                else {
                    swal({
                        title: "Erreur",
                        text: "eror",
                        icon: "error",
                        button: 'OK'
                    })
                }
            } else if (result.isDenied) {
                swal.fire('Annulation reussi', '', 'info')
            }
        })
    }
    render() {
        var student_Liste = "";
        if (this.state.loading) {
            student_Liste = <tr><td colSpan="7"> <h2>Chargement des des donnés</h2> </td></tr>
        } else {
            student_Liste = this.state.students.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.nom}</td>
                        <td>{item.prenom}</td>
                        <td>{item.cours}</td>
                        <td>{item.email}</td>
                        <td>{item.telephone}</td>
                        <td><Link to={'detail-student/' + item.id} className="btn btn-success btn-sm">Modifier</Link></td>
                        <td><button className="btn btn-danger btn-sm" onClick={(e) => this.deletestudent(item.id, e)}>Supprimer</button></td>
                    </tr>
                )
            })
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <div className="card-header">
                            <h4>
                                Liste des étudiants
                                <Link to={'add-student'} className="btn btn-primary bt-sm float-end">
                                    Ajouter un étudiants
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered tabme-striped">
                                <thead>
                                    <tr>
                                        <th>Prenom</th>
                                        <th>Nom</th>
                                        <th>Cours</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Modifier</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student_Liste}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Student