import React from 'react';
import { IComment } from '../types/types';

interface CommentProps {
    comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
    return (
        <div className="comment-container">
            <div>{comment.description}</div>
            <div>{comment.date}</div>
        </div>
    );
}
