import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { MdArrowBack, MdRestore, MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';

export default function LendingTrash() {
    const [lendingTrash, setLendingTrash] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        axios.get('http://localhost:8000/lending/trash', config)
        .then(res => {
            setLendingTrash(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            } else {
                setError('Terjadi kesalahan saat memuat data sampah.');
            }
        });
    }, [navigate]);

    const restoreLending = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin mengembalikan barang ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, kembalikan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const accessToken = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                axios.put(`http://localhost:8000/lending/restore/${id}`, null, config)
                .then(() => {   
                    setLendingTrash(lendingTrash.filter(lending => lending.id !== id));
                    Swal.fire(
                        'Berhasil!',
                        'Barang telah berhasil dikembalikan.',
                        'success'
                    );
                })
                .catch(err => {
                    setError('Gagal mengembalikan barang.');
                });
            }
        });
    };

    const permanentDeleteLending = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus barang ini secara permanen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const accessToken = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                axios.delete(`http://localhost:8000/lending/permanent/${id}`, config)
                .then(() => {
                    setLendingTrash(lendingTrash.filter(lending => lending.id !== id));
                    Swal.fire(
                        'Berhasil!',
                        'Barang telah berhasil dihapus secara permanen.',
                        'success'
                    );
                })
                .catch(err => {
                    setError('Gagal menghapus barang secara permanen.');
                });
            }
        });
    };

    const permanentDeleteAll = () => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus semua barang secara permanen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus semuanya!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const accessToken = localStorage.getItem('access_token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                };

                axios.delete(`http://localhost:8000/lending/permanent`, config)
                .then(() => {
                    setLendingTrash([]);
                    Swal.fire(
                        'Berhasil!',
                        'Semua barang telah berhasil dihapus secara permanen.',
                        'success'
                    );
                })
                .catch(err => {
                    setError('Gagal menghapus semua barang secara permanen.');
                });
            }
        });
    };

    return (
        <Case>
            <div className="block w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">User Trash</h5>
                        <div className="flex">
                            <button className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg mr-2 flex items-center">
                                <Link to="/lending" className="flex items-center">
                                    <MdArrowBack className="w-6 h-6 mr-1"/>
                                    Kembali
                                </Link>
                            </button>
                            <button className="px-4 py-2 bg-red-700 text-white shadow-md border-sky-500 rounded-lg mr-2 flex items-center" onClick={permanentDeleteAll}>
                                <MdDeleteForever className="w-6 h-6 mr-1"/>
                                Hapus Semua
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
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">No</th>
                                    <th className="border px-4 py-2">Stuff ID</th>
                                    <th className="border px-4 py-2">Date Time</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">User ID</th>
                                    <th className="border px-4 py-2">Notes</th>
                                    <th className="border px-4 py-2">Total Stuff</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lendingTrash.map((lending, index) => (
                                    <tr key={lending.id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{lending.stuff_id}</td>
                                        <td className="border px-4 py-2">{lending.date_time}</td>
                                        <td className="border px-4 py-2">{lending.name}</td>
                                        <td className="border px-4 py-2">{lending.user_id}</td>
                                        <td className="border px-4 py-2">{lending.notes}</td>
                                        <td className="border px-4 py-2">{lending.total_stuff}</td>
                                        <td className="border px-4 py-2">
                                            <button className="mr-2 text-green-500 hover:text-green-700" onClick={() => restoreLending(lending.id)}>
                                                <MdRestore className="w-6 h-6" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => permanentDeleteLending(lending.id)}>
                                                <MdDeleteForever className="w-6 h-6" />
                                            </button>
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
