/**
 * 各章节的「完成基准」自测题。
 * key = moduleId，value = 自测问题列表（中文）。
 * 渲染为章节末尾可勾选的清单（SelfCheckCard），勾选状态存 localStorage。
 * 题目基于第 0 章「完成基准」与各章核心概念，答得上才算过。
 */
export const selfCheck: Record<string, string[]> = {
  method: [
    '能用自己的话说清「模块化、Level、Snapshot、成熟度」四者的关系吗？',
    '能默写八环概念依赖链，并解释为什么「取值过程」排在「盒模型」之前吗？',
    '拿到任意属性，能读懂它的 Value 行（值定义语法）并说出它是否继承吗？',
    '能说清「为什么 computed≠used 只发生在依赖布局的属性上」吗？',
  ],
  intro: [
    '能说出 CSS 属性的三个组成部分（名称、值域、行为）吗？',
    '能解释「层叠」与「继承」分别解决什么问题吗？',
    '能复述值处理六阶段的名称（declared→…→actual）吗？',
  ],
  syntax: [
    '能说出 CSS 解析的两个阶段（tokenize → parse）吗？',
    '遇到无法识别的声明，浏览器如何处理（容错 / 前向兼容解析）？',
    '能读懂 `<length>`、`A || B`、`#`、`{1,4}` 这些值定义记号吗？',
  ],
  selectors: [
    '能徒手算任意选择器的 (A,B,C) 特异度三元组吗？',
    '`:is()`、`:where()`、`:not()` 对特异度各有什么影响？',
    '浏览器为什么从右到左匹配选择器？这对性能有何含义？',
  ],
  cascade: [
    '能口述层叠排序的维度顺序（来源与重要性 → 层 → 特异性 → 顺序）吗？',
    '能解释 `!important` 如何反转作者样式与用户样式的强弱吗？',
    '`@layer` 的优先级在普通规则与 `!important` 下分别怎么比较？',
    'declared→cascaded→specified→computed→used→actual，每一步在哪里发生？',
  ],
  'box-model': [
    '能说出盒子的四个区域（content / padding / border / margin）吗？',
    '外边距合并（margin collapsing）在哪些情况下发生？',
    '`box-sizing: border-box` 改变了 width 的计算口径吗？怎么变？',
  ],
  'writing-modes': [
    '能区分「物理 / 流向相对 / 行相对」三套方向吗？',
    '竖排（vertical-rl）时 `inline-size` 控制的是宽还是高？',
    '为什么说书写模式是 Flexbox / Grid 的坐标系基础？',
  ],
  'visual-formatting': [
    '什么是包含块（containing block）？谁决定一个盒的包含块？',
    'BFC 是什么？它能解决哪些经典问题（清除浮动、阻止 margin 穿透）？',
    '`position`、`float`、`display` 三者的相互关系（CSS2 §9.7）是什么？',
  ],
  flexbox: [
    '`flex-direction: row` 时主轴是「水平」还是「inline 维度」？两者何时不同？',
    '`flex-grow` / `flex-shrink` / `flex-basis` 三者如何共同决定弹性项最终尺寸？',
    '`justify-content` 与 `align-items` 分别沿哪个轴对齐？',
  ],
  grid: [
    '显式网格与隐式网格的区别是什么？自动放置算法何时创建隐式轨道？',
    '`fr` 单位与 `minmax()` 各解决什么问题？',
    'subgrid（Level 2）让子网格获得了什么能力？',
  ],
  'box-alignment': [
    '`justify-*` 与 `align-*` 分别沿哪根轴？为什么说方向取决于 writing-mode？',
    '`space-between` / `space-around` / `space-evenly` 的间距分配有何不同？',
    '为什么 `justify-self` 在 Flexbox 中不生效，而在 Grid 中有效？',
    '基线对齐（baseline）相比 `center` 适合什么场景？合成基线如何产生？',
  ],
  media: [
    '媒体查询的「媒体类型」与「媒体特性」有什么区别？',
    '为什么移动优先（min-width）通常优于桌面优先（max-width）？',
    '媒体查询与容器查询 `@container` 的本质差异是什么？',
  ],
  multicol: [
    '`column-width` 与 `column-count` 同时设置时，浏览器如何取舍？',
    '内容如何在多列之间流动（column flow）？',
    '`column-span: all` 的作用是什么？',
  ],
  tables: [
    '表格布局的两种算法（fixed / auto）有何区别？',
    '`border-collapse` 的 collapse 与 separate 模型差异是什么？',
    '匿名表格对象（anonymous table objects）是怎样被补全的？',
  ],
  sizing: [
    '内在尺寸（intrinsic）与外在尺寸（extrinsic）的区别是什么？',
    '`min-content`、`max-content`、`fit-content` 各表示什么？',
    'min-content / max-content contribution 如何影响容器尺寸？',
  ],
  'visual-effects': [
    '`overflow` 各值（visible/hidden/scroll/auto/clip）的行为差异？',
    '裁剪（clip）与遮罩（mask）的区别是什么？',
    '滚动容器为什么会建立 BFC？',
  ],
  'generated-content': [
    '`::before` / `::after` 生成的内容在盒树中处于什么位置？',
    '计数器（counter）的作用域与嵌套规则是什么？',
    '`content` 属性能接受哪些类型的值？',
  ],
  'colors-backgrounds': [
    'oklch 相比 hsl/rgb 在「感知均匀性」上有什么优势？',
    '多层背景（background 列表）的绘制顺序是怎样的？',
    '`background-clip` 与 `background-origin` 分别控制什么？',
  ],
  fonts: [
    '字体匹配算法按什么顺序选择字体（family → style → weight…）？',
    '`@font-face` 的 `font-display` 各值如何影响加载体验？',
    '可变字体（variable font）的「轴」（axis）是什么？',
  ],
  text: [
    '空白处理（white-space）各值如何影响换行与空白折叠？',
    '`text-align: justify` 两端对齐是如何分配多余空间的？',
    '软换行机会（soft wrap opportunity）由什么决定？',
  ],
  transforms: [
    '为什么 `transform` 不影响布局、只影响渲染（绘制阶段）？',
    '`transform` 会创建新的包含块与层叠上下文吗？',
    '过渡与动画在 computed values 上插值，这意味着什么？',
  ],
  modern: [
    '容器查询 `@container` 相比媒体查询解决了什么问题？',
    'CSS 原生嵌套的 `&` 与预处理器（Sass）的嵌套有何区别？',
    '`@scope` 如何限定样式的作用域与「下边界」？',
  ],
};
