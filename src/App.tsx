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
      className="relative w-full aspect-[4/5] cursor-pointer group"
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
                className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-200/50"
              >
                <i className={`ph-duotone ${item.icon} text-xl ${activeMenu === item.name ? 'text-[#FF5757]' : 'text-[#FF5757]'}`}></i>
                <span className={`text-[15px] ${activeMenu === item.name ? 'font-bold text-black' : 'font-medium text-gray-600'}`}>{item.name}</span>
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
                  <div className="bg-[#f8f8f8] rounded-2xl p-6 mb-4 flex justify-between items-start shadow-sm border border-gray-50">
                    <div className="flex gap-6 items-center">
                      <img src="/avatar-rosalina.png" alt="Profile Large" className="w-[80px] h-[80px] rounded-full object-cover shadow-sm border border-gray-100" />
                      <div className="flex flex-col">
                        <h2 className="text-[#FF5757] text-[24px] font-bold mb-1 leading-tight">こんにちは 👋</h2>
                        <p className="text-black text-[18px] font-semibold mb-1">Aku Rosalina..</p>
                        <p className="text-gray-600 text-[15px]">Mari belajar bahasa Jepang dengan cara yang menyenangkan!</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[26px] items-center">
                      <span className="fi fi-id rounded-sm shadow-sm overflow-hidden" title="Indonesia"></span>
                      <span className="fi fi-jp rounded-sm shadow-sm overflow-hidden" title="Japan"></span>
                    </div>
                  </div>

                  {/* Card 2: Profil */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-6 mb-4 shadow-sm border border-gray-50">
                    <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Profil</h3>
                    <p className="text-gray-600 text-[15px] leading-[1.8]">
                      Berawal dari kecintaan terhadap budaya Jepang, kini saya membantu siswa mencapai tujuan mereka dalam bahasa Jepang—mulai dari JLPT, Kaiwa, hingga persiapan studi dan kerja di Jepang.
                    </p>
                  </div>

                  {/* Card 3: Fun Fact */}
                  <div className="bg-[#f8f8f8] rounded-2xl p-6 shadow-sm border border-gray-50">
                    <h3 className="text-[#FF5757] text-[16px] font-bold mb-3">Fun Fact</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {funFactsData.map((fact, index) => (
                        <FlipCard key={index} {...fact} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeMenu === 'Sertifikatku' && (
                <div className="animate-fade-in w-full max-w-[800px] mx-auto">
                  <h1 className="text-[32px] font-bold text-black mb-8">Sertifikatku</h1>
                  
                  <div className="flex gap-6 items-start">
                    {/* Left: Certificate Image */}
                    <div className="flex-1 bg-[#f8f8f8] p-3 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
                      <img src="/sertifikat.png" alt="Sertifikat" className="w-full h-auto rounded-xl shadow-sm border border-gray-50" />
                    </div>

                    {/* Right: Radar Chart & Total Score */}
                    <div className="flex-1 bg-[#f8f8f8] p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col w-full">
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
                            Range: 10-250<br/>
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
