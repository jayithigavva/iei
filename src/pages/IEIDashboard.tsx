import { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type DistrictStats = {
  name: string;
  mean: number;
  min: number;
  max: number;
  count: number;
};

type PersonalRecord = {
  name: string;
  age: number | string;
  gender: string;
  district: number;
  inputs: {
    lt300: number;
    hours: number;
    night: string;
    debt: string;
    debtSrc: string;
    bank: string;
    eShram: string;
    pmjay: string;
    pmsym: string;
    asp: string;
    skillJob: string;
  };
  dim: { income: number; social: number; debt: number; skills: number; mobility: number };
  overall: number;
};

const baseDistricts: DistrictStats[] = [
  { name: "Bhopal", mean: 55.94, min: 47.5, max: 67.5, count: 4 },
  { name: "Faridabad", mean: 35.0, min: 30.0, max: 40.0, count: 1 },
  { name: "Gwalior", mean: 50.5, min: 20.0, max: 81.25, count: 5 },
  { name: "Jaipur (Barodia Basti)", mean: 43.19, min: 10.0, max: 75.0, count: 20 },
  { name: "Jaipur (General Factories/Workers)", mean: 55.66, min: 5.0, max: 88.75, count: 51 },
  { name: "Jaipur (Jawahar Nagar)", mean: 40.28, min: 5.0, max: 78.75, count: 9 },
  { name: "Jaipur (Pani Pech)", mean: 31.25, min: 15.0, max: 47.5, count: 2 },
  { name: "Jaipur (Sodala)", mean: 50.0, min: 50.0, max: 50.0, count: 1 },
  { name: "Jaipur (Vidyadharnagar)", mean: 37.97, min: 25.0, max: 46.25, count: 8 },
  { name: "Mumbai (Dharavi)", mean: 54.46, min: 40.0, max: 70.0, count: 7 },
  { name: "Punjab (Factory)", mean: 43.48, min: 17.5, max: 71.25, count: 14 },
];

function scoreToColor(score: number): string {
  const clamp = Math.max(0, Math.min(1, score / 60));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const r = Math.round(lerp(30, 230, clamp));
  const g = Math.round(lerp(80, 70, clamp));
  const b = Math.round(lerp(200, 70, clamp));
  return `rgb(${r},${g},${b})`;
}

const IEIDashboard = () => {
  const [activeTab, setActiveTab] = useState<"survey" | "dashboard">("dashboard");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [districts, setDistricts] = useState<DistrictStats[]>(baseDistricts);
  const [selectedDistrictIdx, setSelectedDistrictIdx] = useState(0);
  const [personal, setPersonal] = useState<PersonalRecord | null>(null);
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const barRef = useRef<HTMLCanvasElement | null>(null);
  const heatRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Translations
  const t = {
    en: {
      title: "Informal Economy Index (IEI)",
      survey: "Survey",
      dashboard: "Dashboard",
      surveyForm: "IEI Survey Form",
      districtLabel: "Assign to District/Cluster",
      name: "Respondent Name",
      namePlaceholder: "e.g., Geeta",
      section1: "Section 1: Your Details",
      age: "Age",
      agePlaceholder: "e.g., 32",
      gender: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      education: "Highest Education",
      illiterate: "Illiterate",
      class5: "Up to Class 5",
      class10: "Up to Class 10",
      class12: "12th or above",
      migrant: "Migrated from another state?",
      no: "No",
      yes: "Yes",
      seasonal: "Seasonal",
      workType: "Type of Work",
      streetVendor: "Street vendor",
      dailyWage: "Daily wage laborer",
      domestic: "Domestic worker",
      tailor: "Tailor/Embroiderer",
      gigWorker: "Gig worker",
      otherWork: "Other",
      section2: "Section 2: Income & Hours",
      hoursPerDay: "Hours per day",
      hoursPlaceholder: "e.g., 9",
      nightWork: "Night/weekend work?",
      daysLt300: "Days < ₹300 / month",
      daysPlaceholder: "e.g., 18",
      section3: "Section 3: Formality",
      contract: "Formal job contract?",
      bankAccount: "Bank account",
      janDhan: "Jan Dhan",
      section4: "Section 4: Debt & Savings",
      debt: "Currently in debt?",
      debtSource: "Debt source",
      none: "None",
      shg: "SHG",
      moneylender: "Moneylender",
      loanApp: "Loan app",
      friendFamily: "Friend/Family",
      canSave: "Can you save monthly?",
      savingsAmount: "Typical monthly saving (₹)",
      optional: "optional",
      section5: "Section 5: Schemes",
      eShram: "e-Shram card",
      pmjay: "PM-JAY (Health)",
      pmsym: "PM-SYM (Pension)",
      section6: "Section 6: Skills & Training",
      training: "Ever taken skill training?",
      trainingHelp: "Did training help you get work?",
      section7: "Section 7: Mobility & Aspirations",
      moveForWork: "Move for work?",
      sometimes: "Yes, sometimes",
      seasonalMove: "Yes, seasonally",
      aspiration: "If training, what job would you want?",
      aspirationPlaceholder: "e.g., tailoring, electrician",
      submit: "Compute IEI & Add to Dashboard",
      reset: "Reset",
    },
    hi: {
      title: "अनौपचारिक अर्थव्यवस्था सूचकांक (IEI)",
      survey: "सर्वेक्षण",
      dashboard: "डैशबोर्ड",
      surveyForm: "IEI सर्वेक्षण फॉर्म",
      districtLabel: "जिले/क्षेत्र को असाइन करें",
      name: "उत्तरदाता का नाम",
      namePlaceholder: "जैसे, गीता",
      section1: "भाग 1: आपकी जानकारी",
      age: "उम्र",
      agePlaceholder: "जैसे, 32",
      gender: "लिंग",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",
      education: "सबसे ऊंची शिक्षा",
      illiterate: "पढ़ना-लिखना नहीं आता",
      class5: "कक्षा 5 तक",
      class10: "कक्षा 10 तक",
      class12: "12वीं या ऊपर",
      migrant: "क्या आप दूसरे राज्य से यहाँ काम करने आए हैं?",
      no: "नहीं",
      yes: "हाँ",
      seasonal: "मौसमी",
      workType: "काम का प्रकार",
      streetVendor: "स्ट्रीट वेंडर",
      dailyWage: "दिहाड़ी मजदूर",
      domestic: "घरेलू कामगार",
      tailor: "दर्जी/कढ़ाई करने वाला",
      gigWorker: "गिग वर्कर",
      otherWork: "अन्य",
      section2: "भाग 2: आय और काम के घंटे",
      hoursPerDay: "रोज़ कितने घंटे काम करते हैं",
      hoursPlaceholder: "जैसे, 9",
      nightWork: "रात में या वीकेंड पर भी काम करते हैं?",
      daysLt300: "कितने दिन ₹300 से कम कमाते हैं (महीने में)",
      daysPlaceholder: "जैसे, 18",
      section3: "भाग 3: औपचारिकता",
      contract: "फॉर्मल जॉब कॉन्ट्रैक्ट है?",
      bankAccount: "बैंक खाता",
      janDhan: "जन धन",
      section4: "भाग 4: कर्ज और बचत",
      debt: "इस समय कर्ज में हैं?",
      debtSource: "कर्ज कहाँ से लिया",
      none: "कोई नहीं",
      shg: "स्वयं सहायता समूह",
      moneylender: "साहूकार",
      loanApp: "लोन ऐप",
      friendFamily: "दोस्त/परिवार",
      canSave: "हर महीने कुछ पैसे बचा पाते हैं?",
      savingsAmount: "मासिक बचत (₹)",
      optional: "वैकल्पिक",
      section5: "भाग 5: सरकारी योजनाएँ",
      eShram: "ई-श्रम कार्ड",
      pmjay: "पीएम-जय (स्वास्थ्य)",
      pmsym: "पीएम-एसवाईएम (पेंशन)",
      section6: "भाग 6: कौशल और प्रशिक्षण",
      training: "कभी कौशल प्रशिक्षण लिया है?",
      trainingHelp: "प्रशिक्षण ने काम पाने में मदद की?",
      section7: "भाग 7: गतिशीलता और आकांक्षाएं",
      moveForWork: "काम के लिए इधर-उधर जाते हैं?",
      sometimes: "हाँ, कभी-कभी",
      seasonalMove: "हाँ, मौसमी",
      aspiration: "अगर प्रशिक्षण मिले, तो किस तरह का काम करना चाहेंगे?",
      aspirationPlaceholder: "जैसे, सिलाई, इलेक्ट्रीशियन",
      submit: "IEI गणना करें और डैशबोर्ड में जोड़ें",
      reset: "रीसेट करें",
    }
  };

  // Play audio when Hindi is selected
  useEffect(() => {
    if (language === 'hi' && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio playback failed, probably no audio file yet
      });
    }
  }, [language]);

  // Function to load data from Google Sheets
  const loadDataFromSheet = async () => {
    const csvUrl = import.meta.env.VITE_IEI_SHEET_CSV_URL as string | undefined;
    if (!csvUrl) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(csvUrl, { cache: "no-store" });
      const text = await res.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      const headers = lines[0].split(",");
      const rows = lines.slice(1);
      
      const parsedData: any[] = [];
      const districtMap: { [key: string]: number[] } = {};
      
      for (const line of rows) {
        const cols = line.split(",");
        const row: any = {};
        headers.forEach((header, i) => {
          row[header.trim()] = cols[i]?.trim() || "";
        });
        parsedData.push(row);
        
        // Extract district and calculate score
        const districtCol = row['आप किस जिले/क्षेत्र से हैं?'] || row['District'] || '';
        if (!districtCol) continue;
        
        // Simple IEI calculation from sheet data
        const lt300 = parseFloat(row['कितने दिन ऐसे होते हैं जब आप ₹300 से कम कमाते हैं? (महीने में)'] || row['Days < ₹300'] || '0');
        const hours = parseFloat(row['आप रोज़ कितने घंटे काम करते हैं?'] || row['Hours per day'] || '8');
        const bankText = String(row['क्या आपका बैंक खाता है?'] || row['Bank account'] || 'नहीं').toLowerCase();
        const eShramText = String(row['क्या आपके पास ई-श्रम कार्ड है?'] || row['e-Shram'] || 'नहीं').toLowerCase();
        const debtText = String(row['क्या इस समय आप किसी से उधार लिए हुए हैं?'] || row['Debt'] || 'नहीं').toLowerCase();
        
        let score = 40;
        score += (lt300 / 30) * 30;
        if (hours > 10) score += (hours - 10) * 2;
        if (bankText.includes('no') || bankText.includes('नहीं')) score += 10;
        if (eShramText.includes('no') || eShramText.includes('नहीं')) score += 15;
        if (debtText.includes('yes') || debtText.includes('हाँ')) score += 10;
        
        score = Math.min(100, Math.max(0, score));
        
        if (!districtMap[districtCol]) districtMap[districtCol] = [];
        districtMap[districtCol].push(score);
      }
      
      setSheetData(parsedData);
      
      // Build district stats from actual data - ALL responses, dynamically calculated
      const statsFromSheet: DistrictStats[] = Object.entries(districtMap).map(([name, scores]) => ({
        name,
        mean: scores.reduce((a, b) => a + b, 0) / scores.length,
        min: Math.min(...scores),
        max: Math.max(...scores),
        count: scores.length
      }));
      
      if (statsFromSheet.length > 0) {
        setDistricts(statsFromSheet);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.log('Could not load sheet data, using base dataset');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadDataFromSheet();
  }, []);

  useEffect(() => {
    drawBarChart();
    drawHeatmap();
  }, [districts, selectedDistrictIdx, personal, activeTab]);

  function drawBarChart() {
    const canvas = barRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const margin = { l: 60, r: 20, t: 20, b: 30 };
    const plotW = w - margin.l - margin.r;
    const plotH = h - margin.t - margin.b;
    const maxVal = 100;
    ctx.strokeStyle = "#2a3040";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(margin.l, margin.t);
    ctx.lineTo(margin.l, h - margin.b);
    ctx.lineTo(w - margin.r, h - margin.b);
    ctx.stroke();
    const personalCount = personal ? 1 : 0;
    const barH = plotH / (districts.length + personalCount) - 4;
    let idxY = 0;
    districts.forEach((d, idx) => {
      const x = margin.l;
      const y = margin.t + idxY * (barH + 4);
      const barW = (d.mean / maxVal) * plotW;
      ctx.fillStyle = idx === selectedDistrictIdx ? "#ffd166" : "#44506a";
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = "#a8b3c7"; ctx.font = "12px sans-serif";
      const label = d.name.length > 24 ? d.name.slice(0, 24) + "…" : d.name;
      ctx.fillText(label, 6, y + barH - 2);
      ctx.fillStyle = "#e6ebf5"; ctx.fillText(d.mean.toFixed(1), x + barW + 6, y + barH - 2);
      idxY++;
    });
    if (personal) {
      const p = personal;
      const x = margin.l;
      const y = margin.t + idxY * (barH + 4);
      const barW = (p.overall / maxVal) * plotW;
      ctx.fillStyle = "#a78bfa";
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = "#a8b3c7"; ctx.font = "12px sans-serif";
      ctx.fillText((p.name || "Worker") + " (Personal IEI)", 6, y + barH - 2);
      ctx.fillStyle = "#e6ebf5"; ctx.fillText(p.overall.toFixed(1), x + barW + 6, y + barH - 2);
    }
  }

  function drawHeatmap() {
    const canvas = heatRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const margin = { l: 20, r: 20, t: 20, b: 40 };
    const plotW = w - margin.l - margin.r;
    const plotH = h - margin.t - margin.b;
    const colW = plotW / districts.length;
    districts.forEach((d, idx) => {
      const x = margin.l + idx * colW;
      const y = margin.t;
      ctx.fillStyle = scoreToColor(d.mean);
      ctx.fillRect(x, y, colW - 2, plotH);
      ctx.fillStyle = "#e6ebf5"; ctx.font = "11px sans-serif";
      ctx.fillText(d.mean.toFixed(1), x + 4, y + 16);
      ctx.fillStyle = "#a8b3c7";
      ctx.save(); ctx.translate(x + colW / 2, h - 10); ctx.rotate(-Math.PI / 6); ctx.textAlign = "center";
      const label = d.name.replace("Jaipur ", "J. ").replace("Mumbai ", "M. ").replace("Punjab ", "Pb. ");
      ctx.fillText(label, 0, 0); ctx.restore();
    });
    if (selectedDistrictIdx >= 0) {
      const x = margin.l + selectedDistrictIdx * colW;
      ctx.strokeStyle = "#ffd166"; ctx.lineWidth = 3;
      ctx.strokeRect(x - 1, margin.t - 1, colW, plotH + 2);
    }
    if (personal) {
      const idx = personal.district;
      const x = margin.l + idx * colW + colW / 2;
      const y = margin.t + plotH * (1 - personal.overall / 100);
      ctx.fillStyle = "#a78bfa";
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#cfc8ff"; ctx.font = "11px sans-serif";
      ctx.fillText("You", x + 8, y + 4);
    }
  }

  function mapIncomeVulnerability(daysLt300: number, hours: number) {
    const daysScore = Math.min(100, Math.max(0, (daysLt300 / 30) * 100));
    const hourPenalty = Math.max(0, (hours - 10) * 4);
    return Math.min(100, daysScore + hourPenalty * 0.5);
  }
  function mapSocialVulnerability(bank: string, eShram: string, pmjay: string, pmsym: string) {
    let v = 80;
    if (bank === "Yes" || bank === "Jan Dhan") v -= 10;
    if (eShram === "Yes") v -= 20;
    if (pmjay === "Yes") v -= 25;
    if (pmsym === "Yes") v -= 25;
    return Math.max(0, Math.min(100, v));
  }
  function mapDebtVulnerability(inDebt: string, src: string, canSave: string) {
    if (inDebt === "No" && canSave === "Yes") return 25;
    let v = 60;
    if (inDebt === "Yes") {
      if (src === "Moneylender" || src === "Loan app") v += 20;
    }
    if (canSave === "No") v += 10;
    return Math.min(100, v);
  }
  function mapSkillVulnerability(edu: string, trained: string, skillJob: string) {
    let v = 70;
    if (edu === "12th or above") v -= 15;
    if (edu === "Up to Class 10") v -= 5;
    if (trained === "Yes") v -= 10;
    if (skillJob === "Yes") v -= 15;
    return Math.max(0, v);
  }
  function mapMobilityVulnerability(migrant: string, move: string) {
    if (migrant === "No" && move === "No") return 30;
    if (migrant === "Seasonal" || move === "Yes, seasonally") return 70;
    if (migrant === "Yes" || move === "Yes, sometimes") return 55;
    return 40;
  }

  async function handleSubmitToSheetWithFormData(record: PersonalRecord, formData: any) {
    const url = import.meta.env.VITE_GSCRIPT_WEBAPP_URL as string | undefined;
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: record.name,
          age: record.age,
          gender: record.gender,
          education: formData.education,
          migrant: formData.migrant,
          hours: record.inputs.hours,
          night: record.inputs.night,
          lt300: record.inputs.lt300,
          workType: formData.workType,
          contract: formData.contract,
          debt: record.inputs.debt,
          debtSrc: record.inputs.debtSrc,
          save: formData.save,
          saveAmt: formData.saveAmt,
          eShram: record.inputs.eShram,
          bank: record.inputs.bank,
          schemes: formData.schemes,
          educationLevel: formData.educationLevel,
          trained: formData.trained,
          move: formData.move,
          moveWithFamily: formData.moveWithFamily,
          aspiration: record.inputs.asp,
          overall: record.overall,
          dim: record.dim,
        }),
      });
    } catch (e) {
      // ignore network errors for now
    }
  }

  async function scoreSurvey(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const dIdx = parseInt(String(fd.get("svDistrict")), 10);
    const name = String(fd.get("svName") || "Worker");
    const age = parseInt(String(fd.get("svAge") || "0"), 10) || "—";
    const gender = String(fd.get("svGender"));
    const edu = String(fd.get("svEdu"));
    const migrant = String(fd.get("svMigrant"));
    const work = String(fd.get("svWork"));
    const hours = parseFloat(String(fd.get("svHours") || "0"));
    const night = String(fd.get("svNight"));
    const lt300 = parseFloat(String(fd.get("svLt300") || "0"));
    const contract = String(fd.get("svContract"));
    const bank = String(fd.get("svBank"));
    const debt = String(fd.get("svDebt"));
    const debtSrc = String(fd.get("svDebtSrc"));
    const save = String(fd.get("svSave"));
    const saveAmt = parseFloat(String(fd.get("svSaveAmt") || "0"));
    const eShram = String(fd.get("svEShram"));
    const pmjay = String(fd.get("svPMJAY"));
    const pmsym = String(fd.get("svPMSYM"));
    const skill = String(fd.get("svSkill"));
    const skillJob = String(fd.get("svSkillJob"));
    const move = String(fd.get("svMove"));
    const asp = String(fd.get("svAsp"));

    const incomeV = mapIncomeVulnerability(lt300, hours);
    const socialV = mapSocialVulnerability(bank, eShram, pmjay, pmsym);
    const debtV = mapDebtVulnerability(debt, debtSrc, save);
    const skillsV = mapSkillVulnerability(edu, skill, skillJob);
    const mobilityV = mapMobilityVulnerability(migrant, move);
    const overall =
      incomeV * 0.3 + socialV * 0.25 + debtV * 0.2 + skillsV * 0.15 + mobilityV * 0.1;

    const record: PersonalRecord = {
      name,
      age,
      gender,
      district: dIdx,
      inputs: { lt300, hours, night, debt, debtSrc, bank, eShram, pmjay, pmsym, asp, skillJob },
      dim: { income: incomeV, social: socialV, debt: debtV, skills: skillsV, mobility: mobilityV },
      overall,
    };
    setPersonal(record);
    
    // Submit to Google Sheets
    await handleSubmitToSheetWithFormData(record, {
      education: edu,
      migrant,
      workType: work,
      contract,
      save,
      saveAmt,
      schemes: `${pmjay === "Yes" ? "PM-JAY " : ""}${pmsym === "Yes" ? "PM-SYM " : ""}`.trim(),
      educationLevel: edu,
      trained: skill,
      move,
      moveWithFamily: "",
    });

    // Wait a moment for sheet to update, then reload data
    setTimeout(() => {
      loadDataFromSheet();
    }, 2000);
    
    // Switch to dashboard tab to show results
    setActiveTab("dashboard");
  }

  return (
    <div className="min-h-screen relative">
      <div className="animated-stripes"></div>
      <Navigation />
      <div className="container-width py-6 mt-20">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-white/10 pb-4">
          <h1 className="text-2xl font-bold text-eggshell">{t[language].title}</h1>
          <div className="flex gap-2 items-center flex-wrap">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-sm"
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
            </select>
            <button 
              className={`px-4 py-2 rounded-lg border font-semibold ${activeTab === "survey" ? "bg-blood-red text-eggshell border-blood-red" : "bg-transparent text-eggshell/80 border-white/20"}`} 
              onClick={() => setActiveTab("survey")}
            >
              {t[language].survey}
            </button>
            <button 
              className={`px-4 py-2 rounded-lg border font-semibold ${activeTab === "dashboard" ? "bg-blood-red text-eggshell border-blood-red" : "bg-transparent text-eggshell/80 border-white/20"}`} 
              onClick={() => setActiveTab("dashboard")}
            >
              {t[language].dashboard}
            </button>
          </div>
        </div>
        
        {/* Hidden audio element for Hindi voice */}
        <audio ref={audioRef} src="/hindi-instructions.mp3" />

        {/* DASHBOARD SECTION */}
        {activeTab === "dashboard" && (
          <div className="mt-6">
          <h2 className="text-xl font-semibold text-eggshell mb-4">📊 Dashboard View</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <label className="text-sm text-white/70">Filter by District / Cluster</label>
              <select className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" value={selectedDistrictIdx} onChange={(e) => setSelectedDistrictIdx(parseInt(e.target.value, 10))}>
                {districts.map((d, i) => (
                  <option key={d.name} value={i}>{d.name}</option>
                ))}
              </select>
              <div className="text-xs text-white/60 mt-2">Select a district to highlight in charts below</div>
            </div>
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <label className="text-sm text-white/70">Data Source</label>
              <div className="mt-2 text-sm text-white/80">
                {sheetData.length > 0 ? `✓ Loaded ${sheetData.length} responses from Google Sheets` : `Using base dataset (${districts.reduce((sum, d) => sum + d.count, 0)} workers)`}
              </div>
              <div className="text-xs text-white/60 mt-1">
                {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
              </div>
              <button 
                onClick={loadDataFromSheet} 
                disabled={isLoading}
                className="mt-2 px-3 py-1 text-xs rounded bg-blood-red/80 hover:bg-blood-red text-white disabled:opacity-50"
              >
                {isLoading ? '🔄 Refreshing...' : '🔄 Refresh Data'}
              </button>
            </div>
          </div>

          {/* Bar Chart - Full Width, Always Visible */}
          <div className="bg-black/30 rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-eggshell">Bar Chart — District IEI Scores (All Districts)</h3>
              <span className="px-2 py-1 rounded-full text-xs bg-black/40 border border-white/10">{districts[selectedDistrictIdx]?.name || "All"}</span>
            </div>
            <canvas ref={barRef} width={1200} height={400} className="mt-2 w-full h-[400px] rounded-lg bg-black/40"></canvas>
            <div className="text-xs text-white/60 mt-2">Yellow = selected district; purple = newly scored worker. All districts shown at all times.</div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-eggshell">Heatmap — IEI by District</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-black/40 border border-white/10">Gradient by score</span>
              </div>
              <canvas ref={heatRef} width={800} height={300} className="mt-2 w-full h-[280px] rounded-lg bg-black/40"></canvas>
              <div className="text-xs text-white/60 mt-2">Darker = higher vulnerability. Personal score (if any) marked purple.</div>
            </div>
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-eggshell">Worker Profile</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-black/40 border border-white/10">Auto-updates</span>
              </div>
              {personal ? (
                <div>
                  <div className="flex gap-3 items-start mb-3">
                    <div className="w-20 h-20 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-3xl">👤</div>
                    <div>
                      <div className="font-semibold text-lg">{personal.name || "Worker"}, {personal.age || "—"}</div>
                      <div className="text-sm text-white/70">{districts[personal.district]?.name}</div>
                    </div>
                  </div>
                  
                  {/* Large IEI Score Display */}
                  <div className="bg-gradient-to-r from-blood-red/20 to-purple-600/20 border border-blood-red/30 rounded-lg p-4 mb-3">
                    <div className="text-center">
                      <div className="text-sm text-white/70 mb-1">IEI Overall Score</div>
                      <div className="text-5xl font-bold text-eggshell mb-1">{personal.overall.toFixed(1)}</div>
                      <div className="text-xs text-white/60">{personal.overall >= 65 ? "High Vulnerability" : personal.overall >= 45 ? "Moderate Vulnerability" : "Lower Vulnerability"}</div>
                    </div>
                  </div>
                  
                  {/* Dimension Breakdown */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div><span className="text-white/60">Income:</span> <span className="font-semibold">{personal.dim.income.toFixed(0)}/100</span></div>
                    <div><span className="text-white/60">Social:</span> <span className="font-semibold">{personal.dim.social.toFixed(0)}/100</span></div>
                    <div><span className="text-white/60">Debt:</span> <span className="font-semibold">{personal.dim.debt.toFixed(0)}/100</span></div>
                    <div><span className="text-white/60">Skills:</span> <span className="font-semibold">{personal.dim.skills.toFixed(0)}/100</span></div>
                    <div className="col-span-2"><span className="text-white/60">Mobility:</span> <span className="font-semibold">{personal.dim.mobility.toFixed(0)}/100</span></div>
                  </div>
                  
                  {/* Details */}
                  <div className="text-xs text-white/60 space-y-1 pt-2 border-t border-white/10">
                    <div>Days &lt;₹300: {personal.inputs.lt300}/month • Debt: {personal.inputs.debt} ({personal.inputs.debtSrc})</div>
                    <div>Bank: {personal.inputs.bank} • e-Shram: {personal.inputs.eShram} • PM-JAY: {personal.inputs.pmjay} • PM-SYM: {personal.inputs.pmsym}</div>
                  </div>
                </div>
              ) : (
                <div className="text-white/60 text-center py-8">Submit a survey to see worker profile</div>
              )}
            </div>
            <div className="bg-black/30 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-eggshell">Ways to Decrease Vulnerability Score</h3>
                <span className="px-2 py-1 rounded-full text-xs bg-black/40 border border-white/10">Dimension-specific</span>
              </div>
              <div className="mt-2 space-y-3 text-sm">
                {personal ? (
                  <>
                    {/* Income */}
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="font-semibold text-yellow-400 mb-1">💰 Income Score: {personal.dim.income.toFixed(0)}/100</div>
                      <div className="text-xs text-white/70">
                        {personal.dim.income >= 60 ? (
                          <>• Enroll in MGNREGA for guaranteed work days<br/>• Access DBT schemes for income support<br/>• Join worker collectives for better rates</>
                        ) : personal.dim.income >= 40 ? (
                          <>• Explore skill upgrades for higher wages<br/>• Track daily earnings to identify gaps</>
                        ) : (
                          <>• Maintain current income streams<br/>• Monitor for seasonal fluctuations</>
                        )}
                      </div>
                    </div>

                    {/* Social Security */}
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="font-semibold text-blue-400 mb-1">🛡️ Social Security Score: {personal.dim.social.toFixed(0)}/100</div>
                      <div className="text-xs text-white/70">
                        {personal.dim.social >= 60 ? (
                          <>
                            • Register for e-Shram card: <a href="https://register.eshram.gov.in/#/user/self" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Click here to register</a><br/>
                            • Enroll in PM-JAY for health coverage: <a href="https://pmjay.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">Click here for PM-JAY</a><br/>
                            • Open Jan Dhan bank account<br/>
                            • Join PM-SYM for pension benefits
                          </>
                        ) : personal.dim.social >= 40 ? (
                          <>
                            • Complete pending scheme enrollments<br/>
                            • <a href="https://register.eshram.gov.in/#/user/self" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">e-Shram registration</a> • <a href="https://pmjay.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">PM-JAY enrollment</a><br/>
                            • Activate dormant bank account
                          </>
                        ) : (
                          <>• Good coverage! Keep documents updated<br/>• Renew registrations before expiry</>
                        )}
                      </div>
                    </div>

                    {/* Debt */}
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="font-semibold text-red-400 mb-1">💳 Debt Score: {personal.dim.debt.toFixed(0)}/100</div>
                      <div className="text-xs text-white/70">
                        {personal.dim.debt >= 60 ? (
                          <>• Shift from moneylenders to SHG/bank loans<br/>• Debt counseling via local NGOs<br/>• Consolidate debts at lower interest rates</>
                        ) : personal.dim.debt >= 40 ? (
                          <>• Build emergency savings (₹500-1000/month)<br/>• Avoid high-interest app loans</>
                        ) : (
                          <>• Excellent! Keep building savings<br/>• Maintain debt-free status</>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="font-semibold text-green-400 mb-1">🎓 Skills Score: {personal.dim.skills.toFixed(0)}/100</div>
                      <div className="text-xs text-white/70">
                        {personal.dim.skills >= 55 ? (
                          <>• Enroll in skill training (e.g., {personal.inputs.asp || "tailoring, electrician"})<br/>• Access PMKVY or state training programs<br/>• Get certified for better job prospects</>
                        ) : personal.dim.skills >= 35 ? (
                          <>• Seek upskilling in current occupation<br/>• Join short-term certification courses</>
                        ) : (
                          <>• Leverage your education and training<br/>• Consider mentoring others</>
                        )}
                      </div>
                    </div>

                    {/* Mobility */}
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                      <div className="font-semibold text-purple-400 mb-1">🚶 Mobility Score: {personal.dim.mobility.toFixed(0)}/100</div>
                      <div className="text-xs text-white/70">
                        {personal.dim.mobility >= 55 ? (
                          <>• Apply for portable ration card (ONORC)<br/>• Link benefits to mobile number<br/>• Get ESIC for inter-state workers</>
                        ) : personal.dim.mobility >= 35 ? (
                          <>• Ensure ID proofs are portable<br/>• Keep contact info updated in systems</>
                        ) : (
                          <>• Stable work location is beneficial<br/>• Monitor local job opportunities</>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-white/60 text-center py-4">Submit a survey to see personalized recommendations</div>
                )}
              </div>
            </div>
          </div>
          </div>
        )}

        {/* SURVEY FORM SECTION */}
        {activeTab === "survey" && (
          <div className="mt-6 bg-black/30 rounded-xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-eggshell mb-4">📝 {t[language].surveyForm}</h2>
          <form className="space-y-4" onSubmit={scoreSurvey}>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-white/70">{t[language].districtLabel}</label>
                <select name="svDistrict" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" defaultValue={0}>
                  {districts.map((d, i) => (
                    <option key={d.name} value={i}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70">{t[language].name}</label>
                <input name="svName" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].namePlaceholder} />
              </div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section1}</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm text-white/70">{t[language].age}</label><input name="svAge" type="number" min={15} max={80} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].agePlaceholder} /></div>
              <div><label className="text-sm text-white/70">{t[language].gender}</label><select name="svGender" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].male}</option><option>{t[language].female}</option><option>{t[language].other}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].education}</label><select name="svEdu" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].illiterate}</option><option>{t[language].class5}</option><option>{t[language].class10}</option><option>{t[language].class12}</option></select></div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-sm text-white/70">{t[language].migrant}</label><select name="svMigrant" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option><option>{t[language].seasonal}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].workType}</label><select name="svWork" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].streetVendor}</option><option>{t[language].dailyWage}</option><option>{t[language].domestic}</option><option>{t[language].tailor}</option><option>{t[language].gigWorker}</option><option>{t[language].otherWork}</option></select></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section2}</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm text-white/70">{t[language].hoursPerDay}</label><input name="svHours" type="number" min={0} max={18} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].hoursPlaceholder} /></div>
              <div><label className="text-sm text-white/70">{t[language].nightWork}</label><select name="svNight" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
                <div><label className="text-sm text-white/70">{t[language].daysLt300}</label><input name="svLt300" type="number" min={0} max={30} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].daysPlaceholder} /></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section3}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-sm text-white/70">{t[language].contract}</label><select name="svContract" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].bankAccount}</label><select name="svBank" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option><option>{t[language].janDhan}</option></select></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section4}</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm text-white/70">{t[language].debt}</label><select name="svDebt" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].debtSource}</label><select name="svDebtSrc" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].none}</option><option>{t[language].shg}</option><option>{t[language].moneylender}</option><option>{t[language].loanApp}</option><option>{t[language].friendFamily}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].canSave}</label><select name="svSave" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-sm text-white/70">{t[language].savingsAmount}</label><input name="svSaveAmt" type="number" min={0} className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].optional} /></div>
              <div></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section5}</h4>
            <div className="grid md:grid-cols-3 gap-3">
              <div><label className="text-sm text-white/70">{t[language].eShram}</label><select name="svEShram" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].pmjay}</label><select name="svPMJAY" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].pmsym}</label><select name="svPMSYM" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section6}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-sm text-white/70">{t[language].training}</label><select name="svSkill" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].trainingHelp}</label><select name="svSkillJob" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].yes}</option></select></div>
            </div>

            <h4 className="mt-3 font-semibold text-eggshell">{t[language].section7}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-sm text-white/70">{t[language].moveForWork}</label><select name="svMove" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white"><option>{t[language].no}</option><option>{t[language].sometimes}</option><option>{t[language].seasonalMove}</option></select></div>
              <div><label className="text-sm text-white/70">{t[language].aspiration}</label><input name="svAsp" className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white" placeholder={t[language].aspirationPlaceholder} /></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="px-4 py-2 rounded-lg border bg-blood-red text-eggshell border-blood-red font-semibold" type="submit">{t[language].submit}</button>
              <button className="px-4 py-2 rounded-lg border border-white/20 text-eggshell/90" type="button" onClick={() => { setPersonal(null); loadDataFromSheet(); }}>{t[language].reset}</button>
            </div>
          </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IEIDashboard;
