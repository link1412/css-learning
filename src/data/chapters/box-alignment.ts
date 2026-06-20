import type { Section, TutorialBlock } from '../modules';
import type { GlossaryEntry } from '../glossary';

// ============================================================
// 盒对齐（Box Alignment）—— css-align-3
// 跨布局模式（block / flex / grid / multicol）的统一对齐系统。
// 自「尺寸计算与对齐」章拆分而来，建立在书写模式的 inline/block 抽象之上。
// ============================================================

export const sections: Section[] = [
  {
    id: 'alignment',
    number: '1',
    title: { zh: '盒对齐', en: 'Box Alignment' },
    summary: { zh: 'CSS Box Alignment Module Level 3 提供了统一的对齐属性，适用于 Flexbox、Grid、Block 等多种布局模式。', en: 'CSS Box Alignment Module Level 3 provides unified alignment properties applicable to multiple layout modes including Flexbox, Grid, and Block.' },
    keyPoints: [
      'justify-content: 主轴/行内轴方向的空间分配',
      'align-items: 交叉轴/块轴方向的默认对齐',
      'align-self: 单个元素的交叉轴对齐',
      'align-content: 多行内容的交叉轴分布',
      'place-items/place-self/place-content: 简写属性',
      'gap/row-gap/column-gap: 项目间固定间距，适用于 Flex、Grid 和多列布局',
      '分布对齐：space-between(两端对齐)、space-around(等间距)、space-evenly(完全等分)',
      'safe/unsafe 溢出对齐：safe 在溢出时回退到 flex-start，unsafe 严格遵循指定对齐',
      '基线对齐(baseline)：同一行/列中多个项目按其基线对齐，支持 first/last baseline',
      'justify-self/justify-items: 行内轴方向的自身对齐与默认对齐设置',
    ],
    tutorial: [
      { type: 'heading', text: 'Box Alignment:统一的对齐系统' },
      { type: 'paragraph', text: 'CSS Box Alignment Module Level 3 是一套**跨布局模式的统一对齐规范**,适用于 Flexbox、Grid、多列布局甚至块布局。它提供了一组一致的属性,让你可以用相同的语法在不同布局中实现对齐。这个模块的设计哲学是:**对齐应该独立于布局模式**。' },
      { type: 'paragraph', text: '理解 Box Alignment 的关键是理解两根轴:**主轴(main axis)和交叉轴(cross axis)** (flexbox)或**行内轴(inline axis)和块轴(block axis)** (grid/block)。所有对齐属性都围绕这两根轴工作。' },

      { type: 'heading', text: '对齐属性全景图' },
      { type: 'list', items: [
        '**内容分布**:`justify-content`, `align-content` — 控制项目组/行列之间的空间分配',
        '**自身对齐**:`justify-self`, `align-self` — 控制单个项目在其网格区域/交叉轴的位置',
        '**默认对齐**:`justify-items`, `align-items` — 设置所有项目的默认自身对齐',
        '**简写**:`place-content`, `place-self`, `place-items` — 同时设置两个轴的对齐',
        '**间距**:`gap`, `row-gap`, `column-gap` — 项目之间的固定间距'
      ] },
      { type: 'tip', text: '记忆规则:**justify-** 前缀控制主轴/行内轴(水平方向)对齐,**align-** 前缀控制交叉轴/块轴(垂直方向)对齐。但这只是大致规则,具体方向取决于 `writing-mode` 和 `flex-direction`。' },

      { type: 'heading', text: 'justify-content:主轴空间分配' },
      { type: 'paragraph', text: '`justify-content` 控制容器在**主轴/行内轴**方向上如何分配剩余空间。它作用于项目组,而非单个项目。' },
      { type: 'code', lang: 'css', caption: 'justify-content 的所有值', code: `/* 位置对齐 */\n.container {\n  justify-content: start;        /* 起点对齐 */\n  justify-content: end;          /* 终点对齐 */\n  justify-content: center;       /* 居中 */\n  justify-content: flex-start;   /* Flexbox 特有:主轴起点 */\n  justify-content: flex-end;     /* Flexbox 特有:主轴终点 */\n}\n\n/* 分布对齐 */\n.container {\n  justify-content: space-between;  /* 两端对齐,间距相等 */\n  justify-content: space-around;   /* 每个项目两侧间距相等 */\n  justify-content: space-evenly;   /* 所有间距完全相等 */\n}\n\n/* 基线对齐 */\n.container {\n  justify-content: baseline;       /* 按基线对齐(主要用于 Grid) */\n}` },
      { type: 'example', title: 'space-between vs space-around vs space-evenly', lang: 'text', code: `/* 假设容器 [                    ] 里有 3 个项目 ■ */\n\nspace-between:  [■        ■        ■]  两端紧贴,间距相等\nspace-around:   [  ■      ■      ■  ]  每个项目两侧间距相等(两端间距=项目间距÷2)\nspace-evenly:   [   ■     ■     ■   ]  所有间距完全相等(包括两端)`, explanation: '`space-between` 让第一个和最后一个项目紧贴容器边缘,中间间距均分。`space-around` 给每个项目两侧分配相等空间,所以两端间距是项目间距的一半。`space-evenly` 让所有间距完全相等,包括两端。' },
      { type: 'warning', text: '`justify-content` 只在有**剩余空间**时才有效。如果 flex 项目的 `flex-grow` 已经把空间全部分配了,或者 grid 轨道已经填满了容器,`justify-content` 就没有可分配的空间,不会产生任何效果。' },

      { type: 'heading', text: 'align-items:交叉轴默认对齐' },
      { type: 'paragraph', text: '`align-items` 设置在容器上,为所有项目提供**交叉轴/块轴**方向的默认对齐方式。在 flexbox 中,这是最常用的属性之一。' },
      { type: 'code', lang: 'css', caption: 'align-items 常用值', code: `/* Flexbox 水平布局中,以下值控制垂直对齐 */\n.flex-container {\n  display: flex;\n  \n  align-items: stretch;      /* 默认:拉伸填满交叉轴 */\n  align-items: flex-start;   /* 紧贴交叉轴起点(顶部) */\n  align-items: flex-end;     /* 紧贴交叉轴终点(底部) */\n  align-items: center;       /* 交叉轴居中 */\n  align-items: baseline;     /* 按首行文本基线对齐 */\n}\n\n/* Grid 中,align-items 控制项目在网格行方向的对齐 */\n.grid-container {\n  display: grid;\n  align-items: start;        /* 紧贴网格区域顶部 */\n  align-items: end;          /* 紧贴网格区域底部 */\n  align-items: center;       /* 网格区域内垂直居中 */\n}` },
      { type: 'example', title: '等高卡片 vs 顶部对齐卡片', lang: 'css', code: `/* 默认:所有卡片等高 */\n.card-list {\n  display: flex;\n  gap: 16px;\n  align-items: stretch;  /* 默认值,所有卡片拉伸到最高卡片的高度 */\n}\n\n/* 让卡片保持自然高度,顶部对齐 */\n.card-list-natural {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;  /* 卡片高度各异,顶部对齐 */\n}`, explanation: '`align-items: stretch` 让所有 flex 项目拉伸到交叉轴的容器尺寸(或同一行中最高项目的高度),实现等高效果。`align-items: flex-start` 让项目保持自然高度,顶部对齐。' },

      { type: 'heading', text: 'align-self:单个项目覆盖' },
      { type: 'paragraph', text: '`align-self` 设置在项目上,允许单个项目覆盖容器的 `align-items` 设置。它的值与 `align-items` 相同,外加 `auto`(默认值,继承 `align-items`)。' },
      { type: 'code', lang: 'css', caption: '让某个项目特殊对齐', code: `.container {\n  display: flex;\n  align-items: flex-start;  /* 所有项目靠顶部 */\n  height: 200px;\n}\n\n.special-item {\n  align-self: flex-end;     /* 这个项目靠底部 */\n}\n\n.centered-item {\n  align-self: center;       /* 这个项目垂直居中 */\n}` },
      { type: 'tip', text: '`align-self: center` 是在 flex 布局中实现单个元素垂直居中的最简单方式。常见场景:在顶部对齐的工具栏中让某个按钮垂直居中,或在等高卡片中让底部按钮始终靠下对齐。' },

      { type: 'heading', text: 'align-content:多行/列的空间分配' },
      { type: 'paragraph', text: '`align-content` 控制**多行 flex 容器**或**多轨道 grid 容器**在交叉轴方向的空间分配。它作用于行/列之间,而非单个项目。' },
      { type: 'code', lang: 'css', caption: 'align-content 用于多行布局', code: `/* 多行 flex 容器 */\n.wrap-container {\n  display: flex;\n  flex-wrap: wrap;         /* 必须是多行! */\n  height: 400px;           /* 必须有明确高度! */\n  \n  align-content: flex-start;     /* 所有行挤在顶部 */\n  align-content: space-between;  /* 第一行顶部,最后一行底部 */\n  align-content: center;         /* 所有行居中 */\n}\n\n/* Grid 容器 */\n.grid {\n  display: grid;\n  grid-template-rows: repeat(3, 100px);\n  height: 500px;  /* 剩余 200px 由 align-content 分配 */\n  \n  align-content: space-around;  /* 行之间均匀分布 */\n}` },
      { type: 'warning', text: '`align-content` 常见误区:**它只在多行/多列容器中生效**。单行 flex 容器(`flex-wrap: nowrap`)或只有一行内容的容器,`align-content` 完全无效。另外,容器在交叉轴方向必须有剩余空间(即容器高度 > 所有行的总高度),`align-content` 才有可见效果。' },

      { type: 'heading', text: 'justify-self 和 justify-items:行内轴对齐' },
      { type: 'paragraph', text: '`justify-self` 和 `justify-items` 控制项目在**行内轴/主轴**方向的对齐,与 `align-self/align-items` 对称。但注意:**这两个属性在 flexbox 中不生效**,只在 grid 和块布局中有效。' },
      { type: 'code', lang: 'css', caption: 'Grid 中的 justify-self', code: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  justify-items: center;  /* 所有项目在网格单元格内水平居中 */\n}\n\n.special-item {\n  justify-self: end;      /* 这个项目在单元格内靠右对齐 */\n}` },
      { type: 'tip', text: 'Flexbox 中没有 `justify-self`,因为主轴方向的对齐由 `justify-content`、`flex-grow` 和 `margin: auto` 控制。如果你需要单个 flex 项目在主轴方向特殊对齐,用 `margin-left: auto` 或 `margin-right: auto`。' },

      { type: 'heading', text: '简写属性:place-*' },
      { type: 'paragraph', text: '`place-content`、`place-items`、`place-self` 是简写属性,可以同时设置两个轴的对齐。语法:`place-XXX: <align> <justify>`。如果只提供一个值,两个轴使用相同值。' },
      { type: 'code', lang: 'css', caption: 'place-* 简写', code: `/* place-items = align-items + justify-items */\n.grid {\n  display: grid;\n  place-items: center;       /* 两个轴都居中 */\n  /* 等同于: align-items: center; justify-items: center; */\n  \n  place-items: start end;    /* 垂直起点,水平终点 */\n}\n\n/* place-self = align-self + justify-self */\n.item {\n  place-self: center;        /* 在网格单元格内完全居中 */\n}\n\n/* place-content = align-content + justify-content */\n.container {\n  place-content: space-between center;\n}` },
      { type: 'tip', text: '`place-items: center` 是在 grid 中实现完美居中的最简洁方式:一行 CSS 让所有项目在网格单元格内水平和垂直都居中。' },

      { type: 'heading', text: 'gap:项目间距的现代方案' },
      { type: 'paragraph', text: '`gap` 属性(及其子属性 `row-gap`、`column-gap`)在项目**之间**添加固定间距,适用于 flexbox、grid 和多列布局。它只影响项目之间的间距,不影响容器边缘。' },
      { type: 'code', lang: 'css', caption: 'gap 的使用', code: `/* Flexbox */\n.flex {\n  display: flex;\n  gap: 16px;              /* 主轴和交叉轴都是 16px */\n}\n\n/* Grid */\n.grid {\n  display: grid;\n  gap: 20px 10px;         /* 行间距 20px,列间距 10px */\n  /* 等同于: row-gap: 20px; column-gap: 10px; */\n}\n\n/* 多列布局 */\n.multicol {\n  column-count: 3;\n  column-gap: 30px;       /* 列之间的间距 */\n}` },
      { type: 'example', title: '对比:gap vs margin', lang: 'css', code: `/* ❌ 旧方法:用 margin,需要处理边缘 */\n.grid-old {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n.grid-old > * {\n  margin: 8px;  /* 问题:容器边缘也有 8px 间距 */\n}\n\n/* ✅ 新方法:用 gap,自动处理边缘 */\n.grid-new {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;    /* 只在项目之间,边缘没有间距 */\n}`, explanation: '`gap` 的优势:**只在项目之间生效**,第一个和最后一个项目旁边没有多余间距,不需要负 margin hack 或 `:first-child/:last-child` 选择器。代码更简洁,意图更清晰。' },

      { type: 'heading', text: '基线对齐(Baseline Alignment)' },
      { type: 'paragraph', text: '`align-items: baseline` 和 `justify-content: baseline` 让项目按照**文本基线**对齐。这在项目包含不同字号或行高的文本时非常有用。' },
      { type: 'code', lang: 'html', caption: '基线对齐的应用场景', code: `<div style="display: flex; align-items: baseline; gap: 8px;">\n  <h2 style="font-size: 32px; margin: 0;">标题</h2>\n  <span style="font-size: 14px;">副标题</span>\n  <span style="font-size: 12px; color: gray;">2024-01-15</span>\n</div>\n<!-- 三个元素的文字底部在同一条基线上 -->` },
      { type: 'list', items: [
        '**first baseline**:项目的第一行文本基线对齐',
        '**last baseline**:项目的最后一行文本基线对齐',
        '**合成基线**:如果项目没有文本内容(如空 div、图片),使用其底部边缘作为基线'
      ] },

      { type: 'heading', text: '溢出对齐:safe vs unsafe' },
      { type: 'paragraph', text: '当对齐的项目溢出容器时,`safe` 和 `unsafe` 关键字控制如何处理溢出。`safe` 在溢出时回退到 `start` 对齐,确保内容可访问;`unsafe` 严格遵循指定对齐,即使导致内容溢出到不可滚动区域。' },
      { type: 'code', lang: 'css', caption: '溢出对齐', code: `.container {\n  display: flex;\n  height: 200px;\n  overflow: auto;\n  \n  /* 安全对齐:如果项目高度 > 200px,回退到 flex-start */\n  align-items: safe center;\n  \n  /* 不安全对齐:即使溢出也强制居中(可能裁剪顶部内容) */\n  align-items: unsafe center;\n}` },
      { type: 'warning', text: '默认行为是 `unsafe`,即严格遵循指定对齐。如果你的内容可能溢出容器(如用户生成内容、国际化文本),建议使用 `safe` 关键字,确保溢出内容始终可访问。' },

      { type: 'heading', text: '不同布局模式的对齐支持' },
      { type: 'paragraph', text: 'Box Alignment 属性在不同布局模式中的支持程度不同:' },
      { type: 'list', items: [
        '**Flexbox**:完全支持 `justify-content`, `align-items`, `align-self`, `align-content`, `gap`。不支持 `justify-self/justify-items`',
        '**Grid**:完全支持所有对齐属性',
        '**多列布局**:支持 `column-gap` 和部分 `align-content`',
        '**块布局**:支持 `align-content` 和 `justify-content`(实验性),支持 `align-self` 用于绝对定位元素'
      ] },
      { type: 'tip', text: '记住这个核心原则:**flexbox 是一维布局,只能控制一根轴上的项目对齐(`justify-content`),交叉轴只能逐项对齐(`align-items/self`);grid 是二维布局,可以同时控制行和列的对齐,且支持单个项目在单元格内的双向对齐(`justify-self + align-self`)**。' },
    ] as TutorialBlock[],
  },
  {
    id: 'baseline-alignment',
    number: '2',
    title: { zh: '基线对齐详解', en: 'Baseline Alignment Details' },
    summary: { zh: '基线对齐是 CSS 对齐模型中最复杂的部分，涉及基线集的确定、合成基线的生成规则，以及 Flexbox/Grid 等布局中的基线参与机制。', en: 'Baseline alignment is the most complex part of the CSS alignment model, involving baseline set determination, synthesized baseline generation rules, and baseline participation mechanisms in Flexbox/Grid layouts.' },
    keyPoints: [
      '每个盒子在给定轴上有 first baseline set 和 last baseline set，分别对应盒子内首行/末行文本的基线集',
      'alignment baseline（对齐基线）是基线集中实际用于对齐的基线，通常是共享对齐上下文的 dominant baseline',
      '行盒的基线集由其 root inline box 的 dominant baseline 和字体指标生成',
      '块容器的基线集取自首个/末个流内行盒或流内块级子元素贡献的基线集；无匹配时该块容器没有基线集',
      '块容器若为滚动容器(scroll container)且 baseline-source 为 auto，则始终具有 last baseline set，位于 block-end margin edge',
      '表格的基线集取自首行/末行；表格行的基线集由参与基线对齐的单元格共享基线生成，否则从单元格内容边缘合成',
      'Flex 容器主轴基线(main-axis baseline)确定：① 首行/末行有基线参与项 → 使用共享对齐基线 ② 至少有一个 flex 项 → 使用最起始/末端项的基线(无则从 border edge 合成) ③ 无项目 → 按对齐上下文规则合成',
      'Flex 容器交叉轴基线(cross-axis baseline)确定：① 至少有一个 flex 项 → 使用最起始/末端项的基线(无则从 border edge 合成) ② 无项目 → 按对齐上下文规则合成',
      'Flex 项若 align-self 为 baseline 则"参与基线对齐"(baseline participation)，其基线与同一 flex 行内其他基线参与项共享对齐',
      '合成基线(synthesized baseline)规则：从矩形合成时，alphabetic baseline 取 line-under 边，central baseline 取上下边平均值',
      '合成基线使用的边缘因格式化上下文而异：行内级盒 → margin edge，表格单元格 → content edge，flex/grid 项 → border edge',
      'baseline-sharing group(基线共享组)：同一对齐上下文中、基线对齐偏好兼容的盒子组成一组共同对齐',
      '基线对齐偏好兼容条件：① 相同 block flow direction + 相同 baseline preference ② 相反 block flow direction + 相反 baseline preference',
      '基线对齐算法：① 从对齐上下文的 first available font 生成基线表 ② 按各主体的 alignment baseline 对齐到基线表 ③ 按 fallback alignment 在对齐容器中定位 ④ 对于 baseline content-alignment 添加最小必要额外空间',
      '计算基线时，有滚动机制的盒子必须视为处于初始滚动位置(initial scroll position)',
      'writing mode 与对齐轴平行时，需假设一个轴兼容的书写模式来确定合成基线的 line-under/line-over 边',
    ],
    specId: 'baseline-rules',
    tutorial: [
      { type: 'heading', text: '基线对齐:CSS 对齐模型的硬核部分' },
      { type: 'paragraph', text: '基线对齐(baseline alignment)是 CSS 对齐系统中最复杂、最精细的部分。它的目标是让包含文本的元素**按照文字的视觉基线对齐**,而不是按盒子边缘对齐。这需要浏览器理解字体的内部结构、确定每个元素的"基线"位置,并在不同字号、不同字体的元素之间建立视觉对齐。' },
      { type: 'paragraph', text: '理解基线对齐的关键概念:**基线集(baseline set)**、**对齐基线(alignment baseline)**、**合成基线(synthesized baseline)**、**基线共享组(baseline-sharing group)**。这些概念层层递进,构成了一个完整的基线对齐算法。' },

      { type: 'heading', text: 'First Baseline Set 和 Last Baseline Set' },
      { type: 'paragraph', text: '每个盒子在给定的对齐轴上有**两组基线**:' },
      { type: 'list', items: [
        '**First baseline set**:对应盒子内**第一行文本**的基线集(通常用于 `align-items: baseline`)',
        '**Last baseline set**:对应盒子内**最后一行文本**的基线集(用于 `align-items: last baseline`)'
      ] },
      { type: 'paragraph', text: '为什么需要两组?因为在某些布局中(如 Grid 的多行布局),我们可能希望项目按首行对齐,或按末行对齐。两组基线提供了这种灵活性。' },
      { type: 'example', title: '块容器的基线集确定', lang: 'html', code: `<div style="border: 1px solid;">\n  <p>第一段文字</p>\n  <p>第二段文字</p>\n  <p>最后一段文字</p>\n</div>\n<!-- First baseline set: 取自第一个 <p> 的第一行文字基线\n     Last baseline set: 取自最后一个 <p> 的最后一行文字基线 -->`, explanation: '块容器的基线集取自其首个/末个**流内行盒**或**流内块级子元素**。如果子元素是块容器,递归取其基线集。如果容器是空的或只有浮动/绝对定位元素,**没有基线集**,需要合成。' },

      { type: 'heading', text: '对齐基线(Alignment Baseline)' },
      { type: 'paragraph', text: '基线集中可能包含多条基线(alphabetic baseline、ideographic baseline、mathematical baseline 等),但对齐时只使用其中一条——**对齐基线**(alignment baseline)。它通常是对齐上下文的 **dominant baseline**(主导基线),由字体和书写模式决定。' },
      { type: 'list', items: [
        '拉丁字母:使用 **alphabetic baseline**(字母底部的基线,如 a、x 的底部)',
        '中文/日文:使用 **ideographic baseline**(表意文字的底部基线)',
        '数学排版:使用 **mathematical baseline**(用于公式排版)'
      ] },
      { type: 'tip', text: '大多数情况你不需要关心具体用哪条基线——浏览器会根据字体自动选择合适的基线。但理解"基线不止一条"有助于理解为什么混合中英文时对齐看起来正确。' },

      { type: 'heading', text: '合成基线(Synthesized Baseline)' },
      { type: 'paragraph', text: '如果一个盒子**没有文本内容**(如空的 `<div>`、`<img>` 元素、`inline-block` 空盒子),它就没有自然的基线。这时浏览器需要**合成基线**(从盒子的几何边界生成假想的基线)。' },
      { type: 'code', lang: 'text', caption: '合成基线规则', code: `Alphabetic baseline: 使用盒子的 line-under 边(通常是底部边缘)\nCentral baseline: 使用盒子上下边的中点\n\n使用哪个边缘取决于格式化上下文:\n- 行内级盒(inline/inline-block): margin edge\n- 表格单元格: content edge  \n- Flex/Grid 项: border edge` },
      { type: 'example', title: '合成基线的实际表现', lang: 'html', code: `<div style="display: flex; align-items: baseline; font-size: 20px;">\n  <span>文字</span>\n  <div style="display: inline-block; width: 50px; height: 50px; background: lightblue;"></div>\n  <span>更多文字</span>\n</div>\n<!-- 空的 inline-block 盒子没有文字,基线被合成为其 margin bottom edge\n     它的底部会和周围文字的基线对齐 -->`, explanation: '空的 `inline-block` 元素在基线对齐时,浏览器使用其**底部外边距边界**(margin bottom edge)作为合成基线。这就是为什么空的 `inline-block` 盒子底部会和周围文字的底部对齐。' },
      { type: 'warning', text: '合成基线的一个常见"陷阱":如果 `inline-block` 元素内部有文字,它的基线是**最后一行文字的基线**;如果是空的,基线是**底部边缘**。这导致有无文字时对齐位置不同,可能产生意外的布局偏移。' },

      { type: 'heading', text: 'Flex 容器的基线确定' },
      { type: 'paragraph', text: 'Flex 容器自身也可能参与基线对齐(如嵌套的 flex 容器)。它的基线取决于其内部 flex 项目的基线,规则比较复杂:' },
      { type: 'list', ordered: true, items: [
        '**主轴基线**(main-axis baseline):如果首行/末行有参与基线对齐的 flex 项(即 `align-self: baseline` 的项),使用这些项的共享对齐基线',
        '如果没有基线参与项,但至少有一个 flex 项,使用**最起始/末端项的基线**(如果该项也没有基线,从其 border edge 合成)',
        '如果容器完全空,按照对齐上下文的规则合成基线',
        '**交叉轴基线**(cross-axis baseline):类似逻辑,但不考虑基线参与,直接使用最起始/末端项的基线'
      ] },
      { type: 'code', lang: 'html', caption: 'Flex 容器的基线传递', code: `<div style="display: flex; align-items: baseline;">\n  <div style="display: flex; flex-direction: column;">\n    <span>内层第一行</span>\n    <span>内层第二行</span>\n  </div>\n  <span>外层文字</span>\n</div>\n<!-- 内层 flex 容器的 first baseline 取自 "内层第一行"\n     外层对齐时,内层容器的这条基线会和 "外层文字" 对齐 -->`, explanation: 'Flex 容器的基线会"传递"到外层——如果外层需要基线对齐,内层容器会使用其首个/末个 flex 项的基线作为自己的基线。这使得嵌套布局也能正确参与基线对齐。' },

      { type: 'heading', text: '基线参与(Baseline Participation)' },
      { type: 'paragraph', text: '在 flex 布局中,只有 `align-self: baseline` 的 flex 项才**参与基线对齐**(baseline participation)。这些项会组成一个**基线共享组**(baseline-sharing group),共享同一条对齐基线。' },
      { type: 'code', lang: 'css', caption: '基线参与示例', code: `.container {\n  display: flex;\n  align-items: flex-start;  /* 默认:不参与基线对齐 */\n}\n\n.item1 {\n  align-self: baseline;  /* 参与基线对齐 */\n}\n\n.item2 {\n  align-self: baseline;  /* 也参与,和 item1 基线对齐 */\n}\n\n.item3 {\n  align-self: center;    /* 不参与基线对齐 */\n}` },
      { type: 'paragraph', text: '基线共享组内的所有项目会调整垂直位置,使它们的基线对齐。非参与项(如 `align-self: center`)不受影响,按自己的对齐规则定位。' },

      { type: 'heading', text: '基线共享组(Baseline-Sharing Group)' },
      { type: 'paragraph', text: '基线共享组是**一组需要共同基线对齐的盒子**。它们必须满足:' },
      { type: 'list', items: [
        '在同一个对齐上下文中(如同一 flex 行、同一 grid 行/列)',
        '基线对齐偏好兼容(baseline preference compatible)'
      ] },
      { type: 'paragraph', text: '**基线对齐偏好兼容**的条件:' },
      { type: 'list', items: [
        '相同 block flow direction(块流方向) + 相同 baseline preference(first/last)',
        '或:相反 block flow direction + 相反 baseline preference'
      ] },
      { type: 'tip', text: '在普通水平布局中,你不需要担心这些复杂规则——所有项目默认就是兼容的。这些规则主要影响混合了不同书写模式(如横排和竖排文本)的复杂布局。' },

      { type: 'heading', text: '基线对齐算法(简化版)' },
      { type: 'paragraph', text: '浏览器执行基线对齐的步骤(简化):' },
      { type: 'list', ordered: true, items: [
        '**生成基线表**:从对齐上下文的首个可用字体生成一组标准基线(alphabetic、ideographic 等)',
        '**确定每个主体的基线**:读取每个盒子的 first/last baseline set,提取对齐基线',
        '**对齐到基线表**:调整每个盒子的位置,使其对齐基线与基线表中的对应基线重合',
        '**应用 fallback alignment**:如果对齐失败(如盒子没有基线),使用回退对齐(通常是 `start`)',
        '**分配剩余空间**:如果是 `align-content: baseline`,在所有基线对齐后分配容器的剩余空间'
      ] },

      { type: 'heading', text: '滚动容器的特殊规则' },
      { type: 'paragraph', text: '块容器如果是**滚动容器**(即有 `overflow: scroll/auto` 且内容溢出)且 `baseline-source: auto`,它始终具有 **last baseline set**,位于 **block-end margin edge**(块结束方向的外边距边界)。这确保滚动容器可以参与基线对齐,即使内部内容滚动了也不影响对齐。' },
      { type: 'warning', text: '计算基线时,滚动容器必须**视为处于初始滚动位置**(scrollTop/scrollLeft = 0)。这意味着基线位置不受当前滚动状态影响,保持稳定。' },

      { type: 'heading', text: '表格的基线' },
      { type: 'paragraph', text: '表格元素的基线确定规则:' },
      { type: 'list', items: [
        '**表格**:first baseline 取自首行,last baseline 取自末行',
        '**表格行**:如果行内有单元格参与基线对齐,使用这些单元格的共享基线;否则从首个/末个单元格的内容边缘合成',
        '**表格单元格**:基线取自内部首个/末个行盒或块级元素'
      ] },
      { type: 'tip', text: '表格的基线规则让表格可以和周围的行内内容正确对齐。这在表单布局中特别有用:表格形式的输入控件组可以和标签文字基线对齐。' },

      { type: 'heading', text: '书写模式的影响' },
      { type: 'paragraph', text: '当 `writing-mode` 与对齐轴平行时(如垂直书写模式中的垂直对齐),基线的"上下"方向变得模糊。这时浏览器需要**假设一个轴兼容的书写模式**来确定合成基线的 line-under 和 line-over 边。' },
      { type: 'paragraph', text: '实践中这些复杂情况很少遇到。大多数网站使用水平书写模式,基线对齐就是"文字底部对齐",直观且可预测。' },

      { type: 'heading', text: '何时使用基线对齐?' },
      { type: 'paragraph', text: '基线对齐最适合以下场景:' },
      { type: 'list', items: [
        '**不同字号的文本**:标题和副标题、价格和货币符号、上标下标',
        '**图标和文字混排**:小图标需要和周围文字"视觉对齐"',
        '**表单布局**:标签和输入框、按钮和文字',
        '**卡片标题行**:多个不同高度的元素需要底部对齐'
      ] },
      { type: 'example', title: '基线对齐的典型应用', lang: 'html', code: `<!-- 价格展示 -->\n<div style="display: flex; align-items: baseline; gap: 4px;">\n  <span style="font-size: 14px; color: gray;">¥</span>\n  <span style="font-size: 32px; font-weight: bold;">199</span>\n  <span style="font-size: 14px; color: gray;">/月</span>\n</div>\n\n<!-- 图标和文字 -->\n<button style="display: inline-flex; align-items: baseline; gap: 6px;">\n  <svg style="width: 16px; height: 16px;">...</svg>\n  <span>下载</span>\n</button>`, explanation: '基线对齐让不同字号的元素"自然地"排列在一起,文字底部在视觉上对齐。这比 `align-items: center` 更和谐,因为它尊重文字的排版基线。' },

      { type: 'warning', text: '基线对齐的计算成本相对较高(需要读取字体信息、确定基线集),在包含大量项目的列表中可能影响性能。如果对齐要求不严格,`align-items: center` 是更高效的选择。' },
    ] as TutorialBlock[],
  },
];

export const anchors: Record<string, string> = {};

export const glossaryTerms: Record<string, GlossaryEntry> = {};
