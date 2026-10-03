import React, { useState, useMemo } from 'react';
import {
  TREATISE_CATEGORIES,
  TreatiseLanguageMode,
  TreatiseStep,
  GeometryPropertyItem,
} from '../data/geometryTreatiseTypes';
import { ALL_GEOMETRY_PROPERTIES } from '../data/geometryTreatisePart2';
import { GeometryTreatiseDiagram } from './GeometryTreatiseDiagram';
import { Course } from '../types';
import {
  ArrowRight,
  Search,
  Compass,
  Copy,
  Check,
  Bookmark,
  ArrowLeftRight,
  BookOpen,
  Sparkles,
  Languages,
  Eye,
  X,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface GeometryTreatisePageProps {
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
  onBackToCourse: () => void;
  initialPropertyId?: number | null;
}

export const GeometryTreatisePage: React.FC<GeometryTreatisePageProps> = ({
  allCourses,
  onSelectCourse,
  onBackToCourse,
  initialPropertyId = null,
}) => {
  const [lang, setLang] = useState<TreatiseLanguageMode>('ar');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [onlyWithConverse, setOnlyWithConverse] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('geometry_treatise_bookmarks');
      return saved ? JSON.parse(saved) : [5, 12, 14, 20, 21, 22, 50, 51, 52];
    } catch {
      return [5, 12, 14, 20, 21, 22, 50, 51, 52];
    }
  });

  // Per-card step state (default to 4 so full coded diagram is visible, user can click 1..4 on any card)
  const [cardSteps, setCardSteps] = useState<Record<number, TreatiseStep>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeModalPropertyId, setActiveModalPropertyId] = useState<number | null>(
    initialPropertyId
  );
  const [modalStep, setModalStep] = useState<TreatiseStep>(4);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('geometry_treatise_bookmarks', JSON.stringify(next));
      } catch {
        // Ignore storage errors in private mode
      }
      return next;
    });
  };

  const handleCopyProof = (prop: GeometryPropertyItem) => {
    const textToCopy =
      lang === 'fr'
        ? `Propriété ${prop.code} : ${prop.statementFr}\nRédaction : ${prop.proofTemplateFr}`
        : `خاصية ${prop.code} : ${prop.statementAr}\nتحرير البرهان : ${prop.proofTemplateAr}`;
    navigator.clipboard?.writeText(textToCopy).catch(() => {});
    setCopiedId(prop.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProperties = useMemo(() => {
    return ALL_GEOMETRY_PROPERTIES.filter((prop) => {
      if (selectedCategoryId !== 'all' && prop.categoryId !== selectedCategoryId) {
        return false;
      }
      if (onlyFavorites && !favorites.includes(prop.id)) {
        return false;
      }
      if (onlyWithConverse && !prop.converseId) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchNum =
          prop.code.includes(q) ||
          String(prop.id) === q ||
          `خاصية ${prop.id}`.includes(q) ||
          `خاصية ${prop.code}`.includes(q);
        const matchAr =
          prop.titleAr.toLowerCase().includes(q) ||
          prop.statementAr.toLowerCase().includes(q) ||
          prop.proofTemplateAr.toLowerCase().includes(q);
        const matchFr =
          prop.titleFr.toLowerCase().includes(q) ||
          prop.statementFr.toLowerCase().includes(q) ||
          prop.proofTemplateFr.toLowerCase().includes(q);
        if (!matchNum && !matchAr && !matchFr) return false;
      }
      return true;
    });
  }, [selectedCategoryId, onlyFavorites, onlyWithConverse, searchQuery, favorites]);

  const activeModalProperty = useMemo(
    () =>
      activeModalPropertyId
        ? ALL_GEOMETRY_PROPERTIES.find((p) => p.id === activeModalPropertyId) || null
        : null,
    [activeModalPropertyId]
  );

  const converseProperty = useMemo(
    () =>
      activeModalProperty?.converseId
        ? ALL_GEOMETRY_PROPERTIES.find((p) => p.id === activeModalProperty.converseId) || null
        : null,
    [activeModalProperty]
  );

  return (
    <div className="min-h-screen bg-[#FBFBFA] pb-24 text-slate-800" dir="rtl">
      {/* Top Bar Sub-header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToCourse}
              className="px-3 py-1.5 text-slate-700 bg-slate-100 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للدرس الحالي</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-xs font-bold text-purple-800 hidden sm:inline">
              مرجع البرهان في الهندسة · 69 خاصية أساسية (التعليم المتوسط)
            </span>
          </div>

          {/* Language Switcher: AR / FR / Bilingual */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Languages className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'ar'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              العربية
            </button>
            <button
              type="button"
              onClick={() => setLang('bilingual')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'bilingual'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ثنائي اللغة (AR + FR)
            </button>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'fr'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Français
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section inspired by the PDF cover & Treatise identity */}
      <div className="bg-gradient-to-l from-purple-950 via-indigo-950 to-slate-950 text-white py-10 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/15 text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>أهم الخواص التي تساعد على البرهان في الهندسة · Traité de Géométrie (01 → 69)</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                {lang === 'fr'
                  ? 'Traité des 69 Propriétés et Théorèmes de Démonstration en Géométrie'
                  : 'أهم الخواص التي تساعد على البرهان في الهندسة في التعليم المتوسط'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'fr'
                  ? 'Référentiel complet des 69 propriétés géométriques organisées en 10 objectifs de démonstration : énoncé officiel, schéma codé interactif en 4 étapes et rédaction type (« Comme ... alors ... »).'
                  : 'الدليل المرجعي الشامل للخواص والنظريات الهندسية الـ 69 مصنفة حسب 10 أهداف برهانية: نص الخاصية، الشكل الهندسي المشفر في 4 مراحل تفاعلية، ونموذج تحرير البرهان الرسمي («بما أن ... فإن ...»).'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2.5 shrink-0">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono block">69</span>
                <span className="text-[11px] text-slate-300">خاصية ونظرية</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono block">10</span>
                <span className="text-[11px] text-slate-300">أبواب للبرهان</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-300 font-mono block">4</span>
                <span className="text-[11px] text-slate-300">مراحل لكل شكل</span>
              </div>
            </div>
          </div>

          {/* Official Methodology Box from Page 2 of the PDF */}
          <div className="bg-white/10 border border-emerald-400/30 rounded-2xl p-4 sm:p-5 backdrop-blur-xs">
            <div className="text-xs font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {lang === 'fr'
                  ? 'Méthodologie officielle pour rédiger une démonstration en géométrie :'
                  : 'منهجية البرهان الهندسي (خطوات إثبات خاصية وتحرير الجواب) :'}
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-200 leading-relaxed">
              <div className="bg-slate-900/50 rounded-xl p-3 border border-white/10">
                <span className="font-bold text-amber-300 block mb-1">1. الرسم والتشفير :</span>
                نبدأ برسم شكل يمثل الوضعية المدروسة، ثم نُشفّر الشكل حسب المعطيات (منتصف قطعة، زاوية قائمة، توازي...).
              </div>
              <div className="bg-slate-900/50 rounded-xl p-3 border border-white/10">
                <span className="font-bold text-cyan-300 block mb-1">2. البحث عن الخاصية المناسبة :</span>
                من بين الخواص التي تنطبق على المطلوب (الأبواب 1 إلى 10 أدناه)، نبحث عن الخاصية التي يطابق شكلها المشفرُ الشكلَ المرسوم.
              </div>
              <div className="bg-slate-900/50 rounded-xl p-3 border border-white/10">
                <span className="font-bold text-emerald-300 block mb-1">3. تحرير الجواب النموذجي :</span>
                نذكر المعطيات المتوفرة («بما أن...»)، ثم الخاصية المستعملة (العمود الأيمن)، ثم نستخلص المطلوب («فإن / إذن...» في العمود الأيسر).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-6">
        {/* Interactive Decision Filter ("ماذا أريد أن أثبت؟") - The 10 Domains from Page 2 of PDF */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-700" />
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                {lang === 'fr'
                  ? 'Que voulez-vous démontrer ? (Choisissez un objectif parmi les 10 domaines)'
                  : 'ماذا تريد أن تثبت في التمرين؟ (اختر الهدف البرهاني من الفهرس 1 ← 10)'}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyFavorites
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50/70 text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>المفضلة ({favorites.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setOnlyWithConverse(!onlyWithConverse)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  onlyWithConverse
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-indigo-50/70 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>الخواص المباشرة والعكسية</span>
              </button>
            </div>
          </div>

          {/* 10 Proof Domains Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                selectedCategoryId === 'all'
                  ? 'bg-purple-800 text-white border-purple-800 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[11px] font-bold opacity-80">كل الأبواب (1 ← 10)</span>
                <span className="text-xs font-mono font-black px-1.5 py-0.5 rounded bg-black/10">
                  01 → 69
                </span>
              </div>
              <div className="text-xs font-bold">
                {lang === 'fr' ? 'Toutes les 69 propriétés' : 'عرض جميع الخواص (69 خاصية)'}
              </div>
            </button>

            {TREATISE_CATEGORIES.map((cat) => {
              const active = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    active
                      ? 'bg-purple-800 text-white border-purple-800 shadow-xs'
                      : 'bg-white hover:bg-purple-50/50 text-slate-800 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`text-[11px] font-black ${
                        active ? 'text-amber-300' : 'text-purple-700'
                      }`}
                    >
                      ({cat.number})
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String(cat.minId).padStart(2, '0')} ← {String(cat.maxId).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-xs font-bold leading-snug">
                    {lang === 'fr' ? cat.titleFr : cat.titleAr}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative pt-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Rechercher par numéro (ex: 51, 20, 14) ou mot-clé (Pythagore, Thalès, milieu, parallèle...)...'
                  : 'ابحث برقم الخاصية (مثلاً: 5، 14، 20، 51...) أو بكلمة مفتاحية (منتصف، توازي، فيثاغورس، طاليس، الدائرة المحيطة...)...'
              }
              className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-purple-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Column Header Bar matching the PDF's 3-column table layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 bg-purple-900 text-white rounded-2xl text-xs font-black shadow-xs">
          <div className="col-span-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>العمود الأيمن : نص الخاصية أو النظرية (القاعدة)</span>
          </div>
          <div className="col-span-4 text-center flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>العمود الأوسط : الشكل الهندسي المشفّر (4 مراحل)</span>
          </div>
          <div className="col-span-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>العمود الأيسر : نموذج تحرير الجواب (بما أن ... فإن ...)</span>
          </div>
        </div>

        {/* Properties List grouped or listed in the 3-Column Treatise Format */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <p className="text-base font-bold text-slate-700">
              لا توجد خواص مطابقة لبحثك الحالي.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId('all');
                setSearchQuery('');
                setOnlyFavorites(false);
                setOnlyWithConverse(false);
              }}
              className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold cursor-pointer"
            >
              إعادة عرض جميع الخواص (69)
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProperties.map((prop) => {
              const category = TREATISE_CATEGORIES.find((c) => c.id === prop.categoryId);
              const currentStep = cardSteps[prop.id] || 4;
              const isFav = favorites.includes(prop.id);
              const converseItem = prop.converseId
                ? ALL_GEOMETRY_PROPERTIES.find((p) => p.id === prop.converseId)
                : null;

              return (
                <div
                  key={prop.id}
                  id={`treatise-prop-${prop.id}`}
                  className="bg-white rounded-2xl border-2 border-[#7c5a43]/25 hover:border-purple-700/50 shadow-xs transition-all overflow-hidden"
                >
                  {/* Top Meta Strip on each Property Row */}
                  <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#7e22ce] text-white text-xs font-black">
                        خاصية {prop.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {lang === 'fr' ? prop.titleFr : prop.titleAr}
                      </span>
                      {category && (
                        <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                          ({category.number}) {lang === 'fr' ? category.titleFr : category.titleAr}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Converse Quick Link */}
                      {converseItem && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalPropertyId(prop.id);
                            setModalStep(4);
                          }}
                          className="px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          title="مقارنة الخاصية المباشرة والعكسية"
                        >
                          <ArrowLeftRight className="w-3 h-3" />
                          <span>العكسية: خاصية {converseItem.id}</span>
                        </button>
                      )}

                      {/* Linked 3AM Course Button */}
                      {prop.linkedCourseIds && prop.linkedCourseIds.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onSelectCourse(prop.linkedCourseIds![0])}
                          className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>
                            درس 3AM ({prop.linkedCourseIds[0].replace('lesson-', '')})
                          </span>
                        </button>
                      )}

                      {/* Inspect Modal Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModalPropertyId(prop.id);
                          setModalStep(4);
                        }}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>عرض مفصل</span>
                      </button>

                      {/* Favorite Bookmark */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(prop.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isFav
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title="حفظ في المفضلة"
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* 3-Column Body matching the PDF layout:
                      Column 1 (Right in RTL): الخاصية (Statement)
                      Column 2 (Middle): الشكل الهندسي التفاعلي
                      Column 3 (Left in RTL): تحرير الجواب / البرهان */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-slate-200">
                    {/* Right Column: الخاصية (Property Statement) */}
                    <div className="lg:col-span-4 p-4 sm:p-5 bg-[#fafaf7] flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="inline-block px-2.5 py-0.5 bg-[#7c2d86] text-white text-xs font-bold rounded-xs">
                            خاصية {prop.id}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            القاعدة القانونية
                          </span>
                        </div>

                        {(lang === 'ar' || lang === 'bilingual') && (
                          <p className="text-sm sm:text-[15px] font-bold text-slate-900 leading-relaxed">
                            {prop.statementAr}
                          </p>
                        )}

                        {(lang === 'fr' || lang === 'bilingual') && (
                          <p
                            dir="ltr"
                            className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200/80 text-left"
                          >
                            {prop.statementFr}
                          </p>
                        )}
                      </div>

                      {/* Hypotheses badge list */}
                      <div className="mt-4 pt-3 border-t border-slate-200/70">
                        <span className="text-[11px] font-bold text-blue-700 block mb-1">
                          {lang === 'fr' ? 'Hypothèses (المعطيات) :' : 'شروط توظيف الخاصية (المعطيات) :'}
                        </span>
                        <ul className="space-y-1">
                          {(lang === 'fr' ? prop.hypothesesFr : prop.hypothesesAr).map((h, i) => (
                            <li
                              key={i}
                              dir={lang === 'fr' ? 'ltr' : 'rtl'}
                              className="text-xs text-slate-700 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Center Column: الشكل الهندسي المشفّر (4-Step Interactive SVG) */}
                    <div className="lg:col-span-4 p-4 flex flex-col items-center justify-center bg-white">
                      <GeometryTreatiseDiagram
                        propertyId={prop.id}
                        step={currentStep}
                        onStepChange={(s) =>
                          setCardSteps((prev) => ({ ...prev, [prop.id]: s }))
                        }
                        showStepControls={true}
                        lang={lang}
                        captionAr={prop.figureCaptionAr}
                        captionFr={prop.figureCaptionFr}
                      />
                    </div>

                    {/* Left Column: تحرير الجواب والبرهان (Official Proof Template) */}
                    <div className="lg:col-span-4 p-4 sm:p-5 bg-[#fafaf7] flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                            {lang === 'fr'
                              ? 'Rédaction type (تحرير البرهان)'
                              : 'نموذج تحرير الجواب (بما أن ... فإن ...)'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyProof(prop)}
                            className="text-[11px] font-bold text-slate-600 hover:text-purple-700 bg-white border border-slate-200 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            title="نسخ البرهان"
                          >
                            {copiedId === prop.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700">تم النسخ</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>نسخ</span>
                              </>
                            )}
                          </button>
                        </div>

                        {(lang === 'ar' || lang === 'bilingual') && (
                          <div className="p-3 rounded-xl bg-white border border-slate-200/90 text-sm font-semibold text-slate-800 leading-relaxed shadow-2xs">
                            {prop.proofTemplateAr}
                          </div>
                        )}

                        {(lang === 'fr' || lang === 'bilingual') && (
                          <div
                            dir="ltr"
                            className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700 leading-relaxed text-left"
                          >
                            {prop.proofTemplateFr}
                          </div>
                        )}
                      </div>

                      {/* Conclusion highlight */}
                      <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-700 block">
                            {lang === 'fr' ? 'Conclusion (النتيجة المستخلصة) :' : 'النتيجة المستخلصة (المطلوب) :'}
                          </span>
                          <span
                            dir={lang === 'fr' ? 'ltr' : 'rtl'}
                            className="text-xs font-black text-slate-900"
                          >
                            {lang === 'fr' ? prop.conclusionFr : prop.conclusionAr}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Property Inspector & Converse Comparator Modal */}
      {activeModalProperty && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-5 sm:p-7 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded-lg bg-purple-700 text-white text-xs font-black">
                    خاصية {activeModalProperty.id}
                  </span>
                  <span className="text-xs font-bold text-purple-700">
                    {
                      TREATISE_CATEGORIES.find((c) => c.id === activeModalProperty.categoryId)
                        ?.titleAr
                    }
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {activeModalProperty.titleAr}
                </h3>
                <p dir="ltr" className="text-xs text-slate-500 font-medium text-right">
                  {activeModalProperty.titleFr}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalPropertyId(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive 4-Step Diagram + Full Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <GeometryTreatiseDiagram
                  propertyId={activeModalProperty.id}
                  step={modalStep}
                  onStepChange={setModalStep}
                  showStepControls={true}
                  lang="bilingual"
                  captionAr={activeModalProperty.figureCaptionAr}
                  captionFr={activeModalProperty.figureCaptionFr}
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                  <div className="text-xs font-black text-purple-800">نص الخاصية (القاعدة) :</div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {activeModalProperty.statementAr}
                  </p>
                  <p dir="ltr" className="text-xs text-slate-600 pt-1 border-t border-purple-200/60">
                    {activeModalProperty.statementFr}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <div className="text-xs font-black text-emerald-800">
                    نموذج تحرير البرهان الرسمي :
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {activeModalProperty.proofTemplateAr}
                  </p>
                  <p dir="ltr" className="text-xs text-slate-600 pt-1 border-t border-emerald-200/60">
                    {activeModalProperty.proofTemplateFr}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct vs Converse Comparison Table if Converse exists */}
            {converseProperty && (
              <div className="bg-indigo-50/50 rounded-2xl border border-indigo-200 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-900 flex items-center gap-1.5">
                    <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
                    <span>
                      مقارنة الخاصية المباشرة والعكسية (خاصية {activeModalProperty.id} ↔ خاصية{' '}
                      {converseProperty.id})
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModalPropertyId(converseProperty.id)}
                    className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                  >
                    الانتقال إلى خاصية {converseProperty.id} ←
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200">
                    <div className="font-black text-purple-800 mb-1">
                      خاصية {activeModalProperty.id} : {activeModalProperty.titleAr}
                    </div>
                    <div className="text-slate-600 mb-1">
                      <strong>المعطيات :</strong> {activeModalProperty.hypothesesAr.join(' + ')}
                    </div>
                    <div className="text-emerald-700 font-bold">
                      <strong>النتيجة :</strong> {activeModalProperty.conclusionAr}
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200">
                    <div className="font-black text-indigo-800 mb-1">
                      خاصية {converseProperty.id} (العكسية) : {converseProperty.titleAr}
                    </div>
                    <div className="text-slate-600 mb-1">
                      <strong>المعطيات :</strong> {converseProperty.hypothesesAr.join(' + ')}
                    </div>
                    <div className="text-emerald-700 font-bold">
                      <strong>النتيجة :</strong> {converseProperty.conclusionAr}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
