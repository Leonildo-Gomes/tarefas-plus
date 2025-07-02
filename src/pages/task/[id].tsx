import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./styles.module.css";

import { TextArea } from "@/src/components/textarea";
import { db } from "@/src/services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
interface TypeProps {
    item: {
        id: string;
        tarefa: string;
        public: boolean;
        created: string;
        user: string;
    }
}
 export default function Task( {item}: TypeProps) {
    return (
        < div className={styles.container}>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>
            <main className={styles.main}>
                <h1>Task</h1>
                <article className={styles.task}>
                    <p>{item.tarefa}</p>
                </article>
            </main>


            <section className={styles.commenstContainer}>
               <h2>Deixa Comentarios</h2>
               <form action="">
                    <TextArea
                        placeholder="Deixe seu comentario..."
                        
                    />
                    <button type="submit" className= {styles.button}>
                        Enviar Comentar
                    </button>

               </form>
            </section>
        </div>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    const docRef = doc(db, "tarefas", id);
    const snapshot= await getDoc(docRef);
    if(!snapshot.exists()) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    if(!snapshot.data()?.public) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    const miliseconds = snapshot.data()?.created.toMillis();
    const task = {
        id: id,
        tarefa: snapshot.data()?.tarefa,
        public: snapshot.data()?.public,
        created: new Date(miliseconds).toLocaleDateString(),
        user: snapshot.data()?.user
       
    }
    console.log(task);
    return {
        props: {
            item: task,
        }
    }
}