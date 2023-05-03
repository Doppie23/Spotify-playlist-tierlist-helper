import { useState, useEffect, useContext } from "react";
import { Card, Box, Typography, CardContent, CardMedia } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ItemsContext } from "../pages/GroveSorteer";

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

function CardNummer({ Nummer }) {
  const getArtist = () => {
    let artists = [];
    Nummer.track.artists.forEach((artistObject) => {
      artists.push(artistObject.name);
    });
    return artists.join(", ");
  };

  return (
    <Card sx={{ display: "flex", margin: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5" sx={{ fontSize: 20 }}>
            {Nummer.track.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: 12 }}>
            {getArtist()}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous">{theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">{theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton> */}
        </Box>
      </Box>
      <CardMedia sx={{ marginLeft: "auto", width: 80 }} component="img" image={Nummer.track.album.images[1].url} alt="album cover" />
    </Card>
  );
}

function DragabbleList() {
  const { CurritemList, setCurrItemList } = useContext(ItemsContext);

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

export default DragabbleList;
