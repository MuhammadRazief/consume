import React, { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function InboundCreate() {
    const [stuffList, setStuffList] = useState([]);
    const [forms, setForms] = useState({
        stuff_id: '',
        total: '',
        date: '',
        proff_file: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff')
        .then(res => {
            setStuffList(res.data.data);
        })
        .catch(err => {
            setError('Terjadi kesalahan saat memuat daftar stuff.');
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForms(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateInbound = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('stuff_id', forms.stuff_id);
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proff_file', document.getElementById('proff_file').files[0]);
    
        instance.post('inbound/store', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            setError('');
            Swal.fire({
                title: "Success!",
                text: "Barang berhasil dibuat.",
                icon: "success"
            }).then(() => {
                setTimeout(() => {
                    navigate('/inbound');
                });
            });
        })
        .catch(err => {
            console.log("Error response:", err.response);
            setError('Terjadi kesalahan saat membuat barang. Silakan coba lagi.');
            Swal.fire({
                title: "Error!",
                text: "Terjadi kesalahan saat membuat barang. Silakan coba lagi.",
                icon: "error"
            });
        });
    };
    
    return (
        <Case>
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
                    {error && (
                        <div role="alert" className="mb-4">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        </div>
                    )}
                    <div className="text-center mb-6">
                        <h5 className="text-3xl font-bold text-gray-900 dark:text-white">Inbound Create</h5>
                    </div>
                    <form onSubmit={handleCreateInbound} className="space-y-4">
                        <div>
                            <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stuff</label>
                            <select
                                id="stuff_id"
                                name="stuff_id"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={handleInputChange}
                            >
                                <option hidden disabled selected>Select Stuff</option>
                                {stuffList.map((stuff, index) => (
                                    <option key={index} value={stuff.id}>{stuff.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Stuff</label>
                            <input
                                type="text"
                                id="total"
                                name="total"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                placeholder="Total stuff"
                                onChange={handleInputChange}
                                value={forms.total}
                            />
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={handleInputChange}
                                value={forms.date}
                            />
                        </div>
                        <div>
                            <label htmlFor="proff_file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
                            <input
                                type="file"
                                id="proff_file"
                                name="proff_file"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
