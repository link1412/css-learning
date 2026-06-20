import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';

// ============================================================
// 书写模式（Writing Modes）—— 现代布局的坐标系基础
// 基于 css-writing-modes-3（REC, 2019-12-10）整理
// ============================================================

export const sections: Section[] = [
  // ── 1. 为什么需要书写模式 ──────────────────────────
  {
    id: 'why-writing-modes',
    number: '1',
    title: { zh: '为什么需要书写模式', en: 'Why Writing Modes' },
    specId: 'text-flow',
    summary: {
      zh: 'CSS2 的盒模型只为「从左到右、从上到下」的横排文字定义。书写模式把这套布局抽象成与文字流向无关的逻辑方向，是 Flexbox/Grid 的坐标系基础。',
      en: 'CSS2 boxes were defined only for horizontal-tb text. Writing Modes abstracts layout into flow-relative directions—the coordinate basis of Flexbox/Grid.',
    },
    keyPoints: [
      'CSS2.1 的盒布局只为 horizontal-tb（横排、从上到下）定义',
      '中文竖排、阿拉伯文从右到左等场景需要不依赖物理方向的抽象',
      '书写模式引入「流向相对」（flow-relative）方向，取代写死的 top/right/bottom/left',
      'Flexbox、Grid、Box Alignment 的 main/cross 轴、start/end 全部建立在这套抽象上',
      'css-writing-modes-3 取代并扩展了 CSS2.1 §8.6 与 §9.10',
    ],
    tutorial: [
      { type: 'heading', text: '物理方向的局限' },
      { type: 'paragraph', text: 'CSS2.1 的盒模型是为**横排、从上到下**（`horizontal-tb`）的文字设计的：`margin-top`、`padding-left`、`top`/`left` 这些属性名都写死了**物理方向**。但世界上的文字不止一种排法——中文/日文可以**竖排**，阿拉伯文/希伯来文**从右到左**。如果布局逻辑绑死物理方向，这些场景就需要为每种排法重写一套样式。' },
      { type: 'paragraph', text: '**书写模式**（writing mode）的核心思想：把布局从「物理方向」抽象成「**相对于文字流向的方向**」。这样同一份布局逻辑，换个 `writing-mode` 就能自动适配竖排或 RTL，无需改其它代码。' },
      { type: 'example', title: '逻辑属性自动适配方向', code: '.card {\n  /* 物理写法：换方向就失效 */\n  margin-left: 1em;\n\n  /* 逻辑写法：跟随文字流向 */\n  margin-inline-start: 1em;\n  /* 横排 LTR → 左边；横排 RTL → 右边；竖排 → 顶部 */\n}', lang: 'css', explanation: 'margin-inline-start 始终指向「行内方向的起点」，方向随 writing-mode/direction 自动变化。' },
      { type: 'heading', text: '它是现代布局的「地基」' },
      { type: 'paragraph', text: '为什么把书写模式排在 Flexbox/Grid **之前**学？因为这两个布局模块的核心术语——main/cross 轴、`flex-start`/`flex-end`、`justify-*`/`align-*`——**全部建立在书写模式的抽象方向之上**。不理解 inline/block 维度，就只能死记「`justify-content` 在 `flex-direction: row` 时管水平」，而不懂它本质上管的是**主轴方向**，而主轴方向由书写模式决定。' },
      { type: 'tip', text: 'css-writing-modes-3 是 **REC**（2019-12-10，已完成），它取代并扩展了 CSS2.1 §8.6（方向）与 §9.10（双向文本）。' },
    ] as TutorialBlock[],
  },

  // ── 2. 三套方向术语 ──────────────────────────────
  {
    id: 'direction-terms',
    number: '2',
    title: { zh: '三套方向术语', en: 'Three Sets of Directions' },
    specId: 'abstract-box',
    summary: {
      zh: 'CSS 用三套方向描述盒子：物理（physical）、流向相对（flow-relative）、行相对（line-relative）。理解它们的对应关系是读懂逻辑属性的前提。',
      en: 'CSS describes boxes with three direction systems: physical, flow-relative, and line-relative. Understanding their mapping unlocks logical properties.',
    },
    keyPoints: [
      '物理方向（physical）：top / right / bottom / left，绝对的屏幕方向',
      '流向相对（flow-relative / abstract）：block-start/end + inline-start/end，跟随文字流向',
      '行相对（line-relative）：over / under + line-left/right，相对于一行文字',
      'block-start 在横排（horizontal-tb）= 物理 top；在竖排可能 = 物理 right 或 left',
      '逻辑属性用流向相对方向命名，因此能自动适配书写模式',
    ],
    tutorial: [
      { type: 'heading', text: 'CSS 的三套「方向坐标系」' },
      { type: 'paragraph', text: '书写模式规范定义了**三套**描述盒子方向的术语。读逻辑属性前，先把它们分清：' },
      { type: 'list', items: [
        '**物理方向**（physical）：`top` / `right` / `bottom` / `left`——绝对的屏幕方向，永不改变。',
        '**流向相对方向**（flow-relative，又称 abstract）：`block-start` / `block-end` / `inline-start` / `inline-end`——相对于文字的**块流向**和**行内流向**。',
        '**行相对方向**（line-relative）：`over` / `under` / `line-left` / `line-right`——相对于**一行文字**（用于文本装饰、对齐基线等）。',
      ] },
      { type: 'heading', text: '关键：流向相对 ↔ 物理 的映射会变' },
      { type: 'paragraph', text: '流向相对方向到物理方向的**映射，取决于 `writing-mode` 和 `direction`**。这正是逻辑属性能自动适配的原因。以 `inline-start`（行内起点）为例：' },
      { type: 'example', title: 'inline-start 随模式变化', code: 'writing-mode: horizontal-tb; direction: ltr;\n  → inline-start = 物理 left（横排左起）\n\nwriting-mode: horizontal-tb; direction: rtl;\n  → inline-start = 物理 right（阿拉伯文右起）\n\nwriting-mode: vertical-rl;\n  → inline-start = 物理 top（竖排自上而下）', lang: 'text', explanation: '同一个 inline-start，在三种模式下分别映射到 left / right / top——逻辑属性的威力就在这里。' },
      { type: 'heading', text: 'block-start 的映射' },
      { type: 'paragraph', text: '`block-start`（块流向起点，即「新的块往哪个方向堆叠」的起点）：横排时 = 物理 `top`；`vertical-rl`（竖排、列从右往左）时 = 物理 `right`；`vertical-lr` 时 = 物理 `left`。' },
      { type: 'warning', text: '不要把 `inline-start` 想当然等于「左」。在 RTL 或竖排下它会指向右或上。逻辑属性的「start/end」永远相对**流向**，不是相对屏幕。' },
    ] as TutorialBlock[],
  },

  // ── 3. inline 与 block 维度 ──────────────────────
  {
    id: 'inline-block-dimensions',
    number: '3',
    title: { zh: 'inline 与 block 两个维度', en: 'Inline & Block Dimensions' },
    specId: 'logical-dimensions',
    summary: {
      zh: '盒子有两个抽象维度：inline（文字排列方向）和 block（行堆叠方向）。inline-size/block-size 取代了写死的 width/height。',
      en: 'A box has two abstract dimensions: inline (text flow) and block (line stacking). inline-size/block-size replace physical width/height.',
    },
    keyPoints: [
      'inline 维度（行内）：文字在一行内排列的方向',
      'block 维度（块）：一行接一行堆叠的方向',
      '横排时 inline = 水平（width）、block = 垂直（height）',
      '竖排时 inline = 垂直、block = 水平——width/height 的含义对调',
      'inline-size / block-size 是逻辑尺寸属性，跟随书写模式',
    ],
    tutorial: [
      { type: 'heading', text: '两个抽象维度' },
      { type: 'paragraph', text: '书写模式把盒子的尺寸抽象成两个维度，而非写死的「宽/高」：' },
      { type: 'list', items: [
        '**inline 维度**：文字在**一行之内**排列的方向（行内方向）。',
        '**block 维度**：一行接一行**堆叠**的方向（块方向）。',
      ] },
      { type: 'paragraph', text: '横排文字（`horizontal-tb`）里，文字水平排成一行 → **inline = 水平**；段落一行行往下堆 → **block = 垂直**。所以横排时 `inline-size` 就是 `width`，`block-size` 就是 `height`。' },
      { type: 'heading', text: '竖排时，width / height 的含义对调' },
      { type: 'paragraph', text: '一旦切换到竖排（`vertical-rl`/`vertical-lr`），文字竖着排成一列 → **inline 变成垂直**；列与列横向堆叠 → **block 变成水平**。这时 `inline-size` 控制的是**高度**方向，`block-size` 控制**宽度**方向——物理的 `width`/`height` 含义对调了。' },
      { type: 'example', title: '逻辑尺寸 vs 物理尺寸', code: '.box {\n  inline-size: 40ch;   /* 行内方向尺寸（横排=宽，竖排=高）*/\n  block-size: auto;    /* 块方向尺寸（横排=高，竖排=宽）*/\n}\n\n/* 横排：等价于 width:40ch; height:auto\n   竖排：等价于 height:40ch; width:auto */', lang: 'css', explanation: '用逻辑尺寸写「正文行宽 40 字符」，横排竖排都成立；用 width 则只在横排正确。' },
      { type: 'tip', text: '`40ch`（40 个字符宽）配合 `inline-size` 是排版正文「每行字数」的健壮写法——不管横竖排，都限制的是「一行的长度」。' },
    ] as TutorialBlock[],
  },

  // ── 4. writing-mode / direction / text-orientation ──
  {
    id: 'writing-mode-properties',
    number: '4',
    title: { zh: '三个核心属性', en: 'The Core Properties' },
    specId: 'writing-mode',
    summary: {
      zh: 'writing-mode 设块流向、direction 设行内基准方向、text-orientation 设竖排时字符的朝向。三者共同决定流向到物理方向的映射。',
      en: 'writing-mode sets block flow, direction sets inline base direction, text-orientation sets glyph orientation in vertical modes.',
    },
    keyPoints: [
      'writing-mode：horizontal-tb（默认）| vertical-rl | vertical-lr | sideways-* ',
      'direction：ltr（默认）| rtl，设定行内基准方向（应优先用 HTML dir 属性）',
      'text-orientation：mixed | upright | sideways，控制竖排时字符朝向',
      'writing-mode + direction 共同决定 inline/block 方向到物理方向的映射',
      'direction 影响行内级盒的排列与双向文本，建议用 HTML dir 而非 CSS direction',
    ],
    tutorial: [
      { type: 'heading', text: 'writing-mode：决定块流向' },
      { type: 'paragraph', text: '`writing-mode` 设定**块流向**（block flow direction）——新行往哪个方向堆叠，同时也决定了文字是横排还是竖排：' },
      { type: 'list', items: [
        '`horizontal-tb`（默认）：横排，块往下堆（top→bottom）',
        '`vertical-rl`：竖排，列从右往左堆（如传统中日文）',
        '`vertical-lr`：竖排，列从左往右堆',
        '`sideways-rl` / `sideways-lr`：整行旋转 90° 的竖排',
      ] },
      { type: 'code', code: '/* 传统竖排中文 */\n.poem {\n  writing-mode: vertical-rl;\n}\n\n/* 侧排标签（如表格表头）*/\n.rotated-label {\n  writing-mode: sideways-lr;\n}', lang: 'css', caption: 'writing-mode 切换横/竖排' },
      { type: 'heading', text: 'direction：行内基准方向' },
      { type: 'paragraph', text: '`direction` 设定**行内基准方向**（inline base direction）：`ltr`（从左到右，默认）或 `rtl`（从右到左，用于阿拉伯文、希伯来文）。它影响行内级盒的排列顺序和双向文本的处理。' },
      { type: 'warning', text: '规范与实践都建议：**用 HTML 的 `dir` 属性而非 CSS `direction`** 来设定方向。因为方向性是文档内容的语义，应随 HTML 走，避免 CSS 丢失时方向错乱。`unicode-bidi` 通常也不该手动改。' },
      { type: 'heading', text: 'text-orientation：竖排时字符的朝向' },
      { type: 'paragraph', text: '在竖排模式下，`text-orientation` 控制每个字符**朝向**：`mixed`（默认，CJK 直立、拉丁字母侧躺）、`upright`（全部直立）、`sideways`（全部侧躺）。' },
      { type: 'example', title: '竖排中混排英文', code: '.vertical {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;   /* 中文直立，英文/数字侧躺（默认）*/\n}\n.all-upright {\n  writing-mode: vertical-rl;\n  text-orientation: upright; /* 强制所有字符直立 */\n}', lang: 'css', explanation: 'mixed 是最自然的中英混排竖版效果；upright 适合编号、短标签。' },
    ] as TutorialBlock[],
  },

  // ── 5. 逻辑属性与逻辑值 ──────────────────────────
  {
    id: 'logical-properties',
    number: '5',
    title: { zh: '逻辑属性与逻辑值', en: 'Logical Properties & Values' },
    specId: 'logical-props',
    summary: {
      zh: '逻辑属性（margin-block、inset-inline 等）和逻辑值（start/end）用流向相对方向命名，自动适配书写模式与文字方向，是国际化布局的推荐写法。',
      en: 'Logical properties (margin-block, inset-inline) and values (start/end) follow flow-relative directions and adapt automatically.',
    },
    keyPoints: [
      'margin/padding/border 的逻辑版本：*-block-start/end、*-inline-start/end',
      'inset-block / inset-inline 取代 top/right/bottom/left',
      '逻辑值：text-align: start/end 取代 left/right',
      'inline-size/block-size、min-/max- 逻辑尺寸',
      '逻辑属性与物理属性可混用，按层叠规则相互覆盖',
    ],
    tutorial: [
      { type: 'heading', text: '物理属性的逻辑对应' },
      { type: 'paragraph', text: '几乎每个带物理方向的属性，都有一个**逻辑对应**（定义在 css-logical-1，与书写模式配套）。把「top/right/bottom/left」换成「block-start/inline-end…」即可：' },
      { type: 'example', title: '物理 → 逻辑 对照', code: 'margin-top      → margin-block-start\nmargin-bottom   → margin-block-end\nmargin-left     → margin-inline-start\nmargin-right    → margin-inline-end\n\ntop / bottom    → inset-block-start / -end\nleft / right    → inset-inline-start / -end\nwidth / height  → inline-size / block-size\ntext-align:left → text-align: start', lang: 'text', explanation: '左列绑死物理方向，右列跟随 writing-mode/direction 自动适配。' },
      { type: 'heading', text: '简写：block 与 inline 轴' },
      { type: 'paragraph', text: '逻辑属性也有按**轴**的简写：`margin-block`（一次设上下/块两端）、`margin-inline`（行内两端）、`inset-inline`、`padding-block` 等。' },
      { type: 'code', code: '.card {\n  padding-block: 1rem;        /* 块方向两端内边距 */\n  padding-inline: 1.5rem;     /* 行内方向两端内边距 */\n  margin-inline: auto;        /* 行内方向居中（横排即水平居中）*/\n  inset-inline-start: 0;      /* 定位：行内起点贴边 */\n}', lang: 'css', caption: '逻辑简写让组件天然支持 RTL 与竖排' },
      { type: 'heading', text: '逻辑值：start / end' },
      { type: 'paragraph', text: '不只是属性，**值**也有逻辑版本。`text-align: start` / `end`、`float: inline-start` 等，取代物理的 `left`/`right`，让对齐跟随文字方向。' },
      { type: 'example', title: 'text-align 逻辑值', code: '.prose {\n  text-align: start;   /* LTR→左对齐；RTL→右对齐，自动 */\n}\n\n/* 对比：text-align: left 在 RTL 下会反人类地左对齐 */', lang: 'css', explanation: '做多语言站点时，start/end 是默认就对的选择。' },
      { type: 'tip', text: '逻辑属性和物理属性可混用，按普通层叠规则相互覆盖。迁移时可以渐进替换，不必一次重写。' },
    ] as TutorialBlock[],
  },

  // ── 6. 它如何支撑 Flexbox/Grid ──────────────────
  {
    id: 'foundation-for-layout',
    number: '6',
    title: { zh: '它如何支撑 Flexbox / Grid', en: 'Foundation for Flexbox/Grid' },
    specId: 'intro',
    summary: {
      zh: 'Flexbox 的 main/cross 轴、Grid 的行列、Box Alignment 的 start/end，都是书写模式抽象方向的直接应用。先懂它，再学布局算法会事半功倍。',
      en: 'Flexbox main/cross axes, Grid rows/columns, and Box Alignment start/end are all applications of writing-mode abstract directions.',
    },
    keyPoints: [
      'Flexbox 的主轴方向（row/column）按 inline/block 维度定义，受 writing-mode 影响',
      'justify-content 沿主轴、align-items 沿交叉轴——轴由书写模式决定',
      'flex-start/flex-end 是流向相对的，不等于物理左右',
      'Grid 的「row/column」与自动放置同样基于书写模式的 inline/block',
      'Box Alignment 的 start/end/center 全部是逻辑方向',
    ],
    tutorial: [
      { type: 'heading', text: '回到 Flexbox：main/cross 轴的真相' },
      { type: 'paragraph', text: '现在可以揭穿一个常见的「死记」：`flex-direction: row` 时主轴是水平、`column` 时主轴是垂直——**这只是横排（horizontal-tb）下的表象**。本质上：' },
      { type: 'list', items: [
        '`flex-direction: row` → 主轴 = **inline 维度**',
        '`flex-direction: column` → 主轴 = **block 维度**',
      ] },
      { type: 'paragraph', text: '所以一旦 `writing-mode: vertical-rl`，`row` 的主轴就变成了**垂直**方向。`justify-content`（沿主轴对齐）、`align-items`（沿交叉轴对齐）也随之旋转。你记的不该是「水平/垂直」，而是「主轴/交叉轴」，而轴向由书写模式决定。' },
      { type: 'example', title: '同样的 flex 代码，换书写模式就转向', code: '.row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n/* horizontal-tb：子项水平排开，两端对齐\n   vertical-rl：  子项垂直排开，上下两端对齐 */', lang: 'css', explanation: 'justify-content 始终沿「主轴」，主轴是 inline 维度，inline 维度由 writing-mode 决定方向。' },
      { type: 'heading', text: 'Grid 与 Box Alignment 同理' },
      { type: 'paragraph', text: 'Grid 的「行（row）/ 列（column）」、自动放置的流向，以及 Box Alignment 模块里 `start`/`end`/`center`/`space-*` 这些对齐值，**全部基于书写模式的 inline/block 抽象**。这也是为什么 Box Alignment 能被 block、flex、grid 共用一套属性——它们共享同一套逻辑方向。' },
      { type: 'tip', text: '学完本章再去看 Flexbox / Grid / Box Alignment，你会发现它们的对齐与轴向「忽然讲得通了」。这就是把书写模式当地基先学的回报。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {};

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'writing mode': {
    zh: '书写模式',
    description: '文字的排布方式（横排/竖排、块流向），由 writing-mode 属性设定，决定逻辑方向到物理方向的映射。',
    specUrl: 'https://www.w3.org/TR/css-writing-modes-3/',
  },
  'block flow direction': {
    zh: '块流向',
    description: '相邻块级盒堆叠的方向。横排为自上而下，竖排为从右到左或从左到右。',
    specUrl: 'https://www.w3.org/TR/css-writing-modes-3/#block-flow',
  },
  'inline base direction': {
    zh: '行内基准方向',
    description: '行内级内容在一行内排列的基准方向（ltr/rtl），由 direction（建议用 HTML dir）设定。',
    specUrl: 'https://www.w3.org/TR/css-writing-modes-3/#inline-base-direction',
  },
  'flow-relative': {
    zh: '流向相对（方向）',
    description: '以文字流向为基准的抽象方向：block-start/end、inline-start/end，逻辑属性即基于此命名。',
    specUrl: 'https://www.w3.org/TR/css-writing-modes-3/#abstract-box',
  },
};
