import { useState } from 'react';
import { CursorTrail } from './CursorTrail';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const radarData = [
  { subject: 'Script & Vocabulary', A: 91, fullMark: 100 },
  { subject: 'Conversation', A: 100, fullMark: 100 },
  { subject: 'Listening', A: 91, fullMark: 100 },
  { subject: 'Reading', A: 91, fullMark: 100 },
];

const funFactsData = [
  {
    image: '/ramen.png',
    title: 'Ramen Lover',
    description: 'Semangkuk ramen hangat selalu berhasil membuat hariku lebih baik.'
  },
  {
    image: '/kyoto.png',
    title: 'Kyoto Explorer',
    description: 'Kuil-kuil tua dan jalanan tradisional Kyoto selalu memberikan ketenangan.'
  },
  {
    image: '/budaya-jepang.png',
    title: 'Pecinta Budaya',
    description: 'Mempelajari budaya Jepang membuat saya lebih menghargai tradisi.'
  }
];

function FlipCard({ image, title, description }: { image: string, title: string, description: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-[180px] sm:w-full shrink-0 snap-center aspect-[4/5] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="w-full h-full transition-transform duration-500 relative"
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-2"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-[#FF5757] rounded-2xl shadow-sm p-5 flex flex-col justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-white font-medium text-sm mb-3">{title}</h4>
          <p className="text-white/90 text-[13px] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
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
      <div className="w-full h-[100vh] sm:w-[1200px] sm:max-w-[95vw] sm:h-[1000px] sm:max-h-[90vh] bg-[#f0f0f0] sm:rounded-[20px] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row overflow-hidden relative">
        {/* Sidebar / Header */}
        <div className="w-full sm:w-[260px] shrink-0 pt-4 flex flex-col relative bg-[#f0f0f0] z-10">
          {/* Mac Window Controls */}
          <div className="flex gap-2 px-6 mb-4 sm:mb-8">
            <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f56]"></div>
            <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]"></div>
            <div className="w-[11px] h-[11px] rounded-full bg-[#27c93f]"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 flex items-center justify-between sm:justify-start mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <img src="/avatar-rosalina.png" alt="Profile" className="w-[45px] h-[45px] rounded-full object-cover border border-gray-200 shadow-sm" />
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium tracking-wide leading-tight mb-0.5">Mentor Bahasa Jepang</span>
                <span className="text-[16px] font-bold text-gray-900 leading-tight">Rosalina</span>
              </div>
            </div>
            
            {/* Mobile Hamburger Menu (hidden on desktop) */}
            <button className="sm:hidden w-[45px] h-[45px] bg-[#FF5757] rounded-full flex items-center justify-center text-white shadow-sm">
              <i className="ph ph-list text-xl"></i>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block border-b border-gray-200/80 mx-6 mb-6"></div>

          {/* Navigation */}
          <nav className="hidden sm:flex flex-col gap-1 px-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-200/50"
              >
                <i className={`ph-duotone ${item.icon} text-xl ${activeMenu === item.name ? 'text-[#FF5757]' : 'text-[#FF5757]'}`}></i>
                <span className={`text-[15px] ${activeMenu === item.name ? 'font-bold text-black' : 'font-medium text-gray-600'}`}>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="sm:hidden absolute bottom-0 left-0 w-full bg-[#FF5757] flex justify-around items-center py-4 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-20">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className="flex flex-col items-center justify-center w-14 h-14"
            >
              <i className={`ph ${item.icon} text-[32px] ${activeMenu === item.name ? 'text-white' : 'text-white/60'}`}></i>
            </button>
          ))}
        </div>

        {/* Main Content Area Wrapper */}
        <div className="flex-1 p-4 sm:pl-0 h-full overflow-hidden pb-24 sm:pb-4 relative">
          {/* Inner White Container with Notebook Lines */}
          <div
            className="bg-white rounded-xl shadow-sm h-full w-full overflow-y-auto relative"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #f0f0f0 39px, #f0f0f0 40px)',
              backgroundSize: '100% 40px',
              backgroundPosition: '0 10px'
            }}
          >
            <div className="p-6 sm:p-12 relative z-10">
              {activeMenu === 'Tentangku' && (
                <div className="animate-fade-in max-w-[800px] mx-auto">
                  <h1 className="text-[28px] sm:text-[32px] font-bold text-black mb-6 sm:mb-8">Tentangku</h1>

                  {/* Card 1: Greeting */}
                  <div className="bg-[#f8f8f8] rounded-[24px] p-5 sm:p-6 mb-4 flex flex-col sm:flex-row sm:justify-between items-start shadow-sm border border-gray-50 relative">
                    <div className="flex gap-4 sm:gap-6 items-start sm:items-center">
                      <img src="/avatar-rosalina.png" alt="Profile Large" className="w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] rounded-full object-cover shadow-sm border border-gray-100" />
                      <div className="flex flex-col">
                        <h2 className="text-[#FF5757] text-[20px] sm:text-[24px] font-bold mb-1 leading-tight pr-12 sm:pr-0">こんにちは 👋</h2>
                        <p className="text-black text-[16px] sm:text-[18px] font-semibold mb-2 sm:mb-1">Aku Rosalina..</p>
                        <p className="text-gray-600 text-[13px] sm:text-[15px] leading-relaxed">Mari belajar bahasa Jepang dengan cara yang menyenangkan!</p>
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 sm:static flex gap-2 sm:gap-3 text-[20px] sm:text-[26px] items-center">
                      <span className="fi fi-id rounded-sm shadow-sm overflow-hidden" title="Indonesia"></span>
                      <span className="fi fi-jp rounded-sm shadow-sm overflow-hidden" title="Japan"></span>
                    </div>
                  </div>

                  {/* Card 2: Profil */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-5 sm:p-6 mb-4 shadow-sm border border-gray-50">
                    <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Profil</h3>
                    <p className="text-gray-600 text-[14px] sm:text-[15px] leading-[1.8]">
                      Berawal dari kecintaan terhadap budaya Jepang, kini saya membantu siswa mencapai tujuan mereka dalam bahasa Jepang—mulai dari JLPT, Kaiwa, hingga persiapan studi dan kerja di Jepang.
                    </p>
                  </div>

                  {/* Card 3: Fun Fact */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
                    <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Fun Fact</h3>
                    <div className="flex sm:grid sm:grid-cols-3 overflow-x-auto gap-4 pb-2 sm:pb-0 snap-x hide-scrollbar">
                      {funFactsData.map((fact, index) => (
                        <FlipCard key={index} {...fact} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === 'Sertifikatku' && (
                <div className="animate-fade-in w-full max-w-[800px] mx-auto">
                  <h1 className="text-[28px] sm:text-[32px] font-bold text-black mb-6 sm:mb-8">Sertifikatku</h1>

                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Left: Certificate Image */}
                    <div className="flex-1 bg-[#f8f8f8] p-3 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center w-full">
                      <img src="/sertifikat.png" alt="Sertifikat" className="w-full h-auto rounded-xl shadow-sm border border-gray-50" />
                    </div>

                    {/* Right: Radar Chart & Total Score */}
                    <div className="flex-1 bg-[#f8f8f8] p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col w-full">
                      <h3 className="text-center font-bold text-gray-800 mb-2">Score Breakdown</h3>
                      <ResponsiveContainer width="100%" height={220}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#999', fontSize: 10 }} />
                          <Radar name="Score" dataKey="A" stroke="#FF5757" fill="#FF5757" fillOpacity={0.5} />
                        </RadarChart>
                      </ResponsiveContainer>

                      {/* Total Score Bar */}
                      <div className="w-full mt-6 px-2">
                        <div className="flex justify-between items-end mb-3">
                          <div>
                            <span className="text-xs font-semibold text-gray-500 block mb-1 uppercase tracking-wide">Total Score</span>
                            <h4 className="text-3xl font-bold text-[#FF5757] leading-none">233 <span className="text-sm font-medium text-gray-400">points</span></h4>
                          </div>
                          <div className="text-right text-[11px] text-gray-400">
                            Range: 10-250<br />
                            Passing: 200
                          </div>
                        </div>

                        <div className="relative h-2.5 bg-gray-100 rounded-full w-full mt-2 mb-4">
                          {/* Colored Fill */}
                          <div className="absolute top-0 left-0 h-full bg-[#FF5757] rounded-full transition-all duration-1000 ease-out" style={{ width: '92.9%' }}></div>

                          {/* Marker at 233 */}
                          <div className="absolute top-1/2 w-4 h-4 bg-white border-[3px] border-[#FF5757] rounded-full shadow-sm z-20" style={{ left: '92.9%', transform: 'translate(-50%, -50%)' }}></div>

                          {/* Ticks and Labels */}
                          <div className="absolute top-full mt-1.5 left-0 text-[11px] font-medium text-gray-400">10</div>

                          <div className="absolute top-0 h-full w-[2px] bg-white z-10" style={{ left: '79.1%' }}></div>
                          <div className="absolute top-full mt-1.5 text-[11px] font-medium text-gray-400" style={{ left: '79.1%', transform: 'translateX(-50%)' }}>200</div>

                          <div className="absolute top-full mt-1.5 right-0 text-[11px] font-medium text-gray-400">250</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === 'Materi Belajar' && (
                <div className="animate-fade-in max-w-[800px] mx-auto">
                  <h1 className="text-[32px] font-bold text-black mb-2">Materi Belajar</h1>
                  <p className="text-gray-500 text-[14px] mb-8">Pilih target belajarmu dan mulai perjalanan menuju Jepang!</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {/* N5 Card */}
                    <div className="bg-[#f8f8f8] rounded-[24px] p-8 shadow-sm border border-gray-50 flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="text-[64px] font-bold text-[#FF5757] leading-none tracking-tighter">N5</h2>
                        <img src="/n5-ilustrasi.png" alt="N5 Illustration" className="w-[130px] h-auto object-contain absolute top-4 right-2" />
                      </div>

                      <p className="text-black font-medium text-[15px] mb-6 relative z-10">Beginner/Pemula</p>

                      <div className="flex flex-col gap-4 mb-4 flex-1">
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-book-bookmark text-xl text-gray-600"></i>
                          <span>8 Pertemuan / Bulan</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-users text-xl text-gray-600"></i>
                          <span>Private 1 on 1</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-book-open text-xl text-gray-600"></i>
                          <span>Modul Belajar Termasuk</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-800 text-[14px] font-medium">
                          <div className="flex items-center gap-3">
                            <i className="ph ph-target text-xl text-gray-600"></i>
                            <span>Target Selesai</span>
                          </div>
                          <span>5 Bulan</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 my-6"></div>

                      <div className="flex flex-col mb-6">
                        <div className="ml-8 mb-1">
                          <span className="text-[#4b4b4b] font-bold text-[20px] relative inline-block tracking-wide">
                            280.000
                            <img src="/line.svg" alt="" className="absolute left-[-10%] top-1/2 w-[120%] h-auto transform -translate-y-1/2 pointer-events-none" />
                          </span>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-black font-medium text-[18px] mb-1.5">Rp</span>
                          <span className="text-[52px] font-bold text-black leading-none tracking-tight">150.000</span>
                          <span className="text-black text-[18px] mb-1.5 font-medium">/bulan</span>
                        </div>
                      </div>

                      <a
                        href="https://wa.me/6285763534912?text=Halo%20Kak%20Rosalina,%20saya%20tertarik%20untuk%20daftar%20kelas%20N5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#FF5757] hover:bg-[#ff4444] text-white font-medium py-3.5 rounded-full transition-colors text-center text-[15px]"
                      >
                        Pilih Kelas N5
                      </a>
                    </div>

                    {/* N4 Card */}
                    <div className="bg-[#f8f8f8] rounded-[24px] p-8 shadow-sm border border-gray-50 flex flex-col relative overflow-hidden">
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="text-[64px] font-bold text-[#346dc0] leading-none tracking-tighter">N4</h2>
                        <img src="/n4-ilustrasi.png" alt="N4 Illustration" className="w-[130px] h-auto object-contain absolute top-4 right-2" />
                      </div>

                      <p className="text-black font-medium text-[15px] mb-6 relative z-10">Basic</p>

                      <div className="flex flex-col gap-4 mb-4 flex-1">
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-book-bookmark text-xl text-gray-600"></i>
                          <span>8 Pertemuan / Bulan</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-users text-xl text-gray-600"></i>
                          <span>Private 1 on 1</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-800 text-[14px] font-medium">
                          <i className="ph ph-book-open text-xl text-gray-600"></i>
                          <span>Modul Belajar Termasuk</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-800 text-[14px] font-medium">
                          <div className="flex items-center gap-3">
                            <i className="ph ph-target text-xl text-gray-600"></i>
                            <span>Target Selesai</span>
                          </div>
                          <span>5 Bulan</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 my-6"></div>

                      <div className="flex flex-col mb-6">
                        <div className="ml-8 mb-1">
                          <span className="text-[#4b4b4b] font-bold text-[20px] relative inline-block tracking-wide">
                            350.000
                            <img src="/line.svg" alt="" className="absolute left-[-10%] top-1/2 w-[120%] h-auto transform -translate-y-1/2 pointer-events-none" />
                          </span>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-black font-medium text-[18px] mb-1.5">Rp</span>
                          <span className="text-[52px] font-bold text-black leading-none tracking-tight">150.000</span>
                          <span className="text-black text-[18px] mb-1.5 font-medium">/bulan</span>
                        </div>
                      </div>

                      <a
                        href="https://wa.me/6285763534912?text=Halo%20Kak%20Rosalina,%20saya%20tertarik%20untuk%20daftar%20kelas%20N4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#346dc0] hover:bg-[#2b5a9e] text-white font-medium py-3.5 rounded-full transition-colors text-center text-[15px]"
                      >
                        Pilih Kelas N4
                      </a>
                    </div>
                  </div>
                  
                  {/* Apa yang akan kamu dapatkan */}
                  <div className="hidden mt-8 bg-[#f8f8f8] rounded-[24px] p-8 shadow-sm border border-gray-50">
                    <h3 className="text-[18px] font-bold text-black mb-8 text-center">Apa yang akan kamu dapatkan?</h3>
                    
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-col items-center text-center flex-1 px-1">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#fff0f0] flex items-center justify-center mb-4 border border-red-50">
                          <i className="ph-duotone ph-book-open text-[32px] text-[#FF5757]"></i>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-snug font-medium">Materi terstruktur<br/>dari dasar hingga mahir</p>
                      </div>

                      <div className="flex flex-col items-center text-center flex-1 px-1">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#f0f4ff] flex items-center justify-center mb-4 border border-blue-50">
                          <i className="ph-duotone ph-headphones text-[32px] text-[#346dc0]"></i>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-snug font-medium">Latihan mendengar<br/>dan berbicara</p>
                      </div>

                      <div className="flex flex-col items-center text-center flex-1 px-1">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#fff0f0] flex items-center justify-center mb-4 border border-red-50">
                          <i className="ph-duotone ph-pencil-line text-[32px] text-[#FF5757]"></i>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-snug font-medium">Latihan soal JLPT<br/>dan pembahasan</p>
                      </div>

                      <div className="flex flex-col items-center text-center flex-1 px-1">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#fff0f0] flex items-center justify-center mb-4 border border-red-50">
                          <i className="ph-duotone ph-chat-circle-dots text-[32px] text-[#FF5757]"></i>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-snug font-medium">Feedback langsung<br/>dari sensei</p>
                      </div>

                      <div className="flex flex-col items-center text-center flex-1 px-1">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#f0f4ff] flex items-center justify-center mb-4 border border-blue-50">
                          <i className="ph-duotone ph-certificate text-[32px] text-[#346dc0]"></i>
                        </div>
                        <p className="text-[13px] text-gray-700 leading-snug font-medium">Persiapan studi &<br/>karier di Jepang</p>
                      </div>
                    </div>
                  </div>

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
