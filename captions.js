/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Kesirler farklı kılıklarda', en: 'Fractions in different clothes',
      note: 'Kesirler hayatta farklı kılıklarda karşımıza çıkar: tarifte 2 tam 1 bölü 4 bardak un, markette 0,75 kilo peynir, mağazada yüzde 25 indirim, şişede 5 bölü 4 litre süt.' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'Yüzlük kartta 75 kare: 0,75', en: '75 squares on a hundred grid: 0.75',
      note: '0,75 kilo peyniri yüzlük kartla gösterelim. Yüzlük kart 100 eşit kareden oluşur ve bir bütündür. 75 kareyi boyarız: 75 bölü 100, yani 0,75.' },
    { scene: 2, start: 19.6, end: 27.8, tr: '0,75 = %75 = 3/4', en: '0.75 = 75% = 3/4',
      note: 'Yüzde, yüzde kaç demektir: %75. Kartı dört eşit parçaya bölersek boyalı kısım dörtte üç. 0,75, yüzde 75 ve 3 bölü 4 aynı miktardır.' },
    { scene: 3, start: 28.6, end: 36.6, tr: '2 dolu bardak ve bir çeyrek', en: 'Two full cups and a quarter',
      note: 'Tarifteki 2 tam 1 bölü 4 bardak unu bardaklarla gösterelim: 2 dolu bardak ve bir çeyrek. Kaç çeyrek var? 4 artı 4 artı 1, 9 çeyrek.' },
    { scene: 3, start: 37.0, end: 45.8, tr: '2 1/4 = 9/4 = 2,25', en: '2 1/4 = 9/4 = 2.25',
      note: 'Sayı doğrusunda da gösterelim: 2’den sonra bir çeyrek. 2 tam 1 bölü 4, 9 bölü 4 ve 2,25 aynı noktadır.' },
    { scene: 4, start: 46.6, end: 54.0, tr: '%25 = 25/100 = 1/4', en: '25% = 25/100 = 1/4',
      note: 'Yüzde 25 indirim: yüzlük kartta 25 kare. 25 kare, kartın tam dörtte biri: 1 bölü 4.' },
    { scene: 4, start: 54.4, end: 63.8, tr: '80 TL’nin %25’i: 20 TL', en: '25% of 80 TL: 20 TL',
      note: '80 liralık ürünü dört eşit parçaya bölelim: her parça 20 lira. Yüzde 25 indirim, bir parça: 20 lira.' },
    { scene: 5, start: 64.6, end: 72.0, tr: 'Her modelin güçlü yanı', en: 'What each model is good at',
      note: 'Modelleri karşılaştıralım. Yüzlük kart ondalık ve yüzde gösterimlerini okumayı kolaylaştırır. Sayı doğrusu 1’den büyük kesirleri yerleştirmeye uygundur. Somut model günlük durumu canlandırır.' },
    { scene: 5, start: 72.4, end: 79.8, tr: 'Duruma uygun modeli seç', en: 'Choose the model that fits',
      note: 'Karar verelim: her durumda en kullanışlı modeli seçeriz.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Bir kesir, farklı gösterimler', en: 'One fraction, many forms',
      note: 'Aklında kalsın: 3 bölü 4, 0,75 ve yüzde 75 aynı miktarın farklı gösterimleridir.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Doğru modeli seç!', en: 'Pick the right model!',
      note: 'Duruma uygun modeli seç!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
