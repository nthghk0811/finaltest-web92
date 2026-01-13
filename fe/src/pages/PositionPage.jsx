import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const PositionPage = () => {
    const [positions, setPositions] = useState([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);


    const [formData, setFormData] = useState({
        code: '', name: '', des: '', isActive: true
    });

    const API_URL = 'http://localhost:8080';

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const res = await axios.get(`${API_URL}/teacher-positions`);
            setPositions(res.data || []);
        } catch (err) { console.error(err); }
    };

    const handleCreate = async () => {
        try {
            await axios.post(`${API_URL}/teacher-positions`, formData);
            alert("Tạo vị trí thành công!");
            setDrawerOpen(false);
            fetchPositions();
            setFormData({ code: '', name: '', des: '', isActive: true });
        } catch (err) {
            alert("Lỗi: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center mb-6">
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Dữ liệu / Vị trí công tác</span>
                    <div className="mt-1">
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý Vị trí</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchPositions} className="bg-white border px-3 py-1.5 rounded text-sm hover:bg-gray-50 shadow-sm">⟳ Làm mới</button>
                    <button onClick={() => setDrawerOpen(true)} className="bg-purple-600 text-white px-3 py-1.5 rounded text-sm hover:bg-purple-700 flex items-center gap-1 shadow-sm">
                        <Plus size={16} /> Tạo mới
                    </button>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm border overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-purple-50 text-gray-700 text-xs font-bold uppercase">
                        <tr>
                            <th className="p-4 border-b">STT</th>
                            <th className="p-4 border-b">Mã</th>
                            <th className="p-4 border-b">Tên</th>
                            <th className="p-4 border-b">Trạng thái</th>
                            <th className="p-4 border-b">Mô tả</th>
                            <th className="p-4 border-b w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {positions.length === 0 ? (
                            <tr><td colSpan="6" className="p-4 text-center text-gray-500">Chưa có dữ liệu</td></tr>
                        ) : (
                            positions.map((p, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-gray-500">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-700">{p.code}</td>
                                    <td className="p-4 font-bold text-gray-800">{p.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${p.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {p.isActive ? 'Hoạt động' : 'Ngừng'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{p.des}</td>
                                    <td className="p-4 text-center cursor-pointer text-gray-400 hover:text-purple-600">⚙️</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            <Sidebar isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Tạo vị trí công tác">
                <div className="space-y-4 p-2">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Mã <span className="text-red-500">*</span></label>
                        <input value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Nhập mã (VD: CBYT)" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Tên <span className="text-red-500">*</span></label>
                        <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Nhập tên vị trí" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1">Mô tả</label>
                        <textarea value={formData.des} onChange={e => setFormData({ ...formData, des: e.target.value })} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Mô tả công việc..." rows={3}></textarea>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Trạng thái</label>
                        <div className="flex gap-2">
                            <button onClick={() => setFormData({ ...formData, isActive: true })} className={`px-4 py-2 text-sm rounded border ${formData.isActive ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600'}`}>Hoạt động</button>
                            <button onClick={() => setFormData({ ...formData, isActive: false })} className={`px-4 py-2 text-sm rounded border ${!formData.isActive ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600'}`}>Ngừng</button>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t mt-4 gap-3">
                        <button onClick={() => setDrawerOpen(false)} className="px-4 py-2 border rounded bg-white text-sm">Hủy</button>
                        <button onClick={handleCreate} className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 shadow-md">💾 Lưu lại</button>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};
export default PositionPage;