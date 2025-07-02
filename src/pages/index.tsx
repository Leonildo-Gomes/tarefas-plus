import Head from "next/head";
import Image from "next/image";
import heroImg from "../../public/assets/hero.png";

export default function Home() {
  /*return (
    <div className="bg-[#0f0f0f] w-full h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Tarefas+ Organize suas tarefas de forma fácil</title>
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={heroImg}
            alt="LOGO Tarefas+"
            className="max-w-md object-contain"
            priority
          />
        </div>
        <h1 className="text-white text-center my-7 leading-relaxed">
          Sistema feito para voce organizar <br />
          seus estudos e tarefas
        </h1>

        <div className="flex items-center justify-around w-full md:w-auto flex-col md:flex-row gap-2 ">
          <section className="bg-white  py-3.5 px-11 rounded cursor-pointer transition-transform duration-400 hover:scale-108 mb-4 md:mb-0 md:mr-4 text-center w-4/5 md:w-auto">
            <span>+12 posts</span>
          </section>
          <section className="bg-white py-3.5 px-11 rounded cursor-pointer transition-transform duration-400 hover:scale-108 text-center w-4/5 md:w-auto">
            <span>+90 comentarios</span>
          </section>
        </div>
      </main>
    </div>
  );*/

  return (
    <div className="bg-[#0f0f0f] w-full min-h-[calc(100vh-76px)] flex flex-col items-center justify-center">
      <Head>
        <title>Tarefas+ Organize suas tarefas de forma fácil</title>
      </Head>

      <main className="flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src={heroImg}
            alt="LOGO Tarefas+"
            className="max-w-[480px] w-auto h-auto object-contain  "
            priority
          />
        </div>

        {/* Título */}
        <h1 className="text-white text-center my-7 leading-[150%] text-3xl md:text-4xl">
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        {/* InfoContent */}
        <div className="flex items-center justify-around flex-col md:flex-row gap-4 w-full max-w-[800px] ">
          <section className="bg-[#fafafa] py-14 px-44 rounded lg:min-w-[240px]  transition-transform duration-300 hover:scale-105 w-[80%] md:w-auto text-center ">
            <span className="text-lg font-semibold">+12 posts</span>
          </section>
          <section className="bg-[#fafafa] py-[14px] px-[44px] lg:min-w-[240px] rounded transition-transform duration-300 hover:scale-105 w-[80%] md:w-auto text-center">
            <span className="text-lg font-semibold">+90 comentários</span>
          </section>
        </div>
       
      </main>
    </div>
  );
}
