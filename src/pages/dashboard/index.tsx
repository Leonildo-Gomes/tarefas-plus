import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styles from "./styles.module.css";
export default function Dashboard() {
    return (
        <div className={styles.container}>
            <Head>    
                <title>Meu Painel de Tarefas</title>         
            </Head>
            <h1>Dashboard</h1>
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
            session
        }
    }
}