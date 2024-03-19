import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'React' },
  { id: 2, text: 'Angular' },
  { id: 3, text: 'Python' },
  { id: 4, text: 'IA' },
]

const App = () => {

  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleDragEnd = (result) => {

    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const todosCopy = [...todos]
    const [draggableItem] = todosCopy.splice(startIndex, 1)
    todosCopy.splice(endIndex, 0, draggableItem)

    setTodos(todosCopy)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>TODO App</h1>
      <Droppable droppableId="todos">
        {
          (provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>

              {todos.map((todo, index) => (
                <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{todo.text}</li>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}

            </ul>
          )
        }

      </Droppable>
    </DragDropContext>
  )
}

export default App
