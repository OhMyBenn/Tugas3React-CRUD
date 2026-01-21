import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
    // state fakultas untuk menyimpan data response API Faklutas
    const [fakultas, setFakultas] = useState([]);

    // pangging API Fakultas menggunakan useEffect dan axios
    useEffect(() => {
        axios
            .get("https://apiif3b.vercel.app/api/api/fakultas")
            .then((response) => {
                console.log(response.data);
                setFakultas(response.data.result);
            });
    }, []);

    //Fungsi untuk menghapus fakultas
    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Periksa kembali",
            text: `Apakah kamu yakin ingin menghapus data ${nama}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // panggil axios delete
                axios.delete(`https://apiif3b.vercel.app/api/api/fakultas/${id}`)
                .then((response) => {
                    setFakultas(fakulats.filter((data) => data.id !== id))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "warning"
                });
            })
            }       
        })
    };

    return (
        <div>
            <h2>List Fakultas</h2>

            <NavLink to="/fakultas/create" className="btn btn-primary mb-3">
                Create
            </NavLink>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nama Fakultas</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {fakultas.map((data) => (
                        <tr key={data.id}>
                            <td>{data.nama}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(data.id, data.nama)}
                                    className="btn btn-danger btn-sm"> Hapus </button>
                                    <NavLink to={`/fakultas/edit/${data.id}`} className="btn btn-warning btn-sm"> Ubah </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}