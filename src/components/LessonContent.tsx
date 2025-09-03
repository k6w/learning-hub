'use client';

import { useTranslation } from 'react-i18next';
import ForgettingCurveChart from './ForgettingCurveChart';
import EffectivenessChart from './EffectivenessChart';
import enLessons from '../../public/locales/en/lessons.json';
import roLessons from '../../public/locales/ro/lessons.json';
import enCommon from '../../public/locales/en/common.json';
import roCommon from '../../public/locales/ro/common.json';

interface LessonContentProps {
  contentKey: string;
}

export default function LessonContent({ contentKey }: LessonContentProps) {
  const { t, i18n } = useTranslation();

  const renderLesson = (lessonKey: string) => {
    // Get the current language
    const currentLang = i18n.language || 'en';

    // Get the lessons data based on current language
    const lessonsData = currentLang === 'ro' ? roLessons : enLessons;
    const commonData = currentLang === 'ro' ? roCommon : enCommon;

    // Map lessonKey to common key for techniqueDetails
    const keyMapping: { [key: string]: string } = {
      activeRecall: 'active_recall',
      spacedRepetition: 'spaced_repetition',
      interleaving: 'interleaving',
      elaboration: 'elaboration',
      dualCoding: 'dual_coding',
      feynmanTechnique: 'feynman_technique',
      pomodoroTechnique: 'pomodoro_technique',
      cornellMethod: 'cornell_method',
      mindMapping: 'mind_mapping',
      selfTesting: 'self_testing'
    };

    const commonKey = keyMapping[lessonKey];

    let lesson = (lessonsData as any)[lessonKey];
    let isFromCommon = false;

    if (!lesson && commonKey && (commonData as any).techniqueDetails && (commonData as any).techniqueDetails[commonKey]) {
      lesson = (commonData as any).techniqueDetails[commonKey];
      isFromCommon = true;
    }

    if (!lesson || typeof lesson !== 'object') {
      return <div>Lesson content not found for key: {lessonKey}</div>;
    }

    if (isFromCommon) {
      // Render using techniqueDetails structure
      return (
        <div className="content-card rounded-lg p-4 sm:p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{lesson.title}</h2>
          <div className="space-y-4 sm:space-y-6">
            {lesson.why && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Why It Works</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{lesson.why}</p>
              </div>
            )}

            {lesson.how && lesson.how.length > 0 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-200">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">How to Apply It</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.how.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            )}

            {lesson.examples && lesson.examples.length > 0 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-300">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Examples</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.examples.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.common_mistakes && lesson.common_mistakes.length > 0 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-400">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Common Mistakes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.common_mistakes.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {lesson.tools && lesson.tools.length > 0 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-500">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Recommended Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.tools.map((tool: string, index: number) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      // Render using lessons.json structure
      return (
        <div className="content-card rounded-lg p-4 sm:p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{lesson.title}</h2>
          <div className="space-y-4 sm:space-y-6">
            {lesson.principle && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-100">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.principle.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{lesson.principle.description}</p>
              </div>
            )}

            {lesson.howToApply && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-150">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.howToApply.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.howToApply.items.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            )}

            {lesson.pageStructure && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-200">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.pageStructure.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.pageStructure.items.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            )}

            {lesson.steps && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-300">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.steps.title}</h3>
                {lesson.steps.items ? (
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                    {lesson.steps.items.map((item: string, index: number) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start animate-in fade-in-0 slide-in-from-right-4 duration-400 delay-400">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">1</div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{lesson.steps.step1.title}</h4>
                        <p className="text-muted-foreground text-sm sm:text-base">{lesson.steps.step1.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start animate-in fade-in-0 slide-in-from-right-4 duration-400 delay-500">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">2</div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{lesson.steps.step2.title}</h4>
                        <p className="text-muted-foreground text-sm sm:text-base">{lesson.steps.step2.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start animate-in fade-in-0 slide-in-from-right-4 duration-400 delay-600">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">3</div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{lesson.steps.step3.title}</h4>
                        <p className="text-muted-foreground text-sm sm:text-base">{lesson.steps.step3.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start animate-in fade-in-0 slide-in-from-right-4 duration-400 delay-700">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">4</div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{lesson.steps.step4.title}</h4>
                        <p className="text-muted-foreground text-sm sm:text-base">{lesson.steps.step4.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {lesson.example && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-800">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.example.title}</h3>
                <p className="italic bg-muted p-3 sm:p-4 rounded-md border-l-4 border-primary text-sm sm:text-base">{lesson.example.description}</p>
              </div>
            )}

            {lesson.bestPairedWith && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-850">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.bestPairedWith.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: lesson.bestPairedWith.description }} />
              </div>
            )}

            {lesson.whyItWorks && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-900">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.whyItWorks.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{lesson.whyItWorks.description}</p>
              </div>
            )}

            {lesson.commonPitfalls && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-950">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.commonPitfalls.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: lesson.commonPitfalls.description }} />
              </div>
            )}

            {lesson.tips && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-1000">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.tips.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm sm:text-base">
                  {lesson.tips.items.map((item: string, index: number) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            )}

            {lesson.evidence && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-1050">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">{lesson.evidence.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{lesson.evidence.description}</p>
              </div>
            )}

            {lesson.tools && lesson.tools.length > 0 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500 delay-1100">
                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Recommended Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.tools.map((tool: string, index: number) => (
                    <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  const renderContent = () => {
    switch (contentKey) {
      case 'introduction':
        return (
          <div>
            <div className="content-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('introduction.welcome')}</h2>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('introduction.description1')}</p>
              <p className="text-muted-foreground text-sm sm:text-base">{t('introduction.description2')}</p>
            </div>
            <div className="content-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t('introduction.forgettingCurve.title')}</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('introduction.forgettingCurve.description')}</p>
              <ForgettingCurveChart />
            </div>
          </div>
        );

      case 'techniqueFinderPage':
        return (
          <div className="content-card rounded-lg p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('techniqueFinder.title')}</h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('techniqueFinder.description')}</p>
            <div id="quiz-container">
              <div className="mb-4 sm:mb-6">
                <p className="font-semibold text-base sm:text-lg mb-2">{t('techniqueFinder.questions.q1')}</p>
                <select id="q1" className="w-full p-3 sm:p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
                  <option value="memorization">{t('techniqueFinder.questions.q1_options.memorization')}</option>
                  <option value="understanding">{t('techniqueFinder.questions.q1_options.understanding')}</option>
                  <option value="longterm">{t('techniqueFinder.questions.q1_options.longterm')}</option>
                  <option value="application">{t('techniqueFinder.questions.q1_options.application')}</option>
                </select>
              </div>
              <div className="mb-4 sm:mb-6">
                <p className="font-semibold text-base sm:text-lg mb-2">{t('techniqueFinder.questions.q2')}</p>
                <select id="q2" className="w-full p-3 sm:p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
                  <option value="short">{t('techniqueFinder.questions.q2_options.short')}</option>
                  <option value="long">{t('techniqueFinder.questions.q2_options.long')}</option>
                </select>
              </div>
              <button id="get-recommendation" className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition text-sm sm:text-base">
                {t('techniqueFinder.button')}
              </button>
            </div>
            <div id="recommendation-result" className="mt-6 hidden"></div>
          </div>
        );

      case 'comparison':
        return (
          <div className="content-card rounded-lg p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('comparison.title')}</h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('comparison.description')}</p>
            <EffectivenessChart />
            <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4">{t('comparison.footnote')}</p>
          </div>
        );

      case 'activeRecall':
      case 'spacedRepetition':
      case 'interleaving':
      case 'elaboration':
      case 'dualCoding':
      case 'feynmanTechnique':
      case 'pomodoroTechnique':
      case 'cornellMethod':
      case 'mindMapping':
      case 'selfTesting':
        return renderLesson(contentKey);

      default:
        return <div>Content not found for key: {contentKey}</div>;
    }
  };

  return renderContent();
}
