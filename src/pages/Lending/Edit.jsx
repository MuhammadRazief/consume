import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function LendingEdit() {
    const [forms, setForms] = useState({
        stuff_id: '',
        date_time: '',
        name: '',
        user_id: '',
        notes: '',
        total_stuff: ''
    });

    const params = useParams();
    const id = params.id;
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get(`lending/show/${id}`)
            .then(res => {
                setForms(res.data.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, [id]);

    const handleEditLending = (event) => {
        event.preventDefault();

        instance.put(`lending/update/${id}`, forms)
            .then(res => {
                Swal.fire({
                    title: "Success!",
                    text: "Your changes have been saved.",
                    icon: "success"
                }).then(() => {
                    navigate('/lending');
                });
            })
            .catch(err => {
                setError(err.response.data.data);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForms({ ...forms, [name]: value });
    };

    return (
        <Case name='Lending Edit'>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {error && Object.keys(error).length > 0 && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    {Object.entries(error).map(([key, value]) => (
                                        <li key={key}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                    </div>
                    <form onSubmit={handleEditLending} className="max-w-sm mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Barang</label>
                                <input
                                    type="text"
                                    id="stuff_id"
                                    name="stuff_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik ID Barang"
                                    required
                                    value={forms.stuff_id}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal & Waktu</label>
                                <input
                                    type="datetime-local"
                                    id="date_time"
                                    name="date_time"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    value={forms.date_time}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik Nama Barang"
                                    required
                                    value={forms.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Pengguna</label>
                                <input
                                    type="text"
                                    id="user_id"
                                    name="user_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik ID Pengguna"
                                    required
                                    value={forms.user_id}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik Catatan"
                                    required
                                    value={forms.notes}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="total_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah Barang</label>
                                <input
                                    type="number"
                                    id="total_stuff"
                                    name="total_stuff"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik Jumlah Barang"
                                    required
                                    value={forms.total_stuff}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
