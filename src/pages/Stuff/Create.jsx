import axios from "axios";
import { useState } from "react";
import Case from "../../components/Case";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function StuffCreate() {
    const [forms, setForms] = useState({
        name: '',
        category: ''
    });

    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForms(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateStuff = (event) => {
        event.preventDefault();

        instance.post('stuff/create', forms)
            .then(res => {
                setError([]);
                Swal.fire({
                    title: "Success!",
                    text: "Barang berhasil dibuat.",
                    icon: "success"
                }).then(() => {
                    navigate('/stuff');
                });
            })
            .catch(err => {
                console.log("Error response:", err.response);
                setError({ message: 'Terjadi kesalahan saat membuat barang. Silakan coba lagi.' });
            });
    };

    return (
        <Case>
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
                    {error && Object.keys(error).length > 0 ? (
                        <div role="alert" className="mb-4">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    <li>{error.message}</li>
                                </ul>
                            </div>
                        </div>
                    ) : null}

                    <div className="text-center mb-6">
                        <h5 className="text-3xl font-bold text-gray-900 dark:text-white">Stuff Create</h5>
                    </div>
                    <form onSubmit={handleCreateStuff} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ketik Nama Barang"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Barang</label>
                            <select
                                id="category"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={handleInputChange}
                            >
                                <option selected disabled>Pilih Kategori</option>
                                <option value="HTL">Hotel</option>
                                <option value="KLN">Kuliner</option>
                                <option value="Teknisi/Sarpras">Sarpras</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
