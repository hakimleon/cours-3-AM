---
kind: business_term
name: Business Glossary
category: business_term
scope:
    - '**'
---

### أحتفظ بالأهم
- Definition：The 'Key Takeaways' section of each course lesson (literally 'What I keep important'), rendered as a card containing definitions, common mistakes, flash questions with answers, and a closing phrase. In Cours 01 it appears on page 1 before the exercises and is driven by `course.essential` / `CourseEssentialBlock`.
- Aliases：احتفظ بالأهم、essential block、takeaways card

### الاستنتاج التأسيسي
- Definition：The foundational conclusion box ('Foundational deduction') that closes the discovery activity correction. It contains the three official definitions of entité/espèce/système verbatim from the Algerian textbook and is displayed after the three exercise answers in the corrected activity card.
- Aliases：الاستنتاج التأسيسي للدرس、foundational deduction

### تنبيه بيداغوجي
- Definition：Pedagogical warning / common-mistake alert. Each item pairs an incorrect statement crossed out with the correct approach, a 'why?' explanation, and the underlying rule. Cours 01 defines four such warnings covering atom vs molecule confusion, quantity vs species, level-of-observation errors, and type vs system confusion.
- Aliases：أخطاء شائعة يجب تفاديها、pedagogical error、common mistake alert

### للتعمق
- Definition：The 'Dig deeper' accordion toggle in the course view. On the web it is collapsed (exercises sit above it); during PDF export it opens automatically so the full deep-dive content renders. Replaced the old `isDeepenExpanded` state with `tataamakAccordionOpen`.
- Aliases：deepen accordion、deep dive toggle

### ورقة عمل
- Definition：The worksheet/exercise section of a lesson, placed above the 'للتعمق' accordion. It contains the problem statements followed by their corrections, and is one of the top-level sections collected by the PDF pagination engine.
- Aliases：exercises section、worksheet
