
// Arquivo central para definições de tipos reutilizáveis no projeto.

export interface TaskProps {
    id: string;
    tarefa: string;
    public: boolean;
    created: string;
    user: string;
}

export interface CommentProps {
    id: string;
    comment: string;
    user: string;
    name: string;
    taskId: string;
}

export interface TaskPageProps {
    item: TaskProps;
    allComments: CommentProps[];
}
