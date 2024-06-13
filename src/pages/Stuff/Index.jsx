import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import Swal from "sweetalert2";
import axios from "axios"; // Import axios

export default function Stuff() {
    const [stuffs, setStuffs] = useState([]);
    const [lendings,setlendings] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defec"   
    ]

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff')
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            } else {
                setError('Terjadi kesalahan saat memuat daftar barang.');
            }
        });
    }, [navigate]);

    const deleteStuff = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`stuff/destroy/${id}`)
                .then(() => {
                    setStuffs(stuffs.filter(stuff => stuff.id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                })
                .catch(err => {
                    setError('Gagal menghapus barang.');
                });
            }
        });
    };
    const handleDeleteAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`stuff/delete/all`)
                    .then(() => {
                        setStuffs([]);
                        Swal.fire({
                            title: 'Success!',
                            text: 'All items have been deleted.',
                            icon: 'success'
                        });
                    })
                    .catch(err => {
                        setError('Failed to delete all items.');
                    });
            }
        });
    };
    
    return (
        <Case>
            <div className="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                        <div className="flex">
                            <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg mr-2">
                                <Link to="/stuff/create">
                                    <small className="text-white">Tambah</small>
                                </Link>
                            </button>
                            <button className="px-4 py-2 bg-orange-700 text-white shadow-md border-sky-500 rounded-lg mr-2">
                                <Link to="/stuff/trash">
                                    <small className="text-white">Trash</small>
                                </Link>
                            </button>
                            
                            <button className="px-4 py-2 bg-red-700 text-white shadow-md border-sky-500 rounded-lg" onClick={handleDeleteAll}>
                                <small className="text-white">Delete All</small>
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Stock</th>
                                    <th scope="col" className="px-6 py-4">Lending</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuffs.map((stuff, index) => (
                                    <tr key={stuff.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{stuff.category}</td>
                                      

                                
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {stuff.stuffstock ? (
                                                <>
                                                    Total Available: {stuff.stuffstock.total_available} <br />
                                                    Total Defec: {stuff.stuffstock.total_defec}
                                                </>
                                            ) : (
                                                'Stock Belum Tersedia'
                                            )}
                                        </td>

                                        
                                        <td className="whitespace-nowrap px-6 py-4">
                                       
                                            {stuff.lendings ? (
                                                <>
                                                   Peminjaman: {stuff.lendings.length}

                                                </>
                                            ) : (
                                                'Belum Di Pinjam'
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-4 flex items-center">
                                            <Link to={`/stuff/edit/${stuff.id}`} className="mr-2">
                                                <FaEdit className="cursor-pointer text-blue-500 w-8 h-8" />
                                            </Link>
                                            <MdDelete 
                                                onClick={() => deleteStuff(stuff.id)}
                                                className="cursor-pointer text-red-500 w-8 h-8"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
