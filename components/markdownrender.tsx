import React from 'react';
import { Remark } from 'react-remark';

const MarkdownRenderer = ({ content }: {content:string}) => {
                    // <div className="mb-2" key={index}>
                  //   <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  //     {chat.message}
                  //   </p>
                  // </div>
  return<Remark>{content}</Remark>
};

export default MarkdownRenderer;
