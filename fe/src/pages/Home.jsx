import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, RefreshCw, Eye, Search, ChevronLeft, ChevronRight } from 'lucide-react';

import MainLayout from '../components/MainLayout';
import Sidebar from '../components/Sidebar';
import TeacherForm from '../components/TeacherForm';
import PositionPage from './PositionPage';

const Home = () => {
    const [activeTab, setActiveTab] = useState('teachers');

    const [teachers, setTeachers] = useState([]);
    const [positions, setPositions] = useState([]);


    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    });

    const API_URL = 'http://localhost:8080';


    const fetchData = async () => {
        try {
            setLoading(true);


            const resTeacher = await axios.get(`${API_URL}/teachers`, {
                params: {
                    page: pagination.page,
                    limit: pagination.limit
                }
            });


            setTeachers(resTeacher.data.data || []);


            if (resTeacher.data.pagination) {
                setPagination(prev => ({
                    ...prev,
                    total: resTeacher.data.pagination.total,
                    totalPages: resTeacher.data.pagination.totalPages
                }));
            }

        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không kết nối được Server!");
        } finally {
            setLoading(false);
        }
    };


    const fetchPositions = async () => {
        try {
            const res = await axios.get(`${API_URL}/teacher-positions`);
            setPositions(res.data || []);
        } catch (error) { console.error(err); }
    };


    useEffect(() => {
        if (activeTab === 'teachers') {
            fetchData();
        }
        fetchPositions();
    }, [pagination.page, pagination.limit, activeTab]);


    const handleCreate = async (formData) => {
        try {
            await axios.post(`${API_URL}/teachers`, formData);
            alert("Thêm thành công!");
            setModalOpen(false);
            fetchData();
        } catch (err) {
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        }
    };


    const handleLimitChange = (e) => {
        setPagination(prev => ({
            ...prev,
            limit: Number(e.target.value),
            page: 1
        }));
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>


            {activeTab === 'teachers' && (
                <>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase">Dữ liệu / Giáo viên</span>
                            <h1 className="text-2xl font-bold text-gray-800">Quản lý Giáo viên</h1>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative hidden md:block">
                                <input className="border border-gray-300 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 shadow-sm" placeholder="Tìm kiếm..." />
                                <Search className="absolute left-3 top-2 text-gray-400 w-4 h-4" />
                            </div>
                            <button onClick={fetchData} className="bg-white border px-4 py-2 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2">
                                <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Tải lại
                            </button>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="bg-purple-600 text-white px-4 py-2 rounded shadow-sm hover:bg-purple-700 flex items-center gap-2"
                            >
                                <Plus size={16} /> Tạo mới
                            </button>
                        </div>
                    </div>


                    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 flex flex-col min-h-[500px]">
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left">
                                <thead className="bg-purple-50 text-gray-700 font-bold uppercase text-xs border-b border-purple-100">
                                    <tr>
                                        <th className="p-4">Mã</th>
                                        <th className="p-4">Giáo viên</th>
                                        <th className="p-4">Trình độ</th>
                                        <th className="p-4">Bộ môn</th>
                                        <th className="p-4">TT Công tác</th>
                                        <th className="p-4">Địa chỉ</th>
                                        <th className="p-4">Trạng thái</th>
                                        <th className="p-4">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {teachers.length === 0 ? (
                                        <tr><td colSpan="8" className="p-8 text-center text-gray-500">Không tìm thấy dữ liệu</td></tr>
                                    ) : (
                                        teachers.map((t, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-medium text-gray-600">{t.code}</td>
                                                <td className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        <img src={`https://ui-avatars.com/api/?name=${t.name}&background=random`} alt="ava" className="w-10 h-10 rounded-full mt-1 border border-gray-200" />
                                                        <div>
                                                            <div className="font-bold text-gray-800 text-sm">{t.name}</div>
                                                            <div className="text-xs text-gray-500">{t.email}</div>
                                                            <div className="text-xs text-gray-400">{t.phoneNumber}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {t.degrees && t.degrees.length > 0 ? (
                                                        <>
                                                            <div className="text-sm font-semibold text-gray-700">Bậc: {t.degrees[0].type}</div>
                                                            <div className="text-xs text-gray-500">Ngành: {t.degrees[0].major}</div>
                                                        </>
                                                    ) : <span className="text-gray-400 italic text-xs">Chưa cập nhật</span>}
                                                </td>
                                                <td className="p-4 text-gray-400 text-sm">N/A</td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {t.positions && t.positions.map((p, i) => (
                                                            <span key={i} className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{p.name}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600 max-w-[150px] truncate" title={t.address}>{t.address}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${t.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                                        {t.isActive ? 'Đang công tác' : 'Ngừng'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <button className="bg-white border border-gray-200 px-3 py-1.5 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-purple-600 flex items-center gap-1 shadow-sm">
                                                        <Eye size={14} /> Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>


                        <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span>Hiển thị</span>
                                <select
                                    value={pagination.limit}
                                    onChange={handleLimitChange}
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-purple-500 bg-white"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span> / trang</span>
                                <span className="ml-2 text-gray-400">| Tổng: {pagination.total} bản ghi</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 1}
                                    className="p-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={16} />
                                </button>


                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-8 h-8 rounded border flex items-center justify-center font-medium ${pagination.page === pageNum
                                                ? 'bg-purple-600 text-white border-purple-600'
                                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page === pagination.totalPages}
                                    className="p-1.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <Sidebar
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Thêm mới Giáo viên"
                    >
                        <TeacherForm
                            positions={positions}
                            onSubmit={handleCreate}
                            onCancel={() => setModalOpen(false)}
                        />
                    </Sidebar>
                </>
            )}

            {activeTab === 'positions' && (
                <PositionPage />
            )}

        </MainLayout>
    );
};

export default Home;