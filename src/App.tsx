import React, { useState } from 'react';
import { CursorTrail } from './CursorTrail';

function App() {
  const [activeMenu, setActiveMenu] = useState('Tentangku');

  const menuItems = [
    { name: 'Tentangku', icon: 'ph-user' },
    { name: 'Sertifikatku', icon: 'ph-certificate' },
    { name: 'Materi Belajar', icon: 'ph-book-open' },
  ];

  return (
    <>
      <CursorTrail />
      <div className="w-[1200px] max-w-[95vw] h-[800px] max-h-[90vh] bg-[#f0f0f0] rounded-[20px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[260px] shrink-0 pt-4 flex flex-col relative bg-[#f0f0f0]">
          {/* Mac Window Controls */}
          <div className="flex gap-2 px-6 mb-8">
            <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f56]"></div>
            <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]"></div>
            <div className="w-[11px] h-[11px] rounded-full bg-[#27c93f]"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 flex items-center gap-3 mb-6">
            <img src="/avatar-rosalina.png" alt="Profile" className="w-[45px] h-[45px] rounded-full object-cover border border-gray-200 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 font-medium tracking-wide leading-tight mb-0.5">Mentor Bahasa Jepang</span>
              <span className="text-[16px] font-bold text-gray-900 leading-tight">Rosalina</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-200/80 mx-6 mb-6"></div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeMenu === item.name 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-gray-200/50'
                }`}
              >
                <i className={`ph-duotone ${item.icon} text-xl ${activeMenu === item.name ? 'text-[#FF5757]' : 'text-[#FF5757]'}`}></i>
                <span className={`text-[15px] font-semibold ${activeMenu === item.name ? 'text-black' : 'text-gray-700'}`}>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area Wrapper */}
        <div className="flex-1 p-4 pl-0 h-full">
          {/* Inner White Container with Notebook Lines */}
          <div 
            className="bg-white rounded-xl shadow-sm h-full w-full overflow-y-auto relative"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #f0f0f0 39px, #f0f0f0 40px)',
              backgroundSize: '100% 40px',
              backgroundPosition: '0 10px'
            }}
          >
            <div className="p-12 relative z-10">
              {activeMenu === 'Tentangku' && (
                <div className="animate-fade-in max-w-[800px] mx-auto">
                  <h1 className="text-[32px] font-bold text-black mb-8">Tentangku</h1>
                  
                  {/* Card 1: Greeting */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-8 mb-6 flex justify-between items-start shadow-sm border border-gray-50">
                    <div className="flex gap-6 items-center">
                      <img src="/avatar-rosalina.png" alt="Profile Large" className="w-[80px] h-[80px] rounded-full object-cover shadow-sm border border-gray-100" />
                      <div className="flex flex-col">
                        <h2 className="text-[#FF5757] text-[24px] font-bold mb-1 leading-tight">こんにちは 👋</h2>
                        <p className="text-black text-[18px] font-semibold mb-1">Aku Rosalina..</p>
                        <p className="text-gray-600 text-[15px]">Mari belajar bahasa Jepang dengan cara yang menyenangkan!</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-2xl">
                      <span>🇮🇩</span>
                      <span>🇯🇵</span>
                    </div>
                  </div>

                  {/* Card 2: Details */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-8 shadow-sm border border-gray-50 flex flex-col gap-6">
                    {/* Profil Section */}
                    <div>
                      <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Profil</h3>
                      <p className="text-gray-600 text-[15px] leading-[1.8]">
                        Berawal dari kecintaan terhadap budaya Jepang, kini saya membantu siswa mencapai tujuan mereka dalam bahasa Jepang—mulai dari JLPT, Kaiwa, hingga persiapan studi dan kerja di Jepang.
                      </p>
                    </div>

                    {/* Kemampuan Section */}
                    <div>
                      <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Kemampuan</h3>
                      <ul className="flex flex-col gap-2 text-gray-600 text-[15px]">
                        <li className="flex items-center gap-2">🇯🇵 Bahasa Jepang</li>
                        <li className="flex items-center gap-2">💬 Kaiwa (Conversation)</li>
                        <li className="flex items-center gap-2">📝 JLPT Preparation</li>
                        <li className="flex items-center gap-2">🎓 Study Abroad Support</li>
                        <li className="flex items-center gap-2">🇬🇧 English</li>
                      </ul>
                    </div>

                    {/* Fun Facts Section */}
                    <div>
                      <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Fun Facts</h3>
                      <p className="text-gray-600 text-[15px] leading-[1.8]">
                        Saya sangat suka menonton anime, membaca manga, dan mendengarkan J-Pop.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeMenu === 'Sertifikatku' && (
                <div className="animate-fade-in flex flex-col h-full items-center justify-center text-gray-400 py-32">
                  <i className="ph-duotone ph-certificate text-6xl text-[#FF5757] mb-4 opacity-50"></i>
                  <p>Sertifikat akan ditampilkan di sini.</p>
                </div>
              )}

              {activeMenu === 'Materi Belajar' && (
                <div className="animate-fade-in flex flex-col h-full items-center justify-center text-gray-400 py-32">
                  <i className="ph-duotone ph-book-open text-6xl text-[#FF5757] mb-4 opacity-50"></i>
                  <p>Materi belajar akan ditampilkan di sini.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
