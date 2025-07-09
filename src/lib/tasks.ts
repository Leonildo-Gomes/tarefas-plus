import { doc, collection, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";
import { TaskProps, CommentProps } from "@/src/types";

/**
 * Busca os detalhes de uma tarefa específica no Firestore.
 * @param id - O ID da tarefa a ser buscada.
 * @returns Um objeto com os dados da tarefa, ou null se a tarefa não for encontrada ou não for pública.
 */
export async function fetchTaskById(id: string): Promise<TaskProps | null> {
    const taskRef = doc(db, "tarefas", id);
    const taskSnapshot = await getDoc(taskRef);

    if (!taskSnapshot.exists() || !taskSnapshot.data()?.public) {
        return null;
    }

    const taskData = taskSnapshot.data();
    const miliseconds = taskData.created.toMillis();

    const task: TaskProps = {
        id: taskSnapshot.id,
        tarefa: taskData.tarefa,
        public: taskData.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: taskData.user,
    };

    return task;
}

/**
 * Busca todos os comentários associados a uma tarefa.
 * @param taskId - O ID da tarefa para a qual os comentários serão buscados.
 * @returns Uma lista de comentários.
 */
export async function fetchCommentsByTaskId(taskId: string): Promise<CommentProps[]> {
    const commentsQuery = query(collection(db, "comments"), where("taskId", "==", taskId));
    const commentsSnapshot = await getDocs(commentsQuery);

    const allComments: CommentProps[] = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        comment: doc.data().comment,
        user: doc.data().user,
        name: doc.data().name,
        taskId: doc.data().taskId,
    }));

    return allComments;
}