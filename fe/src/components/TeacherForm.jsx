import React, { useState } from 'react';
import { Upload, Trash2, Plus } from 'lucide-react';

const TeacherForm = ({ positions, onSubmit, onCancel }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dob: '',
        identity: '',
        address: '',
        positionId: '',
        degrees: []
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const addDegree = () => {
        setFormData(prev => ({
            ...prev,
            degrees: [
                ...prev.degrees,
                { type: 'Cử nhân', school: '', major: '', year: '', isGraduated: false }
            ]
        }));
    };

    const removeDegree = (index) => {
        const newDegrees = formData.degrees.filter((_, i) => i !== index);
        setFormData({ ...formData, degrees: newDegrees });
    };

    const handleDegreeChange = (index, field, value) => {
        const newDegrees = [...formData.degrees];
        newDegrees[index][field] = value;
        setFormData({ ...formData, degrees: newDegrees });
    };

    return (
        <div className="flex gap-8 p-2">

            <div className="w-1/4 flex flex-col items-center">
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-purple-500 hover:text-purple-500 bg-gray-50 transition-colors group">
                    <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold">Tải ảnh lên</span>
                </div>
            </div>


            <div className="w-3/4 space-y-8">


                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-1 bg-purple-600 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 text-lg">Thông tin cá nhân</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                            <input name="name" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="VD: Nguyễn Văn A" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Ngày sinh <span className="text-red-500">*</span></label>
                            <input type="date" name="dob" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Số điện thoại</label>
                            <input name="phoneNumber" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Nhập số điện thoại" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email</label>
                            <input name="email" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="example@school.edu.vn" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Số CCCD</label>
                            <input name="identity" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Nhập số CCCD" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Địa chỉ</label>
                            <input name="address" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Địa chỉ thường trú" />
                        </div>
                    </div>
                </div>


                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-1 bg-purple-600 rounded-full"></div>
                        <h3 className="font-bold text-gray-800 text-lg">Thông tin công tác</h3>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5">Vị trí công tác <span className="text-red-500">*</span></label>
                        <select name="positionId" onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white">
                            <option value="">-- Chọn vị trí --</option>
                            {positions.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                        </select>
                    </div>
                </div>


                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-1 bg-purple-600 rounded-full"></div>
                            <h3 className="font-bold text-gray-800 text-lg">Học vị</h3>
                        </div>
                        <button
                            type="button"
                            onClick={addDegree}
                            className="text-xs bg-white border border-gray-300 px-3 py-1.5 rounded hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-colors flex items-center gap-1 font-medium shadow-sm"
                        >
                            <Plus size={14} /> Thêm
                        </button>
                    </div>


                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-purple-50 text-gray-700 font-semibold">
                                <tr>
                                    <th className="p-3 w-1/5">Bậc</th>
                                    <th className="p-3 w-1/4">Trường</th>
                                    <th className="p-3 w-1/4">Chuyên ngành</th>
                                    <th className="p-3 w-1/6">Trạng thái</th>
                                    <th className="p-3 w-1/6">Tốt nghiệp</th>
                                    <th className="p-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {formData.degrees.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-400 italic">
                                            Chưa có thông tin học vị. Nhấn "Thêm" để nhập liệu.
                                        </td>
                                    </tr>
                                ) : (
                                    formData.degrees.map((deg, index) => (
                                        <tr key={index} className="group hover:bg-gray-50">

                                            <td className="p-2">
                                                <select
                                                    value={deg.type}
                                                    onChange={(e) => handleDegreeChange(index, 'type', e.target.value)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                                                >
                                                    <option value="Cử nhân">Cử nhân</option>
                                                    <option value="Kỹ sư">Kỹ sư</option>
                                                    <option value="Thạc sĩ">Thạc sĩ</option>
                                                    <option value="Tiến sĩ">Tiến sĩ</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            </td>

                                            <td className="p-2">
                                                <input
                                                    value={deg.school}
                                                    onChange={(e) => handleDegreeChange(index, 'school', e.target.value)}
                                                    placeholder="Tên trường..."
                                                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                                                />
                                            </td>

                                            <td className="p-2">
                                                <input
                                                    value={deg.major}
                                                    onChange={(e) => handleDegreeChange(index, 'major', e.target.value)}
                                                    placeholder="Chuyên ngành..."
                                                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                                                />
                                            </td>

                                            <td className="p-2">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={deg.isGraduated}
                                                        onChange={(e) => handleDegreeChange(index, 'isGraduated', e.target.checked)}
                                                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                                    />
                                                    <span className="text-gray-600 text-xs">Hoàn thành</span>
                                                </label>
                                            </td>

                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={deg.year}
                                                    onChange={(e) => handleDegreeChange(index, 'year', e.target.value)}
                                                    placeholder="Năm"
                                                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-purple-500"
                                                />
                                            </td>

                                            <td className="p-2 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeDegree(index)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                    <button onClick={onCancel} className="px-5 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
                        Hủy bỏ
                    </button>
                    <button onClick={() => onSubmit(formData)} className="px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 shadow-md transition-all active:scale-95">
                        Lưu lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherForm;