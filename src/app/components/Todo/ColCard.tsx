import { Draggable } from "react-beautiful-dnd"
import { TodoType } from "src/models/Todo"
import { ImBin } from 'react-icons/im';


interface Props {
    index: number,
    card: TodoType,
    handleDelete: (id: number) => void
}

export default function ColCard({ index, card, handleDelete }: Props) {
    return (
        <Draggable key={card.id} draggableId={'' + card.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='bg-white mt-3 rounded-sm shadow-lg p-2 cursor-pointer'>
                        <div className="flex justify-between">
                            {card.title}
                            <ImBin color="red" onClick={() => handleDelete(card.id)}/>
                        </div>
                        <div className=" text-sm text-gray-400 ml-3 mt-1">
                            {card.content}
                        </div>
                    </div>

                </div>
            )}
        </Draggable>

    )
}