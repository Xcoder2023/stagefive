"use client"

import React, { useState, DragEvent } from 'react';

interface Item {
  id: number;
  name: string;
  bgColor: string;
  imgSrc: string;
}

const DraggableComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'GitHub', bgColor: '#1A1A1A', imgSrc: 'images/github.png' },
    { id: 2, name: 'YouTube', bgColor: '#EE3939', imgSrc: 'images/youtube.png' },
    { id: 3, name: 'LinkedIn', bgColor: '#2D68FF', imgSrc: 'images/linkedin.png' }
  ]);

  const onDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const droppedOnId = parseInt(e.currentTarget.dataset.id || '', 10);

    if (draggedId !== droppedOnId) {
      const updatedItems = [...items];
      const draggedItem = updatedItems.find(item => item.id === draggedId);
      const droppedOnItemIndex = updatedItems.findIndex(item => item.id === droppedOnId);

      if (draggedItem) {
        // Remove the dragged item and insert it at the new position
        updatedItems.splice(updatedItems.findIndex(item => item.id === draggedId), 1);
        updatedItems.splice(droppedOnItemIndex, 0, draggedItem);

        setItems(updatedItems);
      }
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col gap-5'>
      {items.map(item => (
        <div
          key={item.id}
          className='w-[237px] h-[56px] flex justify-between rounded-lg p-[16px] text-[#ffff]'
          style={{ backgroundColor: item.bgColor }}
          draggable
          onDragStart={(e) => onDragStart(e, item.id)}
          onDrop={onDrop}
          onDragOver={onDragOver}
          data-id={item.id}
        >
          <div className='flex gap-1 items-center'>
            <img src={item.imgSrc} alt="" />
            <p>{item.name}</p>
          </div>
          <img src="images/arrow.png" alt="" />
        </div>
      ))}
    </div>
  );
};

export default DraggableComponent;
