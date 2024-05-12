import DetailContent from '@/components/common/detail-common/detail-content';
import pathnames from '@/pathnames';
import { notificationActions } from '@/redux/notification-slice';
import { useAppDispatch } from '@/redux/store';
import OpportunitiesService, { IOpportunities } from '@/services/opportunities';
import StageService, { IStage } from '@/services/stages';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

type SortedColumnsType = {
    [key: string]: IOpportunities[];
};

const BoardManagement = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const initialColumns: { [key: string]: IOpportunities[] } = {};

    const [columns, setColumns] = useState(initialColumns);
    const [dataStages, setDataStages] = useState<IStage[]>([]);
    const [opportunities, setDataOpportunities] = useState<IOpportunities[]>([]);

    const handleDragEnd = async (result: DropResult) => {
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

        // Chèn vào cột mới
        destColumn.splice(destination.index, 0, movedTask);

        // Cập nhật state với dữ liệu mới
        setColumns(newColumns);

        const movedOpportunity = opportunities.find(opportunity => opportunity.id === draggableId);

        if (movedOpportunity) {
            // Tạo dữ liệu mới
            const dataFormatted = {
                ...movedOpportunity, // Sử dụng toàn bộ dữ liệu từ movedOpportunity
                stage: {
                    id: destination.droppableId
                }
            };

            try {
                const res = await OpportunitiesService.updateBoard(dataFormatted as any);
                if (res) dispatch(notificationActions.setNotification({ type: 'success', message: 'Move successfully' }));
            } catch (error) {
                console.error('API error: handleDragEnd', error);
            }
        } else {
            console.error('Opportunity not found with ID:', draggableId);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const [stagesRes, opportunitiesRes] = await Promise.all([StageService.getStage(), OpportunitiesService.getOpportunities()]);

            if (stagesRes) setDataStages(stagesRes);
            if (opportunitiesRes) setDataOpportunities(opportunitiesRes);

            const newColumns = { ...initialColumns };

            opportunitiesRes.forEach(opportunity => {
                const stageName = opportunity.stage.name;
                newColumns[stageName] = [...(newColumns[stageName] || []), opportunity];
            });

            const sortedColumns: SortedColumnsType = {};
            stagesRes.forEach(stage => {
                sortedColumns[stage.id] = newColumns[stage.name] || [];
            });

            setColumns(sortedColumns);
        };

        fetchData();
    }, []);

    return (
        <DetailContent>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex' }}>
                    {Object.entries(columns).map(([columnId, tasks]) => (
                        <div key={columnId} style={{ margin: 8 }}>
                            <h2>{dataStages.find(stage => stage.id === columnId)?.name}</h2>
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
                                                        onClick={() => navigation(pathnames.boardManagement.edit.path + `/${task.id}`)}
                                                    >
                                                        {task.company}
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
        </DetailContent>
    );
};

export default BoardManagement;
