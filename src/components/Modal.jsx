import React from "react";

export const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md  mx-2 text-center">
                <h2 className="text-lg font-bold mb-4">Attention</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};
