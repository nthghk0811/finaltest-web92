import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">

            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>


            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh] animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;