import React, { useEffect, useRef } from 'react';

const chars = ['こ', 'ん', 'に', 'ち', 'は'];

export const CursorTrail = () => {
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const lastMoveTime = useRef(0);

  // Posisi visual setiap lingkaran (yang di-render ke layar)
  const circlePos = useRef(chars.map(() => ({ x: -100, y: -100 })));

  // Jejak posisi kursor — ini adalah "jalur" yang dilalui mouse
  const trail = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Inisialisasi posisi semua lingkaran saat pertama kali mouse bergerak
      if (mousePos.current.x === -100) {
        circlePos.current.forEach(c => {
          c.x = e.clientX;
          c.y = e.clientY;
        });
        // Isi trail awal dengan posisi mouse
        for (let i = 0; i < 20; i++) {
          trail.current.push({ x: e.clientX, y: e.clientY });
        }
      }

      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();

      // Deteksi elemen interaktif — sembunyikan lingkaran di atas button/link
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const isInteractive = target && typeof target.closest === 'function' && target.closest('button, a, [role="button"], input, select, textarea');

      circleRefs.current.forEach(ref => {
        if (ref) {
          ref.style.opacity = isInteractive ? '0' : '1';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    // Jarak antar lingkaran SEPANJANG jalur trail (dalam pixel)
    // Lingkaran berdiameter 44px, jadi 70px memberikan gap ~26px antar tepi lingkaran
    const SPACING = 70;

    const update = () => {
      const now = Date.now();
      const isMoving = now - lastMoveTime.current < 200;

      // ========================================
      // LANGKAH 1: Tambahkan titik baru ke trail
      // ========================================
      if (mousePos.current.x !== -100) {
        const head = trail.current[0];
        if (head) {
          const dx = mousePos.current.x - head.x;
          const dy = mousePos.current.y - head.y;
          // Hanya tambahkan titik baru jika mouse sudah bergeser > 2px
          // Ini mencegah penambahan titik berlebihan saat mouse diam
          if (dx * dx + dy * dy > 4) {
            trail.current.unshift({ x: mousePos.current.x, y: mousePos.current.y });
          }
        } else {
          trail.current.unshift({ x: mousePos.current.x, y: mousePos.current.y });
        }
      }

      // Batasi panjang trail agar tidak boros memori
      if (trail.current.length > 2000) {
        trail.current.length = 2000;
      }

      // =====================================================
      // LANGKAH 2: Tempatkan lingkaran di sepanjang jalur trail
      // =====================================================
      if (isMoving && trail.current.length > 1) {
        // --- MODE BERGERAK ---
        // Circle 0 (leader): mengikuti mouse dengan sedikit smoothing
        circlePos.current[0].x += (mousePos.current.x - circlePos.current[0].x) * 0.5;
        circlePos.current[0].y += (mousePos.current.y - circlePos.current[0].y) * 0.5;

        // Circle 1-4: ditempatkan di sepanjang jalur trail
        // Kita "berjalan" di sepanjang trail, mengukur jarak yang sudah ditempuh,
        // dan menempatkan lingkaran di titik yang berjarak SPACING * i dari awal trail.
        for (let i = 1; i < chars.length; i++) {
          const targetDist = SPACING * i; // Jarak total dari awal trail untuk lingkaran ke-i
          let accumulated = 0;
          let placed = false;

          for (let j = 1; j < trail.current.length; j++) {
            const segDx = trail.current[j].x - trail.current[j - 1].x;
            const segDy = trail.current[j].y - trail.current[j - 1].y;
            const segLen = Math.sqrt(segDx * segDx + segDy * segDy);

            if (segLen > 0 && accumulated + segLen >= targetDist) {
              // Titik target ada di dalam segmen ini — interpolasi posisinya
              const t = (targetDist - accumulated) / segLen;
              const tx = trail.current[j - 1].x + segDx * t;
              const ty = trail.current[j - 1].y + segDy * t;

              // Smooth transition ke posisi target (agar tidak loncat kasar)
              circlePos.current[i].x += (tx - circlePos.current[i].x) * 0.35;
              circlePos.current[i].y += (ty - circlePos.current[i].y) * 0.35;
              placed = true;
              break;
            }
            accumulated += segLen;
          }

          if (!placed) {
            // Trail belum cukup panjang — tempatkan di ujung trail
            const last = trail.current[trail.current.length - 1];
            circlePos.current[i].x += (last.x - circlePos.current[i].x) * 0.35;
            circlePos.current[i].y += (last.y - circlePos.current[i].y) * 0.35;
          }
        }
      } else {
        // --- MODE BERHENTI ---
        // Perlahan tarik semua lingkaran ke posisi mouse agar bertumpuk
        for (let i = 0; i < chars.length; i++) {
          circlePos.current[i].x += (mousePos.current.x - circlePos.current[i].x) * 0.03;
          circlePos.current[i].y += (mousePos.current.y - circlePos.current[i].y) * 0.03;
        }

        // Perlahan potong trail agar saat mouse mulai bergerak lagi, trail segar
        if (trail.current.length > 10) {
          trail.current.length = Math.max(10, trail.current.length - 3);
        }
      }

      // =========================================
      // LANGKAH 3: Terapkan posisi ke DOM elements
      // =========================================
      circleRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.style.transform = `translate(${circlePos.current[index].x - 22}px, ${circlePos.current[index].y - 22}px)`;
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {chars.map((char, index) => {
        // Lingkaran pertama (index 0) digambar paling depan saat bertumpuk
        const zIndex = chars.length - index;
        return (
          <div
            key={index}
            ref={(el) => (circleRefs.current[index] = el)}
            className="absolute top-0 left-0 flex items-center justify-center bg-white border-[2.5px] border-black rounded-full text-[#FF5757] font-bold shadow-sm transition-opacity duration-300"
            style={{
              width: '44px',
              height: '44px',
              fontSize: '18px',
              zIndex,
              transform: 'translate(-100px, -100px)',
              willChange: 'transform',
            }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};
