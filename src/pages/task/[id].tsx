import { db } from "@/src/services/firebaseConnection";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";

import { TextArea } from "@/src/components/textarea";
import { fetchCommentsByTaskId, fetchTaskById } from "@/src/lib/tasks";
import { CommentProps, TaskPageProps } from "@/src/types";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";

// --- Componente ---

export default function Task({ item, allComments }: TaskPageProps) {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [comments, setComments] = useState<CommentProps[]>(allComments || []);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleComment(event: FormEvent) {
        event.preventDefault();
        setError(null);

        if (input.trim() === "") {
            setError("Por favor, preencha o campo de comentário.");
            return;
        }

        if (!session?.user?.email || !session?.user?.name) {
            setError("Você precisa estar logado para comentar.");
            return;
        }

        setIsSubmitting(true);

        try {
            const newComment = {
                comment: input,
                name: session.user.name,
                user: session.user.email,
                taskId: item.id,
                created: new Date(),
            };

            const docRef = await addDoc(collection(db, "comments"), newComment);

            const commentData: CommentProps = {
                id: docRef.id,
                ...newComment,
            };
            
            setComments((oldComments) => [...oldComments, commentData]);
            setInput("");

        } catch (err) {
            console.error("Erro ao adicionar comentário:", err);
            setError("Ocorreu um erro ao enviar seu comentário. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteComment(id: string) {
        try {
            const docRef = doc(db, "comments", id);
            await deleteDoc(docRef);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (err) {
            console.error("Erro ao deletar comentário:", err);
            alert("Erro ao deletar o comentário.");
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>

            <main className={styles.main}>
                <h1>Tarefa</h1>
                <article className={styles.task}>
                    <p>{item.tarefa}</p>
                </article>
            </main>

            <section className={styles.commentsContainer}>
                <h2>Deixar um comentário</h2>
                <form onSubmit={handleComment}>
                    <TextArea
                        placeholder="Deixe seu comentário..."
                        value={input}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                    />
                    {error && <p className={styles.errorText}>{error}</p>}
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={!session?.user || isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Enviar Comentário"}
                    </button>
                </form>
            </section>

            <section className={styles.commentsContainer}>
                <h2>Todos os Comentários</h2>
                {comments.length === 0 && (
                    <span>Nenhum comentário por enquanto...</span>
                )}
                {comments.map((comment) => (
                    <article key={comment.id} className={styles.comment}>
                        <div className={styles.headComment}>
                            <label className={styles.commentLabel}>{comment.name}</label>
                            {comment.user === session?.user?.email && (
                                <button className={styles.buttonTrash} onClick={() => handleDeleteComment(comment.id)}>
                                    <FaTrash size={18} color="#ea3140" />
                                </button>
                            )}
                        </div>
                        <p>{comment.comment}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}


// --- Server-Side Rendering ---

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;

    const [task, allComments] = await Promise.all([
        fetchTaskById(id),
        fetchCommentsByTaskId(id),
    ]);

    if (!task) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            item: task,
            allComments: allComments,
        },
    };
};