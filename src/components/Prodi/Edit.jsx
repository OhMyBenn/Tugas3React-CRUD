
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [listFakultas, setListFakultas] = useState("");
  const [error, setError] = useState(null);

  // Mengambil data fakultas berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`) // Mengirimkan request GET untuk mendapatkan data
      .then((response) => {
        setNama(response.data.result.nama); // Jika sukses, mengisi state 'nama' dengan nama fakultas daro response
        setFakultas(response.data.result.fakulats_id)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); // Menampilkan pesan error di console jika request gagal
        setError("Data tidak ditemukan"); // Menampilkan pesan error jika data tidak ditemukan
      });

      axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas`)
      .then((response) => {
        setListFakultas(response.data.result)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setError("Data tidak di temukan")
      })
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  //Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, { nama, fakultas_id: fakulats }) //Mengirimkan request Patch untuk mengupdate data fakultas berdasarkan ID
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Prodi updated successfully",
          icon: "success",
        });
        navigate("/prodi"); // Jika update berhasil, navigasi kembali ke halaman list fakultas
      })
      .catch((error) => {
        console.error("Error updating data", error); // Menampilkan error di console jika ada kesalahan
        Swal.fire("Error", "There was an issue deleting the data.", "error"); //Mengubah state 'error' jika terjadi kesalahan dalam proses update
      });
  };
  return (
    <div>
      <h2>Edit Prodi</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger"> {error}</p>} {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {/* Form untuk mengedit nama Fakultas*/}
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Prodi
          </label>
          {/* Label untuk input nama*/}
          <input
            type="text"
            className="form-control"
            id="nama"
            value={nama} // Mengisi nilai input dengan state 'nama'
            onChange={handleFakultasChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            required //Input wajib diisi
          />
        </div>
        <button type="submit" className=" btn btn-primary">
          Save
        </button>
        {/* Tombol untuk submit form*/}
      </form>
    </div>
  );
}
