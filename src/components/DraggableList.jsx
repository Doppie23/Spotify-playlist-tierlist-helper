import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CardNummer from "./CardNummer";

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

StrictModeDroppable.propTypes = {
  children: PropTypes.node,
};

function DragabbleList({ CurritemList, setCurrItemList }) {
  // const { CurritemList, setCurrItemList } = useContext(ItemsContext);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...CurritemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setCurrItemList(updatedList);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDrop}>
        <StrictModeDroppable droppableId="list-container">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {CurritemList.map((item, index) => (
                <Draggable key={item.track.id} draggableId={item.track.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <CardNummer Nummer={item} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
}

DragabbleList.propTypes = {
  CurritemList: PropTypes.array,
  setCurrItemList: PropTypes.func,
};
export default DragabbleList;
