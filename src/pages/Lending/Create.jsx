import { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LendingCreate() {
    const [stuffList, setStuffList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [forms, setForms] = useState({
        stuff_id: '',
        date_time: '',
        name: '',
        user_id: '',
        notes: '',
        total_stuff: '',
    });

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
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

    useEffect(() => {
        instance.get('stuff')
            .then(res => {
                setStuffList(res.data.data);
            })
            .catch(err => {
                setError('Terjadi kesalahan saat memuat daftar stuff.');
            });

        instance.get('user')
            .then(res => {
                setUserList(res.data.data);
            })
            .catch(err => {
                setError('Terjadi kesalahan saat memuat daftar pengguna.');
            });
    }, []);

    const handleCreateLending = (event) => {
        event.preventDefault();
        instance.post('lending/store', forms)
            .then(res => {
                setError([]);
                Swal.fire({
                    title: "Success!",
                    text: "Barang berhasil dibuat.",
                    icon: "success"
                }).then(() => {
                    navigate('/lending');
                });
            })
            .catch(err => {
                console.log("Error response:", err.response);
                setError({ message: 'Terjadi kesalahan saat membuat barang. Silakan coba lagi.' });
                console.log(err.response);
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
                        <h5 className="text-3xl font-bold text-gray-900 dark:text-white">Lending Create</h5>
                    </div>
                    <form onSubmit={handleCreateLending} className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date-Time</label>
                                <input
                                    type="datetime-local"
                                    id="date_time"
                                    name="date_time"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
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
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
                                <select
                                    id="user_id"
                                    name="user_id"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={handleInputChange}
                                >
                                    <option hidden disabled selected>Select User</option>
                                    {userList.map((user, index) => (
                                        <option key={index} value={user.id}>{user.username}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                                <label htmlFor="notes" className="block mb-2text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                                <input
                                    type="text"
                                    id="notes"
                                    name="notes"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ketik Catatan"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="total_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Stuff</label>
                                <input
                                    type="number"
                                    id="total_stuff"
                                    name="total_stuff"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="total stuff"
                                    required
                                    onChange={handleInputChange}
                                />
                            </div>
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

