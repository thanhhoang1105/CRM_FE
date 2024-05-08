import BoardService, { IStage } from '@/services/board/board';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type Task = {
    id: string;
    content: string;
};

const Task = () => {
    const initialColumns: { [key: string]: Task[] } = {
        New: [
            { id: 'task-1', content: 'Task 1' },
            { id: 'task-2', content: 'Task 2' }
        ],
        QUALIFIED: [
            { id: 'task-3', content: 'Task 3' },
            { id: 'task-4', content: 'Task 4' }
        ],
        PROPOSITION: [],
        WON: [],
        LOST: []
    };

    const [columns, setColumns] = useState(initialColumns);
    const [stages, setDataStages] = useState<IStage[]>([]);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;

        // Nếu không có điểm đến hoặc nằm ở cùng một vị trí với điểm xuất phát, không làm gì
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        // Copy dữ liệu cũ
        const newColumns = { ...columns };
        const sourceColumn = newColumns[source.droppableId];
        const destColumn = newColumns[destination.droppableId];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        // Chèn task vào cột mới
        destColumn.splice(destination.index, 0, movedTask);

        // Cập nhật state với dữ liệu mới
        setColumns(newColumns);

        console.log('columns', columns, 'sourceColumn', sourceColumn);

        // try {
        //     const response = await axios.post('your-api-endpoint', {
        //         task: movedTask,
        //         sourceColumnId: source.droppableId,
        //         destinationColumnId: destination.droppableId
        //     });
        //     console.log('API response:', response.data);
        // } catch (error) {
        //     console.error('API error:', error);
        // }
    };

    useEffect(() => {
        const getStageAPI = async () => {
            const res = await BoardService.getStage();

            if (res) setDataStages(res);
        };

        getStageAPI();
    }, []);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex' }}>
                {Object.entries(columns).map(([columnId, tasks]) => (
                    <div key={columnId} style={{ margin: 8 }}>
                        <h2>{columnId}</h2>
                        <Droppable droppableId={columnId}>
                            {(provided: any) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ background: 'lightgrey', padding: 4, minWidth: 250, minHeight: 500 }}
                                >
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided: any) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: 'none',
                                                        padding: 8,
                                                        margin: '0 0 8px 0',
                                                        background: 'white',
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    {task.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Task;
