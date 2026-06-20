import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';

// ============================================================
// 第 0 章 · 如何系统学习 CSS
//
// 本章是整个学习体系的「元层」：先建立规范地图、概念依赖链与
// 阅读方法论，再进入具体模块。内容基于 W3C 官方规范
// （CSS Snapshot 2026、CSS2.1、css-cascade、css-values、
// Understanding the CSS Specifications）整理。
// ============================================================

export const sections: Section[] = [
  // ── 0.1 规范体系地图 ─────────────────────────────────
  {
    id: 'spec-landscape',
    number: '1',
    title: { zh: '规范体系地图', en: 'The Specification Landscape' },
    summary: {
      zh: 'CSS 不是一份文档，而是一套以 CSS2.1 为核心、按模块独立演进的规范体系。先看懂「模块化、Level、Snapshot、成熟度」四个概念，才能在规范海洋里不迷路。',
      en: 'CSS is not one document but a system of modules built on the CSS2.1 core. Understand modularization, Level, Snapshot and maturity before diving in.',
    },
    keyPoints: [
      'CSS3 之后采用模块化（modularization），每个模块独立带 Level 号、独立走成熟度流程',
      'CSS Snapshot 界定「当前稳定的 CSS」全貌；最新为 CSS Snapshot 2026（2026-03-26 Group Note）',
      '没有「CSS Level 4」——CSS 这门语言不再有 Level，只有独立模块各自的 Level',
      '全新特性的模块从 Level 1 起；更新 CSS2 已有特性的模块从 Level 3 起',
      '最高权威是官方规范（w3.org / drafts.csswg.org），MDN 只作辅助',
    ],
    tutorial: [
      { type: 'heading', text: 'CSS 是「一套规范」而非「一份文档」' },
      { type: 'paragraph', text: 'CSS1 和 CSS2 是**单体规范**（monolithic specification）——一份文档涵盖全部特性。但从 CSS3 开始，CSS 改用**模块化**（modularization）：把语言拆成几十个独立模块（Syntax、Selectors、Cascade、Flexbox、Grid、Color……），每个模块带自己的 Level 号、独立演进、独立发布。理解这一点是读规范的前提——你不会再去找「一份叫 CSS3 的文档」，因为它不存在。' },
      { type: 'paragraph', text: 'CSS Snapshot 2026 §2 原文：“CSS Level 3 builds on CSS Level 2 module by module, using the CSS2.1 specification as its core. Each module adds functionality and/or replaces part of the CSS2.1 specification.” 即：**CSS2.1 是内核，模块在其上逐个扩展或替换。**' },
      { type: 'heading', text: '关于「CSS4」：它不存在' },
      { type: 'paragraph', text: '常有人说「CSS4」，但官方明确否认。CSS Snapshot 2026 直言：“There is no CSS Level 4. Independent modules can reach level 4 or beyond, but CSS the language no longer has levels.” 即：**独立模块可以到 Level 4、5、6（如 Selectors Level 4、Cascade Level 5），但 CSS 这门语言本身没有 Level 了。**「CSS3」如今只是与旧单体版本区分的统称。' },
      { type: 'heading', text: 'Level 编号规则' },
      { type: 'list', items: [
        '**全新特性**的模块从 **Level 1** 起（如 css-grid-1、css-variables-1、css-flexbox-1）',
        '**更新 CSS2 已有特性**的模块从 **Level 3** 起（如 selectors-3 替代 CSS2 §5、css-cascade-3+ 替代 CSS2 §6）',
        '同一模块的高 Level 向后兼容低 Level，并在其上增删（如 selectors-4 在 selectors-3 上新增 `:is()`/`:has()`）',
      ] },
      { type: 'heading', text: 'CSS Snapshot：当前稳定 CSS 的「官方快照」' },
      { type: 'paragraph', text: '模块各自演进，那「现在到底哪些 CSS 算稳定」？答案是 **CSS Snapshot**。它每年发布一版，把所有模块按稳定度分层收录，受众是实现者（浏览器厂商）。最新为 **CSS Snapshot 2026（2026-03-26）**。注意：Snapshot 本身走 **Note track**（Group Note），不是 Rec-track 文档——它是「索引与分层」，不是「规范」。' },
      { type: 'example', title: '三类权威入口，各有分工', code: 'CSS Snapshot 2026      → 当前稳定 CSS 的全貌与分层\n  https://www.w3.org/TR/css-2026/\nCSSWG Current Work      → 所有模块的实时成熟度总表\n  https://www.w3.org/Style/CSS/current-work\nCSS2.1 §1 + §3.1        → 术语与组织骨架的入口\n  https://www.w3.org/TR/CSS2/', lang: 'text', explanation: '查「能不能用」看 Snapshot 分层；查「某模块进展」看 Current Work；查「术语与基础概念」看 CSS2.1。' },
      { type: 'warning', text: '**MDN 是辅助，不是权威。** MDN 适合快速建直觉、查浏览器兼容性、看示例，但遇到精确行为与边界情况，一律以 w3.org 官方规范为准——MDN 偶有滞后或简化。' },
      { type: 'tip', text: '完成本节的基准：能用自己的话说清「模块化、Level、Snapshot、成熟度」四个概念之间的关系。' },
    ] as TutorialBlock[],
  },

  // ── 0.2 概念依赖链 ─────────────────────────────────
  {
    id: 'dependency-chain',
    number: '2',
    title: { zh: '概念依赖链：为什么按这个顺序学', en: 'The Dependency Chain' },
    summary: {
      zh: 'CSS 规范体系存在一条隐含的概念依赖链。按依赖顺序（自底向上）学，而非按「常用属性清单」学，是系统化的关键。',
      en: 'There is an implicit conceptual dependency chain in CSS. Learn bottom-up by dependency, not by a list of "common properties".',
    },
    keyPoints: [
      '依赖链：语法解析 → 选择器 → 层叠与继承 → 取值过程 → 盒模型 → 视觉格式化模型/display → 定位与布局算法 → 视觉与动态特性',
      'CSS2.1 的章节顺序本身就是一份「按依赖排序的教学大纲」',
      'CSS2.1 §1.1 原文：规范「从一般到具体、从底层概念到布局算法」递进',
      '可分为四层：基础层 → 取值与盒模型层 → 格式化与布局层 → 视觉与动态特性层',
      '必须先能解析语法、选中元素、定出每个属性的值，才能讲盒子怎么生成、怎么排布',
    ],
    tutorial: [
      { type: 'heading', text: '隐含的概念依赖链' },
      { type: 'paragraph', text: 'CSS 看似是上千个零散属性，但它们之间有一条清晰的**概念依赖链**：' },
      { type: 'diagram', code: 'flowchart TD\n  A["语法解析<br/>Syntax"] --> B["选择器<br/>Selectors"]\n  B --> C["层叠与继承<br/>Cascade & Inheritance"]\n  C --> D["取值过程<br/>specified / computed / used / actual"]\n  D --> E["盒模型<br/>Box Model"]\n  E --> F["视觉格式化模型 / display<br/>Visual Formatting Model"]\n  F --> G["定位与布局算法<br/>Positioning · Flexbox · Grid"]\n  G --> H["视觉与动态特性<br/>Color · Text · Transforms · Animations"]', caption: '后一环依赖前一环——这就是学习顺序' },
      { type: 'paragraph', text: '逻辑很直白：**必须先能解析语法、选中元素、为每个属性定出一个值，才谈得上这个盒子怎么生成、有多大、怎么排布、最后怎么画。** 跳过前面直接学 Flexbox，就会停留在「背 `justify-content` 的取值」，而不理解它为什么这么作用。' },
      { type: 'heading', text: 'CSS2.1 的章节顺序 = 一份依赖排序的大纲' },
      { type: 'paragraph', text: 'CSS2.1 在 §1.1 “Reading the specification” 中逐字写道：“The specification begins with a general presentation of CSS and becomes more and more technical and specific towards the end.”——它**刻意从一般到具体、从底层概念到布局算法递进**。它的章节骨架就是依赖顺序：' },
      { type: 'list', ordered: true, items: [
        '§4 语法与数据类型 → §5 选择器 → §6 层叠与继承（assigning property values）',
        '§7 媒体类型 → §8 盒模型 → §9 视觉格式化模型 → §10 宽高与 margin 计算',
        '§11 视觉效果/overflow → §12 生成内容/列表 → §14 颜色与背景',
        '§15 字体 → §16 文本 → §17 表格 → §18 用户界面',
      ] },
      { type: 'heading', text: '把依赖链压成「四层」' },
      { type: 'paragraph', text: '为便于规划，把这条链压缩成四个学习层。本站的阶段划分正是基于它：' },
      { type: 'example', title: '四层精读结构', code: '① 基础层      Syntax · Selectors · Values & Units\n② 取值与盒模型层  Cascade · Custom Properties · Box Model ·\n               Box Sizing · Writing Modes\n③ 格式化与布局层  Display · Visual Formatting Model ·\n               Positioned Layout · Flexbox · Grid · Box Alignment\n④ 视觉与动态层  Color · Backgrounds & Borders · Fonts · Text ·\n               Transforms · Transitions · Animations', lang: 'text', explanation: '严格自底向上。第 ④ 层不依赖布局算法，可以随时补。' },
      { type: 'tip', text: '完成本节的基准：能默写出八环依赖链，并解释「为什么取值过程必须排在盒模型之前」。' },
    ] as TutorialBlock[],
  },

  // ── 0.3 如何阅读规范 ─────────────────────────────────
  {
    id: 'reading-specs',
    number: '3',
    title: { zh: '如何阅读 W3C 规范', en: 'How to Read W3C Specs' },
    summary: {
      zh: '规范有自己的阅读方法：区分规范性与资讯性文本、读懂属性定义表、掌握值定义语法这套元语言。学会方法，比逐字读完更高效。',
      en: 'Specs have their own reading method: normative vs informative text, the property definition table, and the value definition syntax meta-language.',
    },
    keyPoints: [
      '只有规范性（normative）文本约束实现；标注 Note/示例/"non-normative" 的是资讯性（informative）',
      'RFC 2119 关键词 MUST/SHOULD/MAY 标示强制程度',
      '每个属性有一张「属性定义表」：Value / Initial / Applies to / Inherited / Percentages / Computed value / Animation type',
      '值定义语法（value definition syntax）是读懂所有属性 Value 行的「元语言」',
      '读「当前规则」用 TR 版；读「最新进展」用 Editor’s Draft（ED）；务必检查 errata（勘误）',
    ],
    tutorial: [
      { type: 'heading', text: '官方推荐的入口顺序' },
      { type: 'paragraph', text: 'W3C 官方指南《Understanding the CSS Specifications》（作者 fantasai / Elika J. Etemad）建议的地基顺序：先读 **CSS Snapshot** 建立全局 → 读 **CSS2.1 第 1 章**（规范如何组织）+ **§3.1 Definitions**（术语）→ 再按需读各模块的 Introduction / Terminology / Glossary。**先读地基段落，不要一上来就逐字啃整份规范。**' },
      { type: 'heading', text: '规范性 vs 资讯性（normative vs informative）' },
      { type: 'paragraph', text: '判断「实现到底必须做什么」时，只看**规范性文本**。以下都**不**构成一致性要求：标注 “This section is non-normative” 的章节、以 “Note:” 开头的注释、所有示例（examples）、以及 “We recommend…” 之类的建议。规范性文本用 **RFC 2119 关键词**标示强制程度：' },
      { type: 'list', items: [
        '**MUST / MUST NOT**：强制要求，违反即不符合规范',
        '**SHOULD / SHOULD NOT**：强烈建议，但允许有正当理由偏离',
        '**MAY**：可选，实现自行决定',
      ] },
      { type: 'heading', text: '读懂「属性定义表」' },
      { type: 'paragraph', text: '每个 CSS 属性的规范条目都带一张**属性定义表**（property definition table）。读懂这张表，往往比读正文更高效。关键行：' },
      { type: 'list', items: [
        '**Value:** — 用值定义语法写的合法值（见下节）',
        '**Initial:** — 初始值（无声明且不继承时用它）',
        '**Applies to:** — 适用于哪些元素 / 盒子',
        '**Inherited:** — 是否自动继承',
        '**Percentages:** — 百分比相对于什么计算',
        '**Computed value:** — 计算值如何得出（决定继承传什么、used 从哪算起）',
        '**Animation type:** — 是否可动画、如何插值',
      ] },
      { type: 'example', title: 'width 属性定义表（节选）', code: "Name:           width\nValue:          auto | <length-percentage> | min-content | ...\nInitial:        auto\nApplies to:     所有元素（除非替换的 inline 元素、表格行列）\nInherited:      no\nPercentages:    相对于包含块的 width\nComputed value: 见正文（保留百分比 / 解析为绝对长度）\nAnimation type: by computed value type", lang: 'text', explanation: '看到 “Percentages: 相对于包含块 width” 就知道：为什么 width:50% 的计算值保留百分比——因为它依赖布局。' },
      { type: 'heading', text: '值定义语法：读懂 Value 行的「元语言」' },
      { type: 'paragraph', text: '属性的 **Value:** 行用一套统一的记号写成，来自 **CSS Values & Units** 模块。掌握这套**元语言**后，任何属性的语法行你都能读懂：' },
      { type: 'list', items: [
        '`<type>` — 基本类型，如 `<length>`、`<color>`、`<percentage>`',
        '并列 `A B` — 必须按此顺序出现；`A | B` — 其中之一',
        '`A || B` — 一个或多个，任意顺序；`A && B` — 全部都要，任意顺序',
        '分组 `[ ]`；数量 `?`（0或1）、`*`（0+）、`+`（1+）、`{m,n}`（m到n个）',
        '`#` — 逗号分隔的列表；`!` — 该组必须产生值',
      ] },
      { type: 'example', title: '拆解一行真实语法', code: 'margin: [ <length> | <percentage> | auto ]{1,4}\n\n读法：margin 的值是 “长度、百分比、auto 三选一”\n      这样的单元，重复 1 到 4 次。\n→ 这就解释了 margin 为何能写 1、2、3、4 个值。', lang: 'text', explanation: '不需要背 margin 的四值规则——值定义语法已经把规则写在 Value 行里了。' },
      { type: 'heading', text: 'TR 版 vs Editor’s Draft（ED）' },
      { type: 'paragraph', text: '同一规范有两个版本：**TR 版**（www.w3.org/TR/，正式发布、相对稳定）和 **Editor’s Draft**（drafts.csswg.org/，最新但可能自相矛盾、未经 WG 共识）。规则：**引用「当前规则」用 TR 版，参考「未来方向」读 ED。** 另外，每份规范顶部都有 errata（勘误）链接，读 REC 级规范时务必检查。' },
      { type: 'warning', text: 'Editor’s Draft 是「进行中」的草稿，可能包含尚未达成共识、甚至前后矛盾的内容。把它当作未来方向参考，不要当作当前必须实现的规则。' },
      { type: 'tip', text: '完成本节的基准：能徒手拆解任意属性的 Value 行（如 `background-position`），并说出该属性是否继承、百分比相对于谁。' },
    ] as TutorialBlock[],
  },

  // ── 0.4 取值过程是主线 ─────────────────────────────────
  {
    id: 'value-processing-spine',
    number: '4',
    title: { zh: '取值过程：贯穿全局的主线', en: 'Value Processing: The Spine' },
    summary: {
      zh: 'declared → cascaded → specified → computed → used → actual 是整个 CSS 的中枢。理解它，层叠、继承、变量、布局全部串起来。',
      en: 'declared → cascaded → specified → computed → used → actual is the spine of CSS. Grasp it and cascade, inheritance, variables and layout all connect.',
    },
    keyPoints: [
      '取值过程六阶段：declared → cascaded → specified → computed → used → actual',
      'computed value（计算值）是继承传给子元素的值，不依赖布局',
      'used value（使用值）是布局算出的绝对值；actual value（实际值）是设备近似后的值',
      'computed≠used 只发生在依赖布局的属性上（如百分比宽度需要包含块尺寸）',
      '这是「四大 keystone 概念」的第一个，搞懂它能解锁 80% 的「为什么」',
    ],
    tutorial: [
      { type: 'heading', text: '为什么把它单独拎出来当主线' },
      { type: 'paragraph', text: '在所有 CSS 概念里，**取值过程**（value processing）是最该优先吃透的一个。它是层叠、继承、CSS 变量、布局算法共同的「输出格式」——几乎每个其它概念都在这条流水线的某个阶段上工作。理解了它，很多「玄学」会瞬间变成「机制」。' },
      { type: 'diagram', code: 'flowchart LR\n  A["declared<br/>声明值<br/><i>所有匹配的声明</i>"] --> B["cascaded<br/>层叠值<br/><i>层叠胜出的那个</i>"]\n  B --> C["specified<br/>指定值<br/><i>默认处理后恰好一个</i>"]\n  C --> D["computed<br/>计算值<br/><i>相对值解析为绝对值</i>"]\n  D --> E["used<br/>使用值<br/><i>布局算出的绝对值</i>"]\n  E --> F["actual<br/>实际值<br/><i>设备近似的最终值</i>"]', caption: '一个属性值从声明到上屏的六个阶段；继承（inheritance）传递的是 computed（计算）值' },
      { type: 'heading', text: '三个最容易混淆的阶段' },
      { type: 'list', items: [
        '**computed value（计算值）**：把 `em`、相对 URL 等尽量解析为绝对值，但**不依赖布局**。这是**继承时传递给子元素的值**。',
        '**used value（使用值）**：完成所有剩余计算——百分比需要包含块尺寸、`auto` 需要布局算法。这是**布局后的绝对理论值**。',
        '**actual value（实际值）**：使用值经设备限制（整数像素、可用字体）调整后的**最终渲染值**。',
      ] },
      { type: 'example', title: '一个值走完全程', code: 'p   { font-size: 16px; }\nspan{ font-size: 1.5em;\n      width: 50%; }\n\nfont-size:  1.5em(声明/指定) → 24px(计算，1.5×16) → 24px(使用)\nwidth:      50%(声明/指定/计算，保留%) → 400px(使用，依赖包含块)', lang: 'css', explanation: 'font-size 在计算阶段就定死了（不依赖布局）；width 的计算值还是 50%，要到使用值才变像素——因为它依赖包含块宽度，而计算阶段还不知道布局。' },
      { type: 'paragraph', text: '**关键判断：computed≠used 只发生在「依赖布局」的属性上。** 这也解释了 `getComputedStyle()` 的历史怪癖——它对 `width` 等属性返回的其实是 used value（像素），而非 computed value（百分比）。' },
      { type: 'tip', text: '本站「层叠与继承」章节的 ValuePipeline 交互 demo 就是这条主线的可视化工具——配合本节使用，对每个预设场景「先预测每一阶段、再点开验证」。' },
      { type: 'tip', text: '完成本节的基准：能口述「为什么 computed≠used 只发生在依赖布局的属性上」，并举出一个 computed=used 与一个 computed≠used 的属性。' },
    ] as TutorialBlock[],
  },

  // ── 0.5 成熟度与稳定性 ─────────────────────────────────
  {
    id: 'maturity-stability',
    number: '5',
    title: { zh: '成熟度与稳定性判断', en: 'Maturity & Stability' },
    summary: {
      zh: 'WD → CR → REC 是 W3C 的成熟度阶段，决定你读到的内容会不会变。但「REC 不等于最新、CR/WD 不等于不可用」，判断能否用要结合 Snapshot 分层与浏览器支持。',
      en: 'WD → CR → REC are the W3C maturity stages. But REC ≠ latest and CR/WD ≠ unusable; judge usability via Snapshot layering and browser support.',
    },
    keyPoints: [
      'Rec-track 三大阶段：WD（设计，会大改）→ CR（测试，相对稳定）→ REC（完成，只修勘误）',
      'CR 还细分 CR Snapshot（正式重发的 CR）与 CR Draft / CRD（编辑修订的过渡 CR）',
      'CR 需要两份独立实现才能进入',
      'REC 不等于最新：CSS2.1 是 REC，但很多小节已被模块 replace/supersede',
      'CR/WD 不等于不可用：Flexbox、Grid、Custom Properties 未到 REC 却早已广泛互操作',
    ],
    tutorial: [
      { type: 'heading', text: '成熟度阶段：决定「你读的内容会不会变」' },
      { type: 'paragraph', text: 'W3C 的 Rec-track（推荐流程）有三大阶段，成熟度递增。看规范顶部那行 “W3C ___, [日期]” 就能判断它处于哪一阶段：' },
      { type: 'list', ordered: true, items: [
        '**WD（Working Draft，工作草案）**：设计阶段，内容会大改。读它以「概念与术语」为主，对具体语法保持警觉。',
        '**CR（Candidate Recommendation，候选推荐）**：测试阶段，需**两份独立实现**才能进入，内容相对稳定但仍会因实现反馈调整。',
        '**REC（Recommendation，推荐标准）**：完成态，只通过 errata（勘误）维护。',
      ] },
      { type: 'heading', text: 'CR 的两个变体' },
      { type: 'paragraph', text: 'CSSWG 还把 CR 细分为两种，名字容易混：' },
      { type: 'list', items: [
        '**CR Snapshot（候选推荐快照）**：正式重新发布的 CR，是一个稳定的里程碑版本。',
        '**CR Draft / CRD（候选推荐草案）**：编辑修订中的过渡 CR，介于两次正式 CR 之间。',
      ] },
      { type: 'warning', text: '**REC 不等于「最新」，CR/WD 不等于「不可用」。** CSS2.1 是 REC，但它的 Syntax、Selectors、Cascade、Box Model 等小节早已被对应模块 “replaces/supersedes”；反过来，Flexbox、Grid、Custom Properties 虽未到 REC，却早已在所有浏览器广泛互操作。' },
      { type: 'heading', text: '那到底「能不能用」？' },
      { type: 'paragraph', text: '判断一个特性能否在生产中使用，**不要只看 Rec-track 阶段**，而要综合两个维度：① **CSS Snapshot 的分层**（它把模块按稳定度分为「官方定义」「可靠的 CR」「实现经验有限」等）；② **浏览器支持**（caniuse / MDN 兼容表）。一个特性即使还是 WD，只要 Snapshot 收录且浏览器普遍支持，就可以用。' },
      { type: 'example', title: '一个有意思的官方例外', code: 'CSS Animations Level 1 与 Transitions Level 1 在 Snapshot 中\n仍列于「粗略互操作」层，但《Safe to Release pre-CR Exceptions》\n明确：这两个模块已被 CSSWG 追溯性批准可广泛发布。', lang: 'text', explanation: '这说明「成熟度阶段」和「能否放心用」是两件事——官方有时会显式为低阶段特性「开绿灯」。' },
      { type: 'tip', text: '完成本节的基准：拿到任意一份 CSS 规范，能从顶部那行判断它的成熟度（WD/CR/CRD/REC），并说出该阶段意味着「内容还会不会变」。' },
    ] as TutorialBlock[],
  },

  // ── 0.6 学习法：三步循环 + 完成基准 ─────────────────────
  {
    id: 'study-method',
    number: '6',
    title: { zh: '学习法：三步循环与完成基准', en: 'Study Method: Loop & Checkpoints' },
    summary: {
      zh: '学会 CSS 靠「主动重建」而非「被动读完」。每个概念走「读地基段落 → 自己重述 → 写测试用例验证」的三步循环，并用每层的完成基准检验。',
      en: 'Learn CSS by active reconstruction, not passive reading. Loop: read foundations → restate in your own words → verify with test cases. Check against per-layer criteria.',
    },
    keyPoints: [
      '三步循环：① 读地基段落（Intro/Terminology/Glossary）② 合上规范自己重述 ③ 写测试用例验证',
      '关键在第 ③ 步：先预测结果，再跑，预测错的地方就是认知漏洞',
      '抓四个 keystone：取值过程 → 盒模型+包含块 → 格式化上下文+display → 布局算法',
      '视觉/动态层不依赖布局算法，放最后，随时可补',
      '每层都有「完成基准」——答得上才算过，再进下一层',
    ],
    tutorial: [
      { type: 'heading', text: '核心原则：主动重建，而非被动读完' },
      { type: 'paragraph', text: '读规范是「地图」，但**学会 CSS 靠的是主动重建，不是把规范当小说读完**。大多数人栽在逐字啃整份规范上，两周就弃。正确的做法是：每个概念都走一个小循环，边读边用。' },
      { type: 'heading', text: '三步循环（对每个概念都走一遍）' },
      { type: 'list', ordered: true, items: [
        '**读地基段落**——只读该模块的 Introduction + Terminology + Glossary，先建立术语，不要一上来读全文。',
        '**自己重述**——合上规范，用自己的话讲一遍 / 画一张图。讲不清，就是没懂。',
        '**写测试用例验证**——这是关键一步：打开交互 demo 或 CodePen，**先预测**结果，再跑。**预测错的地方，就是你的认知漏洞。**',
      ] },
      { type: 'tip', text: '本站的交互 demo 正是第 ③ 步的现成工具——它能边调参数边显示 `getComputedStyle()` 的真实计算值。别浪费这个工作台：先预测，再验证。' },
      { type: 'heading', text: '抓四个 keystone，其余会自己塌缩成位' },
      { type: 'paragraph', text: 'CSS 看着上千个属性，但有四个**枢纽概念**（keystone），按顺序吃透，80% 的「为什么」就通了。别跳：' },
      { type: 'list', ordered: true, items: [
        '**取值过程** declared→…→actual——整个 CSS 的中枢（见 0.4）。',
        '**盒模型 + 包含块（containing block）**——每个盒子的尺寸相对「谁」算。',
        '**格式化上下文（BFC/IFC/flex/grid FC）+ display 的 inner/outer 双类型**——盒子怎么生成、怎么互相影响（margin 折叠、浮动、文档流都源于此）。',
        '**布局算法（Flexbox / Grid）**——前三个懂了，这俩只是「在确定的盒子上跑分配算法」。',
      ] },
      { type: 'paragraph', text: '**视觉与动态层（颜色、字体、变换、动画）放最后**，因为它们不依赖布局算法，随时能补。' },
      { type: 'heading', text: '每层的「完成基准」' },
      { type: 'paragraph', text: '不要靠「感觉学过了」判断进度，用可检验的**完成基准**。答得上才算过，再进下一层：' },
      { type: 'list', items: [
        '**基础层**：能徒手算任意选择器的 (A,B,C) 特异度（正确处理 `:is()`/`:where()`/`:not()`）；能读懂任意属性的 Value 行。',
        '**取值与盒模型层**：能口述 declared→cascaded→specified→computed→used→actual 每一步在哪发生；能解释为什么 computed≠used 只发生在依赖布局的属性上。',
        '**格式化与布局层**：能讲清一个元素从 display 计算值 → 生成何种盒 → 参与何种 formatting context → used 宽高如何被解出的全过程。',
        '**视觉与动态层**：能说清动画为何在 computed values 上插值、变换为何不影响布局只影响渲染。',
      ] },
      { type: 'heading', text: '本周可以这样开始' },
      { type: 'list', ordered: true, items: [
        '**今天**：读完本章（第 0 章）；目标是能看懂属性定义表和值定义语法记号。',
        '**本周**：只攻 keystone #1「取值过程」——配合「层叠与继承」章节 + ValuePipeline demo，对每个预设场景先预测每一阶段、再验证。',
        '**过关判据**：能口述「为什么 computed≠used 只发生在依赖布局的属性上」。能 = 进入下一个 keystone。',
      ] },
      { type: 'tip', text: '别等工具完美才开始。现在就挑一个概念，走一遍三步循环。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  normative: {
    zh: '规范性（文本）',
    description: '规范中真正约束实现的内容，用 RFC 2119 关键词（MUST/SHOULD/MAY）标示强制程度。',
    specUrl: 'https://www.w3.org/TR/css-2026/',
  },
  informative: {
    zh: '资讯性（文本）',
    description: '不构成一致性要求的内容，如标注 non-normative 的章节、Note 注释、示例与建议。',
    specUrl: 'https://www.w3.org/TR/css-2026/',
  },
  'value definition syntax': {
    zh: '值定义语法',
    description: '规范用来描述属性合法值的元语言，含 <type>、| || && ? * + {} # 等记号。',
    specUrl: 'https://www.w3.org/TR/css-values-3/#value-defs',
  },
  'css snapshot': {
    zh: 'CSS 快照',
    description: '界定「当前稳定的 CSS」全貌并按稳定度分层的官方索引文档（Group Note），最新为 CSS Snapshot 2026。',
    specUrl: 'https://www.w3.org/TR/css-2026/',
  },
  "editor's draft": {
    zh: '编辑草案',
    description: 'drafts.csswg.org 上最新但可能自相矛盾、未经 WG 共识的进行中版本；作当前规则引用应以 TR 版为准。',
    specUrl: 'https://drafts.csswg.org/',
  },
};
