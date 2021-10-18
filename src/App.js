import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

const item = {
  id: v4(),
  name: "Clean the house",
  subject:" Do something",
  description:"fasdfasf afdsf asdf df dfsd fdsfgs sg sdg "
}

const item2 = {
  id: v4(),
  name: "Wash the car",
  subject:" Do something",
  description:"fasdfasf afdsf asdf df dfsd fdsfgs sg sdg "

}

function App() {
  const [text, setText] = useState("")
  const [show,setShow] = useState(false)
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item, item2]
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
              subject: text2,
              description: text1,

            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
    setText1("")
    setText2("")
  }

  return (
    <div className="App">
      
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <h1>{data.items.description}</h1>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        {console.log(index)}
                        return(
                          
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              // console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                      
                                  onClick={()=>setShow(true)}
                                >
                                  {console.log(el.id)}
                                  <h3 className="heading">{el.name}</h3>  <br/>
                                  <h4>{el.subject}</h4> <br/>
                                  <h5>{el.description}</h5>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
      <div>
        <h1>Create</h1>
        <input placeholder="Title" type="text" value={text} onChange={(e) => setText(e.target.value)}/> <br/>
        <input placeholder="Subject" type="text" value={text2} onChange={(e) => setText2(e.target.value)}/> <br/>
        <input placeholder="Description" type="text" value={text1} onChange={(e) => setText1(e.target.value)}/>
        <button  className="button" onClick={addItem}>Add</button>
        <div>

        </div>
      </div>
      
        {console.log(item.name)}
        {show?
        <div>
          <h3 className="heading">{item.name}</h3>  <br/>
          <h4>{item.subject}</h4> <br/>
          <h5>{item.description}</h5>
        </div>:null}
      </div>
  );
}

export default App;
