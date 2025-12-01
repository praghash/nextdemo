"use client";
import { FixedSizeList } from 'react-window';


const Row = ({ index, style, data }) => (
  <div style={style} className="row">
    {/* Render PRIMITIVE VALUES, not objects */}
    ID: {data[index].id} | Date: {data[index].date}
  </div>
);


const ReactWindow = ({ items }) => {
  return (
    <FixedSizeList
      height={200}         // Height of the list container
      itemCount={items.length}
      itemSize={35}        // Height of each row
      width={300}
      itemData={items}     // Pass data for rendering
    >
      {Row}
    </FixedSizeList>
  );
}

export default ReactWindow;
