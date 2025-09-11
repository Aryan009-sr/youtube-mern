import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Comment = ({ comment, user, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.comment);

    // This is the correct way to check for ownership
    // const isAuthor = user && comment.userId && String(comment.userId._id) === String(user.id);
    const isAuthor = user && comment.userId && String(comment.userId._id || comment.userId) === String(user._id || user.id);
    console.log(typeof (comment.userId._id));
    console.log(typeof (user._id));

    const handleEdit = () => {
        if (isAuthor) {
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        onEdit(comment._id, editedText);
        setIsEditing(false);
    };

    return (
        <div className="flex items-start space-x-3 p-2 bg-neutral-800 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 rounded-full">
                {/* Use optional chaining to safely access profileImage */}
                <img
                    src={comment.userId?.profileImage || '/images/profile.jpg'}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <div className="flex-1">
                <p className="text-sm font-semibold text-white">
                    {/* Use optional chaining to safely access username */}
                    {comment.userId?.username || 'Unknown User'}
                    <span className="text-xs text-neutral-400 ml-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </p>
                {isEditing ? (
                    <div className="mt-1">
                        <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="w-full bg-neutral-700 p-2 rounded text-sm text-neutral-200"
                        />
                        <div className="flex space-x-2 mt-2">
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-neutral-300 mt-1">{comment.comment}</p>
                )}
            </div>
            {/* Show edit/delete buttons only if the user is the author and not editing */}
            {isAuthor && !isEditing && (
                <div className="flex space-x-2 text-neutral-400">
                    <button onClick={handleEdit} className="hover:text-white transition-colors">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(comment._id)} className="hover:text-red-500 transition-colors">
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Comment;