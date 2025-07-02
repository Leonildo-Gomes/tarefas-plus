import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { TextArea } from '../../components/textarea';
import { db } from "../../services/firebaseConnection";
import styles from "./styles.module.css";

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
interface DashboardProps {
    user: {
        email: string;
    }
}

interface TaskProps {
    id: string;
    created: Date;
    tarefa: string;
    user: string;
    public: boolean;
}

export default function Dashboard({ user }:DashboardProps) {
    const [input, setInput] = useState("");
     const [publicTask, setPublicTask] = useState(false);
     const [tasks, setTasks] = useState<TaskProps[]>([]);

     useEffect(() => {
        async function loadTarefas() {
            const tarefasRef = collection(db, "tarefas");
            const queryRef = query(tarefasRef, orderBy("created", "desc"), where("user", "==", user?.email));
            onSnapshot(queryRef, (snapshot) => {
                //console.log(snapshot.docs);
                let list = [] as TaskProps[];
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        created: doc.data().created,
                        user: doc.data().user,
                        public: doc.data().public
                    })
                })
                setTasks(list);
            })
            
        }
        loadTarefas();
         
     }, [user?.email]);
    function handleOnChangePublic(event: ChangeEvent<HTMLInputElement>): void {
       // console.log(event.target.checked);
        setPublicTask(event.target.checked);
    }

    async function handleRegisterTask(event: FormEvent<HTMLFormElement>) {
       event.preventDefault();
       if(input ==="") {
        alert("Por favor preencha a tarefa");
        return;
       }
       try {
        await addDoc(collection(db, "tarefas"), {
            tarefa: input,
            public: publicTask,
            created: new Date(),
            user: user?.email
        })
        setInput("");   
        setPublicTask(false);
        
       } catch (error) {
        console.log(error);
        
       }
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef)
        .then(() => {
            console.log("Tarefa deletada com sucesso");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function handleShareTask(id: string) {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/task/${id}`);
        alert("URL da tarefa copiada com sucesso");
    }

    return (
        <div className={styles.container}>
            <Head>    
                <title>Meu Painel de Tarefas</title>         
            </Head>
            <main className={styles.main}>
                <section className= {styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual a sua próxima tarefa?</h1>
                        <form action="" onSubmit={handleRegisterTask}>
                            <TextArea
                                placeholder="Digite sua tarefa"
                                value={input}   
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)} 
                            />
                            <div className={styles.checkboxArea}>
                                <input type="checkbox" 
                                    className={styles.checkbox}
                                    checked={publicTask}
                                    onChange={handleOnChangePublic}
                                />
                                <label htmlFor="">Deixar tarefa publica?</label>
                            </div>
                            <button className={styles.button} type="submit">Criar tarefa</button>
                        </form>
                    </div>
                </section>
                <section className={styles.taskContainer}>
                    <h1> Minhas Tarefas </h1>
                    {tasks.map((item) => (
                        <article key={item.id} className={styles.task}>
                            {item.public && (
                                <div className={styles.tagContainer}>
                                    <label className={styles.tag}>PUBLICO</label>
                                    <button className={styles.shareButton} onClick={()=>handleShareTask(item.id)}>
                                        <FiShare2  size={22} color="#3183ff"/>
                                    </button>
                                </div>
                            )}
                            
                            <div className={styles.taskContent}>
                                {item.public ? (
                                    <Link href={`/task/${item.id}`}>    
                                        <p>{item.tarefa}</p>
                                    </Link>
                                ):(
                                    <p>{item.tarefa}</p>
                                    )
                                }
                                
                                <button className= {styles.trashButton} onClick={() => handleDeleteTask(item.id)} >
                                    <FaTrash size={22} color="#ea3240"/>
                                </button>
                            </div>
                        </article>
                    ))}
                    

                </section>

            </main>
        </div>
    );
}  

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req:req })
    if(!session?.user){
        //se nao tem usuario vamor redirecionar para home
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
    return {
        props: {
            user:{
                email: session?.user?.email
            }

        }
    }
}