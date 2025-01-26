'use client';
import { useState } from "react";

export default function Home() {
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div id="webcrumbs"> 
        <div className="w-full h-full bg-primary-950 text-primary-50 flex md:flex-row flex-col">
          {/* Sidebar */}
          <aside className={`md:w-[260px] w-full bg-neutral-900 text-neutral-200 flex flex-col p-4 md:relative fixed h-screen transform md:translate-x-0 transition-transform duration-300 z-10 sidebar ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="mb-6">
              <button className="w-full bg-primary-500 text-primary-50 rounded-md h-[40px] flex items-center justify-center gap-2">
                <i className="fa-brands fa-g"></i>
                New Thread
              </button>
            </div>
            <div className="flex flex-col">
              <nav className="flex flex-col gap-2 mb-6">
                <a href="#" className="flex items-center gap-2 text-primary-50 font-semibold">
                  <span className="material-symbols-outlined">home</span>
                  Home
                </a>
                <a href="#" className="flex items-center gap-2">
                  <span className="material-symbols-outlined">history</span>
                  History
                </a>
                <a href="#" className="flex items-center gap-2">
                  <span className="material-symbols-outlined">inbox</span>
                  Inbox
                </a>
              </nav>
              <div>
                <h3 className="text-neutral-500 uppercase text-sm">Recent Threads</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  <li className="text-primary-50">Tokens</li>
                  <li className="text-neutral-400">View More</li>
                </ul>
              </div>
            </div>
            <div className="mt-auto text-neutral-500 text-sm">
              <ul className="flex flex-col gap-2">
                <li>Support</li>
                <li>Docs</li>
                <li>Mobile</li>
              </ul>
              <div className="mt-4 font-semibold">Chan</div>
            </div>
          </aside>
        
          {/* Toggle Button for Sidebar */}
          <button 
            onClick={handleToggleSidebar}
            className="md:hidden fixed top-4 left-4 z-20 bg-primary-500 text-primary-50 w-[40px] h-[40px] rounded-full flex items-center justify-center toggle-sidebar">
            <span className="material-symbols-outlined">menu</span>
          </button>
        
          {/* Main Content */}
          <main className="flex-1 bg-neutral-950 p-6 flex flex-col h-screen overflow-auto">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-title">Hi, I'm Agent Chan</h1>
              <button className="bg-primary-500 px-4 py-2 rounded-md text-primary-50">
                New Thread
              </button>
            </header>
            <div className="bg-neutral-900 rounded-md p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">How can I help?</h2>
              </div>
              <p className="text-neutral-400">Send me a message and I'll help you</p>
              <input
                type="text"
                placeholder="Message"
                className="w-full h-[40px] bg-neutral-800 rounded-md px-4 text-neutral-200"
              />
              <div className="flex justify-end">
                <button className="bg-primary-500 w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-50">send</span>
                </button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-4">
              {[
                "Tokens",
                "NFTs",
                "Swap",
                "Generate Image",
                "Turn that into an NFT",
                "Trending Tokens",
                "Search the Web",
                "Send",
              ].map((action, index) => (
                <button
                  key={index}
                  className="bg-neutral-800 text-neutral-200 rounded-md h-[32px] px-4 hover:bg-primary-500 hover:text-primary-50 transition"
                >
                  {action}
                </button>
              ))}
            </div>
            <section className="mt-6">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <p className="text-neutral-400">Tell Chan how to help you</p>
              <div className="mt-4">
                <h4 className="font-semibold">Agent Chan</h4>
                <p className="text-neutral-400 mt-2">
                  You are Agent Chan designed to execute specific actions and make
                  decisions based on user inputs. Your goal is to understand the user's
                  intent, utilize the tools available to you effectively, and deliver
                  clear, actionable results.
                </p>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold">Behavior Guidelines</h4>
                <ol className="list-decimal list-inside text-neutral-400 mt-2">
                  <li>
                    <span className="font-medium">Intent Understanding</span>: Carefully
                    interpret the user's input to determine their goals and the most
                    appropriate actions to achieve them.
                  </li>
                  <li>
                    <span className="font-medium">Action Execution</span>: Select and
                    execute the most suitable actions from the tools provided. You are
                    aware of the capabilities and descriptions of these tools.
                  </li>
                </ol>
              </div>
            </section>
          </main>
        </div>
    </div>
  )
}
